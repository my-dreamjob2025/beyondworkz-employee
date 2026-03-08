import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Page Not Found
        </h2>

        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
