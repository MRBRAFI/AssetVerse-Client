import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiCheck, FiPackage, FiAlertCircle } from "react-icons/fi";
import Container from "../../../components/Shared/Container";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/packages");
        setPackages(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
        setError("Failed to load packages. Please try again later.");
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-red-500 gap-4">
        <FiAlertCircle className="text-5xl" />
        <p className="text-xl font-semibold">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-white/50">
      {/* Background Decor - consistent with theme */}


      <Container>
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase mb-4"
          >
            Pricing Plans
          </motion.span>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Choose the perfect plan for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              your team's growth
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Simple, transparent pricing. No hidden fees. Start optimizing your assets today.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {packages.map((pkg, index) => {
            // Determine styling based on package name usually, but we can alternate or use specific logic
            const isPopular = pkg.name === "Standard";
            const borderColor = isPopular ? "border-blue-500" : "border-white/60";
            const shadow = isPopular ? "shadow-2xl shadow-blue-200/50" : "shadow-xl";
            const scale = isPopular ? { y: -20 } : {};

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: isPopular ? -30 : -10 }}
                className={`relative bg-white/70 backdrop-blur-xl border ${borderColor} rounded-3xl p-8 flex flex-col ${shadow}`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <FiPackage className={isPopular ? "text-blue-600" : "text-gray-400"} />
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">${pkg.price}</span>
                    <span className="text-gray-500 font-medium">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Up to <span className="font-bold text-gray-800">{pkg.employeeLimit} Employees</span>
                  </p>
                </div>

                <div className="flex-grow space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-gray-600">
                      <div className={`mt-1 p-0.5 rounded-full ${isPopular ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                        <FiCheck className="text-xs" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all duration-300 ${
                    isPopular 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:opacity-90" 
                      : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default Packages;
