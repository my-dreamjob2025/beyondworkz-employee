import { useMemo } from "react";

const ProfileSummaryCard = ({ user, profile, onEditProfile, onAddMissing }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User Name";
  const initials = fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const avatarUrl = user?.avatar?.url;
  const pct = Math.min(100, Math.max(0, Number(user?.profileCompletion) || 0));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const profileUpdated = user?.updatedAt
    ? (() => {
        const d = new Date(user.updatedAt);
        const today = new Date();
        if (d.toDateString() === today.toDateString()) return "Today";
        return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      })()
    : "Today";

  const availabilityText = profile?.availability
    ? profile.availability.replace("-", " ")
    : "Immediate";
  const noticeText = profile?.experience?.[0]?.noticePeriod
    ? `Available to join in ${profile.experience[0].noticePeriod}`
    : `Available - ${availabilityText}`;

  const missingDetails = useMemo(() => {
    const items = [];
    if (!user?.phone) items.push({ label: "Verify mobile number", percent: 10 });
    else if (!user?.isPhoneVerified) items.push({ label: "Verify mobile number", percent: 10 });
    if (!profile?.whiteCollarDetails?.resume?.url) items.push({ label: "Add resume", percent: 10 });
    const wc = profile?.whiteCollarDetails || {};
    if (!wc.bio && (!wc.projects || wc.projects.length === 0))
      items.push({ label: "Add project summary", percent: 8 });
    return items.slice(0, 5);
  }, [user, profile]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* User Card - Left */}
        <div className="flex-1 p-6 flex gap-6">
          <div className="relative shrink-0 pb-6">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{initials}</span>
              </div>
            )}
            <svg
              className="absolute inset-0 w-24 h-24 -rotate-90"
              viewBox="0 0 96 96"
            >
              <circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="4"
              />
              <circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                stroke="#F97316"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <span
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 min-w-[2.5rem] rounded-full bg-white px-2.5 py-1 text-center text-sm font-bold text-slate-800 shadow-lg ring-1 ring-slate-200 whitespace-nowrap"
              aria-label={`Profile ${pct}% complete`}
            >
              {pct}%
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{fullName}</h2>
              <button
                type="button"
                onClick={onEditProfile}
                className="text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Edit name"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              Profile last updated - {profileUpdated}
            </p>

            <div className="mt-3 space-y-1 text-sm text-slate-600">
              {user?.city && (
                <p className="flex items-center gap-2">
                  <span className="text-slate-400">📍</span>
                  {user.city}, INDIA
                </p>
              )}
              {user?.workStatus && (
                <p className="flex items-center gap-2">
                  <span className="text-slate-400">💼</span>
                  {user.workStatus}
                </p>
              )}
              <p className="flex items-center gap-2">
                <span className="text-slate-400">📅</span>
                {noticeText}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {user?.phone && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📞</span>
                  <span>{user.phone}</span>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline text-xs"
                    onClick={onEditProfile}
                  >
                    Verify
                  </button>
                </div>
              )}
              {user?.email && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">✉️</span>
                  <span className="truncate max-w-[180px]">{user.email}</span>
                  {user?.isEmailVerified ? (
                    <span className="text-green-500 text-xs">✓ Verified</span>
                  ) : (
                    <button
                      type="button"
                      className="text-blue-600 hover:underline text-xs"
                      onClick={onEditProfile}
                    >
                      Verify
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Completion Panel - Right */}
        {missingDetails.length > 0 && (
          <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-slate-200 bg-orange-50/80 p-6">
            <h3 className="font-semibold text-slate-800">
              Add {missingDetails.length} missing details
            </h3>
            <ul className="mt-3 space-y-2">
              {missingDetails.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-slate-400">📄</span>
                  <span>{item.label}</span>
                  <span className="text-green-600 text-xs font-medium">(↑{item.percent}%)</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onAddMissing}
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
