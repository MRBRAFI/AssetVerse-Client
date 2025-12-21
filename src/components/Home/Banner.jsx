import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Container from "../Shared/Container";
import useAuth from "../../hooks/useAuth";
import Button from "../Shared/Button/Button";

const Banner = () => {
  const heroImage = "https://i.ibb.co.com/9m17TPPk/download-1-1.jpg";

  const { user } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger effect for children
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
      {/* Background decoration */}
      {/* Background decoration */}

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            className="order-2 md:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Asset Intelligence
                </span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-black text-gray-900 leading-none mb-8 uppercase tracking-tighter"
            >
              Track, Secure, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Nexus Assets
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed"
            >
              AssetVerse helps teams verify and manage both physical and digital
              assets in one unified platform. Simplify audits, reduce downtime,
              and gain total visibility.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-5 flex-col sm:flex-row mb-12"
            >
              {!user && (
                  <Button 
                    label="Initialize Nexus"
                    variant="primary"
                    size="lg"
                    onClick={() => window.dispatchEvent(new Event("blink-profile"))}
                  />
              )}
              <Link to="/contact-us">
                <Button 
                  label="Reserve Demo"
                  variant="secondary"
                  size="lg"
                />
              </Link>
            </motion.div>

            {/* Trust Badges / Social Proof */}
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-gray-100"
            >
              <p className="text-sm font-medium text-gray-500 mb-4">
                Trusted by operational teams worldwide
              </p>
              <div className="flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholders for logos - replacing text with visual blocks for now or simple text */}
                <span className="font-bold text-xl text-gray-400">
                  TechCorp
                </span>
                <span className="font-bold text-xl text-gray-400">
                  LogistiX
                </span>
                <span className="font-bold text-xl text-gray-400">
                  SecureSys
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            className="order-1 md:order-2 relative z-10"
            variants={containerVariants} // Use container to sync, or separate initial
            initial="hidden"
            animate="visible"
          >
            {/* Floating Main Image */}
            <motion.div
              variants={imageVariants}
              animate={floatAnimation} // Overrides variants animate for y, but keeps initial scale/fade
              className="relative"
            >
              {/* Decorative blob behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-20 transform rotate-3 scale-105" />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                <img
                  src={heroImage}
                  alt="AssetVerse Dashboard"
                  className="w-full h-auto object-cover"
                />

                {/* Glassmorphic Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/60">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-800">
                        System Status
                      </span>
                      <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          99.9%
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          Uptime
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-indigo-600">
                          12k+
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          Assets
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          SOC2
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          Secure
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
