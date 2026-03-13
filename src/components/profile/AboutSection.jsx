const AboutSection = ({ bio, onEdit }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold text-slate-900">About Me</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Edit"
        >
          ✏️
        </button>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed">
        {bio || "Add a professional summary to help employers understand your background and goals."}
      </p>
    </div>
  );
};

export default AboutSection;
