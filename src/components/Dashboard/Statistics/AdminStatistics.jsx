import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FiUsers,
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Container from "../../../components/Shared/Container";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const HRAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch overview statistics
  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ["analytics-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/overview");
      return res.data;
    },
  });

  // Fetch asset distribution
  const { data: distribution, isLoading: distributionLoading } = useQuery({
    queryKey: ["analytics-distribution"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/asset-distribution");
      return res.data;
    },
  });

  // Fetch top requested assets
  const { data: topAssets, isLoading: topAssetsLoading } = useQuery({
    queryKey: ["analytics-top-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/top-requested-assets");
      return res.data;
    },
  });

  if (overviewLoading || distributionLoading || topAssetsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Prepare data for Pie Chart
  const pieData = [
    { name: "Returnable", value: distribution?.returnable || 0 },
    { name: "Non-returnable", value: distribution?.nonReturnable || 0 },
  ];

  const COLORS = ["#3b82f6", "#8b5cf6"];

  // Stats cards data
  const stats = [
    {
      title: "Total Employees",
      value: overview?.totalEmployees || 0,
      icon: FiUsers,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Assets",
      value: overview?.totalAssets || 0,
      icon: FiPackage,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Assigned Assets",
      value: overview?.totalAssigned || 0,
      icon: FiCheckCircle,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Pending Requests",
      value: overview?.pendingRequests || 0,
      icon: FiClock,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <section className="min-h-screen bg-[#f8fbff] py-12">
      <Container>
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-4 border border-blue-100"
          >
            <FiTrendingUp className="text-blue-500" />
            <span>Analytics Dashboard</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            Business{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Intelligence
            </span>
          </motion.h1>
          <p className="mt-6 text-lg text-gray-500 font-medium max-w-2xl">
            Real-time insights into your asset management operations and team
            performance metrics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/20 border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-shadow"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-[4rem] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div
                  className={`${stat.lightColor} ${stat.textColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="text-2xl" />
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {stat.title}
                </p>
                <h3 className="text-4xl font-black text-gray-900">
                  {stat.value}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/20 border border-gray-100"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                Asset Distribution
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Breakdown by asset type
              </p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "12px",
                    fontWeight: "600",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontWeight: "600",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/20 border border-gray-100"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                Top Requested Assets
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Most popular items
              </p>
            </div>
            {topAssets && topAssets.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={topAssets}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="assetName"
                    tick={{ fill: "#6b7280", fontWeight: "600", fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontWeight: "600" }}
                    label={{
                      value: "Requests",
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        fill: "#6b7280",
                        fontWeight: "bold",
                        fontSize: 14,
                      },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "12px",
                      fontWeight: "600",
                    }}
                    cursor={{ fill: "#f3f4f6" }}
                  />
                  <Legend wrapperStyle={{ fontWeight: "600" }} />
                  <Bar
                    dataKey="requestCount"
                    fill="#3b82f6"
                    radius={[12, 12, 0, 0]}
                    name="Request Count"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-[350px] text-gray-400">
                <FiPackage className="text-6xl mb-4" />
                <p className="font-bold">No request data available</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black mb-2">Approved Requests</h3>
              <p className="text-blue-100 font-medium">
                Total successful asset assignments
              </p>
            </div>
            <div className="text-5xl font-black">
              {overview?.approvedRequests || 0}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HRAnalytics;
