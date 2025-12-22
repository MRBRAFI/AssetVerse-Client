import { motion } from "framer-motion";
import {
  FiBox,
  FiType,
  FiArchive,
  FiUploadCloud,
  FiPlus,
  FiServer,
} from "react-icons/fi";
import { useForm } from "react-hook-form";
import { cloneElement, useEffect, useState } from "react";
import { ImageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { CiSliderHorizontal } from "react-icons/ci";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import { data } from "react-router";

const AddAssetForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [hrInfo, setHrInfo] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  useEffect(() => {
    axiosSecure.get(`/users/${user.email}`).then((result) => {
      const hrData = result.data;
      setHrInfo(hrData);
    });
  }, [user.email, setHrInfo, axiosSecure]);

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post(`/assets`, payload),
    onSuccess: (data) => {
      toast.success("Asset added successfully ");
      mutationReset();
    },
    onError: (issue) => {},
    onMutate: () => {
      // console.log("I am posting this data", payload);
    },
    onSettled: () => {
      // console.log(data);
      // if (error) console.log(data);
    },
    retry: 3,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, quantity, type, image } = data;
    const numQuantity = Number(quantity);
    const imageFile = image[0];

    try {
      const imageURL = await ImageUpload(imageFile);

      const assetData = {
        name,
        quantity: numQuantity,
        type,
        image: imageURL,
        createdAt: new Date().toLocaleDateString("en-CA"),
        HR: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
          companyName: hrInfo.companyName,
        },
      };

      await mutateAsync(assetData);
      reset();
    } catch (iss) {
      toast.error(iss);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden relative"
      >
        {/* Header Decor */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <FiServer className="text-9xl text-blue-600 transform rotate-12" />
        </div>

        <div className="p-8 lg:p-12 relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Add New Asset
            </h2>
            <p className="text-gray-500">
              Register a new item to your inventory for tracking and assignment.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2"
                  >
                    <FiBox className="text-blue-500" /> Product Name
                  </label>
                  <div className="relative group">
                    <input
                      className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-700 placeholder-gray-400"
                      name="name"
                      id="name"
                      type="text"
                      placeholder="MacBook Pro M2"
                      {...register("name", {
                        required: "Name is required",
                        maxLength: {
                          value: 20,
                          message: "Cannot exceed 20 characters",
                        },
                      })}
                    />
                    <div className="absolute inset-0 rounded-xl border border-blue-500 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity"></div>
                    {errors.name && (
                      <span className="text-xs text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Return Type */}
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2"
                  >
                    <FiType className="text-blue-500" /> Asset Type
                  </label>
                  <div className="relative">
                    <select
                      required
                      className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-700 appearance-none cursor-pointer"
                      name="type"
                      {...register("type", {
                        required: "Please select an asset type",
                      })}
                    >
                      <option value="Returnable">
                        Returnable (Laptop, Phone)
                      </option>
                      <option value="Non-returnable">
                        Non-returnable (Stationery, Snacks)
                      </option>
                    </select>
                    {errors.type && (
                      <span className="text-xs text-red-500">
                        {errors.type.message}
                      </span>
                    )}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2"
                  >
                    <FiArchive className="text-blue-500" /> Initial Quantity
                  </label>
                  <div className="relative group">
                    <input
                      className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-700 placeholder-gray-400"
                      name="quantity"
                      id="quantity"
                      type="number"
                      placeholder="e.g. 50"
                      min="1"
                      {...register("quantity", {
                        required: "Please enter a quantity",
                      })}
                    />
                  </div>
                  {errors.quantity && (
                    <span className="text-xs text-red-500">
                      {errors.quantity.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-6">
                {/* File Upload */}
                <div className="space-y-2 flex-grow flex flex-col">
                  <span className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <FiUploadCloud className="text-blue-500" /> Product Image
                  </span>
                  <label className="flex-grow flex flex-col items-center justify-center w-full min-h-[200px] border-3 border-dashed border-gray-300 rounded-3xl cursor-pointer bg-gray-50/30 hover:bg-blue-50/50 hover:border-blue-400 transition-all group overflow-hidden relative">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10 transition-transform group-hover:scale-105">
                      <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-3 group-hover:bg-blue-200 transition-colors">
                        <FiUploadCloud className="w-8 h-8" />
                      </div>
                      <p className="mb-2 text-sm text-gray-500 font-medium">
                        <span className="font-bold text-blue-600">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        SVG, PNG, JPG (MAX. 800x400px)
                      </p>
                      {fileName && (
                        <div className="mt-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          {fileName}
                        </div>
                      )}
                    </div>

                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      {...register("image", {
                        required: "Choose an asset Image",
                      })}
                    />
                    {errors.image && (
                      <span className="text-xs text-red-500">
                        {errors.image.message}
                      </span>
                    )}
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-4 mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300/50 transition-all flex items-center justify-center gap-2"
            >
              <FiPlus className="text-xl" />
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-md"></span>{" "}
                  Processing...
                </span>
              ) : (
                "Add Asset to Inventory"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddAssetForm;
