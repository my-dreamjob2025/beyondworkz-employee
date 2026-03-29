import { Link } from "react-router-dom";

const JobAlerts = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="font-semibold mb-2">Job alerts</h3>
      <p className="text-sm text-slate-500">
        Email or push alerts for saved searches are not set up yet. Use{" "}
        <Link to="/jobs" className="text-blue-600 font-medium hover:underline">
          Find jobs
        </Link>{" "}
        to browse current listings.
      </p>
    </div>
  );
};

export default JobAlerts;
