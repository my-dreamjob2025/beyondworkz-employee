import { Link } from "react-router-dom";

const ResumeStep = ({ data }) => {
  const resume = data.whiteCollarDetails?.resume;
  const resumeUrl = resume?.url;
  const fileName = resumeUrl ? resumeUrl.split("/").pop() || "Resume.pdf" : null;
  const uploadedAt = resume?.uploadedAt
    ? new Date(resume.uploadedAt).toLocaleDateString()
    : null;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Resume</h2>
        <p className="text-sm text-slate-500 mt-1">
          Your resume helps employers understand your experience.
        </p>
      </div>

      {resumeUrl ? (
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-800 text-sm">{fileName}</p>
              {uploadedAt && (
                <p className="text-xs text-slate-500 mt-1">Uploaded {uploadedAt}</p>
              )}
            </div>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
            >
              Download
            </a>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-center">
          <p className="text-slate-500 text-sm">No resume uploaded yet.</p>
        </div>
      )}

      <p className="text-xs text-slate-500">
        To upload or replace your resume, visit{" "}
        <Link to="/complete-profile" className="text-blue-600 hover:underline">
          Complete Profile
        </Link>
        .
      </p>
    </div>
  );
};

export default ResumeStep;
