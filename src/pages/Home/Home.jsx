import { Link } from "react-router";
import Assets from "../../components/Home/Assets";
import Banner from "../../components/Home/Banner";
import AboutUs from "../AboutUs/AboutUs";
import AboutUsHome from "../AboutUs/AboutUsHome";
import Packages from "../Dashboard/HR/Packages";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

import Features from "../../components/Home/Features";
import HowItWorks from "../../components/Home/HowItWorks";
import TestimonialsAndStats from "../../components/Home/TestimonialsAndStats";
import FAQ from "../../components/Home/FAQ";
import ContactCTA from "../../components/Home/ContactCTA";

const Home = () => {
  const { user } = useAuth();
  const [role] = useRole();

  return (
    <div>
      <Banner />
      <Features />
      <HowItWorks />
      <AboutUsHome />
      <TestimonialsAndStats />
      {role === "HR" && <Packages />}
      <Assets />
      <FAQ />
      <ContactCTA />
    </div>
  );
};

export default Home;
