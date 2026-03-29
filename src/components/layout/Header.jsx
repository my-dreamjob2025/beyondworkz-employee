import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { BrandLogoWithWordmarkButton } from "../brand/BrandMark";
import notification from "../../assets/icons/layout/Notification.svg";
import downarrow from "../../assets/icons/layout/down-arrow.svg";

import NotificationDropdown from "./NotificationDropdown";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3">
        {/* LEFT: Hamburger + brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 lg:hidden flex-shrink-0"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <BrandLogoWithWordmarkButton onClick={() => navigate("/dashboard")} />
        </div>

        {/* SEARCH - hidden on small screens */}
        <div className="relative hidden md:block flex-1 max-w-[280px] lg:max-w-[420px] mx-2">
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
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-5 flex-shrink-0">
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

          {/* Divider - hidden on small */}
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          {/* Profile */}
          <button
            type="button"
            className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0"
            onClick={() => navigate("/dashboard/profile")}
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {currentUser?.firstName?.[0] || "U"}
            </div>
            <div className="leading-tight hidden sm:block min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                {currentUser?.firstName} {currentUser?.lastName}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {currentUser?.jobTitle?.trim() || "Job seeker"}
              </p>
            </div>
            <img src={downarrow} alt="" className="w-3 h-3 hidden sm:block flex-shrink-0" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
