import { PencilIcon } from "../icons/ActionIcons";

const SkillsSection = ({ skills = [], onEdit }) => {
  const skillNames = skills.map((s) => (typeof s === "string" ? s : s?.name)).filter(Boolean);

  return (
    <div id="key-skills" className="scroll-mt-24 bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-slate-900">Key skills</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Edit skills"
        >
          <PencilIcon className="w-4 h-4" />
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
