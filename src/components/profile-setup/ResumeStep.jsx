import { useState, useRef } from "react";
import { resumeService } from "../../services/resumeService";
import { getResumeDisplayName } from "../../utils/resume";

const ResumeStep = ({ data, onChange, onSaved }) => {
  const resume = data.whiteCollarDetails?.resume;
  const resumeUrl = resume?.url;
  const fileName = resume ? getResumeDisplayName(resume) : null;
  const uploadedAt = resume?.uploadedAt
    ? new Date(resume.uploadedAt).toLocaleDateString()
    : null;

  const [actionLoading, setActionLoading] = useState(null); // "upload" | "view" | "delete"
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const loading = !!actionLoading;

  const handleFileSelect = async (file) => {
    if (!file) return;
    setError("");
    setActionLoading("upload");
    try {
      const result = await resumeService.uploadResume(file);
      if (result?.data && onChange) {
        const wc = data.whiteCollarDetails || {};
        onChange("whiteCollarDetails", { ...wc, resume: result.data });
      }
      onSaved?.();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Upload failed. Please try again.");
    } finally {
      setActionLoading(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") handleFileSelect(file);
    else setError("Only PDF files are allowed.");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your resume?")) return;
    setError("");
    setActionLoading("delete");
    try {
      await resumeService.deleteResume();
      if (onChange) {
        const wc = { ...data.whiteCollarDetails };
        delete wc.resume;
        onChange("whiteCollarDetails", wc);
      }
      onSaved?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete resume.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleView = async () => {
    if (!resumeUrl) return;
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

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Resume</h2>
        <p className="text-sm text-slate-500 mt-1">
          Your resume helps employers understand your experience.
        </p>
      </div>

      {resumeUrl ? (
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
      ) : null}

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Upload / Update area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
          dragOver ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50"
        } ${loading ? "opacity-60 pointer-events-none" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {actionLoading === "upload" ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-700">Uploading resume...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="px-6 py-2.5 rounded-full border-2 border-blue-600 text-blue-600 font-medium text-sm">
              {resumeUrl ? "Update resume" : "Upload resume"}
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Supported formats: doc, docx, rtf, pdf — up to 2 MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeStep;
