import { PencilIcon } from "../icons/ActionIcons";

const ResumeHeadlineSection = ({ resumeHeadline, bio, onEdit }) => {
  const content = resumeHeadline || bio || "Add a resume headline to stand out to recruiters.";

  return (
    <div id="resume-headline" className="scroll-mt-24 bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-slate-900">Resume headline</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Edit resume headline"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        {content}
      </p>
    </div>
  );
};

export default ResumeHeadlineSection;
