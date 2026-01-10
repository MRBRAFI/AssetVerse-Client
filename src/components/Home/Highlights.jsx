import React from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiShield, FiZap, FiCpu } from "react-icons/fi";
import Container from "../Shared/Container";

const highlights = [
  {
    icon: FiTrendingUp,
    title: "Yield Optimization",
    description:
      "Maximize asset utilization with our Al-driven predictive maintenance and allocation algorithms.",
    color: "blue",
  },
  {
    icon: FiShield,
    title: "Ironclad Security",
    description:
      "Multi-layered encryption and blockchain-based audit trails for every single asset transaction.",
    color: "blue",
  },
  {
    icon: FiZap,
    title: "Instant Verification",
    description:
      "Verify digital assets and physical serial codes in real-time with our mobile companion app.",
    color: "blue",
  },
  {
    icon: FiCpu,
    title: "Smart Integration",
    description:
      "Seamlessly connect with your existing ERP, CRM, and cloud infrastructure via our robust API.",
    color: "blue",
  },
];

const Highlights = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      

      <Container>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 mb-4"
          >
            <span className="text-xs font-bold uppercase tracking-widest">
              Platform Highlights
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter"
          >
            Empowering Your <span className="text-blue-600">Enterprise</span>{" "}
            Workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Discover the core advantages that make AssetVerse the preferred
            choice for modern teams managing high-value assets.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[32px] shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group cursor-default hover:cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-${item.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-${item.color}-600 group-hover:text-white transition-all duration-300`}
              >
                <item.icon
                  className={`text-2xl text-${item.color}-600 group-hover:text-white transition-colors`}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Highlights;
