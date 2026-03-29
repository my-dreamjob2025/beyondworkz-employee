import { Outlet } from "react-router-dom";
import AuthenticatedShell from "../components/layout/AuthenticatedShell";

const DashboardLayout = () => {
  return (
    <AuthenticatedShell>
      <Outlet />
    </AuthenticatedShell>
  );
};

export default DashboardLayout;
