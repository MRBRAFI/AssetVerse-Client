import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { GrLogout } from "react-icons/gr";
import { FiSettings, FiMenu, FiX, FiActivity, FiShield } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";

// User Menu
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/HrMenu";
import HrMenu from "./Menu/HrMenu";
import EmployeeMenu from "./Menu/EmployeeMenu";
import Logo from "../../Shared/Logo/Logo";

const Sidebar = ({ userInfo }) => {
  const { logOut, user } = useAuth();
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <>
      {/* Small Screen Mobile Header */}
      <div className="bg-white/90 backdrop-blur-md text-gray-800 flex justify-between md:hidden fixed top-0 left-0 right-0 z-50 px-6 border-b border-gray-100 h-16 items-center">
        <Link to="/">
          <Logo light />
        </Link>

        <button
          onClick={handleToggle}
          className="p-2.5 rounded-2xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border border-gray-100"
        >
          {isActive ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <motion.div
        animate={isActive ? "open" : "closed"}
        variants={{
          open: { x: 0 },
          closed: { x: window.innerWidth < 768 ? "-100%" : 0 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 bottom-0 z-[60] w-72 bg-white text-gray-900 flex flex-col shadow-[20px_0_60px_-15px_rgba(0,0,0,0.03)] transition-all duration-500 ease-in-out md:translate-x-0 overflow-hidden border-r border-gray-100`}
      >
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Logo Section */}
        <div className="relative px-8 pt-10 pb-8">
           <Link to="/">
            <Logo light />
          </Link>
        </div>

        {/* Status Card */}
        <div className="px-6 mb-6">
          <div className="bg-gray-50/50 border border-gray-100 rounded-[2rem] p-5 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 text-blue-500/10 group-hover:scale-125 transition-transform duration-500">
               <FiShield size={40} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">System Status</span>
              </div>
               <span className="text-xs font-black text-gray-900 uppercase tracking-tight">
                 {userInfo?.role || "ACCESS"} - ENCRYPTED
               </span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-4 overflow-y-auto no-scrollbar">
          <nav className="space-y-1">
            <p className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Core Directory</p>
            {userInfo?.role === "HR" ? (
              <HrMenu />
            ) : userInfo?.role === "EMPLOYEE" ? (
              <EmployeeMenu />
            ) : (
              <div className="px-4 py-8 text-center text-gray-400 text-sm italic">
                Synchronizing access...
              </div>
            )}
          </nav>
        </div>

        {/* User Info & Footer Section */}
        <div className="relative mt-auto p-6 border-t border-gray-100 bg-white/50 backdrop-blur-md">
            {/* Minimal User Profile */}
            <div className="flex items-center gap-4 mb-6 px-2 group cursor-pointer" onClick={() => window.location.href='/dashboard/profile'}>
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-10 transition-opacity" />
                <img 
                  src={user?.photoURL || "/placeholder-avatar.png"} 
                  alt="User" 
                  className="relative w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md group-hover:border-blue-500/50 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-gray-900 truncate max-w-[140px] leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                  {user?.displayName || "Operator"}
                </span>
                <span className="text-[10px] font-bold text-gray-400 truncate max-w-[140px] tracking-tight">
                  {user?.email}
                </span>
              </div>
            </div>

            <div className="space-y-2">
               <MenuItem
                icon={FiSettings}
                label="Settings"
                address="/dashboard/profile"
              />
              <button
                onClick={logOut}
                className="group flex w-full items-center px-4 py-3.5 text-gray-400 hover:text-red-500 transition-all duration-300 rounded-2xl hover:bg-red-50"
              >
                <div className="p-2.5 rounded-xl bg-gray-50 group-hover:bg-red-500/10 transition-colors">
                  <GrLogout size={18} />
                </div>
                <span className="mx-4 text-sm font-black uppercase tracking-widest leading-none">Logout System</span>
              </button>
            </div>
            
            <div className="mt-8 text-center">
               <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.4em]">AssetVerse Infrastructure &copy; 2025</span>
            </div>
        </div>
      </motion.div>

      {/* Overlay for Mobile */}
      {isActive && (
        <div
          onClick={handleToggle}
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-50 md:hidden transition-all duration-500"
        />
      )}
    </>
  );
};

export default Sidebar;
