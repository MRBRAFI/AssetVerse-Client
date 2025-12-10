import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUserCog}
        label="Manage Employees"
        address="manage-employees"
      />
    </>
  );
};

export default AdminMenu;
