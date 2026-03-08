import jobIcon from "../../assets/common-icon/brifecase-orange.svg";
import viewIcon from "../../assets/common-icon/eye-orange.svg";
import interviewIcon from "../../assets/common-icon/calender-orange.svg";

const notifications = [
  {
    title: "New Job Match",
    message:
      'We found 3 new opportunities matching your preference for "Product Designer" in "San Francisco".',
    time: "10 mins ago",
    icon: jobIcon,
  },
  {
    title: "Application Viewed",
    message:
      "TechCorp Inc. has viewed your application for the Senior Frontend Developer role.",
    time: "2 hours ago",
    icon: viewIcon,
  },
  {
    title: "Interview Scheduled",
    message:
      "Your technical interview with Stripe is confirmed for tomorrow at 10:00 AM PST.",
    time: "1 day ago",
    icon: interviewIcon,
  },
];

const NotificationDropdown = () => {
  return (
    <div className="absolute right-0 mt-3 w-[360px] bg-white border border-[#ffffff]  rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b">
        <h3 className="font-semibold text-slate-800">Notifications</h3>

        <button className="text-sm text-blue-600">Mark all as read</button>
      </div>

      {/* Notifications */}
      <div className="divide-y">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 border-[#ffffff] px-5 py-4 hover:bg-[#2563EB08] cursor-pointer transition"
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#2563EB08]">
              <img src={item.icon} className="w-4 h-4" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">
                {item.title}
              </p>

              <p className="text-xs text-slate-500 mt-1">{item.message}</p>

              <p className="text-xs text-slate-400 mt-2">{item.time}</p>
            </div>

            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-3 border-[#00000014] ">
        <button className="text-blue-600 text-sm font-medium">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
