const ResumeHeadlineSection = ({ resumeHeadline, bio, onEdit }) => {
  const content = resumeHeadline || bio || "Add a resume headline to stand out to recruiters.";

  return (
    <div id="resume-headline" className="scroll-mt-24 bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-slate-900">Resume headline</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-slate-400 hover:text-slate-600 p-0.5"
          aria-label="Edit resume headline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        {content}
      </p>
    </div>
  );
};

export default ResumeHeadlineSection;
