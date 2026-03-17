import React, { useState, useRef } from "react";
import { avatarService } from "../../services/avatarService";

const BasicInfoStep = ({ data, onChange, employeeType, onAvatarUpdated }) => {
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const avatarInputRef = useRef(null);

  const avatarUrl = data?.avatar?.url;
  const fullName = [data?.firstName, data?.lastName].filter(Boolean).join(" ") || "User";
  const initials = fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarError("");
    setAvatarLoading(true);
    try {
      const result = await avatarService.uploadAvatar(file);
      if (result?.data && onChange) {
        onChange("avatar", result.data);
      }
      onAvatarUpdated?.();
    } catch (err) {
      setAvatarError(err.response?.data?.message || err.message || "Failed to update photo.");
    } finally {
      setAvatarLoading(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
        <p className="text-sm text-slate-500 mt-1">
          Let employers know who you are and where you're located.
        </p>
      </div>

      <div className="flex items-center gap-4">
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
          className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center hidden" aria-hidden="true">
                <span className="text-white text-xl font-bold">{initials}</span>
              </div>
            </>
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xl font-bold">{initials}</span>
            </div>
          )}
          <span className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            {avatarLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            )}
          </span>
        </button>
        <div>
          <p className="text-sm font-medium text-slate-700">Profile photo</p>
          <p className="text-xs text-slate-500 mt-0.5">JPEG, PNG or WebP. Max 10MB.</p>
          {avatarError && <p className="text-xs text-red-600 mt-1">{avatarError}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
