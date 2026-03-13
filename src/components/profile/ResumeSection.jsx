const ResumeSection = ({ resume, onEdit }) => {
  const resumeUrl = resume?.url;
  const hasResume = !!resumeUrl;
  const fileName = resumeUrl ? resumeUrl.split("/").pop() || "Resume" : null;
  const uploadedAt = resume?.uploadedAt
    ? new Date(resume.uploadedAt).toLocaleDateString()
    : null;

  return (
    <div id="resume" className="scroll-mt-24 bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900">Resume</h3>
          {!hasResume && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
              Add 10%
            </span>
          )}
        </div>
      </div>

      {hasResume ? (
        <div className="border border-slate-200 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="font-medium text-sm text-slate-800">{fileName}</p>
            {uploadedAt && (
              <p className="text-xs text-slate-400 mt-0.5">Updated {uploadedAt}</p>
            )}
          </div>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
          >
            Download
          </a>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500 mb-4">
            70% of recruiters discover candidates through resume searches. Upload yours to get noticed.
          </p>
          <button
            type="button"
            onClick={onEdit}
            className="w-full border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-orange-400 hover:bg-orange-50/50 transition-colors"
          >
            <p className="text-slate-600 font-medium text-sm">Already have a resume? Upload resume</p>
            <p className="text-xs text-slate-400 mt-2">
              Supported formats: doc, docx, rtf, pdf — up to 2 MB
            </p>
          </button>
        </>
      )}
    </div>
  );
};

export default ResumeSection;
