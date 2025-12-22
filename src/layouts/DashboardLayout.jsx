import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import BackgroundGlow from "../components/Shared/BackgroundGlow";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import UnAuthorized from "../pages/UnAuthorized";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoadingRole, setIsLoadingRole] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setUserInfo(res.data);
          setIsLoadingRole(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoadingRole(false);
        });
    }
  }, [user?.email, axiosSecure]);

  if (isLoadingRole) {
    return <LoadingSpinner />;
  }

  // If user has no role, block dashboard completely
  if (!userInfo?.role) {
    return <UnAuthorized />;
  }

  return (
    <div className="relative min-h-screen md:flex overflow-hidden bg-gray-50">
      <BackgroundGlow />
      {/* Left Side: Sidebar Component */}
      <Sidebar userInfo={userInfo} />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 md:ml-72 relative z-10 pt-16 md:pt-0">
        <div className="p-4 md:p-8">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
