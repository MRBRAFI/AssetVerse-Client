import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiMail,
  FiBriefcase,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import { Cake } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/Shared/Container";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch team data
  const { data: teamData, isLoading } = useQuery({
    queryKey: ["my-team"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-team");
      return res.data;
    },
  });

  // Set default selected company when data loads
  React.useEffect(() => {
    if (teamData?.companies?.length > 0 && !selectedCompany) {
      setSelectedCompany(teamData.companies[0].companyName);
    }
  }, [teamData, selectedCompany]);

  // Get current company data
  const currentCompany = useMemo(() => {
    return teamData?.companies?.find((c) => c.companyName === selectedCompany);
  }, [teamData, selectedCompany]);

  // Filter team members by search query
  const filteredTeam = useMemo(() => {
    if (!currentCompany) return [];
    return currentCompany.teamMembers.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentCompany, searchQuery]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!teamData?.companies || teamData.companies.length === 0) {
    return (
      <section className="min-h-screen bg-[#f8fbff] py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="p-8 bg-gray-50 rounded-full mb-6 inline-block">
            <FiUsers className="text-6xl text-gray-200" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">
            No Team Found
          </h3>
          <p className="text-gray-400 font-medium">
            You are not affiliated with any company yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f8fbff] py-12">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-4 border border-blue-100"
            >
              <FiUsers className="text-blue-500" />
              <span>Workspace Directory</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
            >
              Collaborate with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Remarkable Talent
              </span>
            </motion.h1>
            <p className="mt-6 text-lg text-gray-500 font-medium max-w-lg">
              Navigate through our ecosystem and connect with your colleagues
              across different departments and companies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
            {/* Elegant Dropdown */}
            <div className="relative w-full sm:w-72 group">
              <label className="absolute -top-6 left-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Select Company
              </label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="appearance-none block w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-5 pr-12 text-gray-700 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer shadow-lg shadow-gray-200/20"
              >
                {teamData.companies.map((company) => (
                  <option key={company.hrEmail} value={company.companyName}>
                    {company.companyName}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:rotate-180 transition-transform duration-300" />
            </div>

            {/* Futuristic Search */}
            <div className="relative w-full sm:w-80 group">
              <label className="absolute -top-6 left-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Global Search
              </label>
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Name of colleague..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-gray-700 font-medium placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-lg shadow-gray-200/20"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          {/* TEAM MEMBERS GRID */}
          <div className="lg:col-span-3">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredTeam.map((member) => (
                  <motion.div
                    key={member._id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    className="group bg-white rounded-[2rem] p-8 border border-white shadow-2xl shadow-blue-900/5 relative overflow-hidden flex flex-col items-center"
                  >
                    {/* "ME" Banner */}
                    {member.email === user?.email && (
                      <div className="absolute top-4 left-0 z-20">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-r-full shadow-lg border-y border-r border-white/20 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          ME
                        </div>
                      </div>
                    )}

                    {/* Hover Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-[4rem] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 ease-in-out" />

                    <div className="relative z-10 w-full flex flex-col items-center">
                      {/* Avatar with Ring */}
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="relative p-1.5 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl group-hover:rotate-6 transition-transform duration-500">
                          <img
                            src={member.photo || "/placeholder-avatar.png"}
                            alt={member.name}
                            className="w-24 h-24 rounded-[1.25rem] object-cover border-4 border-white shadow-xl"
                          />
                        </div>
                      </div>

                      <h3 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                        {member.name}
                      </h3>
                      <span className="text-xs font-black text-blue-500/80 bg-blue-50 px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
                        {member.position}
                      </span>

                      <div className="w-full space-y-4 pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-4 text-gray-400 group-hover:text-gray-600 transition-colors">
                          <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                            <FiMail className="text-lg" />
                          </div>
                          <span className="text-sm font-semibold truncate leading-none">
                            {member.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 group-hover:text-gray-600 transition-colors">
                          <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                            <FiBriefcase className="text-lg" />
                          </div>
                          <span className="text-sm font-semibold truncate leading-none">
                            {selectedCompany}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredTeam.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border-4 border-dashed border-gray-100"
              >
                <div className="p-8 bg-gray-50 rounded-full mb-6">
                  <FiUsers className="text-6xl text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  Workspace Empty
                </h3>
                <p className="text-gray-400 font-medium">
                  No colleagues found matching your current filters.
                </p>
              </motion.div>
            )}
          </div>

          {/* SIDEBAR - UPCOMING BIRTHDAYS */}
          <aside className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden"
            >
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl">
                    <Cake className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-wider">
                      Birthdays
                    </h2>
                    <p className="text-xs font-bold text-white/50 tracking-widest">
                      {new Date().toLocaleDateString("en-US", {
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {currentCompany?.upcomingBirthdays?.length > 0 ? (
                    currentCompany.upcomingBirthdays.map((member) => (
                      <div
                        key={member._id}
                        className="flex items-center gap-4 group cursor-pointer"
                      >
                        <div className="relative">
                          <img
                            src={member.photo || "/placeholder-avatar.png"}
                            alt={member.name}
                            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/20 group-hover:ring-white transition-all shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-pink-500 w-5 h-5 rounded-full flex items-center justify-center border-2 border-indigo-900">
                            <span className="text-[10px] leading-none">🎂</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white truncate text-sm mb-0.5">
                            {member.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                            <p className="text-xs font-black text-white/40 group-hover:text-blue-200 transition-colors tracking-tighter uppercase leading-none">
                              {new Date(member.dateOfBirth).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-white/40 text-sm font-bold tracking-widest uppercase">
                        No Celebrations
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/20">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                Read-Only Note
              </h4>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                This directory is managed by HR. If you notice any missing
                details or incorrect information, please contact the
                administrator.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
};

export default MyTeam;
