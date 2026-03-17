import useAuth from "../../hooks/useAuth";

const WelcomeHeader = () => {
  const { user } = useAuth();
  const firstName = user?.firstName || "there";

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
        Welcome back, {firstName}!
      </h1>

      <p className="text-slate-500 mt-1 text-sm sm:text-base">
        Here is what is happening with your job search today.
      </p>
    </div>
  );
};

export default WelcomeHeader;
