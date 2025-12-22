import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Home/Card";
import {
  FiSearch,
  FiFilter,
  FiActivity,
  FiArrowRight,
  FiArrowLeft,
  FiPackage,
  FiZap,
} from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

const AllAssetsPublic = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 10;

  // Reset to first page when search or sort changes
  React.useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, sortOrder]);

  const {
    data: assetsData = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["assets", currentPage, searchTerm, sortOrder],
    queryFn: async () => {
      const needsClientFiltering =
        (searchTerm && searchTerm.trim() !== "") ||
        (sortOrder && sortOrder !== "all");

      if (needsClientFiltering) {
        const result = await axiosSecure(`/assets`);
        const allAssets = result.data.result || result.data || [];

        let filtered = allAssets;
        if (searchTerm && searchTerm.trim() !== "") {
          const q = searchTerm.trim().toLowerCase();
          filtered = filtered.filter((a) =>
            (a.name || "").toLowerCase().includes(q)
          );
        }

        if (sortOrder === "highToLow")
          filtered.sort((a, b) => b.quantity - a.quantity);
        else if (sortOrder === "lowToHigh")
          filtered.sort((a, b) => a.quantity - b.quantity);

        const extractedCount = filtered.length;
        setTotalAssets(extractedCount);
        const page = Math.ceil(extractedCount / limit) || 1;
        setTotalPage(page);

        const start = currentPage * limit;
        const paginated = filtered.slice(start, start + limit);
        return paginated;
      }

      const url = `/assets?limit=${limit}&skip=${currentPage * limit}`;
      const result = await axiosSecure(url);
      const extractedData = result.data.result;
      const extractedCount = result.data.total;
      setTotalAssets(extractedCount);
      const page = Math.ceil(extractedCount / limit) || 1;
      setTotalPage(page);
      return extractedData;
    },
  });

  return (
    <section className="min-h-screen bg-[#f8fbff] py-24 pb-32 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px] -z-10" />

      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-blue-600 mb-2"
            >
              <div className="p-2.5 bg-blue-50 rounded-2xl shadow-sm border border-blue-100/50">
                <FiActivity size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.4em]">
                AssetVerse Global Hub
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-none"
            >
              Asset{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Verse
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-bold text-sm tracking-tight uppercase px-1 leading-relaxed"
            >
              Explore our comprehensive directory of high-performance resources
              and institutional ecosystem components.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-5 bg-white p-3 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-blue-900/5 px-8"
          >
            <div className="flex flex-col border-r border-gray-100 pr-5">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Live Registry
              </span>
              <span className="text-3xl font-black text-blue-600 leading-none tabular-nums">
                {totalAssets}
              </span>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl text-blue-500">
              <FiPackage size={24} />
            </div>
          </motion.div>
        </div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-2xl border border-white p-5 md:p-6 rounded-[3rem] shadow-2xl shadow-blue-900/10 flex flex-col lg:flex-row gap-5 mb-16 relative z-10"
        >
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-7 flex items-center pointer-events-none">
              <FiSearch
                className="text-gray-400 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
            </div>
            <input
              type="text"
              placeholder="SEARCH GLOBAL NEXUS..."
              className="w-full bg-gray-50/50 border border-gray-100 rounded-[2rem] py-5 pl-16 pr-8 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all font-black uppercase text-xs tracking-[0.2em] placeholder:text-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <div className="relative group lg:w-64">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <FiFilter
                  className="text-gray-400 group-focus-within:text-blue-500"
                  size={18}
                />
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-[2rem] py-5 pl-14 pr-10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer font-black uppercase text-xs tracking-[0.15em] text-gray-600 hover:border-blue-500/30 transition-all shadow-sm"
              >
                <option value="all">SORT: DEFAULT</option>
                <option value="highToLow">SORT: VOLUME HIGH</option>
                <option value="lowToHigh">SORT: VOLUME LOW</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Assets Grid */}
        <AnimatePresence mode="wait">
          {isFetching && searchTerm.trim() !== "" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-32"
            >
              <LoadingSpinner />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-10"
            >
              {assetsData.length > 0 ? (
                assetsData.map((asset, index) => (
                  <motion.div
                    key={asset._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <Card asset={asset} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-40 text-center">
                  <div className="bg-white w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl border border-gray-100">
                    <FiZap size={40} className="text-gray-200" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                    No Data Found
                  </h2>
                  <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.3em]">
                    Please Search Something Different
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Section */}
        <div className="mt-24">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {currentPage > 0 && (
              <motion.button
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <FiArrowLeft size={24} />
              </motion.button>
            )}

            <div className="flex items-center gap-3">
              {[...Array(totalPage).keys()].map((int) => (
                <motion.button
                  key={int}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentPage(int);
                    refetch();
                  }}
                  className={`min-w-[56px] h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg ${
                    int === currentPage
                      ? "bg-blue-600 text-white shadow-blue-600/30 border-blue-600"
                      : "bg-white text-gray-400 border border-gray-100 hover:border-blue-300 hover:text-blue-500"
                  }`}
                >
                  {int + 1 < 10 ? `0${int + 1}` : int + 1}
                </motion.button>
              ))}
            </div>

            {currentPage < totalPage - 1 && (
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <FiArrowRight size={24} />
              </motion.button>
            )}
          </div>

          <div className="text-center mt-8">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.8em]">
              System Page Sequence Synchronized
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AllAssetsPublic;
