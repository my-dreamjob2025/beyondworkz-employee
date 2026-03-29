import StatCard from "./StatCard";

import appliedIcon from "../../assets/icons/dashboard/message-arrow.svg";
import savedIcon from "../../assets/icons/dashboard/saved-color.svg";
import viewsIcon from "../../assets/icons/dashboard/views.svg";
import interviewIcon from "../../assets/icons/dashboard/calender-color.svg";

const StatsGrid = ({ appliedCount = 0, interviewsCount = 0, loading }) => {
  const stats = [
    {
      title: "Applied Jobs",
      value: loading ? "…" : String(appliedCount),
      note: "From your submitted applications",
      icon: appliedIcon,
      iconBg: "bg-blue-100",
      noteColor: "text-slate-500",
    },
    {
      title: "Saved Jobs",
      value: "—",
      note: "Saved listings are not synced yet",
      icon: savedIcon,
      iconBg: "bg-orange-100",
      noteColor: "text-slate-400",
    },
    {
      title: "Profile Views",
      value: "—",
      note: "Not tracked yet",
      icon: viewsIcon,
      iconBg: "bg-green-100",
      noteColor: "text-slate-400",
    },
    {
      title: "Interviews",
      value: loading ? "…" : String(interviewsCount),
      note: "Scheduled via employer status",
      icon: interviewIcon,
      iconBg: "bg-purple-100",
      noteColor: "text-slate-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
