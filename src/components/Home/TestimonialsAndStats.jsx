import React from "react";
import { motion } from "framer-motion";
import { FiStar, FiAward, FiCheckCircle, FiGlobe } from "react-icons/fi";
import Container from "../Shared/Container";

const TestimonialsAndStats = () => {
  const testimonials = [
    {
      name: "Marcus Vane",
      role: "CTO, Tech Solutions",
      content:
        "AssetVerse has significantly improved how we track our equipment across multiple locations. The interface is intuitive and efficient.",
      avatar: "https://i.pravatar.cc/150?u=marcus",
      rating: 5,
    },
    {
      name: "Elara Thorne",
      role: "Operations Manager, Global Systems",
      content:
        "The real-time management tools are excellent. We've seen a noticeable reduction in asset loss since using this platform.",
      avatar: "https://i.pravatar.cc/150?u=elara",
      rating: 5,
    },
  ];

  const stats = [
    {
      label: "Active Users",
      value: "2.5K+",
      icon: FiGlobe,
      color: "text-blue-600",
    },
    {
      label: "Managed Assets",
      value: "185K+",
      icon: FiCheckCircle,
      color: "text-indigo-600",
    },
    {
      label: "Success Rate",
      value: "99.9%",
      icon: FiAward,
      color: "text-purple-600",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Stats & Trust */}
          <div className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block py-1 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4"
              >
                Platform Statistics
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none"
              >
                Trusted by <br />
                <span className="pr-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Companies
                </span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col items-start gap-3"
                >
                  <stat.icon className={`${stat.color} text-2xl`} />
                  <div className="text-3xl font-black text-gray-900 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-500 font-medium leading-relaxed max-w-lg">
              Our platform is used by companies worldwide to manage their
              resources efficiently and securely.
            </p>
          </div>

          {/* Right: Testimonials */}
          <div className="grid grid-cols-1 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl shadow-blue-900/5 relative group"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="text-amber-400 fill-amber-400"
                      size={16}
                    />
                  ))}
                </div>
                <p className="text-lg text-gray-700 font-medium italic leading-relaxed mb-8">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg"
                  />
                  <div>
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none mb-1">
                      {t.name}
                    </h4>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                      {t.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsAndStats;
