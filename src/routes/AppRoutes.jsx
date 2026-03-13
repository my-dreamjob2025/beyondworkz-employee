import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";

import LandingPage from "../pages/public/LandingPage";
import JobSearchPage from "../pages/public/JobSearchPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile";
import Applications from "../pages/dashboard/Applications";
import JobSaved from "../pages/dashboard/SavedJobs";
import JobAlerts from "../pages/dashboard/JobAlerts";
import Interviews from "../pages/dashboard/Interviews";
import Messages from "../pages/dashboard/Messages";
import Settings from "../pages/dashboard/Setting";

import PageNotFound from "../pages/common/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import CompleteProfile from "../pages/profile/CompleteProfile";

// Shows dashboard if logged in, landing page if not
const HomeRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <LandingPage />;
};

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Home — dashboard if logged in, landing page if not */}
          <Route path="/" element={<HomeRoute />} />

          {/* Profile completion — protected, full-page wizard */}
          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <CompleteProfile />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/jobs" element={<JobSearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="applications" element={<Applications />} />
            <Route path="saved-jobs" element={<JobSaved />} />
            <Route path="job-alerts" element={<JobAlerts />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Global 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
