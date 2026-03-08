import checkIcon from "../../assets/common-icon/right-icon.svg";
import plusIcon from "../../assets/common-icon/plus-icon.svg";

const ProfileCompletion = () => {
  const completed = ["Basic Information", "Work Experience", "Resume Upload"];

  const pending = ["Portfolio Links", "Certifications"];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
      {/* Progress Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full rotate-[-90deg]">
            {/* Background */}
            <circle
              cx="72"
              cy="72"
              r="64"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />

            {/* Progress */}
            <circle
              cx="72"
              cy="72"
              r="64"
              stroke="#2F64D6"
              strokeWidth="8"
              fill="none"
              strokeDasharray="402"
              strokeDashoffset="100"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-slate-900">75%</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-900">
        Profile Completion
      </h3>

      <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
        Complete your profile to increase your chances of getting hired.
      </p>

      {/* List */}
      <div className="mt-6 space-y-4 text-left">
        {completed.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600">
              <img src={checkIcon} alt="check" className="w-3 h-3" />
            </div>

            <span className="text-sm text-slate-800 font-medium">{item}</span>
          </div>
        ))}

        {pending.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-300">
              <img src={plusIcon} alt="plus" className="w-3 h-3 opacity-70" />
            </div>

            <span className="text-sm text-slate-600 font-medium">{item}</span>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
        Complete Profile
      </button>
    </div>
  );
};

export default ProfileCompletion;
