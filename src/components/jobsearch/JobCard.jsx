import { Link } from "react-router-dom";
import bookmarkIcon from "../../assets/icons/common-icon/saved.svg";
import locationIcon from "../../assets/icons/common-icon/location.svg";
import expIcon from "../../assets/icons/common-icon/briefcase-gray.svg";

const JobCard = ({ job }) => {
  if (!job) return null;

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-bold text-slate-600">
            {(job.company || "?").slice(0, 2).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <Link
              to={`/jobs/${job.id}`}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                {job.title}
              </h3>
            </Link>

            <p className="text-sm text-slate-500 truncate">{job.company}</p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-slate-500 mt-1.5">
              <div className="flex items-center gap-1 min-w-0">
                <img src={locationIcon} alt="" className="w-4 opacity-70 shrink-0" />
                <span className="truncate">{job.location}</span>
              </div>

              <div className="flex items-center gap-1">
                <img src={expIcon} alt="" className="w-4 opacity-70 shrink-0" />
                <span className="truncate max-w-[200px] sm:max-w-none">{job.experience}</span>
              </div>

              <span className="bg-orange-500 text-white text-[11px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1 rounded shrink-0">
                {job.salary}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3 text-[11px] sm:text-xs text-slate-600">
              {job.tags?.map((tag) => (
                <span key={tag} className="bg-slate-100 px-2 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-sm text-slate-500 mt-3 line-clamp-2">{job.description}</p>
            {job.posted ? <p className="text-xs text-slate-400 mt-2">{job.posted}</p> : null}
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-start gap-3 sm:ml-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 sm:shrink-0">
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-slate-50 sm:order-2"
            aria-label="Save job (coming soon)"
          >
            <img src={bookmarkIcon} alt="" className="w-5 opacity-70" />
          </button>
          <Link
            to={`/jobs/${job.id}`}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 w-full sm:w-auto min-h-[40px]"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
