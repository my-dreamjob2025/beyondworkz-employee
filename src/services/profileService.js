import api from "./api";

export const profileService = {
  getProfile: async () => {
    const { data } = await api.get("/employee/profile");
    return data;
  },

  updateProfile: async (payload) => {
    const { data } = await api.put("/employee/profile", payload);
    return data;
  },
};
