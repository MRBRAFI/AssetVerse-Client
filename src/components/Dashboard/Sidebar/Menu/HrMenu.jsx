import { FiUser, FiPlusCircle, FiList, FiTrendingUp, FiPieChart, FiGitPullRequest } from "react-icons/fi";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      {/* Analytics */}
      <MenuItem
        icon={FiPieChart}
        label="Analytics"
        address="statistics"
      />
      {/* Inventory */}
      <MenuItem
        icon={FiList}
        label="Inventory"
        address="/dashboard/all-asset"
      />

      {/* Add Asset */}
      <MenuItem icon={FiPlusCircle} label="Add Asset" address="add-asset" />

      {/* Requests */}
      <MenuItem
        icon={FiGitPullRequest}
        label="Requests"
        address="/dashboard/manage-requests"
      />

      {/* Team Members */}
      <MenuItem
        icon={FiUser}
        label="Team Members"
        address="/dashboard/manage-employees"
      />
      {/* Upgrade Package */}
      <MenuItem
        icon={FiTrendingUp}
        label="Packages"
        address="/dashboard/my-packages"
      />
    </>
  );
};

export default AdminMenu;
