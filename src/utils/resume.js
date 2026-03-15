/**
 * Get a short display name for a resume from its key or URL.
 * Handles S3 paths like employee/{userId}/resumes/{timestamp}_{hex}_{filename}.pdf
 */
export function getResumeDisplayName(resume) {
  if (!resume) return "Resume.pdf";
  let pathPart = "";
  if (resume.key) {
    pathPart = resume.key.split("/").pop() || "";
  } else if (resume.url) {
    const lastSegment = resume.url.split("/").pop() || "";
    try {
      const decoded = decodeURIComponent(lastSegment);
      pathPart = decoded.split("/").pop() || decoded;
    } catch {
      pathPart = lastSegment;
    }
  }
  // Remove timestamp_hex_ prefix (e.g. 1773520860454_327e61b7ff31_)
  const fileName = pathPart.replace(/^\d+_[a-f0-9]+_/, "") || "Resume.pdf";
  return fileName || "Resume.pdf";
}
