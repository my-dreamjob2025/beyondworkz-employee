import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublishedJobs } from "../../services/jobsService";
import { formatPostedLabel, formatSalaryRange } from "../../utils/jobDisplay";

const FeaturedJobsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchPublishedJobs({ page: 1, limit: 9 });
        if (!cancelled && res.success && Array.isArray(res.jobs)) {
          setJobs(res.jobs);
        }
      } catch {
        if (!cancelled) setJobs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (jobs.length === 0) return;
    if (current >= jobs.length) setCurrent(0);
  }, [jobs.length, current]);

  const job = jobs[current];
  const totalSlides = Math.max(1, jobs.length);
  const next = () => {
    if (current < totalSlides - 1) setCurrent((c) => c + 1);
  };
  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };
  const progressWidth = ((current + 1) / totalSlides) * 100;

  return (
    <section className="w-full bg-[#F1F5F9] py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0F172A]">Featured Jobs</h2>

          <p className="mt-3 text-sm text-[#94A3B8]">
            Live openings from employers on Beyond Workz — updated as new roles go live.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 text-center text-sm text-[#94A3B8] py-16">Loading jobs…</div>
        ) : jobs.length === 0 ? (
          <div className="mt-10 max-w-lg mx-auto text-center rounded-xl bg-white border border-[#E2E8F0] p-8 text-sm text-[#64748B]">
            <p className="font-medium text-[#0F172A]">No jobs to show yet</p>
            <p className="mt-2">Check back soon, or browse the full jobs page.</p>
            <Link
              to="/jobs"
              className="inline-block mt-4 text-sm font-semibold text-[#2563EB] hover:underline"
            >
              Browse jobs
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 sm:mt-10 max-w-lg mx-auto px-0 sm:px-4">
              <article className="flex flex-col justify-between min-h-[280px] rounded-xl bg-white p-5 sm:p-6 border border-[#E2E8F0] shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600"
                      aria-hidden
                    >
                      {(job.companyName || job.hiringFor || "E").slice(0, 2).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <h5 className="text-base font-semibold text-[#0F172A] leading-snug">{job.title}</h5>

                      <p className="mt-1 text-xs text-[#94A3B8] truncate">
                        {job.companyName || (job.hiringFor && String(job.hiringFor).trim()) || "Employer"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                    <span>{[job.city, job.area].filter(Boolean).join(", ") || "India"}</span>

                    {job.jobType ? (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-[#2563EB]">
                        {job.jobType}
                      </span>
                    ) : null}

                    <span className="inline-flex items-center rounded-full bg-[#F97316] px-2.5 py-1 text-[11px] font-semibold text-white">
                      {formatSalaryRange(job)}
                    </span>
                  </div>
                </div>

                <hr className="border-t border-[#E2E8F0] mt-6" />
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-[11px] text-[#94A3B8]">{formatPostedLabel(job.publishedAt || job.updatedAt)}</p>

                  <Link
                    to={`/jobs/${job.id}`}
                    className="inline-flex justify-center rounded-full bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
                  >
                    View role
                  </Link>
                </div>
              </article>
            </div>

            {jobs.length > 1 ? (
              <div className="mt-6 flex justify-center sm:justify-start max-w-lg mx-auto px-0 sm:px-4">
                <div className="flex items-center gap-4 rounded-full bg-white px-5 py-2 border border-[#E2E8F0] shadow-sm w-full sm:w-auto justify-center">
                  <button
                    type="button"
                    onClick={prev}
                    disabled={current === 0}
                    className="text-[#64748B] text-lg disabled:opacity-30 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Previous job"
                  >
                    &#8249;
                  </button>

                  <div className="flex-1 sm:flex-initial sm:w-28 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden max-w-[200px]">
                    <div
                      className="h-full bg-[#2563EB] transition-all duration-300"
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={next}
                    disabled={current === totalSlides - 1}
                    className="text-[#64748B] text-lg disabled:opacity-30 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Next job"
                  >
                    &#8250;
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
