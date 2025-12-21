import React from "react";
import { motion } from "framer-motion";
import { FiUserPlus, FiLayers, FiActivity, FiArrowRight } from "react-icons/fi";
import Container from "../Shared/Container";

const HowItWorks = () => {
  const steps = [
    {
      icon: FiUserPlus,
      title: "Create Account",
      description: "Securely establish your company profile or individual employee account within our system.",
      color: "bg-blue-600",
      shadow: "shadow-blue-200"
    },
    {
      icon: FiLayers,
      title: "List Assets",
      description: "Organize and categorize your business resources with our easy-to-use inventory management tools.",
      color: "bg-indigo-600",
      shadow: "shadow-indigo-200"
    },
    {
      icon: FiActivity,
      title: "Track & Manage",
      description: "Real-time tracking and management of assets across your organization with helpful reporting.",
      color: "bg-purple-600",
      shadow: "shadow-purple-200"
    }
  ];

  return (
    <section className="py-24 bg-gray-50/50 relative overflow-hidden">
      <Container>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4"
          >
            Our Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none"
          >
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Works</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-y-12 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-24 h-24 rounded-[2rem] ${step.color} ${step.shadow} flex items-center justify-center text-white mb-8 shadow-2xl relative group-hover:scale-110 transition-transform duration-500`}>
                  <step.icon size={36} />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-white text-gray-900 flex items-center justify-center font-black text-sm border-4 border-gray-50">
                    0{index + 1}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed max-w-xs text-sm">
                  {step.description}
                </p>

                {index < 2 && (
                  <div className="lg:hidden my-8 text-gray-200">
                    <FiArrowRight size={32} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
