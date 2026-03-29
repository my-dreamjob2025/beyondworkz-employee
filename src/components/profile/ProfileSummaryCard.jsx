import { useState, useRef, useMemo } from "react";
import { avatarService } from "../../services/avatarService";
import { PencilIcon } from "../icons/ActionIcons";

const RING_BLUE = "#2563EB";
const RING_ORANGE = "#F97316";
const RING_TRACK = "#E5E7EB";
const CTA_ORANGE = "#EA580C";

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

  const outerR = 42;
  const innerR = 35;
  const outerCirc = 2 * Math.PI * outerR;
  const innerCirc = 2 * Math.PI * innerR;
  const outerOffset = outerCirc - (pct / 100) * outerCirc;
  const innerOffset = innerCirc - (pct / 100) * innerCirc;

  const profileUpdated = user?.updatedAt
    ? (() => {
        const d = new Date(user.updatedAt);
        const today = new Date();
        if (d.toDateString() === today.toDateString()) return "Today";
        const day = String(d.getDate()).padStart(2, "0");
        const month = d.toLocaleDateString("en", { month: "short" });
        const year = d.getFullYear();
        return `${day} ${month}, ${year}`;
      })()
    : "Today";

  const availabilityText = profile?.availability
    ? profile.availability.replace("-", " ")
    : "Immediate";
  const noticeText = profile?.experience?.[0]?.noticePeriod
    ? `${profile.experience[0].noticePeriod} notice period`
    : `Available - ${availabilityText}`;

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
    const cls = "w-[18px] h-[18px] text-slate-500";
    if (type === "phone")
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    if (type === "document")
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    if (type === "wrench")
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    if (type === "calendar")
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    if (type === "briefcase")
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    );
  };

  const DetailRow = ({ icon, children }) => (
    <p className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
      <span className="text-slate-400 shrink-0 mt-0.5">{icon}</span>
      <span className="min-w-0">{children}</span>
    </p>
  );

  const pinIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
  const phoneIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
  const briefcaseIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  const mailIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  const calendarIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08)] overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        {/* Left: profile */}
        <div className="flex-1 min-w-0 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* Avatar + dual rings */}
            <div className="relative shrink-0 flex justify-center sm:justify-start sm:block">
              <div className="relative w-24 h-24 shrink-0">
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <svg
                  className="absolute inset-0 w-24 h-24 -rotate-90 pointer-events-none"
                  viewBox="0 0 96 96"
                  aria-hidden="true"
                >
                  <circle cx="48" cy="48" r={outerR} fill="none" stroke={RING_TRACK} strokeWidth="3" />
                  <circle
                    cx="48"
                    cy="48"
                    r={outerR}
                    fill="none"
                    stroke={RING_BLUE}
                    strokeWidth="3"
                    strokeDasharray={outerCirc}
                    strokeDashoffset={outerOffset}
                    strokeLinecap="round"
                    className="transition-[stroke-dashoffset] duration-500"
                  />
                  <circle cx="48" cy="48" r={innerR} fill="none" stroke={RING_TRACK} strokeWidth="3" />
                  <circle
                    cx="48"
                    cy="48"
                    r={innerR}
                    fill="none"
                    stroke={RING_ORANGE}
                    strokeWidth="3"
                    strokeDasharray={innerCirc}
                    strokeDashoffset={innerOffset}
                    strokeLinecap="round"
                    className="transition-[stroke-dashoffset] duration-500"
                  />
                </svg>
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={avatarLoading}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4.5rem] h-[4.5rem] rounded-full overflow-hidden bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 group"
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
                      <div
                        className="absolute inset-0 rounded-full bg-blue-600 flex items-center justify-center hidden"
                        aria-hidden="true"
                      >
                        <span className="text-white text-xl font-bold">{initials}</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">{initials}</span>
                    </div>
                  )}
                  <span className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {avatarLoading ? (
                      <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </span>
                </button>
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 z-10 min-w-[2.75rem] rounded-full px-2 py-0.5 text-center text-xs font-bold shadow-md border whitespace-nowrap ${
                    isComplete
                      ? "bg-emerald-500 text-white border-emerald-600"
                      : "bg-white text-slate-800 border-slate-200/80"
                  }`}
                  aria-label={`Profile ${pct}% complete`}
                >
                  {pct}%
                </span>
                {avatarError && (
                  <p className="absolute left-0 right-0 top-full mt-2 text-xs text-red-600 text-center w-24 mx-auto">
                    {avatarError}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {fullName.toLowerCase()}
                </h2>
                <button
                  type="button"
                  onClick={onEditProfile}
                  className="text-blue-500 hover:text-blue-600 p-1 rounded-lg hover:bg-blue-50 transition-colors"
                  aria-label="Edit profile"
                >
                  <PencilIcon className="w-[18px] h-[18px]" />
                </button>
              </div>

              <p className="text-sm text-slate-500 mt-1">Profile last updated - {profileUpdated}</p>

              {/* Two-column detail grid (reference layout) */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-x-10 md:divide-x md:divide-slate-200">
                <div className="space-y-2.5 md:pr-8">
                  {user?.city && (
                    <DetailRow icon={pinIcon}>
                      {user.city}, INDIA
                    </DetailRow>
                  )}
                  <DetailRow icon={briefcaseIcon}>{user?.workStatus || "—"}</DetailRow>
                  <DetailRow icon={calendarIcon}>
                    <span className="truncate block">{noticeText}</span>
                  </DetailRow>
                </div>
                <div className="space-y-2.5 mt-3 md:mt-0 md:pl-8 pt-3 md:pt-0 border-t border-slate-200 md:border-t-0">
                  {user?.phone && (
                    <DetailRow icon={phoneIcon}>
                      <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span>{user.phone}</span>
                        {user?.isPhoneVerified ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                            ✓
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            onClick={onEditProfile}
                          >
                            Verify
                          </button>
                        )}
                      </span>
                    </DetailRow>
                  )}
                  {user?.email && (
                    <DetailRow icon={mailIcon}>
                      <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 min-w-0">
                        <span className="truncate">{user.email}</span>
                        {user?.isEmailVerified && (
                          <span
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
                            aria-label="Verified"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                        {!user?.isEmailVerified && (
                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium shrink-0"
                            onClick={onEditProfile}
                          >
                            Verify
                          </button>
                        )}
                      </span>
                    </DetailRow>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: completion tasks */}
        {missingDetails.length > 0 && (
          <div
            className="lg:w-[min(100%,340px)] lg:max-w-[34%] border-t lg:border-t-0 lg:border-l border-slate-200/80 p-6 sm:p-8 flex flex-col justify-center"
            style={{ background: "linear-gradient(180deg, #FFF9F4 0%, #FFF3E8 100%)" }}
          >
            <ul className="space-y-4">
              {missingDetails.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100/80">
                    <MissingIcon type={item.icon} />
                  </span>
                  <span className="flex-1 text-sm font-medium text-slate-700 leading-snug">{item.label}</span>
                  <span className="text-green-600 text-sm font-semibold tabular-nums flex items-center gap-0.5 shrink-0">
                    <span className="text-base leading-none" aria-hidden="true">
                      ↑
                    </span>
                    {item.percent}%
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onAddMissing(missingDetails[0]?.tab || "basic")}
              className="mt-6 w-full py-3 px-4 text-white font-semibold text-sm rounded-full shadow-md hover:brightness-105 active:brightness-95 transition-all"
              style={{ backgroundColor: CTA_ORANGE }}
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
