const CITY_AREAS = [
  "Nagpur", "Mumbai", "Pune", "Delhi", "Bangalore", "Hyderabad",
  "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Surat", "Lucknow",
];

const WorkPrefsStep = ({ data, onChange }) => {
  const bc = data.blueCollarDetails || {};

  const update = (field, value) => {
    onChange("blueCollarDetails", { ...bc, [field]: value });
  };

  const updateProfile = (field, value) => {
    onChange(field, value);
  };

  const toggleArea = (area) => {
    const current = bc.preferredAreas || [];
    const updated = current.includes(area)
      ? current.filter((a) => a !== area)
      : [...current, area];
    update("preferredAreas", updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Work Preferences</h2>
        <p className="text-sm text-slate-500 mt-1">
          Tell us about your work setup to match you with the right jobs.
        </p>
      </div>

      {/* Availability */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">
          Availability <span className="text-red-500">*</span>
        </p>
        <div className="flex gap-3 flex-wrap">
          {["full-time", "part-time", "weekends"].map((a) => (
            <label
              key={a}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium capitalize ${
                data.availability === a
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="availability"
                className="hidden"
                checked={data.availability === a}
                onChange={() => updateProfile("availability", a)}
              />
              {a.replace("-", " ")}
            </label>
          ))}
        </div>
      </div>

      {/* Vehicle Washing Experience */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">
          Do you have vehicle washing experience?
        </p>
        <div className="flex gap-3">
          {[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ].map(({ label, value }) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={bc.hasVehicleWashingExperience === value}
              onClick={() => update("hasVehicleWashingExperience", value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasVehicleWashingExperience === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Driving License */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">
          Do you have a driving license?
        </p>
        <div className="flex gap-3">
          {[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ].map(({ label, value }) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={bc.hasDrivingLicense === value}
              onClick={() => {
                const next = { ...bc, hasDrivingLicense: value };
                if (value === false) next.drivingLicenseNumber = "";
                onChange("blueCollarDetails", next);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasDrivingLicense === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {bc.hasDrivingLicense === true && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              License number
            </label>
            <input
              type="text"
              value={bc.drivingLicenseNumber || ""}
              onChange={(e) => update("drivingLicenseNumber", e.target.value.trim().toUpperCase())}
              placeholder="e.g. MH12 1234567890"
              maxLength={50}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Bike / Scooty */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">
          Do you own a bike or scooty?
        </p>
        <div className="flex gap-3">
          {[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ].map(({ label, value }) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={bc.hasBikeOrScooty === value}
              onClick={() => update("hasBikeOrScooty", value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasBikeOrScooty === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* WhatsApp Number */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">
          WhatsApp number
        </p>
        <input
          type="tel"
          value={data.whatsappNumber || ""}
          onChange={(e) => updateProfile("whatsappNumber", e.target.value.trim())}
          placeholder="+91 9876543210"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Preferred Work Areas */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">
          Preferred work areas{" "}
          <span className="text-slate-400 font-normal">(select all that apply)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {CITY_AREAS.map((area) => {
            const selected = (bc.preferredAreas || []).includes(area);
            return (
              <button
                key={area}
                type="button"
                onClick={() => toggleArea(area)}
                className={`px-3 py-1.5 rounded-full text-sm border-2 transition-all font-medium ${
                  selected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkPrefsStep;
