/* eslint-disable no-unused-vars */
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `group flex items-center px-4 py-3.5 my-1 transition-all duration-300 rounded-2xl relative overflow-hidden ${
          isActive
            ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500 shadow-[20px_0_40px_-20px_rgba(59,130,246,0.15)]"
            : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`p-2.5 rounded-xl transition-colors duration-300 flex items-center justify-center ${
            isActive ? "bg-blue-500/10" : "bg-gray-50 group-hover:bg-white border border-transparent group-hover:border-gray-100 shadow-sm transition-all"
          }`}>
            <Icon size={18} className="shrink-0" />
          </div>

          <span className={`mx-4 text-xs font-black uppercase tracking-widest leading-none ${
            isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-900"
          }`}>
            {label}
          </span>

          {/* Active Glow Indicator */}
          {isActive && (
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]" />
          )}
        </>
      )}
    </NavLink>
  );
};

export default MenuItem;
