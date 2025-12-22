import React, { useState, useMemo } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Card from "../../../components/Home/Card";
import { FiSearch, FiFilter, FiBriefcase, FiZap, FiGrid } from "react-icons/fi";
import { FaInnosoft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../../components/Shared/Container";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const { data: assetsData = [], isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const result = await axiosSecure(`/assets`);
      // Handle both { result: [] } and raw array responses
      return result.data?.result || result.data || [];
    },
  });

  // Filter and sort assets
  const filteredAndSortedAssets = useMemo(() => {
    if (!Array.isArray(assetsData)) return [];

    let filtered = assetsData.filter((asset) => {
      const itemName = asset?.name || "";
      const searchStr = searchTerm || "";
      const matchesSearch = itemName
        .toLowerCase()
        .includes(searchStr.toLowerCase());
      const matchesType =
        filterType === "all" ? true : asset.type === filterType;
      return matchesSearch && matchesType;
    });

    if (sortOrder === "highToLow") {
      filtered.sort((a, b) => (b.quantity || 0) - (a.quantity || 0));
    } else if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => (a.quantity || 0) - (b.quantity || 0));
    }

    return filtered;
  }, [assetsData, searchTerm, sortOrder, filterType]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="min-h-screen bg-[#f8fbff] py-12">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-blue-600 mb-2"
            >
              <div className="p-2 bg-blue-50 rounded-xl">
                <FiZap size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                Resource Acquisition
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none"
            >
              Request{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Assets
              </span>
            </motion.h1>
            <p className="text-gray-400 font-bold text-sm tracking-tight uppercase px-1">
              Browse available hardware and supplies for project synchronization
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 bg-white p-2 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 px-6 py-3"
          >
            <FiGrid className="text-blue-500" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
              Global Registry
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-black text-blue-600 leading-none">
              {assetsData.length} Items
            </span>
          </motion.div>
        </div>

        {/* Search & Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl border border-white p-4 md:p-6 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 flex flex-col lg:flex-row gap-4 mb-10"
        >
          {/* Search */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="SEARCH ASSET NEXUS..."
              className="w-full bg-gray-50/50 border border-gray-100 rounded-[1.5rem] py-4 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all font-black uppercase text-xs tracking-widest placeholder:text-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative group lg:w-48">
              <FiFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-[1.5rem] py-4 pl-12 pr-10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer font-black uppercase text-xs tracking-[0.15em] text-gray-600 hover:bg-white transition-all shadow-sm"
              >
                <option value="all">TYPE: ALL</option>
                <option value="Returnable">TYPE: GADGETS</option>
                <option value="Non-returnable">TYPE: SNACKS</option>
              </select>
            </div>

            <div className="relative group lg:w-48">
              <FiFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-[1.5rem] py-4 pl-12 pr-10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer font-black uppercase text-xs tracking-[0.15em] text-gray-600 hover:bg-white transition-all shadow-sm"
              >
                <option value="all">VOLUME: ALL</option>
                <option value="highToLow">VOLUME: HIGH-LOW</option>
                <option value="lowToHigh">VOLUME: LOW-HIGH</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Assets Grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filteredAndSortedAssets.length > 0 ? (
              filteredAndSortedAssets.map((asset, index) => (
                <motion.div
                  layout
                  key={asset._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card asset={asset} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-24 text-center border-2 border-dashed border-gray-100 rounded-[3rem] bg-gray-50/30"
              >
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-gray-50">
                  <FaInnosoft size={50} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                  No Matching Assets
                </h3>
                <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em]">
                  Refine your system search criteria
                </p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default AssetList;
