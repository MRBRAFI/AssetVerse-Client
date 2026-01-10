import React from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import Container from "../Shared/Container";

const Newsletter = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-blue-600 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-800 opacity-90 -z-10" />
      
      {/* Decorative SVG Patterns */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-white/10 backdrop-blur-xl border border-white/20 p-8 lg:p-16 rounded-[48px] shadow-2xl relative overflow-hidden">
            {/* Inner Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
            
            <div className="flex-1 text-center lg:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter"
              >
                Join the <span className="text-blue-200">Asset</span> Revolution
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-blue-100 text-lg mb-8 leading-relaxed max-w-md mx-auto lg:mx-0"
              >
                Get monthly deep dives into predictive maintenance, digital asset security, and supply chain optimization.
              </motion.p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-blue-100/80 font-medium text-sm">
                <span className="flex items-center gap-1.5"><FiCheckCircle className="text-blue-300" /> Weekly Insights</span>
                <span className="flex items-center gap-1.5"><FiCheckCircle className="text-blue-300" /> No Spam</span>
                <span className="flex items-center gap-1.5"><FiCheckCircle className="text-blue-300" /> Exclusive Offers</span>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                onSubmit={(e) => e.preventDefault()}
                className="relative"
              >
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-6 pr-32 py-5 rounded-2xl bg-white border-2 border-transparent focus:border-blue-400 outline-none text-gray-900 font-medium shadow-xl transition-all"
                  />
                  <button className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2 group">
                    Join <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
                <p className="mt-4 text-xs text-blue-200/60 text-center lg:text-left px-2 leading-relaxed">
                  By subscribing, you agree to our Privacy Policy and consent to receive marketing communications.
                </p>
              </motion.form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
