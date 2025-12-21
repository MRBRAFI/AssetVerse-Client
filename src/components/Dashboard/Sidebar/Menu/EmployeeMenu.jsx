import { FiPackage, FiSearch, FiUsers } from "react-icons/fi";
import MenuItem from "./MenuItem";

const EmployeeMenu = () => {
  return (
    <>
      <MenuItem icon={FiPackage} label="My Assets" address="my-inventory" />
      <MenuItem
        icon={FiSearch}
        label="Request Asset"
        address="/dashboard/all-asset"
      />
      <MenuItem icon={FiUsers} label="My Team" address="my-team" />
    </>
  );
};

export default EmployeeMenu;
