import api from "./api";

const getGoogleAuthUrl = (params = {}) => {
  const base = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
  const url = new URL(`${base.replace(/\/$/, "")}/auth/google`);
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== "") url.searchParams.set(k, v);
  });
  return url.toString();
};

export const authService = {
  getGoogleLoginUrl: (from = "/dashboard") =>
    getGoogleAuthUrl({ intent: "login", from }),
  getGoogleRegisterUrl: (employeeType = "whitecollar") =>
    getGoogleAuthUrl({ intent: "register", employeeType }),

  /**
   * Employee Registration
   */
  registerEmployee: async ({
    firstName,
    lastName,
    email,
    employeeType = "whitecollar",
  }) => {
    const { data } = await api.post("/auth/employee/register", {
      firstName,
      lastName,
      email,
      employeeType,
    });
    return data;
  },

  /**
   * Employee Login - sends OTP
   */
  sendLoginOtp: async (email) => {
    const { data } = await api.post("/auth/employee/login", { email });
    return data;
  },

  /**
   * Verify OTP - returns { accessToken, refreshToken, user }
   */
  verifyEmployeeOtp: async (email, otp) => {
    const { data } = await api.post("/auth/employee/verify-otp", {
      email,
      otp,
    });
    return data;
  },

  /**
   * Resend OTP
   * @param {string} email
   * @param {string} [type] - "login" | "signup" (default: "login")
   */
  resendOtp: async (email, type = "login") => {
    const { data } = await api.post("/auth/resend-otp", { email, type });
    return data;
  },

  /**
   * Employer Registration
   */
  registerEmployer: async ({ email, agreeTerms, agreeWhatsapp = false }) => {
    const { data } = await api.post("/auth/employer/register", {
      email,
      agreeTerms,
      agreeWhatsapp,
    });
    return data;
  },

  /**
   * Employer Login OTP
   */
  sendEmployerLoginOtp: async (email) => {
    const { data } = await api.post("/auth/employer/login", { email });
    return data;
  },

  /**
   * Verify Employer OTP
   */
  verifyEmployerOtp: async (email, otp) => {
    const { data } = await api.post("/auth/employer/verify-otp", {
      email,
      otp,
    });
    return data;
  },
};
