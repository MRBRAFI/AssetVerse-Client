import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

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
      return res.data;
    },
    enabled: !!user?.email,
  });

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.assetName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter ? asset.assetType === filter : true;
    return matchesSearch && matchesFilter;
  });

  if (!user?.email || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-8 gap-6 border border-gray-100">
          <div className="relative w-full md:w-1/2 group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <FiSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </span>
            <input
              type="text"
              placeholder="Search by asset name..."
              className="block w-full py-3 pl-11 pr-4 border border-gray-200 rounded-2xl leading-5 bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white sm:text-sm transition-all duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/4">
            <select
              className="block w-full py-3 px-4 border border-gray-200 bg-gray-50/50 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white sm:text-sm transition-all duration-300 cursor-pointer appearance-none"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Asset Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-left text-sm uppercase">
                    Asset Image
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-left text-sm uppercase">
                    Asset Name
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-left text-sm uppercase">
                    Asset Type
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-left text-sm uppercase">
                    Company Name
                  </th>

                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-left text-sm uppercase">
                    Approval Date
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-left text-sm uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAssets.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FiSearch className="text-4xl mb-2 opacity-20" />
                        <p>No matching assets found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAssets.map((asset) => (
                    <tr key={asset._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full object-cover"
                            src={asset.assetImage || "/placeholder-image.png"}
                            alt={asset.assetName}
                          />
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {asset.assetName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            asset.assetType === "Returnable"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {asset.assetType}
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {asset.companyName || "N/A"}
                        </p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {formatDate(asset.assignmentDate)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            asset.status === "assigned"
                              ? "bg-green-100 text-green-800"
                              : asset.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {asset.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInventory;
