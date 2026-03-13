import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import logo from "../../assets/logos/beyondworkzlogo.png";
import notification from "../../assets/icons/layout/Notification.svg";
import downarrow from "../../assets/icons/layout/down-arrow.svg";

import NotificationDropdown from "./NotificationDropdown";

const Header = () => {
  const navigate = useNavigate();
  const { user: currentUser, logout } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Beyond Workz" className="h-9 w-auto max-w-[140px] object-contain" />

          <span className="text-lg font-semibold text-blue-600">
            Beyond Workz
          </span>
        </div>

        {/* SEARCH */}
        <div className="relative w-[420px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search for jobs, companies, or skills..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* Notification */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <img src={notification} alt="notification" className="w-5 h-5" />

              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && <NotificationDropdown />}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200"></div>

          {/* Profile */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              navigate("/dashboard/profile");
            }}
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {currentUser?.firstName?.[0]}
            </div>

            <div className="leading-tight">
              <p className="text-sm font-medium text-slate-800">
                {currentUser?.firstName} {currentUser?.lastName}
              </p>

              <p className="text-xs text-slate-500">Frontend Developer</p>
            </div>

            <img src={downarrow} alt="down arrow" className="w-3 h-3" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
