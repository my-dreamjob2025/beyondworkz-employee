const WorkExperience = ({ experience = [], onEdit }) => {
  return (
    <div id="employment" className="scroll-mt-24 bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-slate-900">Employment</h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        Your employment details will help recruiters understand your experience.
      </p>
      <button
        type="button"
        onClick={onEdit}
        className="text-orange-600 hover:text-orange-700 text-sm font-medium mb-6"
      >
        Add employment
      </button>

      <div className="space-y-6">
        {experience.length > 0 ? (
          experience.map((exp, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-10 h-10 bg-slate-200 rounded-lg flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-800">{exp.jobTitle || "Untitled"}</h4>
                <p className="text-sm text-slate-500">{exp.company}</p>
                <p className="text-xs text-slate-400">
                  {exp.dateOfJoining ? new Date(exp.dateOfJoining).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : ""}
                  {exp.current ? " – Present" : exp.relievingDate ? ` – ${new Date(exp.relievingDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}` : ""}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
                {exp.description && (
                  <p className="text-sm text-slate-500 mt-2">{exp.description}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No employment history added yet.</p>
        )}
      </div>
    </div>
  );
};

export default WorkExperience;
