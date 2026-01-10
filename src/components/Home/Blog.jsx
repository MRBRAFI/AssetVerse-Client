import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiUser } from "react-icons/fi";
import Container from "../Shared/Container";

const posts = [
  {
    title: "Best Practices for IT Asset Management in 2026",
    excerpt: "Learn how to optimize your lifecycle management with these 5 industry-standard strategies.",
    author: "Rafi Rahman",
    date: "Jan 10, 2026",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "The Rise of Digital Asset Custody Platforms",
    excerpt: "Exploring the shift from physical inventory to decentralized digital asset management.",
    author: "Sarah Chen",
    date: "Jan 08, 2026",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "How Al is Revolutionizing Inventory Audits",
    excerpt: "Automated scan technologies are reducing human error in warehouse audits by up to 95%.",
    author: "Alex Johnson",
    date: "Jan 05, 2026",
    category: "Technology",
    image: "https://i.ibb.co.com/wh6j06Bn/nano-banana-2025-10-24-T04-48-57.png",
  },
];

const Blog = () => {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4"
            >
              Industry Insights
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter"
            >
              Latest from the <span className="text-blue-600">Verse</span>
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-sm hover:text-blue-700 transition-colors"
          >
            View All Posts <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 rounded-[32px] overflow-hidden mb-6 shadow-xl shadow-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-blue-600 uppercase">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="text-blue-500" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiUser className="text-blue-500" /> {post.author}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read More <FiArrowRight />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Blog;
