import api from "./api";

export const applicationsService = {
  list: async () => {
    const { data } = await api.get("/employee/applications");
    return data;
  },
};
