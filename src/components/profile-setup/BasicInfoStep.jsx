import React from "react";

const BasicInfoStep = ({ data, onChange, employeeType }) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
        <p className="text-sm text-slate-500 mt-1">
          Let employers know who you are and where you're located.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.firstName || ""}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="John"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            value={data.lastName || ""}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Doe"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          value={data.phone || ""}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+91 9876543210"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          City <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.city || ""}
          onChange={(e) => onChange("city", e.target.value)}
          placeholder="e.g. Mumbai, Nagpur, Pune"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {employeeType === "whitecollar" ? (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Work Status <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Fresher", "Experienced"].map((ws) => (
                <label
                  key={ws}
                  className={`flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                    data.workStatus === ws
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="workStatus"
                    value={ws}
                    checked={data.workStatus === ws}
                    onChange={() => onChange("workStatus", ws)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm font-medium text-slate-800">{ws}</span>
                </label>
              ))}
            </div>
          </div>

          {data.workStatus === "Experienced" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Total Experience
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <select
                    value={data.years || "00"}
                    onChange={(e) => onChange("years", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={String(i).padStart(2, "0")}>
                        {i} {i === 1 ? "Year" : "Years"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={data.months || "00"}
                    onChange={(e) => onChange("months", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={String(i).padStart(2, "0")}>
                        {i} {i === 1 ? "Month" : "Months"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Work Status <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Fresher", "Experienced"].map((ws) => (
                <label
                  key={ws}
                  className={`flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                    data.workStatus === ws
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="workStatus"
                    value={ws}
                    checked={data.workStatus === ws}
                    onChange={() => onChange("workStatus", ws)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm font-medium text-slate-800">{ws}</span>
                </label>
              ))}
            </div>
          </div>

          {data.workStatus === "Experienced" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Total Experience
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <select
                    value={data.years || "00"}
                    onChange={(e) => onChange("years", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={String(i).padStart(2, "0")}>
                        {i} {i === 1 ? "Year" : "Years"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={data.months || "00"}
                    onChange={(e) => onChange("months", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={String(i).padStart(2, "0")}>
                        {i} {i === 1 ? "Month" : "Months"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Availability <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["full-time", "part-time", "weekends"].map((a) => (
                <label
                  key={a}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium capitalize ${
                    data.availability === a
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="availability"
                    value={a}
                    checked={data.availability === a}
                    onChange={() => onChange("availability", a)}
                    className="hidden"
                  />
                  {a.replace("-", " ")}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfoStep;
