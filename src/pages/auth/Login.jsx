import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { authService } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import AuthLeftPanel from "../../components/auth/AuthLeftPanel";
import { BrandWordmark } from "../../components/brand/BrandMark";
import brandLogo from "../../assets/logos/beyond-workz-logo.png";
import GoogleIcon from "../../assets/icons/common-icon/google-icon.svg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || searchParams.get("from") || "/dashboard";

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const urlError = searchParams.get("error");
  const displayError = error || (step === "email" && urlError ? decodeURIComponent(urlError) : "");

  const handleGoogleLogin = () => {
    window.location.href = authService.getGoogleLoginUrl(from);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.sendLoginOtp(email);
      setStep("otp");
      startResendCooldown(30);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to send OTP. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
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
      const data = await authService.verifyEmployeeOtp(email, otpString);
      login(data.accessToken, data.refreshToken ?? null, data.user);
      // Redirect to profile completion if profile is significantly incomplete
      const isIncomplete =
        !data.user?.profileCompletion || data.user.profileCompletion < 40;
      const destination = isIncomplete ? "/complete-profile" : from;
      navigate(destination, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "OTP verification failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    setError("");
    try {
      await authService.resendOtp(email);
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
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
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
    document.getElementById(`otp-input-${nextIndex}`)?.focus();
  };

  return (
    <div className="min-h-screen flex w-full">
      <AuthLeftPanel />

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex-shrink-0 flex items-center justify-center p-4 sm:p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <img
                src={brandLogo}
                alt=""
                className="h-16 w-auto max-w-[140px] object-contain sm:h-20 sm:max-w-[160px]"
              />
              <BrandWordmark variant="auth" className="text-center sm:text-left" />
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Log in to</p>
            <h1 className="text-3xl font-bold text-slate-900">Your account</h1>
          </div>

          {/* Email Step */}
          {step === "email" && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                  required
                />
              </div>

              {displayError && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-red-700">{displayError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                style={{ backgroundColor: "#1447E6" }}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Send OTP
                  </>
                )}
              </button>

              <p className="text-center text-sm text-slate-600">
                New to Beyond Workz?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Register
                </button>
              </p>

              <div className="flex items-center gap-4 my-2">
                <div className="flex-1 h-px bg-slate-300"></div>
                <span className="text-sm text-slate-500">OR</span>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 px-6 flex items-center justify-center gap-2 border border-slate-300 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>

              <p className="text-center text-xs text-slate-500">
                Your data is encrypted and used only to match you with relevant
                job opportunities.
              </p>
            </form>
          )}

          {/* OTP Step */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Enter OTP
                </label>
                <p className="text-sm text-slate-600 mb-4">
                  We sent a 6-digit code to <strong>{email}</strong>
                </p>

                <div className="flex gap-2 justify-center mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
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
                    className="text-sm hover:underline disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed"
                    style={{ color: "#1447E6" }}
                  >
                    {resendCooldown > 0
                      ? `Resend OTP in ${resendCooldown}s`
                      : "Resend OTP"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
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
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Verify & Login
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtp(["", "", "", "", "", ""]);
                    setError("");
                  }}
                  className="w-full py-3 px-6 text-slate-600 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Change Email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
