import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { profileService } from "../../services/profileService";

const NOTIFICATION_PREFS_KEY = "bw_employee_notification_prefs_v1";

const defaultNotificationPrefs = {
  emailApplicationUpdates: true,
  emailJobRecommendations: true,
  emailMarketing: false,
};

function loadNotificationPrefs() {
  try {
    const raw = localStorage.getItem(NOTIFICATION_PREFS_KEY);
    if (!raw) return { ...defaultNotificationPrefs };
    const parsed = JSON.parse(raw);
    return { ...defaultNotificationPrefs, ...parsed };
  } catch {
    return { ...defaultNotificationPrefs };
  }
}

function saveNotificationPrefs(prefs) {
  try {
    localStorage.setItem(NOTIFICATION_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore quota / private mode */
  }
}

function ToggleRow({ id, label, description, checked, onChange, disabled }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0 border-b border-slate-100 last:border-0">
      <div className="min-w-0">
        <label htmlFor={id} className="text-sm font-medium text-slate-800 cursor-pointer">
          {label}
        </label>
        {description ? <p className="text-xs text-slate-500 mt-1">{description}</p> : null}
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          checked ? "bg-blue-600" : "bg-slate-200"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

const Settings = () => {
  const navigate = useNavigate();
  const { logout, initAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [prefs, setPrefs] = useState(loadNotificationPrefs);
  const [signingOut, setSigningOut] = useState(false);

  const fetchAccount = useCallback(async () => {
    setLoading(true);
    try {
      const res = await profileService.getProfile();
      if (res?.success && res.user) {
        setUser(res.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const updatePref = (key, value) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: value };
      saveNotificationPrefs(next);
      return next;
    });
  };

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    await logout();
    setSigningOut(false);
    navigate("/login", { replace: true });
  };

  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() || "—";
  const email = user?.email || "—";
  const phone = user?.phone?.trim() || "—";

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your account, notifications, and session. Profile details and resume are edited from{" "}
          <Link to="/dashboard/profile" className="text-blue-600 font-medium hover:underline">
            My profile
          </Link>
          .
        </p>
      </div>

      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center rounded-xl border border-slate-200 bg-white">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Account</h2>
              <p className="text-xs text-slate-500 mt-0.5">Sign-in email and contact details from your Beyond Workz account.</p>
            </div>
            <div className="px-5 py-4 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Name</p>
                <p className="text-sm text-slate-900 mt-1">{displayName}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Email</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-slate-900 break-all">{email}</span>
                  {user?.isEmailVerified ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                      Unverified
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Phone</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-slate-900">{phone}</span>
                  {user?.phone && user?.isPhoneVerified ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                      Verified
                    </span>
                  ) : null}
                </div>
              </div>
              <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                You sign in with a one-time code sent to your email. To change your name, phone, or city, go to{" "}
                <Link to="/dashboard/profile" className="text-blue-600 font-medium hover:underline">
                  My profile
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Email notifications</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose what we may email you about. Preferences are stored on this device until server-side notification
                settings are available.
              </p>
            </div>
            <div className="px-5 py-2">
              <ToggleRow
                id="pref-app-updates"
                label="Application updates"
                description="Status changes on jobs you have applied to (shortlisted, interview, outcome)."
                checked={prefs.emailApplicationUpdates}
                onChange={(v) => updatePref("emailApplicationUpdates", v)}
              />
              <ToggleRow
                id="pref-job-rec"
                label="Job recommendations"
                description="Occasional matches based on your profile and activity."
                checked={prefs.emailJobRecommendations}
                onChange={(v) => updatePref("emailJobRecommendations", v)}
              />
              <ToggleRow
                id="pref-marketing"
                label="Product news and tips"
                description="Product updates and career tips from Beyond Workz."
                checked={prefs.emailMarketing}
                onChange={(v) => updatePref("emailMarketing", v)}
              />
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Privacy</h2>
              <p className="text-xs text-slate-500 mt-0.5">Control how your profile appears to employers.</p>
            </div>
            <div className="px-5 py-4 space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                Your profile and resume are shared only when you apply to a job or when an employer unlocks your profile
                according to platform rules. Visibility options will be expanded here as the product evolves.
              </p>
              <Link
                to="/dashboard/profile"
                className="inline-flex text-sm font-medium text-blue-600 hover:underline"
              >
                Edit profile & visibility →
              </Link>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Session</h2>
              <p className="text-xs text-slate-500 mt-0.5">Sign out on this browser.</p>
            </div>
            <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-slate-600">
                You will need your email and a one-time code to sign in again.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => initAuth()}
                  className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Refresh session
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 rounded-lg transition-colors"
                >
                  {signingOut ? "Signing out…" : "Sign out"}
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Settings;
