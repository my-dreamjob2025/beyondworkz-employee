import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import AuthLeftPanel from "../../components/auth/AuthLeftPanel";
import GoogleIcon from "../../assets/icons/common-icon/google-icon.svg";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const [step, setStep] = useState("details");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeType: "whitecollar",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGoogleRegister = () => {
    window.location.href = authService.getGoogleRegisterUrl(formData.employeeType);
  };

  const handleSendDetailsAndOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.registerEmployee(formData);
      setStep("otp");
      startResendCooldown(30);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTPAndRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const data = await authService.verifyEmployeeOtp(formData.email, otpString);
      login(data.accessToken, data.refreshToken ?? null, data.user);
      // New users always go through profile completion
      navigate("/complete-profile", { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "OTP verification failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    setError("");
    try {
      await authService.resendOtp(formData.email, "signup");
      startResendCooldown(30);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to resend OTP.";
      const waitSec = err.response?.data?.waitSeconds;
      if (waitSec) startResendCooldown(waitSec);
      setError(msg);
    }
  };

  const cooldownRef = useRef(null);

  const startResendCooldown = (seconds) => {
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    setResendCooldown(seconds);
    cooldownRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownRef.current) clearInterval(cooldownRef.current);
          cooldownRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => {
    if (cooldownRef.current) clearInterval(cooldownRef.current);
  }, []);

  const handleOTPChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`register-otp-input-${index + 1}`)?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`register-otp-input-${index - 1}`)?.focus();
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData?.getData("text") || "").replace(/\D/g, "");
    if (pasted.length === 0) return;
    const digits = pasted.slice(0, 6).split("");
    const newOtp = [...otp];
    digits.forEach((d, i) => {
      newOtp[i] = d;
    });
    setOtp(newOtp);
    const nextIndex = Math.min(digits.length, 5);
    document.getElementById(`register-otp-input-${nextIndex}`)?.focus();
  };

  return (
    <div className="min-h-screen flex w-full">
      <AuthLeftPanel />

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex-shrink-0 flex items-center justify-center p-4 sm:p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Create Account
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Beyond Workz</h1>
          </div>

          {/* Details Step */}
          {step === "details" && (
            <form onSubmit={handleSendDetailsAndOTP} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  I am looking for
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      formData.employeeType === "whitecollar"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="employeeType"
                      value="whitecollar"
                      checked={formData.employeeType === "whitecollar"}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">White Collar</p>
                      <p className="text-xs text-slate-500">Office / Professional</p>
                    </div>
                  </label>
                  <label
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      formData.employeeType === "bluecollar"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="employeeType"
                      value="bluecollar"
                      checked={formData.employeeType === "bluecollar"}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Blue Collar</p>
                      <p className="text-xs text-slate-500">Skilled / Trade Work</p>
                    </div>
                  </label>
                </div>
              </div>

              {(error || searchParams.get("error")) && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-sm text-red-700">
                    {error || decodeURIComponent(searchParams.get("error") || "")}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4 my-2">
                <div className="flex-1 h-px bg-slate-300"></div>
                <span className="text-sm text-slate-500">OR</span>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleRegister}
                className="w-full py-3 px-6 flex items-center justify-center gap-2 border border-slate-300 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>

              <button
                type="submit"
                disabled={loading || !formData.firstName.trim() || !formData.email.trim()}
                className="w-full py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                style={{ backgroundColor: "#1447E6" }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Continue with OTP
                  </>
                )}
              </button>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-semibold hover:underline"
              style={{ color: "#1447E6" }}
                >
                  Login
                </button>
              </p>
            </form>
          )}

          {/* OTP Step */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOTPAndRegister} className="space-y-6">
              <div>
                <p className="text-sm text-slate-600 mb-4">
                  We sent a 6-digit code to <strong>{formData.email}</strong>
                </p>
                <label className="block text-sm font-medium text-slate-700 mb-4">
                  Enter OTP
                </label>

                <div className="flex gap-2 justify-center mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`register-otp-input-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      onPaste={handleOTPPaste}
                      className="w-12 h-12 text-center text-2xl font-semibold border-2 border-slate-300 rounded-lg focus:outline-none focus:border-[#1447E6] focus:ring-2 focus:ring-[#1447E6]"
                      placeholder="0"
                    />
                  ))}
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resendCooldown > 0}
                    className="text-sm text-blue-600 hover:underline disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed"
                  >
                    {resendCooldown > 0
                      ? `Resend OTP in ${resendCooldown}s`
                      : "Resend OTP"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading || otp.join("").length !== 6}
                  className="w-full py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                  style={{ backgroundColor: "#1447E6" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Registering...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Create Account
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("details");
                    setError("");
                    setOtp(["", "", "", "", "", ""]);
                  }}
                  className="w-full py-3 px-6 text-slate-600 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Change Details
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500 mb-4">
              By continuing, you agree to our{" "}
              <a href="#" className="text-slate-600 hover:text-slate-900 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-slate-600 hover:text-slate-900 underline">
                Privacy Policy
              </a>
            </p>
            <p className="text-xs text-slate-500">🔒 Your data is encrypted and secured</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
