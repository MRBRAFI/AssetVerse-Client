import React from "react";
import { motion } from "framer-motion";
import { FiMonitor, FiShield, FiZap, FiUsers, FiPieChart, FiGlobe } from "react-icons/fi";
import Container from "../Shared/Container";

const Features = () => {
  const features = [
    {
      icon: FiMonitor,
      title: "Real-Time Tracking",
      description: "Live tracking of all assets across your entire organization with high precision.",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: FiShield,
      title: "Enhanced Security",
      description: "Enterprise-grade protection layer ensuring your data remains secure and compliant.",
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      icon: FiZap,
      title: "Easy Assignment",
      description: "Streamlined asset distribution system allowing management to assign resources efficiently.",
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      icon: FiUsers,
      title: "Employee Sync",
      description: "Automated user management and role-based access control for seamless onboarding.",
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      icon: FiPieChart,
      title: "Advanced Analytics",
      description: "Powerful analytical tools providing insights into resource usage and lifecycle costs.",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      icon: FiGlobe,
      title: "Unified Platform",
      description: "A centralized directory for company assets, accessible from anywhere.",
      color: "text-rose-500",
      bg: "bg-rose-50"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full blur-3xl opacity-50" />
      
      <Container>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4"
          >
            Current Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Core Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-500 font-medium max-w-2xl mx-auto uppercase text-xs tracking-widest leading-loose"
          >
            Empowering modern businesses with efficient asset management solutions and automated workflows.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className={`${feature.bg} ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
