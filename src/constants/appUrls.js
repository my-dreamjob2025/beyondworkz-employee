/** Employer (recruiter) web app — used for footer / nav links. Override with VITE_EMPLOYER_APP_URL in .env */
export const EMPLOYER_APP_ORIGIN = (
  import.meta.env.VITE_EMPLOYER_APP_URL || "http://localhost:5175"
).replace(/\/$/, "");

export const employerUrls = {
  dashboard: `${EMPLOYER_APP_ORIGIN}/dashboard`,
  postJob: `${EMPLOYER_APP_ORIGIN}/dashboard/jobs/new`,
  browseCandidates: `${EMPLOYER_APP_ORIGIN}/dashboard/candidates`,
  pricing: `${EMPLOYER_APP_ORIGIN}/dashboard/credits`,
  register: `${EMPLOYER_APP_ORIGIN}/register`,
  login: `${EMPLOYER_APP_ORIGIN}/login`,
};
