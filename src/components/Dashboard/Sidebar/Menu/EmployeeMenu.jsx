import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { LuCassetteTape } from "react-icons/lu";

import MenuItem from "./MenuItem";
const EmployeeMenu = () => {
  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Assets" address="my-inventory" />
      <MenuItem icon={LuCassetteTape} label="Add Assets" address="add-asset" />
    </>
  );
};

export default EmployeeMenu;
