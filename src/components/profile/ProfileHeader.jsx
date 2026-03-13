import useAuth from "../../hooks/useAuth";

const ProfileHeader = ({ user: userProp, resumeUrl, onEditProfile }) => {
  const { user: authUser } = useAuth();
  const user = userProp ?? authUser;

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User";
  const initials = fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const avatarUrl = user?.avatar?.url;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row gap-6">
      {avatarUrl ? (
        <img src={avatarUrl} alt="" className="w-20 h-20 rounded-full object-cover shrink-0" />
      ) : (
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white text-2xl font-bold">{initials}</span>
        </div>
      )}

      <div className="flex-1">
        <h2 className="text-xl font-semibold text-slate-900">{fullName}</h2>
        <p className="text-slate-500 text-sm">{user?.email}</p>

        <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">
          {user?.city && <span>📍 {user.city}</span>}
          {user?.employeeType && (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                user.employeeType === "whitecollar"
                  ? "bg-slate-100 text-slate-600"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {user.employeeType === "whitecollar" ? "⚪ White Collar" : "🔵 Blue Collar"}
            </span>
          )}
          {user?.workStatus && <span>💼 {user.workStatus}</span>}
          {user?.years && user.years !== "00" && (
            <span>⏱ {parseInt(user.years, 10)}y {user.months !== "00" ? `${user.months}m` : ""} exp</span>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={onEditProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Edit Profile
          </button>
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm transition-colors inline-flex items-center"
            >
              Download Resume
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
