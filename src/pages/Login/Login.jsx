import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import BackgroundGlow from "../../components/Shared/BackgroundGlow";
import Button from "../../components/Shared/Button/Button";

const Login = () => {
  const { signIn, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const from = location.state?.from?.pathname || "/";

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  const onSubmit = async (data) => {
    const { email, password } = data;
    setIsLoggingIn(true);
    try {
      await signIn(email, password);
      // navigation will be handled by re-render with `user` or explicit navigate below,
      // but usually if signIn succeeds, user state updates and the `if(user)` above triggers, or we navigate here.
      // We navigate here to be sure.
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error("Valid Credentials are required");
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
      <BackgroundGlow />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl relative z-10"
      >
        <div className="mb-10 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4"
          >
            <FiLogIn className="text-3xl" />
          </motion.div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
            Welcome <span className="text-blue-600">Back</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to access your AssetVerse dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700 ml-1"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMail />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="mrb@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700 placeholder-gray-400"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
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

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700 ml-1"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiLock />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700 placeholder-gray-400"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
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

          <Button
            label={isLoggingIn ? "Syncing..." : "Initialize Session"}
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoggingIn}
            icon={isLoggingIn ? null : FiLogIn}
            className="mt-4"
          />
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              state={from}
              className="font-black text-blue-600 hover:text-blue-700 transition-colors uppercase text-xs tracking-widest"
            >
              Initialize Identity
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
