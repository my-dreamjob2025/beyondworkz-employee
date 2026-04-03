import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressTracker from "./ProgressTracker";
import ApplicationDetailModal from "./ApplicationDetailModal";
import { formatAppliedAt, jobLocationLine, progressStepForStatus, statusBadgeClasses } from "../../utils/applicationUi";

function initials(label) {
  const s = String(label || "?").trim();
  if (!s) return "?";
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2);
  return s.slice(0, 2).toUpperCase();
}

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();
  const [detailOpen, setDetailOpen] = useState(false);
  if (!application) return null;

  const { status, statusLabel, job, companyLabel, appliedAt } = application;
  const title = job?.title || "Role";
  const location = jobLocationLine(job);
  const appliedText = appliedAt ? `Applied ${formatAppliedAt(appliedAt)}` : "";

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-4 min-w-0">
          <div
            className="w-12 h-12 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600"
            aria-hidden
          >
            {initials(companyLabel)}
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900">{title}</h3>

            <div className="text-sm text-slate-500 flex flex-wrap gap-x-3 gap-y-1 mt-1">
              <span>{companyLabel}</span>
              {location ? (
                <>
                  <span aria-hidden>•</span>
                  <span>{location}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <span
          className={`shrink-0 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${statusBadgeClasses(status)}`}
        >
          {statusLabel}
        </span>
      </div>

      {status === "rejected" ? (
        <p className="text-sm text-slate-600 mt-6">
          This application did not move forward. You can still explore other openings on the jobs board.
        </p>
      ) : (
        <ProgressTracker currentStep={progressStepForStatus(status)} />
      )}

      <div className="flex flex-wrap justify-between items-center gap-4 mt-6 text-sm text-slate-500">
        <span>{appliedText}</span>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setDetailOpen(true)}
            className="text-blue-600 font-medium hover:underline"
          >
            Application details
          </button>
          {job?.id ? (
            <button
              type="button"
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="text-blue-600 font-medium hover:underline"
            >
              View job
            </button>
          ) : null}
        </div>
      </div>

      <ApplicationDetailModal
        applicationId={application.id}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
};

export default ApplicationCard;
