import Container from "../../components/Shared/Container";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiCpu,
  FiPackage,
  FiShield,
  FiTag,
  FiUser,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AssetDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [roleInfo, setRoleInfo] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: asset = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assets", id],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_BACKEND_URL}/assets/${id}`
      );
      return result.data;
    },
  });

  useEffect(() => {
    axiosSecure
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${user.email}`)
      .then((res) => {
        setRoleInfo(res.data.role);
      })
      .catch((iss) => {
        console.log(iss);
      });
  }, [axiosSecure, user]);

  const handleRequest = async () => {
    // 1. Check quantity
    if (quantity <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "This asset is currently unavailable.",
      });
    }

    // 2. Confirmation Alert
    const confirm = await Swal.fire({
      title: "Request Asset",
      html: `
        <div class="text-left text-sm">
          <p><strong>Asset:</strong> ${name}</p>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Manager:</strong> ${HR?.name}</p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Request it",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    // 3. Send Request
    try {
      await axiosSecure.post(`${import.meta.env.VITE_BACKEND_URL}/requests`, {
        assetId: _id,
        assetName: name,
        assetType: type,
        hrEmail: HR.email,
        companyName: HR.companyName,
      });

      Swal.fire({
        icon: "success",
        title: "Request Sent",
        text: "Your request has been sent to HR for approval.",
        timer: 1500,
        showConfirmButton: false,
      });
      
      // Refetch to update quantity if backend decrements immediately (optional)
      refetch(); 

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  const { _id, name, quantity, type, image, description, HR, createdAt } =
    asset;

  const hrEmail = HR.email;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  // console.log(asset);
  // console.log(roleInfo);
  console.log(hrEmail);

  return (
    <div className="min-h-screen pt-10 pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 relative bg-gray-100 group overflow-hidden">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="object-cover w-full h-full min-h-[400px] lg:min-h-[600px] group-hover:scale-105 transition-transform duration-700"
                src={image}
                alt={name}
              />
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                  <FiTag className="text-blue-500" />
                  {type}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between relative bg-white/70 backdrop-blur-3xl">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <FiPackage className="text-9xl text-blue-600 transform -rotate-12" />
              </div>

              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    {name}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-500 mb-8">
                    <span className="flex items-center gap-1">
                      <FiShield className="text-green-500" /> Verified Item
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>ID: #{_id?.slice(-6).toUpperCase()}</span>
                    {createdAt && (
                      <>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-sm">
                          Added: {new Date(createdAt).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="prose prose-lg text-gray-600 mb-8 font-light leading-relaxed"
                >
                  <p>
                    {description ||
                      "No detailed description available for this asset. Please contact the HR for more information."}
                  </p>
                </motion.div>

                <div className="border-t border-gray-100 my-8"></div>

                {/* HR Info */}
                <div className="flex items-center justify-between mb-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        src={
                          HR?.image ||
                          "https://i.ibb.co.com/VcBGDkVQ/download-1.png"
                        }
                        alt={HR?.name}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">
                        Managed By
                      </p>
                      <p className="text-gray-900 font-bold">{HR?.name}</p>
                      {HR?.email && (
                        <p className="text-xs text-gray-500">{HR.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">
                      Available Qty
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {quantity} Units
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 pt-4"
              >
                {roleInfo === "HR" ? (
                  hrEmail === user.email ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all flex items-center justify-center gap-2"
                      >
                        <FiEdit2 className="text-xl" />
                        Edit
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-red-200 hover:shadow-red-300 transition-all flex items-center justify-center gap-2"
                      >
                        <FiTrash2 className="text-xl" />
                        Delete
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all flex items-center justify-center gap-2"
                    >
                      <FiCpu className="text-xl" />
                      <Link to={"/"}>Back To Home</Link>
                    </motion.button>
                  )
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRequest}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all flex items-center justify-center gap-2 hover:cursor-pointer"
                  >
                    <FiCpu className="text-xl" />
                    Request Item
                  </motion.button>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default AssetDetails;
