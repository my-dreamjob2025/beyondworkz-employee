import api from "./api";

const isValidDate = (d) => {
  if (!d) return false;
  if (typeof d === "string") return /^\d{4}-\d{2}-\d{2}/.test(d);
  if (d instanceof Date) return !isNaN(d.getTime());
  return false;
};

const sanitizeEducation = (education) => {
  if (!Array.isArray(education)) return education;
  return education.map((edu) => {
    const item = { ...edu };
    if (!isValidDate(item.startDate)) delete item.startDate;
    if (!isValidDate(item.endDate)) delete item.endDate;
    if (item.currentlyStudying) delete item.endDate;
    return item;
  });
};

const sanitizeExperience = (experience) => {
  if (!Array.isArray(experience)) return experience;
  const isValidDate = (d) => {
    if (!d) return false;
    if (typeof d === "string") return /^\d{4}-\d{2}-\d{2}/.test(d) || !isNaN(new Date(d).getTime());
    if (d instanceof Date) return !isNaN(d.getTime());
    return false;
  };
  return experience
    .filter((exp) => exp && typeof exp.jobTitle === "string" && exp.jobTitle.trim() && typeof exp.company === "string" && exp.company.trim() && isValidDate(exp.dateOfJoining))
    .map((exp) => {
      const item = { ...exp };
      if (item.description && item.description.length > 1000) item.description = item.description.slice(0, 1000);
      if (item.current) delete item.relievingDate;
      if (!isValidDate(item.relievingDate)) delete item.relievingDate;
      return item;
    });
};

const sanitizeSkills = (skills) => {
  if (!Array.isArray(skills)) return skills;
  return skills
    .map((s) => (typeof s === "string" ? { name: s.trim() } : s && typeof s.name === "string" ? { name: s.name.trim() } : null))
    .filter((s) => s && s.name);
};

export const profileService = {
  getProfile: async () => {
    const { data } = await api.get("/employee/profile");
    return data;
  },

  updateProfile: async (payload) => {
    const sanitized = { ...payload };
    if (Array.isArray(sanitized.education)) {
      sanitized.education = sanitizeEducation(sanitized.education);
    }
    if (Array.isArray(sanitized.experience)) {
      sanitized.experience = sanitizeExperience(sanitized.experience);
    }
    if (Array.isArray(sanitized.skills)) {
      sanitized.skills = sanitizeSkills(sanitized.skills);
    }
    const { data } = await api.put("/employee/profile", sanitized);
    return data;
  },
};
