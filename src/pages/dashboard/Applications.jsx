import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ApplicationTabs from "../../components/applications/ApplicationTabs";
import ApplicationCard from "../../components/applications/ApplicationCard";
import useMyApplications from "../../hooks/useMyApplications";

const Applications = () => {
  const { items, total, byStatus, loading, error } = useMyApplications();
  const [activeId, setActiveId] = useState("all");

  const counts = useMemo(
    () => ({
      all: total,
      submitted: byStatus.submitted,
      shortlisted: byStatus.shortlisted,
      interview_scheduled: byStatus.interview_scheduled,
      rejected: byStatus.rejected,
      hired: byStatus.hired,
    }),
    [total, byStatus],
  );

  const filtered = useMemo(() => {
    if (activeId === "all") return items;
    return items.filter((a) => a.status === activeId);
  }, [items, activeId]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">My Applications</h1>

        <p className="text-slate-500 text-sm mt-1">Track applications you have submitted to employers on Beyond Workz.</p>
      </div>

      <ApplicationTabs activeId={activeId} onChange={setActiveId} counts={counts} />

      {loading ? (
        <p className="text-sm text-slate-500">Loading applications…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-slate-500">
          No applications in this view yet.{" "}
          <Link to="/jobs" className="text-blue-600 font-medium hover:underline">
            Browse jobs
          </Link>{" "}
          to apply.
        </p>
      ) : (
        <div className="space-y-6">
          {filtered.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
