import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiArrowLeft, FiHome } from "react-icons/fi";

const ErrorPage = () => {
  const navigate = useNavigate();

  // Floating animation for the 404 visual
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white/10">
      {/* Background Glow Animation */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-red-200/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/40 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg p-4"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-10 text-center">
          
          <motion.div 
            variants={floatVariants}
            animate="animate"
            className="inline-flex justify-center items-center w-24 h-24 mb-6 rounded-full bg-red-50 text-red-500 shadow-inner"
          >
            <FiAlertTriangle className="text-5xl" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2 tracking-tight">
            Oops!
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-600 mb-6">
            Something went wrong here.
          </p>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold shadow-sm hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center gap-2 transition-all"
            >
              <FiArrowLeft />
              <span>Go Back</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-200 hover:shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <FiHome />
              <span>Home Page</span>
            </motion.button>
          </div>
        </div>

        {/* Decorative elements on the card */}
        <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500/20 rounded-full blur-xl -z-10"></div>
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-500/20 rounded-full blur-xl -z-10"></div>
      </motion.div>
    </section>
  );
};

export default ErrorPage;
