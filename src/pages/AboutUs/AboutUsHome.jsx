import React from "react";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiLayers,
  FiShield,
  FiArrowRight,
  FiPieChart,
} from "react-icons/fi";
import { Link } from "react-router"; // or "react-router-dom" depending on version, seeing "react-router" in Routes.jsx
import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";

const AboutUsHome = () => {
  const benefits = [
    {
      icon: FiActivity,
      title: "Real-Time Tracking",
      description:
        "Monitor assets across all locations instantly. Know exactly who has what, when, and where.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: FiLayers,
      title: "Seamless Integration",
      description:
        "Works flawlessly with your existing HR workflows. Onboard employees and assign assets in seconds.",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: FiShield,
      title: "Enterprise Security",
      description:
        "Bank-grade data protection ensures your sensitive company information stays private and compliant.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: FiPieChart,
      title: "Smart Analytics",
      description:
        "Make data-driven decisions with powerful insights into asset utilization and lifecycle costs.",
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase mb-6">
              Who We Are
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-none uppercase tracking-tighter">
              Empowering Teams with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Smarter Asset Nexus
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              AssetVerse isn't just a tracking tool; it's a complete ecosystem
              designed to streamline how modern companies manage their physical
              and digital resources. We help you cut costs, reduce loss, and
              focus on what matters—growth.
            </p>

            <Link to="/about-us">
              <Button 
                label="Initialize Story"
                variant="ghost"
                size="md"
                icon={FiArrowRight}
              />
            </Link>
          </motion.div>

          {/* Right Content - Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div
                  className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-xl mb-4`}
                >
                  <item.icon />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUsHome;
