import { useNavigate, useLocation } from "react-router-dom";

import dashboardIcon from "../../assets/layout/icons/cube.svg";
import profileIcon from "../../assets/layout/icons/profile.svg";
import applicationsIcon from "../../assets/layout/icons/applications.svg";
import savedIcon from "../../assets/layout/icons/saved.svg";
import interviewIcon from "../../assets/layout/icons/calender.svg";
import messageIcon from "../../assets/layout/icons/messages.svg";
import alertIcon from "../../assets/layout/icons/notification.svg";
import settingsIcon from "../../assets/layout/icons/setting.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: dashboardIcon, path: "/" },
    { label: "My Profile", icon: profileIcon, path: "/profile" },
    { label: "Applications", icon: applicationsIcon, path: "/applications" },
    { label: "Saved Jobs", icon: savedIcon, path: "/saved-jobs" },
    { label: "Interviews", icon: interviewIcon, path: "/interviews" },
    { label: "Messages", icon: messageIcon, path: "/messages" },
  ];

  const preferenceItems = [
    { label: "Job Alerts", icon: alertIcon, path: "/job-alerts" },
    { label: "Settings", icon: settingsIcon, path: "/setting" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-60 bg-white border-r border-slate-200 min-h-[calc(100vh-64px)]">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
              ${
                active
                  ? "bg-[#EEF2FF] text-[#2563EB]"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`w-5 h-5 ${
                  active
                    ? "filter brightness-0 saturate-100 invert-[32%] sepia-[92%] saturate-[1600%] hue-rotate-[215deg] brightness-[92%] contrast-[92%]"
                    : ""
                }`}
              />

              {item.label}
            </button>
          );
        })}

        {/* Preferences Label */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-400 uppercase tracking-wide">
          Preferences
        </div>

        {preferenceItems.map((item) => {
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
              ${
                active
                  ? "bg-[#EEF2FF] text-[#2563EB]"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5" />

              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
