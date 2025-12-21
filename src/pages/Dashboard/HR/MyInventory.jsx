import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import {
  FiSearch,
  FiCalendar,
  FiBriefcase,
  FiArrowRight,
  FiActivity,
  FiFilter,
  FiDownload,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../../components/Shared/Container";

const MyInventory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-assigned-assets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assigned-assets/employee/${user.email}`
      );
      return res.data || [];
    },
    enabled: !!user?.email,
  });

  const filteredAssets = (Array.isArray(assets) ? assets : []).filter(
    (asset) => {
      const itemName = asset?.assetName || "";
      const searchTerm = search || "";
      const matchesSearch = itemName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter = filter ? asset.assetType === filter : true;
      return matchesSearch && matchesFilter;
    }
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
              className="flex items-center gap-3 text-blue-600 mb-4"
            >
              <div className="p-2.5 bg-blue-50 rounded-2xl shadow-sm border border-blue-100/50">
                <FiActivity size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.4em]">
                Personal Asset Nexus
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none"
            >
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Assets
              </span>
            </motion.h1>
            <p className="text-gray-400 font-bold text-sm tracking-tight uppercase px-1">
              Tracking your active institutional resources
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:flex items-center gap-4 bg-white p-2 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5"
          >
            <div className="px-6 py-2 border-r border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                Total Assets
              </p>
              <p className="text-2xl font-black text-blue-600 leading-none">
                {assets.length}
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-2xl transition-all duration-300 group">
              <FiDownload
                size={16}
                className="group-hover:translate-y-0.5 transition-transform"
              />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Generate Report
              </span>
            </button>
          </motion.div>
        </div>

        {/* Filters & Search BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl border border-white p-4 md:p-6 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 flex flex-col lg:flex-row gap-4 mb-10"
        >
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="SEARCH ASSET NEXUS..."
              className="w-full bg-gray-50/50 border border-gray-100 rounded-[1.5rem] py-4 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all font-black uppercase text-xs tracking-widest placeholder:text-gray-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1 lg:w-64">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                className="w-full bg-gray-50/50 border border-gray-100 rounded-[1.5rem] py-4 pl-12 pr-10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer font-black uppercase text-xs tracking-widest text-gray-600 hover:bg-white transition-all"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">CLASS: ALL SYSTEMS</option>
                <option value="Returnable">CLASS: RETURNABLE</option>
                <option value="Non-returnable">CLASS: NON-RETURNABLE</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Asset Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAssets.length === 0 ? (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-24 text-center border-2 border-dashed border-gray-100 rounded-[3rem] bg-gray-50/30"
              >
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-gray-50"></div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                  No Assets Linked
                </h3>
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">
                  Ensure your requests have been synchronized by HR
                </p>
              </motion.div>
            ) : (
              filteredAssets.map((asset, index) => (
                <motion.div
                  layout
                  key={asset._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-[2.5rem] border border-gray-100 p-6 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Background Gradient Detail */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Header: Image & Badge */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                      <img
                        src={asset.assetImage || "/placeholder-asset.png"}
                        alt={asset.assetName}
                        className="relative w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                        asset.assetType === "Returnable"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-indigo-50 text-indigo-600 border-indigo-100"
                      }`}
                    >
                      {asset.assetType}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mb-6 relative z-10">
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter group-hover:text-blue-600 transition-colors mb-4 leading-tight">
                      {asset.assetName}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-600 transition-colors">
                        <FiBriefcase size={14} className="text-blue-500/50" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {asset.companyName || "N/A Corporation"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-600 transition-colors">
                        <FiCalendar size={14} className="text-blue-500/50" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {formatDate(asset.assignmentDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50 relative z-10">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full animate-pulse ${
                          asset.status === "assigned"
                            ? "bg-green-500"
                            : "bg-amber-500"
                        }`}
                      />
                      <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
                        {asset.status}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-blue-600 hover:text-blue-700 transition-colors p-2 bg-blue-50 rounded-lg"
                    >
                      <FiArrowRight size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};

export default MyInventory;
