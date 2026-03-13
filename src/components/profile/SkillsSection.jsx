const SkillsSection = ({ skills = [], onEdit }) => {
  const skillNames = skills.map((s) => (typeof s === "string" ? s : s?.name)).filter(Boolean);

  return (
    <div id="key-skills" className="scroll-mt-24 bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-slate-900">Key skills</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-slate-400 hover:text-slate-600 p-0.5"
          aria-label="Edit skills"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skillNames.length > 0 ? (
          skillNames.map((name) => (
            <span
              key={name}
              className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
            >
              {name}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500">Add skills to highlight your expertise.</p>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
