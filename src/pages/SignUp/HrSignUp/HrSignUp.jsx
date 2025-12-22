import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiBriefcase,
  FiImage,
  FiUploadCloud,
  FiUsers,
  FiHome,
} from "react-icons/fi";
import BackgroundGlow from "../../../components/Shared/BackgroundGlow";
import { ImageUpload } from "../../../utils";
import Button from "../../../components/Shared/Button/Button";

const HRSignUp = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [isSigningUp, setIsSigningUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, companyName, companyLogo, image } = data;
    const imageFile = image[0];
    // const formData = new FormData();
    // formData.append("image", imgageFile);

    setIsSigningUp(true);

    try {
      // 1. Upload Profile Image
      // const { data: uploadData } = await axios.post(
      //   `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      //   formData
      // );
      const imageURL = await ImageUpload(imageFile);

      // 2. Create User
      await createUser(email, password);
      await updateUserProfile(name, imageURL);

      // 3. Save to DB
      const hrData = {
        name,
        email,
        password,
        role: "HR",
        companyName,
        companyLogo,
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
      };

      const response = await axios.post(`/users/hr`, hrData);

      if (response.status === 201 || response.status === 200) {
        toast.success("HR Account Created!");
        navigate(from, { replace: true });
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || err.message || "Signup failed"
      );
    } finally {
      setIsSigningUp(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 py-12">
      <BackgroundGlow />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl p-8 sm:p-12 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl relative z-10"
      >
        <div className="mb-10 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4"
          >
            <FiUsers className="text-3xl" />
          </motion.div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
            Register <span className="text-indigo-600">Organization</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Create an organization, manage employees, and track assets
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-5">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="MRB RAFI"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-700"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: 20,
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="mrb@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-700"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-700"
                  {...register("password", {
                    required: "Password is required",
                    minLength: 6,
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Company Name */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Company Name
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Acme Corp"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-700"
                  {...register("companyName", {
                    required: "Company Name is required",
                  })}
                />
              </div>
              {errors.companyName && (
                <p className="text-red-500 text-xs ml-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Company Logo URL */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Company Logo URL
              </label>
              <div className="relative">
                <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="https://logo-url.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-700"
                  {...register("companyLogo", {
                    required: "Logo URL is required",
                  })}
                />
              </div>
              {errors.companyLogo && (
                <p className="text-red-500 text-xs ml-1">
                  {errors.companyLogo.message}
                </p>
              )}
            </div>

            {/* Profile Image Upload */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Your Profile Photo
              </label>
              <div className="relative">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image", {
                    required: "Please upload profile image",
                  })}
                />
                <label
                  htmlFor="image"
                  className="flex items-center justify-center w-full px-4 py-3.5 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-colors bg-white/50"
                >
                  <FiUploadCloud className="text-xl text-indigo-500 mr-2" />
                  <span className="text-sm text-gray-600 font-medium">
                    Click to Upload
                  </span>
                </label>
              </div>
              {errors.image && (
                <p className="text-red-500 text-xs ml-1">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-2 mt-4">
            <Button
              label={isSigningUp ? "Processing..." : "Register Organization"}
              variant="action"
              size="lg"
              fullWidth
              disabled={isSigningUp}
              className="mt-4"
            />
          </div>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-200/60">
          <p className="text-sm text-gray-500 font-bold uppercase tracking-tight">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-black uppercase tracking-widest text-xs"
            >
              Login
            </Link>
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-indigo-600 transition-colors flex items-center justify-center gap-3"
            >
              <FiHome /> Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HRSignUp;
