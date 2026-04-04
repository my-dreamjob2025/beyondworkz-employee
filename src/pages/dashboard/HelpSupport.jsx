import { useCallback, useEffect, useState } from "react";
import {
  fetchSupportTickets,
  fetchSupportTicket,
  createSupportTicket,
  replySupportTicket,
} from "../../services/supportService";

const CATEGORIES = [
  { value: "account", label: "Account & login" },
  { value: "jobs_applications", label: "Jobs & applications" },
  { value: "technical", label: "Technical issue" },
  { value: "billing", label: "Billing (if applicable)" },
  { value: "other", label: "Other" },
];

const STATUS_STYLES = {
  open: "bg-blue-50 text-blue-800 border-blue-100",
  in_progress: "bg-amber-50 text-amber-900 border-amber-100",
  awaiting_user: "bg-violet-50 text-violet-800 border-violet-100",
  resolved: "bg-emerald-50 text-emerald-800 border-emerald-100",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

function statusLabel(s) {
  return String(s || "").replace(/_/g, " ");
}

function roleLabel(role) {
  if (role === "admin") return "Support team";
  if (role === "employee") return "You";
  return "You";
}

const FAQS = [
  {
    q: "How do I update my profile or resume?",
    a: "Open My Profile from the sidebar. You can edit sections and upload a new resume from the profile page.",
  },
  {
    q: "Why can’t I apply to a job?",
    a: "Make sure you’re signed in and the job is still published. Complete any required screening questions in the apply form.",
  },
  {
    q: "How do I track my applications?",
    a: "Use Applications in the sidebar to see status updates from employers (shortlisted, interview, etc.).",
  },
];

export default function HelpSupport() {
  const [tickets, setTickets] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("other");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [replyBody, setReplyBody] = useState("");
  const [replying, setReplying] = useState(false);
  const [replyError, setReplyError] = useState("");

  const [openFaq, setOpenFaq] = useState(null);

  const loadList = useCallback(async () => {
    setListLoading(true);
    setListError("");
    try {
      const data = await fetchSupportTickets();
      if (data.success) setTickets(data.tickets || []);
      else setListError(data.message || "Could not load tickets.");
    } catch (e) {
      setListError(e.response?.data?.message || e.message || "Could not load tickets.");
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const loadDetail = useCallback(async (id) => {
    if (!id) {
      setDetail(null);
      return;
    }
    setDetailLoading(true);
    setReplyBody("");
    setReplyError("");
    try {
      const data = await fetchSupportTicket(id);
      if (data.success && data.ticket) setDetail(data.ticket);
      else setDetail(null);
    } catch {
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDetail(selectedId);
  }, [selectedId, loadDetail]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!subject.trim() || !description.trim()) {
      setFormError("Please add a subject and description.");
      return;
    }
    setSubmitting(true);
    try {
      const data = await createSupportTicket({
        subject: subject.trim(),
        category,
        description: description.trim(),
      });
      if (!data.success) {
        setFormError(data.message || "Could not create ticket.");
        return;
      }
      setSubject("");
      setDescription("");
      setCategory("other");
      setShowForm(false);
      await loadList();
      if (data.ticket?.id) setSelectedId(data.ticket.id);
    } catch (err) {
      setFormError(err.response?.data?.message || err.message || "Could not create ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!detail?.id || !replyBody.trim()) return;
    setReplying(true);
    setReplyError("");
    try {
      const data = await replySupportTicket(detail.id, replyBody.trim());
      if (!data.success) {
        setReplyError(data.message || "Could not send message.");
        return;
      }
      setReplyBody("");
      if (data.ticket) setDetail(data.ticket);
      await loadList();
    } catch (err) {
      setReplyError(err.response?.data?.message || err.message || "Could not send message.");
    } finally {
      setReplying(false);
    }
  };

  const canReply = detail && detail.status !== "closed";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Help &amp; Support</h1>
        <p className="text-sm text-slate-600 mt-1">
          Quick answers below, or raise a ticket and our team will respond here.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-8 items-start">
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-slate-900">Common questions</h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {FAQS.map((item, i) => (
                <li key={item.q} className="py-2">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left text-sm font-medium text-slate-800 flex justify-between gap-2"
                  >
                    <span>{item.q}</span>
                    <span className="text-slate-400 shrink-0">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i ? <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.a}</p> : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-sm text-slate-600">
            <h2 className="text-sm font-semibold text-slate-900">Contact</h2>
            <p className="mt-2 text-xs leading-relaxed">
              For urgent billing or account issues, you can also email{" "}
              <a href="mailto:support@beyondworkz.com" className="text-blue-600 font-medium hover:underline">
                support@beyondworkz.com
              </a>
              . Please include your ticket number if you already raised one.
            </p>
          </div>
        </aside>

        <section className="space-y-4 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Your tickets</h2>
            <button
              type="button"
              onClick={() => {
                setShowForm((v) => !v);
                setFormError("");
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
            >
              {showForm ? "Cancel" : "Raise a ticket"}
            </button>
          </div>

          {showForm ? (
            <form
              onSubmit={handleCreate}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4"
            >
              <p className="text-sm text-slate-600">
                Describe your issue. We typically respond within one business day.
              </p>
              {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Subject
                </label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Short summary"
                  maxLength={300}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Details
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm resize-y min-h-[120px]"
                  placeholder="What happened? What do you need?"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Submit ticket"}
              </button>
            </form>
          ) : null}

          {listError ? <p className="text-sm text-red-600">{listError}</p> : null}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[280px]">
              {listLoading ? (
                <p className="p-5 text-sm text-slate-500">Loading tickets…</p>
              ) : tickets.length === 0 ? (
                <p className="p-5 text-sm text-slate-500">
                  No tickets yet. Use <strong>Raise a ticket</strong> if you need help.
                </p>
              ) : (
                <ul className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto">
                  {tickets.map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(t.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition ${
                          selectedId === t.id ? "bg-blue-50/80" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-mono text-slate-500">{t.ticketNumber}</span>
                          <span
                            className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border shrink-0 ${
                              STATUS_STYLES[t.status] || STATUS_STYLES.open
                            }`}
                          >
                            {statusLabel(t.status)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-900 mt-1 line-clamp-2">{t.subject}</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Updated {t.updatedAt ? new Date(t.updatedAt).toLocaleString() : "—"}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[280px] flex flex-col">
              {!selectedId ? (
                <p className="p-5 text-sm text-slate-500">Select a ticket to view the conversation.</p>
              ) : detailLoading ? (
                <p className="p-5 text-sm text-slate-500">Loading…</p>
              ) : !detail ? (
                <p className="p-5 text-sm text-red-600">Could not load this ticket.</p>
              ) : (
                <>
                  <div className="border-b border-slate-100 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-mono text-slate-500">{detail.ticketNumber}</p>
                      <h3 className="text-sm font-semibold text-slate-900">{detail.subject}</h3>
                    </div>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                        STATUS_STYLES[detail.status] || STATUS_STYLES.open
                      }`}
                    >
                      {statusLabel(detail.status)}
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto max-h-[360px] p-4 space-y-4 text-sm">
                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                      <p className="text-[11px] font-semibold text-slate-500 uppercase">Your request</p>
                      <p className="text-slate-800 whitespace-pre-wrap mt-1">{detail.description}</p>
                    </div>
                    {(detail.messages || []).map((m) => (
                      <div
                        key={m.id}
                        className={`rounded-xl p-3 border ${
                          m.authorRole === "admin"
                            ? "bg-blue-50/80 border-blue-100 ml-0 mr-4"
                            : "bg-white border-slate-200 ml-4 mr-0"
                        }`}
                      >
                        <p className="text-[11px] font-semibold text-slate-500">
                          {roleLabel(m.authorRole)}
                        </p>
                        <p className="text-slate-800 whitespace-pre-wrap mt-1">{m.body}</p>
                        <p className="text-[10px] text-slate-400 mt-2">
                          {m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                  {canReply ? (
                    <form onSubmit={handleReply} className="border-t border-slate-100 p-4 space-y-2">
                      {replyError ? <p className="text-xs text-red-600">{replyError}</p> : null}
                      <textarea
                        value={replyBody}
                        onChange={(e) => setReplyBody(e.target.value)}
                        rows={3}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm resize-y"
                        placeholder="Type a reply…"
                      />
                      <button
                        type="submit"
                        disabled={replying || !replyBody.trim()}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
                      >
                        {replying ? "Sending…" : "Send reply"}
                      </button>
                    </form>
                  ) : (
                    <p className="border-t border-slate-100 p-4 text-xs text-slate-500">
                      This ticket is closed. Raise a new ticket if you still need assistance.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
