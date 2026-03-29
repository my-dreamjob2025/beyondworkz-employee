/** Maps backend status to ProgressTracker step index (0–4). */
export function progressStepForStatus(status) {
  switch (status) {
    case "submitted":
      return 0;
    case "shortlisted":
      return 2;
    case "interview_scheduled":
      return 3;
    case "hired":
      return 4;
    default:
      return 0;
  }
}

export function statusBadgeClasses(status) {
  switch (status) {
    case "shortlisted":
      return "border border-blue-500 text-blue-600";
    case "interview_scheduled":
      return "border border-orange-500 text-orange-600";
    case "hired":
      return "border border-green-600 text-green-700";
    case "rejected":
      return "border border-slate-400 text-slate-600";
    default:
      return "border border-slate-300 text-slate-600";
  }
}

export function formatAppliedAt(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function jobLocationLine(job) {
  if (!job) return "";
  const parts = [job.city, job.area].filter((p) => p && String(p).trim());
  return parts.join(", ");
}
