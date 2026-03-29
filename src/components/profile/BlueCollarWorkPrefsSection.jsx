import { PencilIcon } from "../icons/ActionIcons";

const CITY_AREAS = [
  "Nagpur", "Mumbai", "Pune", "Delhi", "Bangalore", "Hyderabad",
  "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Surat", "Lucknow",
];

const BlueCollarWorkPrefsSection = ({ profile, onEdit }) => {
  const bc = profile?.blueCollarDetails || {};
  const availability = profile?.availability;
  const whatsappNumber = profile?.whatsappNumber;

  const items = [
    {
      label: "Vehicle washing experience",
      value: bc.hasVehicleWashingExperience === true ? "Yes" : bc.hasVehicleWashingExperience === false ? "No" : "—",
    },
    {
      label: "Driving license",
      value: bc.hasDrivingLicense === true
        ? (bc.drivingLicenseNumber ? `Yes · ${bc.drivingLicenseNumber}` : "Yes")
        : bc.hasDrivingLicense === false
          ? "No"
          : "—",
    },
    {
      label: "Bike or scooty",
      value: bc.hasBikeOrScooty === true ? "Yes" : bc.hasBikeOrScooty === false ? "No" : "—",
    },
    {
      label: "Availability",
      value: availability ? availability.replace("-", " ") : "—",
    },
    {
      label: "WhatsApp",
      value: whatsappNumber || "—",
    },
  ];

  const preferredAreas = bc.preferredAreas || [];
  const hasAny = items.some((i) => i.value !== "—") || preferredAreas.length > 0;

  if (!hasAny) {
    return (
      <div id="work-prefs" className="scroll-mt-24 bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Work Preferences</h3>
          <button
            type="button"
            onClick={() => onEdit("workprefs")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Add work preferences
          </button>
        </div>
        <p className="text-sm text-slate-500 mt-2">
          Tell employers about your vehicle experience and preferred work areas.
        </p>
      </div>
    );
  }

  return (
    <div id="work-prefs" className="scroll-mt-24 bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Work Preferences</h3>
        <button
          type="button"
          onClick={() => onEdit("workprefs")}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Edit work preferences"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-slate-500">{item.label}</span>
            <span className="font-medium text-slate-800 capitalize">{item.value}</span>
          </div>
        ))}
        {preferredAreas.length > 0 && (
          <div>
            <p className="text-slate-500 text-sm mb-1">Preferred areas</p>
            <div className="flex flex-wrap gap-2">
              {preferredAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlueCollarWorkPrefsSection;
