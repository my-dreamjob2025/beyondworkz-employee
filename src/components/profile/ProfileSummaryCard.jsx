import { useState, useRef, useMemo } from "react";
import { avatarService } from "../../services/avatarService";

const ProfileSummaryCard = ({ user, profile, onEditProfile, onAddMissing, onAvatarUpdated }) => {
  const isWhiteCollar = user?.employeeType === "whitecollar";
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const avatarInputRef = useRef(null);
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User Name";
  const initials = fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const avatarUrl = user?.avatar?.url;
  const pct = Math.min(100, Math.max(0, Number(user?.profileCompletion) || 0));
  const isComplete = pct >= 100;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const profileUpdated = user?.updatedAt
    ? (() => {
        const d = new Date(user.updatedAt);
        const today = new Date();
        if (d.toDateString() === today.toDateString()) return "Today";
        const day = String(d.getDate()).padStart(2, "0");
        const month = d.toLocaleDateString("en", { month: "short" });
        const year = d.getFullYear();
        return `${day}${month}, ${year}`;
      })()
    : "Today";

  const availabilityText = profile?.availability
    ? profile.availability.replace("-", " ")
    : "Immediate";
  const noticeText = profile?.experience?.[0]?.noticePeriod
    ? `${profile.experience[0].noticePeriod} notice period`
    : `Available - ${availabilityText}`;

  const latestExp = profile?.experience?.[0];
  const designation = latestExp?.jobTitle || "";
  const company = latestExp?.company ? `at ${latestExp.company}` : "";
  const years = parseInt(user?.years || "0", 10);
  const months = parseInt(user?.months || "0", 10);
  const expText = years > 0 || months > 0
    ? `${years > 0 ? `${years} Year${years > 1 ? "s" : ""} ` : ""}${months > 0 ? `${months} Month${months > 1 ? "s" : ""}` : ""}`.trim()
    : "Fresher";

  const missingDetails = useMemo(() => {
    const items = [];
    if (user?.phone && !user?.isPhoneVerified) {
      items.push({ label: "Verify mobile number", percent: 10, icon: "phone", tab: "basic" });
    } else if (!user?.phone) {
      items.push({ label: "Add mobile number", percent: 10, icon: "phone", tab: "basic" });
    }
    if (isWhiteCollar) {
      if (!profile?.whiteCollarDetails?.resume?.url && !profile?.whiteCollarDetails?.resume?.key) {
        items.push({ label: "Add resume", percent: 10, icon: "document", tab: "resume" });
      }
      const wc = profile?.whiteCollarDetails || {};
      if (!wc.bio && (!wc.projects || wc.projects.length === 0) && !wc.resumeHeadline) {
        items.push({ label: "Add project summary", percent: 8, icon: "list", tab: "professional" });
      }
    } else {
      const bc = profile?.blueCollarDetails || {};
      const hasWorkPrefs =
        bc.hasVehicleWashingExperience !== undefined ||
        bc.hasDrivingLicense !== undefined ||
        bc.hasBikeOrScooty !== undefined ||
        (bc.preferredAreas?.length ?? 0) > 0;
      if (!hasWorkPrefs) {
        items.push({ label: "Add work preferences", percent: 10, icon: "wrench", tab: "workprefs" });
      }
      if (!profile?.availability) {
        items.push({ label: "Add availability", percent: 8, icon: "calendar", tab: "basic" });
      }
      if (!profile?.experience?.length) {
        items.push({ label: "Add work history", percent: 8, icon: "briefcase", tab: "experience" });
      }
    }
    return items.slice(0, 5);
  }, [user, profile, isWhiteCollar]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarError("");
    setAvatarLoading(true);
    try {
      await avatarService.uploadAvatar(file);
      await onAvatarUpdated?.();
    } catch (err) {
      setAvatarError(err.response?.data?.message || err.message || "Failed to update photo.");
    } finally {
      setAvatarLoading(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  const MissingIcon = ({ type }) => {
    if (type === "phone")
      return (
        <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    if (type === "document")
      return (
        <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    if (type === "wrench")
      return (
        <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    if (type === "calendar")
      return (
        <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    return (
      <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* User Card - Left */}
        <div className="flex-1 p-6 flex gap-6">
          <div className="relative shrink-0 pb-6 group">
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              disabled={avatarLoading}
              className="block relative w-24 h-24 rounded-full overflow-hidden bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
            >
              {avatarUrl ? (
                <>
                  <img
                    key={avatarUrl}
                    src={avatarUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="absolute inset-0 w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center hidden" aria-hidden="true">
                    <span className="text-white text-2xl font-bold">{initials}</span>
                  </div>
                </>
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{initials}</span>
                </div>
              )}
              <span className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {avatarLoading ? (
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7" />
                  </svg>
                )}
              </span>
            </button>
            <svg className="absolute inset-0 w-24 h-24 -rotate-90" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="42" fill="none" stroke="#E5E7EB" strokeWidth="4" />
              <circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                stroke={isComplete ? "#22C55E" : "#F97316"}
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 z-10 min-w-[2.5rem] rounded-full px-2.5 py-1 text-center text-sm font-bold shadow-lg ring-1 ring-slate-200 whitespace-nowrap ${
                isComplete ? "bg-green-500 text-white ring-green-500" : "bg-white text-slate-800 ring-slate-200"
              }`}
              aria-label={`Profile ${pct}% complete`}
            >
              {pct}%
            </span>
            {avatarError && (
              <p className="absolute left-0 right-0 top-full mt-1 text-xs text-red-600 text-center w-24">{avatarError}</p>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{fullName}</h2>
              <button
                type="button"
                onClick={onEditProfile}
                className="text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Edit profile"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>

            {isComplete && designation && (
              <p className="text-slate-800 mt-0.5">{designation}</p>
            )}
            {isComplete && company && (
              <p className="text-sm text-slate-600">{company}</p>
            )}

            <p className="text-sm text-slate-500 mt-0.5">
              Profile last updated - {profileUpdated}
            </p>

            <div className={`mt-3 text-sm text-slate-600 ${isComplete ? "grid grid-cols-2 gap-x-8 gap-y-1" : "space-y-1"}`}>
              {user?.city && (
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {user.city}, INDIA
                </p>
              )}
              {user?.phone && (
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {user.phone}
                  {user?.isPhoneVerified ? <span className="text-green-500">✓</span> : (
                    <button type="button" className="text-blue-600 hover:underline text-xs" onClick={onEditProfile}>Verify</button>
                  )}
                </p>
              )}
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {isComplete ? expText : (user?.workStatus || "—")}
              </p>
              {user?.email && (
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate max-w-[160px]">{user.email}</span>
                  {user?.isEmailVerified ? <span className="text-green-500 shrink-0">✓</span> : (
                    <button type="button" className="text-blue-600 hover:underline text-xs shrink-0" onClick={onEditProfile}>Verify</button>
                  )}
                </p>
              )}
              {isComplete && isWhiteCollar && (
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {(() => {
                    const ctc = profile?.experience?.[0]?.currentCTC;
                    return ctc != null ? ctc.toLocaleString("en-IN") : "—";
                  })()}
                </p>
              )}
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {noticeText}
              </p>
            </div>
          </div>
        </div>

        {/* Completion Panel - Right (only when pending) */}
        {missingDetails.length > 0 && (
          <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-slate-200 bg-orange-50/80 p-6">
            <ul className="space-y-3">
              {missingDetails.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                  <MissingIcon type={item.icon} />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-green-600 text-xs font-medium flex items-center gap-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {item.percent}%
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onAddMissing(missingDetails[0]?.tab || "basic")}
              className="mt-4 w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg text-sm transition-colors"
            >
              Add {missingDetails.length} missing details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSummaryCard;
