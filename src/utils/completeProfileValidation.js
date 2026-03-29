const trim = (s) => (typeof s === "string" ? s.trim() : "");

const WORK_STATUSES = ["Fresher", "Experienced"];
const AVAILABILITY = ["full-time", "part-time", "weekends"];

function phoneError(phone) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (digits.length < 10) {
    return "Enter a valid phone number with at least 10 digits.";
  }
  return null;
}

/**
 * Returns an error message string if the step cannot be submitted, or null if valid.
 * Keep rules aligned with UI labels marked * in each step.
 */
export function getProfileStepError(stepId, { employeeType, formData }) {
  switch (stepId) {
    case "employeeType":
      if (!formData.employeeType) return "Please select a job type to continue.";
      return null;

    case "basic": {
      if (!trim(formData.firstName)) return "First name is required.";
      const pe = phoneError(formData.phone);
      if (pe) return pe;
      if (!trim(formData.city)) return "City is required.";
      if (!WORK_STATUSES.includes(formData.workStatus)) {
        return "Please select your work status (Fresher or Experienced).";
      }
      if (employeeType === "bluecollar" && !AVAILABILITY.includes(formData.availability)) {
        return "Please select your availability (full-time, part-time, or weekends).";
      }
      return null;
    }

    case "professional":
      return null;

    case "experience": {
      if (formData.workStatus === "Experienced") {
        const list = formData.experience || [];
        if (list.length === 0) {
          return "Add at least one job to your experience, or set work status to Fresher in Basic Info.";
        }
      }
      return null;
    }

    case "skills":
      return null;

    case "workprefs": {
      if (!AVAILABILITY.includes(formData.availability)) {
        return "Please select your availability.";
      }
      return null;
    }

    case "education":
      return null;

    default:
      return null;
  }
}
