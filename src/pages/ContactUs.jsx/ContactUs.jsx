import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import Container from "../../components/Shared/Container";

const ContactUs = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="relative min-h-screen pt-24 pb-12 overflow-hidden flex items-center justify-center">
      {/* Intense Background Glow (Same as Banner) */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/40 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            x: [0, -60, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute top-[30%] left-[20%] w-80 h-80 bg-purple-400/30 rounded-full blur-[100px]"
        />
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl bg-white/60 border border-white/40">
            {/* Left Column: Contact Info */}
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

              <motion.div variants={itemVariants} className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Get in Touch</h3>
                <p className="text-blue-100 mb-10 leading-relaxed">
                  Have questions about AssetVerse? We're here to help you
                  optimize your team's workflow.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <FiPhone className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200 uppercase font-semibold tracking-wider">
                        Phone
                      </p>
                      <p className="font-medium">+8801971789176</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <FiMail className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200 uppercase font-semibold tracking-wider">
                        Email
                      </p>
                      <p className="font-medium">devmrbrafi@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <FiMapPin className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200 uppercase font-semibold tracking-wider">
                        Office
                      </p>
                      <p className="font-medium">
                        Panchagarh sadar, Panchagarh
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-20 flex gap-4">
                  {/* Social circles or minimal footer */}
                  <div className="w-8 h-8 rounded-full bg-white/20 cursor-pointer hover:bg-white/40 transition"></div>
                  <div className="w-8 h-8 rounded-full bg-white/20 cursor-pointer hover:bg-white/40 transition"></div>
                  <div className="w-8 h-8 rounded-full bg-white/20 cursor-pointer hover:bg-white/40 transition"></div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-3 p-10 lg:p-14 bg-white/40 relative">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-500 mb-8">
                We'll get back to you within 24 hours.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="MRB"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="RAFI"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="MRB@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600 ml-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-lg bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#2563eb" }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-300/50 flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                >
                  <span>Send Message</span>
                  <FiSend />
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ContactUs;
