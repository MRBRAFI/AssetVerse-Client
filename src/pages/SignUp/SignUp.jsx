import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCalendar,
  FiUploadCloud,
  FiUserPlus,
} from "react-icons/fi";
import BackgroundGlow from "../../components/Shared/BackgroundGlow";
import { ImageUpload } from "../../utils";
import Button from "../../components/Shared/Button/Button";

const SignUp = () => {
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
    const { name, email, password, image, date } = data;
    const imageFile = image[0];

    setIsSigningUp(true);

    try {
      const imageURL = await ImageUpload(imageFile);

      // 2. Create User
      await createUser(email, password);
      await updateUserProfile(name, imageURL);

      // 3. Save to DB
      const employeeData = {
        name,
        email,
        password,
        image: imageURL,
        dateOfBirth: date,
        role: "EMPLOYEE",
        affiliations: [],
      };

      const response = await axios.post(`/users/employee`, employeeData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Welcome to AssetVerse!");
        navigate(from, { replace: true });
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Signup failed. Please try again.");
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
        className="w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl relative z-10"
      >
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4"
          >
            <FiUserPlus className="text-3xl" />
          </motion.div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
            Create <span className="text-blue-600">Account</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Create your account to request and manage assets
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700"
                {...register("name", {
                  required: "Name is required",
                  maxLength: 20,
                })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>
            )}
          </div>

          {/* Profile Image */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Profile Photo
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                id="image"
                className="hidden"
                {...register("image", {
                  required: "Profile image is required",
                })}
              />
              <label
                htmlFor="image"
                className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors bg-white/50"
              >
                <FiUploadCloud className="text-xl text-blue-500 mr-2" />
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
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Date of Birth
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700"
                {...register("date", { required: "Date of Birth is required" })}
              />
            </div>
            {errors.date && (
              <p className="text-red-500 text-xs ml-1">{errors.date.message}</p>
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
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 chars" },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            label={isSigningUp ? "Registering..." : "Sign Up"}
            variant="primary"
            size="lg"
            fullWidth
            disabled={isSigningUp}
            icon={isSigningUp ? null : FiUserPlus}
            className="mt-6"
          />
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-200/60">
          <p className="text-sm text-gray-500 font-bold uppercase tracking-tight">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-black uppercase tracking-widest text-xs"
            >
              Login
            </Link>
          </p>
          <p className="text-[10px] text-gray-400 mt-4 uppercase font-black tracking-[0.2em]">
            Want to join as an HR Manager?{" "}
            <Link
              to="/hr-signup"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Register as HR
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
