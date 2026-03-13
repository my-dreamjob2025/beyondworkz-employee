const ProfessionalStep = ({ data, onChange }) => {
  const wc = data.whiteCollarDetails || {};

  const update = (field, value) => {
    onChange("whiteCollarDetails", { ...wc, [field]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Professional Details</h2>
        <p className="text-sm text-slate-500 mt-1">
          Help employers understand your professional background.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Resume Headline
        </label>
        <input
          type="text"
          value={wc.resumeHeadline || ""}
          onChange={(e) => update("resumeHeadline", e.target.value)}
          placeholder="e.g. Senior Full-Stack Developer | React, Node.js"
          maxLength={200}
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-slate-400 mt-1 text-right">
          {(wc.resumeHeadline || "").length}/200
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Professional Bio
        </label>
        <textarea
          value={wc.bio || ""}
          onChange={(e) => update("bio", e.target.value)}
          placeholder="Brief summary of your professional background, goals, and key strengths..."
          rows={4}
          maxLength={500}
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <p className="text-xs text-slate-400 mt-1 text-right">
          {(wc.bio || "").length}/500
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          LinkedIn Profile
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            linkedin.com/in/
          </span>
          <input
            type="text"
            value={wc.linkedin || ""}
            onChange={(e) => update("linkedin", e.target.value)}
            placeholder="your-username"
            className="w-full pl-32 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          GitHub Profile
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            github.com/
          </span>
          <input
            type="text"
            value={wc.github || ""}
            onChange={(e) => update("github", e.target.value)}
            placeholder="your-username"
            className="w-full pl-24 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Portfolio / Website
        </label>
        <input
          type="url"
          value={wc.portfolio || ""}
          onChange={(e) => update("portfolio", e.target.value)}
          placeholder="https://yourportfolio.com"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Total Experience (Years & Months)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <select
              value={wc.totalExperienceYears ?? 0}
              onChange={(e) => update("totalExperienceYears", Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i}>
                  {i} {i === 1 ? "Year" : "Years"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={wc.totalExperienceMonths ?? 0}
              onChange={(e) => update("totalExperienceMonths", Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {i} {i === 1 ? "Month" : "Months"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalStep;
