import Assets from "../../components/Home/Assets";
import Banner from "../../components/Home/Banner";
import AboutUs from "../AboutUs/AboutUs";
import AboutUsHome from "../AboutUs/AboutUsHome";
import Packages from "../Dashboard/HR/Packages";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Packages></Packages>
      <AboutUsHome></AboutUsHome>
      <Assets />
      {/* More components */}
    </div>
  );
};

export default Home;
