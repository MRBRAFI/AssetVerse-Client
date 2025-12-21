import { Link } from "react-router";
import Assets from "../../components/Home/Assets";
import Banner from "../../components/Home/Banner";
import AboutUs from "../AboutUs/AboutUs";
import AboutUsHome from "../AboutUs/AboutUsHome";
import Packages from "../Dashboard/HR/Packages";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  console.log(user);
  return (
    <div>
      <Banner></Banner>
      <AboutUsHome></AboutUsHome>
      <Packages></Packages>
      <Assets />

      {/* More components */}
    </div>
  );
};

export default Home;
