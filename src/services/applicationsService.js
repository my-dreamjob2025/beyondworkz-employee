import api from "./api";

/** GET /employee/applications/:applicationId — cover letter + screening for current user */
export async function fetchMyApplicationById(applicationId) {
  const { data } = await api.get(`/employee/applications/${encodeURIComponent(applicationId)}`);
  return data;
}

export const applicationsService = {
  async list() {
    const { data } = await api.get("/employee/applications");
    return data;
  },
};
