import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import dashboardIcon from "../../assets/icons/layout/cube.svg";
import profileIcon from "../../assets/icons/layout/profile.svg";
import applicationsIcon from "../../assets/icons/layout/applications.svg";
import savedIcon from "../../assets/icons/layout/saved.svg";
import interviewIcon from "../../assets/icons/layout/calender.svg";
import messageIcon from "../../assets/icons/layout/messages.svg";
import alertIcon from "../../assets/icons/layout/notification.svg";
import settingsIcon from "../../assets/icons/layout/setting.svg";

const Sidebar = ({ isOpen = false, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    navigate("/login", { replace: true });
  };

  const navItems = [
    { label: "Dashboard", icon: dashboardIcon, path: "/" },
    { label: "My Profile", icon: profileIcon, path: "/dashboard/profile" },
    {
      label: "Applications",
      icon: applicationsIcon,
      path: "/dashboard/applications",
    },
    { label: "Saved Jobs", icon: savedIcon, path: "/dashboard/saved-jobs" },
    { label: "Interviews", icon: interviewIcon, path: "/dashboard/interviews" },
    { label: "Messages", icon: messageIcon, path: "/dashboard/messages" },
  ];

  const preferenceItems = [
    { label: "Job Alerts", icon: alertIcon, path: "/dashboard/job-alerts" },
    { label: "Settings", icon: settingsIcon, path: "/dashboard/setting" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNav = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <aside
      className={`fixed lg:static top-14 lg:top-0 bottom-0 left-0 z-50 w-60 bg-white border-r border-slate-200 lg:min-h-0 transform transition-transform duration-200 ease-out lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
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
              onClick={() => handleNav(item.path)}
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

        {/* Logout */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
          >
            {loggingOut ? (
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            )}
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
