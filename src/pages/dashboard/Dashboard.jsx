import WelcomeHeader from "../../components/dashboard/WelcomeHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";
import RecommendedJobs from "../../components/dashboard/RecommendedJobs";
import ProfileStrength from "../../components/dashboard/ProfileStrength";
import JobAlerts from "../../components/dashboard/JobAlerts";
import RecentlyViewed from "../../components/dashboard/RecentlyViewed";
import ApplicationStatus from "../../components/dashboard/ApplicationStatus";

const Dashboard = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <WelcomeHeader />

      <StatsGrid />

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecommendedJobs />
          <ApplicationStatus />
        </div>

        <div className="space-y-6">
          <ProfileStrength />
          <JobAlerts />
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
