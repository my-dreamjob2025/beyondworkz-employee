const CITY_AREAS = [
  "Nagpur", "Mumbai", "Pune", "Delhi", "Bangalore", "Hyderabad",
  "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Surat", "Lucknow",
];

const WorkPrefsStep = ({ data, onChange }) => {
  const bc = data.blueCollarDetails || {};

  const update = (field, value) => {
    onChange("blueCollarDetails", { ...bc, [field]: value });
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
            <label
              key={label}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasVehicleWashingExperience === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={bc.hasVehicleWashingExperience === value}
                onChange={() => update("hasVehicleWashingExperience", value)}
              />
              {label}
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
            <label
              key={label}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasVehicleWashingExperience === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={bc.hasVehicleWashingExperience === value}
                onChange={() => update("hasVehicleWashingExperience", value)}
              />
              {label}
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
            <label
              key={label}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasVehicleWashingExperience === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={bc.hasVehicleWashingExperience === value}
                onChange={() => update("hasVehicleWashingExperience", value)}
              />
              {label}
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
            <label
              key={label}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasVehicleWashingExperience === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={bc.hasVehicleWashingExperience === value}
                onChange={() => update("hasVehicleWashingExperience", value)}
              />
              {label}
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
            <label
              key={label}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasVehicleWashingExperience === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={bc.hasVehicleWashingExperience === value}
                onChange={() => update("hasVehicleWashingExperience", value)}
              />
              {label}
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
            <label
              key={label}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasVehicleWashingExperience === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={bc.hasVehicleWashingExperience === value}
                onChange={() => update("hasVehicleWashingExperience", value)}
              />
              {label}
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
            <label
              key={label}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasVehicleWashingExperience === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={bc.hasVehicleWashingExperience === value}
                onChange={() => update("hasVehicleWashingExperience", value)}
              />
              {label}
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
            <label
              key={label}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasVehicleWashingExperience === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={bc.hasVehicleWashingExperience === value}
                onChange={() => update("hasVehicleWashingExperience", value)}
              />
              {label}
            </label>
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
            <label
              key={label}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasDrivingLicense === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={bc.hasDrivingLicense === value}
                onChange={() => update("hasDrivingLicense", value)}
              />
              {label}
            </label>
          ))}
        </div>
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
            <label
              key={label}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                bc.hasBikeOrScooty === value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={bc.hasBikeOrScooty === value}
                onChange={() => update("hasBikeOrScooty", value)}
              />
              {label}
            </label>
          ))}
        </div>
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
