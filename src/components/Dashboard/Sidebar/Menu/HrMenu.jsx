import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { LuCassetteTape } from "react-icons/lu";
import { CiCircleList } from "react-icons/ci";
import { FaCodePullRequest } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const AdminMenu = () => {
  return (
    <>
      {/* Asset List */}
      <MenuItem
        icon={CiCircleList}
        label="Asset List"
        address="/dashboard"
      ></MenuItem>

      {/* Add Asset */}
      <MenuItem icon={LuCassetteTape} label="Add Assets" address="add-asset" />

      {/* All requests */}
      <MenuItem
        icon={FaCodePullRequest}
        label={"All Requests"}
        address={"/dashboard/manage-requests"}
      ></MenuItem>

      {/* My Employees */}
      <MenuItem
        icon={FaUserCog}
        label="My Employee List"
        address="/dashboard/manage-employees"
      />
      {/* Upgrade Package */}
      <MenuItem
        icon={FaMoneyBillTrendUp}
        label={"Upgrade Package"}
        address={"/dashboard/my-packages"}
      ></MenuItem>
    </>
  );
};

export default AdminMenu;
