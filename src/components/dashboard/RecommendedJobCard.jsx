import { Link } from "react-router-dom";
import bookmarkIcon from "../../assets/icons/dashboard/bookmark.svg";
import locationIcon from "../../assets/icons/dashboard/location.svg";
import salaryIcon from "../../assets/icons/dashboard/salary.svg";
import expIcon from "../../assets/icons/dashboard/briefcase.svg";

const RecommendedJobCard = ({ job }) => {
  if (!job) return null;

  const initials = (job.company || "?").slice(0, 2).toUpperCase();

  return (
    <div className="border border-slate-200 rounded-xl p-5 hover:shadow-sm transition">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-4 min-w-0">
          <div
            className="w-12 h-12 shrink-0 bg-slate-100 flex items-center justify-center rounded-lg text-sm font-bold text-slate-600"
            aria-hidden
          >
            {initials}
          </div>

          <div className="min-w-0">
            <h4 className="font-semibold text-slate-900">{job.title}</h4>

            <p className="text-sm text-slate-500 truncate">{job.company}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 mt-2">
              <div className="flex items-center gap-1 min-w-0">
                <img src={locationIcon} className="w-4 h-4 shrink-0" alt="" />
                <span className="truncate">{job.location}</span>
              </div>

              <div className="flex items-center gap-1">
                <img src={salaryIcon} className="w-4 h-4" alt="" />
                <span className="truncate max-w-[140px] sm:max-w-none">{job.salary}</span>
              </div>

              <div className="flex items-center gap-1">
                <img src={expIcon} className="w-4 h-4" alt="" />
                <span className="truncate">{job.experience}</span>
              </div>
            </div>

            {job.skillsRow?.length > 0 ? (
              <div className="flex flex-wrap gap-2 text-sm text-slate-700 mt-3">
                {job.skillsRow.map((s) => (
                  <span key={s} className="bg-slate-50 px-2 py-0.5 rounded-md text-xs">
                    {s}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <button type="button" className="p-1 hover:bg-slate-100 rounded shrink-0" aria-label="Save job">
          <img src={bookmarkIcon} className="w-5 h-5" alt="" />
        </button>
      </div>

      <div className="border-t border-slate-200 mt-4 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-slate-400">{job.posted || ""}</p>

        <Link
          to={job.id ? `/jobs/${job.id}` : "/jobs"}
          className="inline-flex justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          View & apply
        </Link>
      </div>
    </div>
  );
};

export default RecommendedJobCard;
