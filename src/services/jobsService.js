import axios from "axios";
import api from "./api";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

/**
 * Public jobs listing — no auth (CORS must allow employee origin).
 */
export async function fetchPublishedJobs(params = {}) {
  const { data } = await axios.get(`${BASE_URL}/jobs`, {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 20,
      city: params.city || undefined,
      q: params.q || undefined,
      jobType: params.jobType || undefined,
    },
  });
  return data;
}

/**
 * Single published job by id.
 */
export async function fetchPublishedJob(jobId) {
  const { data } = await axios.get(`${BASE_URL}/jobs/${encodeURIComponent(jobId)}`);
  return data;
}

/** Authenticated job seeker — POST /jobs/:jobId/apply */
export async function applyToPublishedJob(jobId, payload = {}) {
  const { data } = await api.post(`/jobs/${encodeURIComponent(jobId)}/apply`, payload);
  return data;
}
