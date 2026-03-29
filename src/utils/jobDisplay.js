/** Map API job (published listing) to JobCard / dashboard card shape */

export function formatSalaryRange(job) {
  const period =
    job.salaryPeriod === "Per Year" ? "/ year" : job.salaryPeriod === "Per Month" ? "/ month" : "";
  const type = job.salaryType || "";

  if (type === "Commission Based" && !job.minSalary && !job.maxSalary) {
    return "Commission based — details with employer";
  }

  if (!job.minSalary && !job.maxSalary) return "Salary not listed";

  const min = job.minSalary || "—";
  const max = job.maxSalary || "—";

  if (type === "Fixed Salary" && job.minSalary && (!job.maxSalary || String(job.minSalary) === String(job.maxSalary))) {
    return `₹ ${min} ${period}`.trim();
  }

  return `₹ ${min} – ${max} ${period}`.trim();
}

export function formatPostedLabel(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now - d;
    const days = Math.floor(diffMs / 86400000);
    if (days < 0) return "Just posted";
    if (days === 0) return "Posted today";
    if (days === 1) return "Posted yesterday";
    if (days < 7) return `Posted ${days} days ago`;
    if (days < 30) return `Posted ${Math.floor(days / 7)} weeks ago`;
    return `Posted ${d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;
  } catch {
    return "";
  }
}

export function toJobCardModel(job) {
  const location = [job.city, job.area].filter(Boolean).join(", ") || "Location not specified";
  const tags = [job.jobType, ...(Array.isArray(job.skills) ? job.skills.slice(0, 4) : [])].filter(
    Boolean
  );
  return {
    id: job.id,
    title: job.title || "Role",
    company: job.companyName || job.hiringFor || "Company",
    location,
    experience: job.minExperience || job.education || "Experience not specified",
    salary: formatSalaryRange(job),
    tags,
    description: (job.description || "").slice(0, 280),
    posted: formatPostedLabel(job.publishedAt || job.updatedAt),
  };
}

/** Dashboard recommended list */
export function toRecommendedJobModel(apiJob) {
  const base = toJobCardModel(apiJob);
  return {
    ...base,
    skillsRow: Array.isArray(apiJob.skills) ? apiJob.skills.slice(0, 6) : [],
  };
}
