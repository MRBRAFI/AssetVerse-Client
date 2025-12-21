import { motion } from "framer-motion";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`relative w-full ${
        smallHeight ? "h-[200px]" : "h-screen"
      } flex items-center justify-center bg-white overflow-hidden`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {/* Futuristic Spinner Core */}
        <div className="relative w-32 h-32 mb-12">
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-[2.5rem] border-[3px] border-blue-500/10 border-t-blue-500 border-r-blue-500/40"
          />
          
          {/* Middle Ring - Reverse */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-[2rem] border-[3px] border-indigo-500/10 border-b-indigo-500 border-l-indigo-500/40"
          />

          {/* Inner Pulsing Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_15px_white]" />
            </motion.div>
          </div>

          {/* Orbiting Particles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
          </motion.div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-3">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            {"LOADING".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut" 
                }}
                className="text-lg font-black tracking-[0.4em] text-gray-900"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
          />
          
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Nexus System Synchronizing</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
