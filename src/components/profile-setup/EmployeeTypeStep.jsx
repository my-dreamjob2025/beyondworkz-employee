import React from "react";

const BriefcaseSvg = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>
);

const WrenchSvg = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l11.43-11.43A2.548 2.548 0 0118 8.035c-.192.26-.36.544-.508.848m-9.41 9.41l-3.172-3.172a2.25 2.25 0 010-3.182l2.676-2.676a2.25 2.25 0 013.182 0l3.172 3.172m0 0l2.586 2.586M12 21h.008" />
  </svg>
);

const CheckSvg = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const EmployeeTypeStep = ({ selectedType, onChange }) => {
  const options = [
    {
      id: "whitecollar",
      title: "Professional Jobs",
      subtitle: "Office and corporate roles such as IT, Marketing, Finance, Design, Management and other professional careers.",
      Icon: BriefcaseSvg,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      tags: ["Software Developer", "Marketing Executive", "UI UX Designer", "HR Manager"],
    },
    {
      id: "bluecollar",
      title: "Skilled & Field Jobs",
      subtitle: "Hands-on and operational roles like Drivers, Technicians, Electricians, Delivery Executives and other skilled trades.",
      Icon: WrenchSvg,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      tags: ["Driver", "Electrician", "Delivery Partner", "Security Guard"],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">What kind of job are you looking for?</h2>
        <p className="text-sm text-slate-500 mt-1">
          Choose the category that best matches your career goals. This helps us recommend the right jobs for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt) => {
          const isSelected = selectedType === opt.id;
          const OptIcon = opt.Icon;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange("employeeType", opt.id)}
              className={`relative text-left p-6 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSelected
                  ? "border-blue-600 bg-blue-50/60 shadow-md shadow-blue-600/10"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white"
              }`}
            >
              <div className="absolute top-4 right-4">
                {isSelected ? (
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                    <CheckSvg className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full border-2 border-slate-300" />
                )}
              </div>

              <div className={`w-14 h-14 rounded-xl ${opt.iconBg} flex items-center justify-center mb-4`}>
                <OptIcon className={`w-7 h-7 ${opt.iconColor}`} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1.5 text-base">{opt.title}</h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">{opt.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {opt.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium ${
                      isSelected ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeTypeStep;
