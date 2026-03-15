const formatDate = (d) => {
  if (!d) return "";
  const x = new Date(d);
  return isNaN(x.getTime()) ? "" : x.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
};

const BlueCollarWorkExperience = ({ experience = [], onEdit }) => {
  return (
    <div id="employment" className="scroll-mt-24 bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-slate-900">Work History</h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        Add your previous jobs and roles so employers can see your work experience.
      </p>
      <button
        type="button"
        onClick={onEdit}
        className="text-orange-600 hover:text-orange-700 text-sm font-medium mb-6"
      >
        Add work history
      </button>

      <div className="space-y-6">
        {experience.length > 0 ? (
          experience.map((exp, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-blue-600 text-lg">💼</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">{exp.jobTitle || "Untitled"}</h4>
                <p className="text-sm text-slate-500">{exp.company}</p>
                <p className="text-xs text-slate-400">
                  {formatDate(exp.dateOfJoining)}
                  {exp.current ? " – Present" : exp.relievingDate ? ` – ${formatDate(exp.relievingDate)}` : ""}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
                {exp.description && (
                  <p className="text-sm text-slate-500 mt-2">{exp.description}</p>
                )}
                {exp.skillsUsed?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {exp.skillsUsed.map((s, i) => (
                      <span
                        key={`${s}-${i}`}
                        className="inline-flex px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No work history added yet.</p>
        )}
      </div>
    </div>
  );
};

export default BlueCollarWorkExperience;
