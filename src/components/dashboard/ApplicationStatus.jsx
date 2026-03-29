import { Link } from "react-router-dom";
import { formatAppliedAt, statusBadgeClasses } from "../../utils/applicationUi";

const ApplicationStatus = ({ items = [], loading, error }) => {
  const preview = items.slice(0, 5);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Application status</h3>

        <Link to="/dashboard/applications" className="text-blue-600 text-sm font-medium hover:underline">
          View all
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : preview.length === 0 ? (
        <p className="text-sm text-slate-500">
          You have not applied to any jobs yet.{" "}
          <Link to="/jobs" className="text-blue-600 font-medium hover:underline">
            Browse openings
          </Link>
          .
        </p>
      ) : (
        <div className="relative">
          <div className="absolute left-2 top-1 bottom-1 w-px bg-slate-200" aria-hidden />

          <div className="space-y-8">
            {preview.map((app) => (
              <div key={app.id} className="relative pl-8">
                <span className="absolute left-[3px] top-2 w-4 h-4 rounded-full bg-blue-500" aria-hidden />

                <div>
                  <h4 className="font-semibold text-slate-900">{app.job?.title || "Role"}</h4>

                  <p className="text-sm text-slate-500 mt-1">{app.companyLabel}</p>

                  <span
                    className={`inline-block mt-3 text-xs font-medium px-3 py-1 rounded-md bg-slate-50 ${statusBadgeClasses(app.status)}`}
                  >
                    {app.statusLabel}
                  </span>

                  {app.appliedAt ? (
                    <p className="text-sm text-slate-400 mt-2">Applied {formatAppliedAt(app.appliedAt)}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;
