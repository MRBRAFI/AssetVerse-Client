import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";
import Container from "../Shared/Container";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How secure is the asset management system?",
      answer:
        "We use standard encryption and security protocols to ensure that all your asset data is protected against unauthorized access.",
    },
    {
      question: "Can I import existing data?",
      answer:
        "Yes, our system supports bulk data imports via CSV and JSON, allowing you to quickly set up your inventory.",
    },
    {
      question: "What is the employee limit?",
      answer:
        "The number of employees you can manage depends on your subscription plan. Our higher tiers support larger teams and multiple departments.",
    },
    {
      question: "Does it work on mobile devices?",
      answer:
        "Yes, the AssetVerse platform is fully responsive and works on all modern mobile devices, allowing you to track assets on the go.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block py-1 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4"
            >
              Support
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none"
            >
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Questions
              </span>
            </motion.h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span
                    className={`text-sm font-black uppercase tracking-widest transition-colors ${
                      activeIndex === index
                        ? "text-blue-600"
                        : "text-gray-700 group-hover:text-blue-500"
                    }`}
                  >
                    {index + 1}. {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-xl transition-all ${
                      activeIndex === index
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                    }`}
                  >
                    {activeIndex === index ? <FiMinus /> : <FiPlus />}
                  </div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-gray-500 font-medium leading-relaxed text-sm border-t border-gray-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
