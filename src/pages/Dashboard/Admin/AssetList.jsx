import React, { useState, useMemo } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Card from "../../../components/Home/Card";
import { FiSearch, FiFilter } from "react-icons/fi";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
   const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const { data: assetsData = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_BACKEND_URL}/assets`
      );
      return result.data.result;
    },
  });

  // Filter and sort assets
  const filteredAndSortedAssets = useMemo(() => {
    let filtered = assetsData.filter((asset) => {
      const matchesSearch = asset.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        filterType === "all" ? true : asset.type === filterType;
      return matchesSearch && matchesType;
    });

    if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.quantity - a.quantity);
    } else if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.quantity - b.quantity);
    }

    return filtered;
  }, [assetsData, searchTerm, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3">
          <FiFilter className="text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white focus:outline-none text-gray-700 font-medium cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3">
          <FiFilter className="text-gray-400" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white focus:outline-none text-gray-700 font-medium cursor-pointer"
          >
            <option value="all">All Quantities</option>
            <option value="highToLow">High to Low</option>
            <option value="lowToHigh">Low to High</option>
          </select>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {filteredAndSortedAssets.length > 0 ? (
          filteredAndSortedAssets.map((asset) => (
            <Card key={asset._id} asset={asset} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No assets found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetList;
