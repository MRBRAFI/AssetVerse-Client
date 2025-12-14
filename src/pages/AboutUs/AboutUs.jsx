import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiAward, FiTrendingUp, FiStar } from "react-icons/fi";
import Container from "../../components/Shared/Container";

const AboutUs = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Operations Manager",
      company: "TechFlow Inc.",
      content:
        "AssetVerse transformed how we track our hardware. The interface is stunning and so intuitive. We cut our audit time by 70%.",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      id: 2,
      name: "David Chen",
      role: "IT Director",
      company: "InnovateX",
      content:
        "Finally, an asset management tool that doesn't look like it was built in 1995. The whole team actually enjoys using it.",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "HR Lead",
      company: "Creative Co.",
      content:
        "Seamless onboarding for new employees. Assigning assets takes seconds now. Highly recommended!",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    },
  ];

  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-white/50">
      {/* Background Glow Animation */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px]"
        />
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-20">
            <motion.span
              variants={itemVariants}
              className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase mb-4"
            >
              Our Story
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
            >
              We are on a mission to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                simplify asset management.
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Founded in 2024, AssetVerse was born from the frustration of clunky, outdated spreadsheets. 
              We believe managing your company's physical and digital assets should be as beautiful as it is efficient.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
          >
            {[
              { label: "Active Users", value: "12,000+", icon: FiUsers, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Assets Tracked", value: "500K+", icon: FiTrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
              { label: "Industry Awards", value: "15+", icon: FiAward, color: "text-purple-600", bg: "bg-purple-50" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/60 backdrop-blur-md border border-white/50 p-8 rounded-2xl shadow-lg text-center"
              >
                <div className={`w-14 h-14 mx-auto ${stat.bg} ${stat.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
                  <stat.icon />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Reviews Section */}
          <div className="mb-16">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Loved by Teams Everywhere</h2>
              <p className="text-gray-600">Don't just take our word for it.</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col h-full"
                >
                  <div className="flex items-center gap-1 mb-4 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6 flex-grow">"{review.content}"</p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                      <p className="text-xs text-gray-500">{review.role}, {review.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA Bottom */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
            
            <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to optimize your workflow?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10">
              Join thousands of teams who trust AssetVerse significantly.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all relative z-10"
            >
              Get Started Now
            </motion.button>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
};

export default AboutUs;
