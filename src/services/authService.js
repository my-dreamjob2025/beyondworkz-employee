import api from "./api";

export const authService = {
  /**
   * Employee Registration
   * Sends registration details + triggers OTP email
   */
  registerEmployee: async ({ firstName, lastName, email, employeeType = "whitecollar" }) => {
    const { data } = await api.post("/auth/employee/register", {
      firstName,
      lastName,
      email,
      employeeType,
    });
    return data;
  },

  /**
   * Employee Login
   * Sends OTP to the registered email
   */
  sendLoginOtp: async (email) => {
    const { data } = await api.post("/auth/employee/login", { email });
    return data;
  },

  /**
   * Verify OTP (used for both registration and login)
   * Returns { accessToken, user }
   */
  verifyEmployeeOtp: async (email, otp) => {
    const { data } = await api.post("/auth/employee/verify-otp", { email, otp });
    return data;
  },

  /**
   * Resend OTP
   */
  resendOtp: async (email) => {
    const { data } = await api.post("/auth/resend-otp", { email });
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
    const { data } = await api.post("/auth/employer/verify-otp", { email, otp });
    return data;
  },

  /**
   * Logout — clears server session and cookies
   */
  logout: async (panel = "employee") => {
    const { data } = await api.post("/auth/logout", { panel });
    return data;
  },

  /**
   * Silent token refresh
   */
  refreshToken: async (panel = "employee") => {
    const { data } = await api.post("/auth/refresh", { panel });
    return data;
  },
};
