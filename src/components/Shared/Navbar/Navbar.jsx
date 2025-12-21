import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { FiInfo, FiPhone, FiPackage, FiLogOut, FiLayout } from "react-icons/fi";
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
            <div className="hidden md:flex md:gap-4 items-center">
              <Link to="/about-us">
                <Button label="About" variant="secondary" size="md" icon={FiInfo} />
              </Link>
              <Link to="/contact-us">
                <Button label="Contact" variant="secondary" size="md" icon={FiPhone} />
              </Link>
              <Link to="/all-assets-public">
                <Button label="Assets" variant="primary" size="md" icon={FiPackage} />
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
                <div className="absolute rounded-3xl shadow-2xl w-[60vw] md:w-[250px] bg-white/90 backdrop-blur-xl border border-white/50 overflow-hidden right-0 top-16 text-sm z-50 p-2">
                  <div className="flex flex-col gap-1">
                    {user ? (
                      <>
                        <Link to="/">
                          <div className="px-5 py-3 hover:bg-blue-50/50 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] text-gray-700 flex items-center gap-3">
                            <FiLayout className="text-blue-500" /> Home
                          </div>
                        </Link>
                        
                        {/* Mobile Only Links */}
                        <div className="md:hidden border-t border-gray-100 my-1 pt-1">
                          <Link to="/about-us">
                            <div className="px-5 py-3 hover:bg-blue-50/50 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] text-gray-700 flex items-center gap-3">
                              <FiInfo className="text-blue-500" /> About Us
                            </div>
                          </Link>
                          <Link to="/contact-us">
                            <div className="px-5 py-3 hover:bg-blue-50/50 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] text-gray-700 flex items-center gap-3">
                              <FiPhone className="text-blue-500" /> Contact Us
                            </div>
                          </Link>
                          <Link to="/all-assets-public">
                            <div className="px-5 py-3 hover:bg-blue-50/50 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] text-gray-700 flex items-center gap-3">
                              <FiPackage className="text-blue-500" /> All Assets
                            </div>
                          </Link>
                        </div>

                        <Link to="/dashboard">
                          <div className="px-5 py-3 hover:bg-blue-50/50 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] text-gray-700 flex items-center gap-3">
                            <FiLayout className="text-blue-500" /> Control Center
                          </div>
                        </Link>
                        
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <div
                            onClick={handleLogOut}
                            className="px-5 py-3 hover:bg-red-50/50 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] text-red-600 flex items-center gap-3 cursor-pointer"
                          >
                            <FiLogOut /> Termination
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/login">
                          <div className="px-5 py-3 hover:bg-blue-50/50 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] text-blue-600 flex items-center gap-3">
                            Verify Identity
                          </div>
                        </Link>
                        <Link to="/hr-signup">
                          <div className="px-5 py-3 hover:bg-indigo-50/50 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] text-indigo-600">
                            Initialize HR Nexus
                          </div>
                        </Link>
                        <Link to="/signup">
                          <div className="px-5 py-3 hover:bg-slate-50/50 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] text-gray-700">
                            Join Personnel
                          </div>
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
