import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const HRSignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, companyName, companyLogo, image } = data;

    const imgageFile = image[0];

    const formData = new FormData();
    formData.append("image", imgageFile);

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, image);

      const hrData = {
        name,
        email,
        role: "HR",
        companyName,
        companyLogo,
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        hrData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("HR Signup Successful!");
        navigate(from, { replace: true });
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || err.message || "Signup failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white gap-60">
      <div className="flex flex-col w-99 p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <h1 className="text-4xl font-bold mb-4 text-center">HR Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: true, maxLength: 20 })}
            className="w-full px-3 py-2 border rounded-md bg-gray-200"
          />
          <div className="w-60 h-5">
            {errors.name && <p className="text-red-600">Name is required</p>}
          </div>

          {/* Image */}
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Profile Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*" // Only allow images
            {...register("image", {
              required: "Please upload a profile image",
              validate: {
                fileSize: (files) =>
                  !files[0] || files[0].size < 5 * 1024 * 1024 || "Max 5MB",
                fileType: (files) =>
                  !files[0] ||
                  files[0].type.startsWith("image/") ||
                  "Only images allowed",
              },
            })}
            className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-medium
      file:bg-blue-600 file:text-white
      hover:file:bg-blue-700
      cursor-pointer"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: true })}
            className="w-full px-3 py-2 border rounded-md bg-gray-200"
          />
          <div className="w-60 h-5">
            {errors.email && <p className="text-red-600">Email is required</p>}
          </div>

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
            className="w-full px-3 py-2 border rounded-md bg-gray-200"
          />
          <div className="w-60 h-5">
            {errors.password && (
              <p className="text-red-600">Password is required (6+ chars)</p>
            )}
          </div>

          {/* Company Name */}
          <input
            type="text"
            placeholder="Company Name"
            {...register("companyName", { required: true })}
            className="w-full px-3 py-2 border rounded-md bg-gray-200"
          />
          <div className="w-60 h-5">
            {errors.companyName && (
              <p className="text-red-600">Company Name is required</p>
            )}
          </div>

          {/* Company Logo */}
          <input
            type="text"
            placeholder="Company Logo URL"
            {...register("companyLogo", { required: true })}
            className="w-full px-3 py-2 border rounded-md bg-gray-200"
          />

          <div className="w-60 h-5">
            {errors.companyLogo && (
              <p className="text-red-600">Company Logo is required</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-400 w-full py-3 text-white rounded-md"
          >
            Sign Up as HR
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
          .
        </p>
      </div>
      <div className="animate-pulse hidden md:block">
        <img
          src="https://www.drupal.org/files/project-images/materialadmin.png"
          alt="Admin"
        />
      </div>
    </div>
  );
};

export default HRSignUp;
