import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userStr = searchParams.get("user");
    const from = searchParams.get("from");
    const error = searchParams.get("error");

    if (error) {
      navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
      return;
    }

    if (!accessToken || !refreshToken) {
      navigate("/login?error=missing_tokens", { replace: true });
      return;
    }

    let user = null;
    try {
      user = userStr ? JSON.parse(userStr) : null;
    } catch {
      user = null;
    }

    dispatch(login({ accessToken, refreshToken, user }));

    const needsProfileComplete = !user?.employeeType || !user?.profileCompletion || user.profileCompletion < 40;
    const destination = needsProfileComplete
      ? "/complete-profile"
      : (from && from.startsWith("/") ? from : "/dashboard");
    navigate(destination, { replace: true });
  }, [searchParams, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600">Signing you in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
