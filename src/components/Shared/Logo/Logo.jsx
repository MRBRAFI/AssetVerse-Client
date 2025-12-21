import { motion } from "framer-motion";

const Logo = ({ light = false }) => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer select-none">
      <div className="relative flex-shrink-0">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-10 group-hover:opacity-30 transition-opacity duration-300" />
        
        {/* Icon: Compact Isometric Diamond */}
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 15 }}
          className={`relative z-10 w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-300 ${
            light 
              ? 'bg-white border-gray-100 shadow-sm' 
              : 'bg-white/5 backdrop-blur-md border-white/10 group-hover:bg-white/10'
          }`}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-5 h-5 transition-transform duration-500 group-hover:scale-110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Hex/Diamond Structure */}
            <path
              d="M50 10L90 35V65L50 90L10 65V35L50 10Z"
              stroke={light ? "#2563eb" : "#ffffff"}
              strokeWidth="12"
              strokeLinejoin="round"
            />
            {/* Central Connectivity Pulse */}
            <motion.circle
              cx="50"
              cy="50"
              r="12"
              fill={light ? "#3b82f6" : "#ffffff"}
              animate={{ 
                r: [8, 14, 8],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>
      
      {/* Eye-Catchy Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className={`text-xl font-black tracking-tighter uppercase leading-none ${
            light ? 'text-gray-900 group-hover:text-blue-600' : 'text-white'
          } transition-colors duration-300`}>
            Asset<span className="text-blue-600">Verse</span>
          </span>
          <motion.div 
             animate={{ opacity: [1, 0.4, 1] }} 
             transition={{ duration: 1.5, repeat: Infinity }}
             className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" 
          />
        </div>
        <span className={`text-[7px] font-black tracking-[0.4em] uppercase opacity-40 leading-none mt-1 ${
          light ? 'text-gray-500' : 'text-white'
        }`}>
          Nexus System
        </span>
      </div>
    </div>
  );
};

export default Logo;
