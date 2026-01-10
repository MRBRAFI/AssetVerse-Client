import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { 
  FiBriefcase, 
  FiMail, 
  FiDatabase, 
  FiLogOut, 
  FiGrid, 
  FiUserPlus, 
  FiUser, 
  FiHome, 
  FiPieChart, 
  FiArchive,
  FiActivity,
  FiLifeBuoy
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router";
import Button from "../Button/Button";
import useAuth from "../../../hooks/useAuth";
import Logo from "../Logo/Logo";
import useRole from "../../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
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
    <div className="fixed w-full bg-gradient-to-r from-blue-50/90 via-white/90 to-blue-50/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-100/50">
      <div className="py-2.5 ">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <div>
              <Link to="/">
                <Logo light />
              </Link>
            </div>
            
            <div className="hidden md:flex md:gap-3 items-center">
              <Link to="/about-us">
                <Button
                  label="About"
                  variant="secondary"
                  size="md"
                  icon={FiLifeBuoy}
                  className="!rounded-2xl border-gray-100/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                />
              </Link>
              <Link to="/contact-us">
                <Button
                  label="Contact"
                  variant="secondary"
                  size="md"
                  icon={FiMail}
                  className="!rounded-2xl border-gray-100/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                />
              </Link>
              <Link to="/all-assets-public">
                <Button
                  label="All Assets"
                  variant="primary"
                  size="md"
                  icon={FiDatabase}
                  className="!rounded-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
                />
              </Link>
              {user && (
                <div className="flex gap-3">
                  <Link to="dashboard/profile">
                    <Button
                      label="Profile"
                      variant="primary"
                      size="md"
                      icon={FiUser}
                      className="!rounded-2xl shadow-blue-500/20"
                    />
                  </Link>
                  {role === "HR" ? (
                    <Link to="dashboard/statistics">
                      <Button
                        label="Analytics"
                        variant="primary"
                        size="md"
                        icon={FiPieChart}
                        className="!rounded-2xl shadow-blue-500/20"
                      />
                    </Link>
                  ) : (
                    <Link to="dashboard/my-inventory">
                      <Button
                        label="My Inventory"
                        variant="primary"
                        size="md"
                        icon={FiArchive}
                        className="!rounded-2xl shadow-blue-500/20"
                      />
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown btn */}
                <motion.div
                  whileHover={{ scale: 1.02, translateY: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-1.5 md:py-1.5 w-auto min-w-[110px] h-12 md:px-2 bg-white/50 backdrop-blur-sm border border-gray-200/60 flex flex-row items-center gap-3 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all duration-300"
                >
                  <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                    <AiOutlineMenu className="text-gray-600 transition-colors" />
                  </div>
                  <div className="">
                    {/* Avatar */}
                    <motion.img
                      animate={
                        isBlinking ? { opacity: [1, 0, 1, 0, 1, 0, 1] } : {}
                      }
                      transition={{ duration: 0.8 }}
                      onAnimationComplete={() => setIsBlinking(false)}
                      className="rounded-xl border-2 border-white/50 shadow-sm"
                      referrerPolicy="no-referrer"
                      src={
                        user && user.photoURL
                          ? user.photoURL
                          : "https://i.ibb.co.com/VcBGDkVQ/download-1.png"
                      }
                      alt="profile"
                      height="38"
                      width="38"
                    />
                  </div>
                </motion.div>
              </div>

              {isOpen && (
                <div className="absolute rounded-[28px] shadow-2xl w-[65vw] md:w-[260px] bg-white/80 backdrop-blur-2xl border border-white/60 overflow-hidden right-0 top-16 text-sm z-50 p-3 ring-1 ring-black/5">
                  <div className="flex flex-col gap-1.5">
                    {user ? (
                      <>
                        <Link to="/" onClick={() => setIsOpen(false)}>
                          <div className="px-5 py-3.5 hover:bg-blue-50/80 rounded-[20px] transition-all duration-300 font-bold uppercase tracking-widest text-[10px] text-gray-700 flex items-center gap-3 group cursor-pointer">
                            <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                              <FiHome className="text-blue-600 size-3" />
                            </div>
                            Home
                          </div>
                        </Link>

                        {/* Mobile Only Links */}
                        <div className="md:hidden border-t border-gray-100/60 my-1 pt-1 space-y-1">
                          <Link to="/about-us" onClick={() => setIsOpen(false)}>
                            <div className="px-5 py-3.5 hover:bg-blue-50/80 rounded-[20px] transition-all duration-300 font-bold uppercase tracking-widest text-[10px] text-gray-700 flex items-center gap-3 group cursor-pointer">
                              <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                <FiLifeBuoy className="text-blue-600 size-3" />
                              </div>
                              About Us
                            </div>
                          </Link>
                          <Link to="/contact-us" onClick={() => setIsOpen(false)}>
                            <div className="px-5 py-3.5 hover:bg-blue-50/80 rounded-[20px] transition-all duration-300 font-bold uppercase tracking-widest text-[10px] text-gray-700 flex items-center gap-3 group cursor-pointer">
                              <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                <FiMail className="text-blue-600 size-3" />
                              </div>
                              Contact Us
                            </div>
                          </Link>
                          <Link to="/all-assets-public" onClick={() => setIsOpen(false)}>
                            <div className="px-5 py-3.5 hover:bg-blue-50/80 rounded-[20px] transition-all duration-300 font-bold uppercase tracking-widest text-[10px] text-gray-700 flex items-center gap-3 group cursor-pointer">
                              <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                <FiDatabase className="text-blue-600 size-3" />
                              </div>
                              All Assets
                            </div>
                          </Link>
                        </div>

                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                          <div className="px-5 py-3.5 hover:bg-blue-50/80 rounded-[20px] transition-all duration-300 font-bold uppercase tracking-widest text-[10px] text-gray-700 flex items-center gap-3 group cursor-pointer">
                            <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                              <FiGrid className="text-blue-600 size-3" />
                            </div>
                            Dashboard
                          </div>
                        </Link>

                        <div className="border-t border-gray-100/60 mt-2 pt-2">
                          <div
                            onClick={() => {
                              handleLogOut();
                              setIsOpen(false);
                            }}
                            className="px-5 py-3.5 hover:bg-red-50/80 rounded-[20px] transition-all duration-300 font-bold uppercase tracking-widest text-[10px] text-red-600 flex items-center gap-3 group cursor-pointer"
                          >
                            <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                              <FiLogOut className="text-red-600 size-3" />
                            </div>
                            Logout
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <div className="px-5 py-3.5 hover:bg-blue-50/80 rounded-[20px] transition-all duration-300 font-bold uppercase tracking-widest text-[10px] text-blue-600 flex items-center gap-3 group cursor-pointer">
                            <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                              <FiActivity className="text-blue-600 size-3" />
                            </div>
                            Login
                          </div>
                        </Link>
                        <Link to="/hr-signup" onClick={() => setIsOpen(false)}>
                          <div className="px-5 py-3.5 hover:bg-indigo-50/80 rounded-[20px] transition-all duration-300 font-bold uppercase tracking-widest text-[10px] text-indigo-600 flex items-center gap-3 group cursor-pointer">
                            <div className="p-2 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                              <FiBriefcase className="text-indigo-600 size-3" />
                            </div>
                            Join as HR Manager
                          </div>
                        </Link>
                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                          <div className="px-5 py-3.5 hover:bg-slate-50/80 rounded-[20px] transition-all duration-300 font-bold uppercase tracking-widest text-[10px] text-gray-700 flex items-center gap-3 group cursor-pointer">
                            <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-slate-100 transition-colors">
                              <FiUserPlus className="text-gray-600 size-3" />
                            </div>
                            Join as Employee
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
