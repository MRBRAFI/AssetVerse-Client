import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Home/Card";
import { CgArrowLongLeftR } from "react-icons/cg";
import { CgArrowLongRightR } from "react-icons/cg";

import { FiSearch, FiFilter } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const AssetList = () => {
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
      // If user is searching or sorting, fetch full dataset and apply client-side filter/sort,
      // then paginate the filtered results so searching/sorting work across all assets.
      const needsClientFiltering =
        (searchTerm && searchTerm.trim() !== "") ||
        (sortOrder && sortOrder !== "all");

      if (needsClientFiltering) {
        const result = await axiosSecure(
          `${import.meta.env.VITE_BACKEND_URL}/assets`
        );
        const allAssets = result.data.result || result.data || [];

        // Apply search filter
        let filtered = allAssets;
        if (searchTerm && searchTerm.trim() !== "") {
          const q = searchTerm.trim().toLowerCase();
          filtered = filtered.filter((a) =>
            (a.name || "").toLowerCase().includes(q)
          );
        }

        // Apply sort
        if (sortOrder === "highToLow")
          filtered.sort((a, b) => b.quantity - a.quantity);
        else if (sortOrder === "lowToHigh")
          filtered.sort((a, b) => a.quantity - b.quantity);

        const extractedCount = filtered.length;
        setTotalAssets(extractedCount);
        const page = Math.ceil(extractedCount / limit) || 1;
        setTotalPage(page);

        // Paginate client-side filtered results
        const start = currentPage * limit;
        const paginated = filtered.slice(start, start + limit);
        return paginated;
      }

      // Default: server-side pagination
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/assets?limit=${limit}&skip=${currentPage * limit}`;
      const result = await axiosSecure(url);
      const extractedData = result.data.result;
      const extractedCount = result.data.total;
      setTotalAssets(extractedCount);
      const page = Math.ceil(extractedCount / limit) || 1;
      setTotalPage(page);
      return extractedData;
    },
  });

  // Use server-returned data directly for display (search/sort handled server-side)
  const displayedAssets = assetsData;

  console.log(totalPage);

  return (
    <Container>
      <div className="my-20">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex font-semibold bg-primary text-white items-center gap-2 border border-gray-300 rounded-lg px-4 py-3">
            Total assets: {totalAssets}
          </div>
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
        {isFetching && searchTerm.trim() !== "" ? (
          <div className="flex items-center justify-center col-span-full py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayedAssets && displayedAssets.length > 0 ? (
              displayedAssets.map((asset) => (
                <Card key={asset._id} asset={asset} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No assets found</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="">
        <div className="text-center flex items-center justify-center">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn-primary"
            >
              <CgArrowLongLeftR className="text-4xl hover:cursor-pointer"></CgArrowLongLeftR>
            </button>
          )}

          {[...Array(totalPage).keys()].map((int, index) => (
            <button
              onClick={() => {
                setCurrentPage(int);
                refetch();
              }}
              key={index}
              className={`btn ${
                int === currentPage ? "bg-black" : "btn-primary"
              } text-white mx-2 hover:cursor-pointer hover:bg-black transition duration-400 my-5`}
            >
              {int + 1}
            </button>
          ))}

          {currentPage < totalPage - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn-primary"
            >
              <CgArrowLongRightR className="text-4xl hover:cursor-pointer"></CgArrowLongRightR>
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AssetList;
