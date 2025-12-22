import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
  FiBriefcase,
  FiHash,
  FiClock,
  FiAward,
} from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import BackgroundGlow from "../../../components/Shared/BackgroundGlow";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setUserInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  if (loading) return <LoadingSpinner />;

  const isPremium = userInfo?.subscription === "premium";

  const GlitterEffect = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-amber-400 rounded-full blur-[1px] shadow-[0_0_10px_#fbbf24]"
          />
        ))}
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      className={`relative min-h-[calc(100vh-100px)] flex items-center justify-center p-4 md:p-8 overflow-hidden transition-all duration-1000 ${
        isPremium
          ? "bg-gradient-to-br from-amber-50 via-yellow-100/30 to-orange-50"
          : ""
      }`}
    >
      <BackgroundGlow />
      {isPremium && <GlitterEffect />}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`w-full max-w-4xl bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border shadow-2xl overflow-hidden relative z-10 transition-all duration-500 ${
          isPremium
            ? "border-amber-400/50 shadow-amber-400/20"
            : "border-white/50"
        }`}
      >
        {/* Header/Cover Section */}
        <div
          className={`relative h-48 md:h-64 overflow-hidden transition-all duration-500 ${
            isPremium
              ? "bg-gradient-to-r from-amber-500 via-yellow-600 to-orange-600"
              : "bg-gradient-to-r from-blue-600 to-indigo-700"
          }`}
        >
          {/* Animated background elements */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />

          <div className="absolute inset-0 bg-black/10" />

          {/* Cover Info */}
          <div className="absolute bottom-6 left-8 md:left-12 flex items-end gap-6 text-white">
            <motion.div whileHover={{ scale: 1.05 }} className="relative group">
              <img
                alt="profile"
                src={user?.photoURL}
                className="w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover border-4 border-white shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 rounded-3xl bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            </motion.div>

            <div className="mb-2">
              <motion.h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-2">
                {user?.displayName}
              </motion.h1>
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 shadow-sm">
                  <FiShield size={12} className="text-blue-300" />
                  {userInfo?.role || "User"} Account
                </div>

                {userInfo?.role === "HR" && (
                  <motion.div
                    animate={
                      userInfo?.subscription === "premium"
                        ? {
                            boxShadow: [
                              "0 0 0px #fbbf24",
                              "0 0 20px #fbbf24",
                              "0 0 0px #fbbf24",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`
                      inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm backdrop-blur-md
                      ${
                        userInfo?.subscription === "premium"
                          ? "bg-gradient-to-r from-amber-400 to-yellow-600 text-white border-amber-300"
                          : userInfo?.subscription === "standard"
                          ? "bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800 border-gray-300"
                          : "bg-white/20 text-white border-white/20"
                      }
                    `}
                  >
                    <FiAward
                      size={12}
                      className={
                        userInfo?.subscription === "premium"
                          ? "animate-bounce"
                          : ""
                      }
                    />
                    {userInfo?.subscription || "basic"} Tier
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Basic Info */}
            <div className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 border-b border-gray-100 pb-4">
                Personal Identification
              </h2>

              <div className="space-y-6">
                {[
                  {
                    label: "Full Name",
                    value: user?.displayName,
                    icon: FiUser,
                  },
                  { label: "Email Address", value: user?.email, icon: FiMail },
                  {
                    label: "Member ID",
                    value: `#${user?.uid?.slice(0, 8).toUpperCase()}`,
                    icon: FiHash,
                  },
                  {
                    label: "Account Role",
                    value: userInfo?.role,
                    icon: FiShield,
                    color: "text-blue-600",
                  },
                ].map((info, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                        {info.label}
                      </p>
                      <p
                        className={`text-sm font-bold ${
                          info.color || "text-gray-900"
                        }`}
                      >
                        {info.value || "Not Specified"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Organizational Details */}
            <div className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 border-b border-gray-100 pb-4">
                System Affiliations
              </h2>

              <div className="space-y-6">
                {userInfo?.role === "HR" ? (
                  <>
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                        <FiBriefcase size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                          Organization
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {userInfo?.companyName || "AssetVerse Global"}
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all overflow-hidden p-2">
                        <img
                          src={userInfo?.companyLogo}
                          alt="logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                          Company Logo
                        </p>
                        <p className="text-sm font-bold text-gray-900 italic">
                          Verified Asset
                        </p>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                        <FiCalendar size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                          Birth Date
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {userInfo?.dateOfBirth || "Restricted Info"}
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                        <FiClock size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                          Status
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          Verified Active
                        </p>
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Subscription Card for HR */}
                {userInfo?.role === "HR" && (
                  <motion.div
                    variants={itemVariants}
                    className={`
                      relative mt-8 p-6 rounded-[2rem] overflow-hidden border
                      ${
                        userInfo?.subscription === "premium"
                          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 border-amber-500/50 text-white shadow-2xl"
                          : userInfo?.subscription === "standard"
                          ? "bg-gradient-to-br from-slate-100 to-gray-200 border-blue-400/30 text-gray-900 shadow-xl"
                          : "bg-gray-50 border-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {/* Animated Shine for Premium */}
                    {userInfo?.subscription === "premium" && (
                      <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                      />
                    )}

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <p
                          className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                            userInfo?.subscription === "premium"
                              ? "text-amber-400"
                              : "text-gray-400"
                          }`}
                        >
                          Membership Status
                        </p>
                        <FiAward
                          className={
                            userInfo?.subscription === "premium"
                              ? "text-amber-400 animate-pulse"
                              : "text-blue-600"
                          }
                          size={24}
                        />
                      </div>
                      <h3
                        className={`text-2xl font-black uppercase tracking-tighter leading-none mb-2 ${
                          userInfo?.subscription === "premium"
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500"
                            : ""
                        }`}
                      >
                        {userInfo?.subscription || "Basic"} Protocol
                      </h3>
                      <p
                        className={`text-xs font-medium opacity-80 ${
                          userInfo?.subscription === "premium"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {userInfo?.subscription === "premium"
                          ? "You are operating on the highest tier with unlimited employee nodes and priority resource routing."
                          : userInfo?.subscription === "standard"
                          ? "Enhanced account features with expanded fleet capacity and advanced analytics."
                          : "Standard operational access with core asset tracking capabilities."}
                      </p>
                    </div>

                    {/* Royal Decoration for Premium */}
                    {userInfo?.subscription === "premium" && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    )}
                  </motion.div>
                )}

                {/* Footer Badge */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 flex items-center justify-between"
                >
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Security Level:{" "}
                    <span className="text-blue-600">Standard</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
    </div>
  );
};

export default Profile;
