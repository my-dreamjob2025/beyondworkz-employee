import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecommendedJobCard from "./RecommendedJobCard";
import { fetchPublishedJobs } from "../../services/jobsService";
import { toRecommendedJobModel } from "../../utils/jobDisplay";

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchPublishedJobs({ page: 1, limit: 5 });
        if (!cancelled && res.success && Array.isArray(res.jobs)) {
          setJobs(res.jobs.map(toRecommendedJobModel));
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

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Recommended jobs</h3>

        <Link to="/jobs" className="text-blue-600 text-sm font-medium hover:underline">
          View all
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500 py-4">Loading openings…</p>
      ) : jobs.length === 0 ? (
        <p className="text-sm text-slate-500 py-2">
          No published jobs yet.{" "}
          <Link to="/jobs" className="text-blue-600 font-medium hover:underline">
            Browse jobs
          </Link>{" "}
          when employers start posting.
        </p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <RecommendedJobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedJobs;
