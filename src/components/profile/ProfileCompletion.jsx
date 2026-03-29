import { Link } from "react-router-dom";

const ProfileCompletion = ({ profileCompletion = 0 }) => {
  const pct = Math.min(100, Math.max(0, Number(profileCompletion) || 0));
  const circumference = 2 * Math.PI * 64;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
      {/* Progress Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full rotate-[-90deg]">
            <circle cx="72" cy="72" r="64" stroke="#E5E7EB" strokeWidth="8" fill="none" />
            <circle
              cx="72"
              cy="72"
              r="64"
              stroke="#2F64D6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-slate-900">{pct}%</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-900">Profile Completion</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
        Complete your profile to increase your chances of getting hired.
      </p>

      {/* Button */}
      <Link
        to="/complete-profile"
        className="mt-8 block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition text-center"
      >
        Complete Profile
      </Link>
    </div>
  );
};

export default ProfileCompletion;
