import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import Button from "../Button/Button";
import useAuth from "../../../hooks/useAuth";
import Logo from "../Logo/Logo";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleBlink = () => setIsBlinking(true);
    window.addEventListener("blink-profile", handleBlink);
    return () => window.removeEventListener("blink-profile", handleBlink);
  }, []);

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="fixed w-full bg-gradient-to-r from-blue-50/90 via-white/90 to-blue-50/90 backdrop-blur-md z-50 shadow-sm">
      <div className="py-4 ">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <div>
              <Link to="/">
                <Logo light />
              </Link>
            </div>
            <div className="hidden md:flex md:gap-5">
              <Link
                to={"/about-us"}
                className="btn btn-primary text-xl font-semibold text-white"
              >
                About Us
              </Link>

              <Link
                to={"/contact-us"}
                className="btn btn-primary text-xl font-semibold text-white"
              >
                Contact Us
              </Link>
              <Link
                to={"/all-assets-public"}
                className="btn btn-primary text-xl font-semibold text-white"
              >
                All Assets
              </Link>
            </div>
            {/* Dropdown Menu */}
            <div className="relative w-20">
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 md:py-1 w-28 h-12 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-2xl cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="">
                    {/* Avatar */}
                    <motion.img
                      animate={
                        isBlinking ? { opacity: [1, 0, 1, 0, 1, 0, 1] } : {}
                      }
                      transition={{ duration: 0.8 }}
                      onAnimationComplete={() => setIsBlinking(false)}
                      className="rounded-xl"
                      referrerPolicy="no-referrer"
                      src={
                        user && user.photoURL
                          ? user.photoURL
                          : "https://i.ibb.co.com/VcBGDkVQ/download-1.png"
                      }
                      alt="profile"
                      height="45"
                      width="45"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {user ? (
                      <>
                        <Link
                          to={"/"}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Home
                        </Link>
                        <Link
                          to={"/about-us"}
                          className="flex md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          About Us
                        </Link>
                        <Link
                          to={"/contact-us"}
                          className="flex md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Contact Us
                        </Link>
                        <Link
                          to={"/all-assets-public"}
                          className="flex md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          All Assets
                        </Link>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={handleLogOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/hr-signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Join as HR Manager
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Join as Employee
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
