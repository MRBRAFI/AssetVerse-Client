import React from "react";
import { motion } from "framer-motion";

const BackgroundGlow = () => {
  return (
    <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/40 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.6, 1],
          x: [0, -60, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[140px]"
      />
      <motion.div
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute top-[30%] left-[20%] w-80 h-80 bg-purple-400/30 rounded-full blur-[100px]"
      />
    </div>
  );
};

export default BackgroundGlow;
