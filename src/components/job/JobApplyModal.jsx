import { useEffect, useMemo, useState } from "react";
import { SCREENING_FLAG_ENTRIES } from "../../utils/jobDetailDisplay";

const COVER_MAX = 5000;

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {function} props.onClose
 * @param {object} props.job - public job payload with screening
 * @param {function} props.onSubmit - async (payload: { coverLetter, screening }) => void, throws on failure
 */
export default function JobApplyModal({ open, onClose, job, onSubmit }) {
  const [coverLetter, setCoverLetter] = useState("");
  const [ack, setAck] = useState({});
  const [customAnswers, setCustomAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const screening = useMemo(
    () => (job?.screening && typeof job.screening === "object" ? job.screening : {}),
    [job]
  );

  const customQuestions = useMemo(
    () =>
      Array.isArray(screening.customQuestions)
        ? screening.customQuestions.map((q) => String(q).trim()).filter(Boolean)
        : [],
    [screening]
  );

  const requiredFlags = useMemo(
    () => SCREENING_FLAG_ENTRIES.filter(([key]) => screening[key]).map(([key]) => key),
    [screening]
  );

  useEffect(() => {
    if (!open || !job) return;
    setCoverLetter("");
    setAck({});
    setCustomAnswers(customQuestions.map(() => ""));
    setLocalError("");
  }, [open, job, customQuestions]);

  if (!open || !job) return null;

  const validate = () => {
    for (const key of requiredFlags) {
      if (ack[key] !== true) {
        setLocalError("Please confirm all screening checkboxes required for this role.");
        return false;
      }
    }
    for (let i = 0; i < customQuestions.length; i++) {
      if (!String(customAnswers[i] ?? "").trim()) {
        setLocalError(`Please answer: "${customQuestions[i].slice(0, 80)}${customQuestions[i].length > 80 ? "…" : ""}"`);
        return false;
      }
    }
    if (coverLetter.length > COVER_MAX) {
      setLocalError(`Cover letter must be at most ${COVER_MAX} characters.`);
      return false;
    }
    setLocalError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const acknowledgments = {};
    for (const key of requiredFlags) {
      acknowledgments[key] = true;
    }
    const screeningPayload = {
      acknowledgments,
      customAnswers: customQuestions.map((q, i) => ({
        question: q,
        answer: String(customAnswers[i] ?? "").trim(),
      })),
    };
    const payload = {
      coverLetter: coverLetter.trim(),
      screening: screeningPayload,
    };
    setSubmitting(true);
    setLocalError("");
    try {
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setLocalError(err?.response?.data?.message || err?.message || "Could not submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-xl border border-slate-200"
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between gap-3">
          <h2 id="apply-modal-title" className="text-lg font-semibold text-slate-900">
            Apply for {job.title || "this role"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-5">
          {requiredFlags.length > 0 ? (
            <div>
              <p className="text-sm font-medium text-slate-800 mb-2">Confirm the following</p>
              <ul className="space-y-2">
                {SCREENING_FLAG_ENTRIES.filter(([key]) => screening[key]).map(([key, label]) => (
                  <li key={key} className="flex gap-2 items-start">
                    <input
                      id={`ack-${key}`}
                      type="checkbox"
                      checked={ack[key] === true}
                      onChange={(e) => setAck((prev) => ({ ...prev, [key]: e.target.checked }))}
                      className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`ack-${key}`} className="text-sm text-slate-700">
                      {label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {customQuestions.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-800">Employer questions</p>
              {customQuestions.map((q, i) => (
                <div key={i}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{q}</label>
                  <textarea
                    value={customAnswers[i] ?? ""}
                    onChange={(e) => {
                      const next = [...customAnswers];
                      next[i] = e.target.value;
                      setCustomAnswers(next);
                    }}
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}
            </div>
          ) : null}

          <div>
            <label htmlFor="cover-letter" className="block text-sm font-medium text-slate-800 mb-1">
              Cover letter <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="cover-letter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={5}
              maxLength={COVER_MAX}
              placeholder="Briefly explain why you are a good fit…"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-400 mt-1">
              {coverLetter.length}/{COVER_MAX}
            </p>
          </div>

          {localError ? (
            <p className="text-sm text-red-600" role="alert">
              {localError}
            </p>
          ) : null}

          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2.5 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
