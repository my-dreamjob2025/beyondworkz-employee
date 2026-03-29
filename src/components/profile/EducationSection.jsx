import { PencilIcon } from "../icons/ActionIcons";

const toYear = (d) => {
  if (!d) return "";
  if (typeof d === "string") return /^\d{4}/.test(d) ? d.slice(0, 4) : "";
  if (d instanceof Date) return isNaN(d.getTime()) ? "" : d.getFullYear().toString();
  return "";
};

const EducationSection = ({ education = [], onEdit }) => {
  return (
    <div
      id="education"
      className="scroll-mt-24 bg-white border border-slate-200 rounded-xl p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-slate-900">Education</h3>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-orange-600 hover:text-orange-700 text-sm font-medium mb-6"
      >
        Add education
      </button>

      <div className="space-y-6">
        {education.length > 0 ? (
          education.map((edu, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                🎓
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-slate-800">
                    {[edu.degree, edu.level].filter(Boolean).join(" - ") ||
                      edu.institution ||
                      "Education"}
                    {edu.fieldOfStudy ? ` ${edu.fieldOfStudy}` : ""}
                  </h4>
                  <button
                    type="button"
                    onClick={onEdit}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 shrink-0 transition-colors"
                    aria-label="Edit education"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-500 mt-0.5">
                  {edu.institution}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {toYear(edu.startDate)}
                  {edu.endDate || edu.currentlyStudying
                    ? ` – ${edu.currentlyStudying ? "Present" : toYear(edu.endDate)}`
                    : ""}
                  | Full Time
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 mb-4">No education added yet.</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="text-orange-600 hover:text-orange-700 text-sm font-medium"
        >
          Add doctorate/PhD
        </button>
        <span className="text-slate-300">|</span>
        <button
          type="button"
          onClick={onEdit}
          className="text-orange-600 hover:text-orange-700 text-sm font-medium"
        >
          Add masters/post-graduation
        </button>
      </div>
    </div>
  );
};

export default EducationSection;
