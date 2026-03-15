import { useState } from "react";
import { resumeService } from "../../services/resumeService";
import { getResumeDisplayName } from "../../utils/resume";

const ResumeSection = ({ resume, onEdit, onDeleted }) => {
  const hasResume = !!(resume?.url || resume?.key);
  const fileName = getResumeDisplayName(resume);
  const uploadedAt = resume?.uploadedAt
    ? new Date(resume.uploadedAt).toLocaleDateString()
    : null;

  const [actionLoading, setActionLoading] = useState(null); // "view" | "delete"
  const [error, setError] = useState("");
  const loading = !!actionLoading;

  const handleView = async () => {
    if (!hasResume) return;
    setError("");
    setActionLoading("view");
    try {
      const res = await resumeService.getDownloadUrl();
      if (res?.url) window.open(res.url, "_blank", "noopener,noreferrer");
      else setError("Could not load resume.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load resume.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!hasResume || !window.confirm("Are you sure you want to delete your resume?")) return;
    setError("");
    setActionLoading("delete");
    try {
      await resumeService.deleteResume();
      onDeleted?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete resume.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div id="resume" className="scroll-mt-24 bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="font-semibold text-slate-900 mb-4">Resume</h3>

      {hasResume ? (
        <>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <p className="font-medium text-slate-800">{fileName}</p>
              {uploadedAt && (
                <p className="text-xs text-slate-500 mt-0.5">Uploaded on {uploadedAt}</p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleView}
                disabled={loading}
                title="View / Download"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-blue-600 disabled:opacity-60 transition-colors"
              >
                {actionLoading === "view" ? (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                title="Delete"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-blue-600 disabled:opacity-60 transition-colors"
              >
                {actionLoading === "delete" ? (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        </>
      ) : (
        <p className="text-sm text-slate-500 mb-4">
          70% of recruiters discover candidates through resume searches. Upload yours to get noticed.
        </p>
      )}

      <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
        <button
          type="button"
          onClick={onEdit}
          className="px-6 py-2.5 rounded-full border-2 border-blue-600 text-blue-600 font-medium text-sm hover:bg-blue-50 transition-colors"
        >
          {hasResume ? "Update resume" : "Upload resume"}
        </button>
        <p className="text-xs text-slate-500 mt-3">
          Supported formats: doc, docx, rtf, pdf — up to 2 MB
        </p>
      </div>
    </div>
  );
};

export default ResumeSection;
