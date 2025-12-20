import { BsFingerprint } from "react-icons/bs";
import { BsMicrosoftTeams } from "react-icons/bs";
import { GiBassetHoundHead } from "react-icons/gi";

import MenuItem from "./MenuItem";
const EmployeeMenu = () => {
  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Assets" address="my-inventory" />
      <MenuItem
        icon={GiBassetHoundHead}
        label="Request an asset"
        address="/dashboard/all-asset"
      />
      <MenuItem icon={BsMicrosoftTeams} label="My team" address="/" />
    </>
  );
};

export default EmployeeMenu;
