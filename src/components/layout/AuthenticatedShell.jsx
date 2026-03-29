import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

/**
 * Dashboard chrome (header + sidebar) for logged-in employees.
 * Used by DashboardLayout and by public job routes when the user is authenticated.
 */
const AuthenticatedShell = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden relative min-h-0">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 min-w-0">{children}</div>
        {sidebarOpen ? (
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        ) : null}
      </div>
    </div>
  );
};

export default AuthenticatedShell;
