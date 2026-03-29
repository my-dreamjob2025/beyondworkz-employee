import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AuthenticatedShell from "../../components/layout/AuthenticatedShell";
import useAuth from "../../hooks/useAuth";
import { applyToPublishedJob, fetchPublishedJob } from "../../services/jobsService";
import { formatPostedLabel, formatSalaryRange } from "../../utils/jobDisplay";
import {
  benefitLabelsFromJob,
  bonusLabelsFromJob,
  hasScreeningSection,
  openingsLabel,
  screeningHighlights,
} from "../../utils/jobDetailDisplay";
import locationIcon from "../../assets/icons/common-icon/location.svg";
import expIcon from "../../assets/icons/common-icon/briefcase-gray.svg";

function ProseBlock({ children, className = "" }) {
  if (!children || !String(children).trim()) return null;
  return (
    <div
      className={`text-sm sm:text-[15px] text-slate-600 leading-relaxed whitespace-pre-wrap break-words min-w-0 ${className}`}
    >
      {children}
    </div>
  );
}

function Section({ id, title, children, className = "" }) {
  if (children == null) return null;
  return (
    <section id={id} className={`scroll-mt-24 ${className}`} aria-labelledby={id ? `${id}-heading` : undefined}>
      <h2 id={id ? `${id}-heading` : undefined} className="text-sm font-semibold text-slate-900 tracking-tight mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyFeedback, setApplyFeedback] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!jobId) {
        setError("Missing job.");
        setJobLoading(false);
        return;
      }
      setJobLoading(true);
      setError(null);
      try {
        const res = await fetchPublishedJob(jobId);
        if (cancelled) return;
        if (res.success && res.job) {
          setJob(res.job);
        } else {
          setError(res.message || "Job could not be loaded.");
          setJob(null);
        }
      } catch (e) {
        if (!cancelled) {
          const status = e.response?.status;
          if (status === 404) {
            setError("This job is no longer available.");
          } else {
            setError(e.response?.data?.message || e.message || "Could not load job.");
          }
          setJob(null);
        }
      } finally {
        if (!cancelled) setJobLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  useEffect(() => {
    setApplyFeedback(null);
  }, [jobId]);

  const handleApply = async () => {
    if (!jobId) return;
    if (!user) {
      navigate(`/login?from=${encodeURIComponent(routeLocation.pathname || `/jobs/${jobId}`)}`);
      return;
    }
    setApplyLoading(true);
    setApplyFeedback(null);
    try {
      const res = await applyToPublishedJob(jobId);
      if (res.success) {
        setApplyFeedback({ type: "success", text: res.message || "Application submitted." });
      } else {
        setApplyFeedback({ type: "error", text: res.message || "Could not apply." });
      }
    } catch (e) {
      const status = e.response?.status;
      const msg = e.response?.data?.message;
      if (status === 409) {
        setApplyFeedback({ type: "info", text: msg || "You have already applied for this job." });
      } else if (status === 403) {
        setApplyFeedback({
          type: "error",
          text: msg || "Only job seeker accounts can apply.",
        });
      } else {
        setApplyFeedback({
          type: "error",
          text: msg || e.message || "Could not submit application.",
        });
      }
    } finally {
      setApplyLoading(false);
    }
  };

  const company =
    job?.companyName || (job?.hiringFor && String(job.hiringFor).trim()) || "Employer";
  const jobLocation = job ? [job.city, job.area].filter(Boolean).join(", ") : "";
  const benefitsList = job ? benefitLabelsFromJob(job.benefits) : [];
  const bonusesList = job ? bonusLabelsFromJob(job.bonuses) : [];
  const screening = job ? screeningHighlights(job.screening) : { flags: [], customQuestions: [], prefs: [] };
  const showScreening = job && hasScreeningSection(job.screening);
  const isFeatured = job?.listingType === "featured";

  const innerClass = user
    ? "mx-auto max-w-4xl py-2 sm:py-4 pb-28 sm:pb-10 min-w-0"
    : "mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10";

  const content = (
    <div className={innerClass}>
      <nav className="text-sm text-slate-500 mb-6">
        <Link to="/jobs" className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1">
          <span aria-hidden>←</span> Back to jobs
        </Link>
      </nav>

      {jobLoading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 text-sm">
              Loading role…
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 text-red-800 px-4 py-6 text-sm space-y-4">
              <p>{error}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/jobs")}
                  className="rounded-lg bg-red-800 text-white px-4 py-2 text-sm font-semibold hover:bg-red-900"
                >
                  Browse all jobs
                </button>
              </div>
            </div>
          ) : job ? (
            <article className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="p-5 sm:p-8 lg:p-10">
                <header className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                  <div
                    className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-slate-100 flex items-center justify-center text-base sm:text-lg font-bold text-slate-600 shrink-0 ring-1 ring-slate-200/80"
                    aria-hidden
                  >
                    {company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 gap-y-1">
                      <h1 className="text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-slate-900 leading-tight">
                        {job.title || "Open role"}
                      </h1>
                      {isFeatured ? (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
                          Featured
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm sm:text-base text-slate-600">{company}</p>
                    {job.hiringFor && job.companyName && String(job.hiringFor).trim() !== String(job.companyName).trim() ? (
                      <p className="text-xs sm:text-sm text-slate-500">
                        Hiring for: <span className="text-slate-700">{job.hiringFor}</span>
                      </p>
                    ) : null}
                    <p className="text-xs text-slate-400 pt-1">{formatPostedLabel(job.publishedAt || job.updatedAt)}</p>
                  </div>
                </header>

                <dl className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 rounded-xl bg-slate-50/90 border border-slate-100 p-4 sm:p-5">
                  <div className="min-w-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">Location</dt>
                    <dd className="text-sm text-slate-800 flex items-start gap-2">
                      <img src={locationIcon} alt="" className="w-4 h-4 mt-0.5 opacity-70 shrink-0" />
                      <span className="break-words">{jobLocation || "Not specified"}</span>
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">Experience</dt>
                    <dd className="text-sm text-slate-800 flex items-start gap-2">
                      <img src={expIcon} alt="" className="w-4 h-4 mt-0.5 opacity-70 shrink-0" />
                      <span className="break-words">{job.minExperience?.trim() || "Not specified"}</span>
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">Education</dt>
                    <dd className="text-sm text-slate-800 break-words">{job.education?.trim() || "Not specified"}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">Job type</dt>
                    <dd>
                      <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800">
                        {job.jobType || "—"}
                      </span>
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">Openings</dt>
                    <dd className="text-sm text-slate-800">{openingsLabel(job.openings)}</dd>
                  </div>
                </dl>

                <div className="mt-6 sm:mt-8 rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50/90 to-amber-50/50 p-4 sm:p-5">
                  <h2 className="text-[11px] font-semibold uppercase tracking-wide text-orange-900/80 mb-2">
                    Compensation
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mb-2">{job.salaryType || "Salary"}</p>
                  <p className="inline-flex rounded-lg bg-orange-500 text-white text-sm sm:text-base font-semibold px-3 py-2 shadow-sm">
                    {formatSalaryRange(job)}
                  </p>
                </div>

                {job.skills?.length > 0 ? (
                  <Section title="Skills" className="mt-8 sm:mt-10" id="skills">
                    <ul className="flex flex-wrap gap-2" role="list">
                      {job.skills.map((s, i) => (
                        <li key={`${s}-${i}`}>
                          <span className="inline-block bg-slate-100 text-slate-800 text-xs sm:text-sm px-2.5 py-1 rounded-lg border border-slate-200/80">
                            {s}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                ) : null}

                {job.description?.trim() ? (
                  <Section title="About the role" className="mt-8 sm:mt-10" id="about">
                    <ProseBlock>{job.description.trim()}</ProseBlock>
                  </Section>
                ) : null}

                {job.responsibilities?.trim() ? (
                  <Section title="Responsibilities" className="mt-8 sm:mt-10" id="responsibilities">
                    <ProseBlock>{job.responsibilities.trim()}</ProseBlock>
                  </Section>
                ) : null}

                {benefitsList.length > 0 ? (
                  <Section title="Benefits" className="mt-8 sm:mt-10" id="benefits">
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 marker:text-slate-400">
                      {benefitsList.map((label) => (
                        <li key={label}>{label}</li>
                      ))}
                    </ul>
                  </Section>
                ) : null}

                {bonusesList.length > 0 ? (
                  <Section title="Bonuses & incentives" className="mt-8 sm:mt-10" id="bonuses">
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 marker:text-slate-400">
                      {bonusesList.map((label) => (
                        <li key={label}>{label}</li>
                      ))}
                    </ul>
                  </Section>
                ) : null}

                {showScreening ? (
                  <Section title="Screening & application" className="mt-8 sm:mt-10" id="screening">
                    <div className="space-y-4 text-sm text-slate-600">
                      {screening.prefs.length > 0 ? (
                        <dl className="space-y-2">
                          {screening.prefs.map(({ label, value }) => (
                            <div key={label}>
                              <dt className="text-xs font-semibold text-slate-500">{label}</dt>
                              <dd className="mt-0.5 break-words">{value}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}
                      {screening.flags.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1.5 marker:text-slate-400">
                          {screening.flags.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : null}
                      {screening.customQuestions.length > 0 ? (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 mb-2">You may be asked</p>
                          <ul className="list-decimal list-inside space-y-1.5 text-slate-600">
                            {screening.customQuestions.map((q, i) => (
                              <li key={i} className="break-words pl-0.5">
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </Section>
                ) : null}

                {job.companyDescription?.trim() ? (
                  <Section title="About the company" className="mt-8 sm:mt-10 pt-8 border-t border-slate-100" id="company">
                    <ProseBlock>{job.companyDescription.trim()}</ProseBlock>
                  </Section>
                ) : null}
              </div>

              <div className="sticky bottom-0 left-0 right-0 border-t border-slate-200 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 p-4 sm:static sm:border-t sm:bg-slate-50 sm:px-8 sm:py-5 lg:px-10">
                <div className="flex flex-col gap-2 max-w-4xl mx-auto sm:mx-0 sm:flex-col sm:items-end">
                  {applyFeedback ? (
                    <p
                      className={`text-sm ${
                        applyFeedback.type === "success"
                          ? "text-emerald-700"
                          : applyFeedback.type === "info"
                            ? "text-slate-600"
                            : "text-red-700"
                      }`}
                      role="status"
                    >
                      {applyFeedback.text}
                    </p>
                  ) : null}
                  <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end w-full sm:w-auto">
                    <Link
                      to="/jobs"
                      className="inline-flex justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 min-h-[44px] items-center"
                    >
                      More jobs
                    </Link>
                    <button
                      type="button"
                      onClick={handleApply}
                      disabled={applyLoading || jobLoading || !!error}
                      className="inline-flex justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 min-h-[44px] items-center disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {applyLoading ? "Submitting…" : user ? "Apply now" : "Sign in to apply"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ) : null}
    </div>
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <AuthenticatedShell>{content}</AuthenticatedShell>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pb-28 sm:pb-12">{content}</main>
      <Footer />
    </>
  );
};

export default JobDetailPage;
