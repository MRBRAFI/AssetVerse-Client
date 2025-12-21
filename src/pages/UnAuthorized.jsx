import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiLock, FiHome, FiArrowLeft } from "react-icons/fi";

const UnAuthorized = () => {
  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[100px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-indigo-50/50 p-10 text-center">
          {/* Icon Container */}
          <motion.div
            variants={floatVariants}
            animate="animate"
            className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-indigo-200"
          >
            <FiLock className="text-4xl text-white" />
          </motion.div>

          {/* Text Content */}
          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
            Restricted Access
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            <span className="font-semibold text-indigo-600">This is not your place</span>. You don't have the necessary role to access the dashboard yet.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-4 px-6 rounded-2xl font-bold hover:bg-gray-800 transition-all duration-300 shadow-lg shadow-gray-200"
            >
              <FiHome />
              Back to Home
            </Link>
            
            <p className="text-sm text-gray-400">
              Please contact HR or join a company to get started.
            </p>
          </div>
        </div>

        {/* Dynamic Accents */}
        <div className="absolute -z-10 -top-4 -left-4 w-12 h-12 bg-indigo-500/10 rounded-2xl blur-sm" />
        <div className="absolute -z-10 -bottom-4 -right-4 w-12 h-12 bg-blue-500/10 rounded-2xl blur-sm" />
      </motion.div>
    </div>
  );
};

export default UnAuthorized;
