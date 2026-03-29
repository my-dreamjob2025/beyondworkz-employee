import alertIcon from "../../assets/icons/alerts/notification.svg";
import matchIcon from "../../assets/icons/alerts/verified.svg";
import applicationIcon from "../../assets/icons/alerts/brifecase.svg";

const stats = [
  {
    label: "Active alerts",
    value: "0",
    icon: alertIcon,
  },
  {
    label: "Matches this week",
    value: "0",
    icon: matchIcon,
  },
  {
    label: "Applications sent via alerts",
    value: "0",
    icon: applicationIcon,
  },
];

const AlertsStats = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-100">
            <img src={stat.icon} alt="" className="w-6 h-6 object-contain" />
          </div>

          <div>
            <p className="text-xl font-semibold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsStats;
