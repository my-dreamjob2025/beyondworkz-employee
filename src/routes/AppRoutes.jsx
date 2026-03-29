import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthInitializer from "../components/AuthInitializer";

import LandingPage from "../pages/public/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AuthCallback from "../pages/auth/AuthCallback";

import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "../pages/common/PageNotFound";

const JobSearchPage = lazy(() => import("../pages/public/JobSearchPage"));
const JobDetailPage = lazy(() => import("../pages/public/JobDetailPage"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Profile = lazy(() => import("../pages/dashboard/Profile"));
const Applications = lazy(() => import("../pages/dashboard/Applications"));
const JobSaved = lazy(() => import("../pages/dashboard/SavedJobs"));
const JobAlerts = lazy(() => import("../pages/dashboard/JobAlerts"));
const Interviews = lazy(() => import("../pages/dashboard/Interviews"));
const Messages = lazy(() => import("../pages/dashboard/Messages"));
const Settings = lazy(() => import("../pages/dashboard/Setting"));
const CompleteProfile = lazy(() => import("../pages/profile/CompleteProfile"));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

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
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthInitializer>
        <Routes>
          {/* Home — dashboard if logged in, landing page if not */}
          <Route path="/" element={<HomeRoute />} />

          {/* Profile completion — protected, full-page wizard */}
          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <CompleteProfile />
                </Suspense>
              </ProtectedRoute>
            }
          />

          {/* OAuth callback — handles Google sign-in redirect */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Public Routes */}
          <Route path="/jobs" element={<Suspense fallback={<PageLoader />}><JobSearchPage /></Suspense>} />
          <Route
            path="/jobs/:jobId"
            element={
              <Suspense fallback={<PageLoader />}>
                <JobDetailPage />
              </Suspense>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <DashboardLayout />
                </Suspense>
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
      </AuthInitializer>
    </Router>
  );
};

export default AppRoutes;
