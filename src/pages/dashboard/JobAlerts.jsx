import AlertsStats from "../../components/jobalert/AlertsStats";
import AlertTable from "../../components/jobalert/AlertTable";

const JobAlerts = () => {
  return (
    <div className="space-y-8">
      <div className="text-sm text-slate-400">
        Dashboard <span className="mx-2">/</span>
        <span className="text-blue-600">Job Alerts</span>
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Job Alerts</h1>

          <p className="text-slate-500 text-sm mt-1">
            Custom job notifications are not available yet. Stats below reflect that there is no alert data in the system.
          </p>
        </div>

        <button
          type="button"
          disabled
          title="Coming soon"
          className="bg-slate-200 text-slate-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
        >
          + Create Alert
        </button>
      </div>

      <AlertsStats />

      <AlertTable />
    </div>
  );
};

export default JobAlerts;
