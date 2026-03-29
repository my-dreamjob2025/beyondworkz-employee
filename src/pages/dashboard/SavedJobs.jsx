import { Link } from "react-router-dom";
import SavedJobsHeader from "../../components/savedJobs/SavedJobsHeader";

const SavedJobs = () => {
  return (
    <div className="space-y-6">
      <SavedJobsHeader />

      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Saved jobs are not stored in your account yet. When this feature is enabled, roles you save from the job board will appear here.
        </p>
        <Link
          to="/jobs"
          className="inline-block mt-6 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors"
        >
          Browse jobs
        </Link>
      </div>
    </div>
  );
};

export default SavedJobs;
