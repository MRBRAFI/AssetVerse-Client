import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Navigate } from "react-router";

const Statistics = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  if (role === "HR") {
    return (
      <div>
        <AdminStatistics />
      </div>
    );
  }

  if (role === "EMPLOYEE") {
    return <Navigate to="/dashboard/my-inventory" replace />;
  }

  return (
    <div className="h-[70vh] flex items-center justify-center">
      <h1 className="text-2xl font-black text-gray-200 uppercase tracking-widest">
        Access Denied
      </h1>
    </div>
  );
};

export default Statistics;
