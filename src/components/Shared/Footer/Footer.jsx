import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhone, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-gray-50 pt-20 pb-10 overflow-hidden border-t border-gray-100">
      {/* Subtle Background Glow for Footer Anchor */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[20%] -left-[10%] w-96 h-96 bg-blue-200/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -top-[20%] -right-[10%] w-80 h-80 bg-purple-200/30 rounded-full blur-[80px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col items-start gap-6">
            <img
              src="https://i.ibb.co.com/8nFLkgbk/Asset-Verse-Logo-5.png"
              alt="AssetVerse"
              width="120"
              height="120"
              className="mb-2"
            />
            <p className="text-gray-600 leading-relaxed text-sm">
              AssetVerse is the ultimate platform for tracking, securing, and
              optimizing your team's assets. Simplify your workflow today.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {[
                {
                  Icon: FaFacebookF,
                  href: "https://www.facebook.com/m.r.b.rafi.2025",
                },
                {
                  Icon: FaLinkedinIn,
                  href: "https://www.linkedin.com/in/mrbrafi2005",
                },
                { Icon: FaGithub, href: "https://github.com/MRBRAFI" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  whileHover={{ y: -3, color: "#2563EB" }}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 shadow-sm transition-colors hover:border-blue-200"
                >
                  <item.Icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Contact", href: "/contact-us" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-200 group-hover:bg-blue-600 transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:devmrbrafi@gmail.com"
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-1 p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <MdEmail />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-semibold">
                      Email
                    </span>
                    <span className="text-sm text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                      devmrbrafi@gmail.com
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801971789176"
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-1 p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FiPhone />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-semibold">
                      Phone
                    </span>
                    <span className="text-sm text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                      +880 1971-789176
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="http://Wa.me/+8801971789176"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-1 p-2 rounded-lg bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-semibold">
                      Whatsapp
                    </span>
                    <span className="text-sm text-gray-700 font-medium group-hover:text-green-600 transition-colors">
                      Chat Now
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our newsletter for the latest asset management tips.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                <FiSend className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} AssetVerse. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
