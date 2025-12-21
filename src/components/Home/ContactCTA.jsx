import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiZap } from "react-icons/fi";
import { Link } from "react-router";
import Container from "../Shared/Container";
import Button from "../Shared/Button/Button";

const ContactCTA = () => {
  return (
    <section className="py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 md:p-20 overflow-hidden shadow-2xl shadow-blue-500/20"
        >
          {/* Animated Background Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-blue-100 text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-white/10">
                <FiZap className="animate-pulse" /> Get Started
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                Ready to Manage <br />
                Your <span className="opacity-50">Assets?</span>
              </h2>
              <p className="text-lg text-blue-100 font-medium leading-relaxed opacity-90 max-w-xl">
                Join over 100 companies managing their business assets efficiently with the AssetVerse platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/contact-us">
                <Button
                  label="Contact Us"
                  variant="secondary"
                  size="lg"
                  icon={FiMail}
                />
              </Link>
              <Link to="/login">
                <Button
                  label="Join Now"
                  variant="primary"
                  size="lg"
                  icon={FiArrowRight}
                  className="bg-white text-blue-600 border-white hover:bg-blue-50 hover:text-blue-700 !shadow-none"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ContactCTA;
