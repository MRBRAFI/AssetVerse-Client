import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const SignUp = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const onSubmit = async (data) => {
    const { name, email, password, image, date } = data;

    const imgageFile = image[0];

    const formData = new FormData();
    formData.append("image", imgageFile);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      const imageURL = data?.data?.display_url;
      createUser(email, password);
      await updateUserProfile(name, imageURL);

      const employeeData = {
        name,
        email,
        password,
        dateOfBirth: date,
        role: "employee",
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        employeeData
      );
      if (response.status === 201 || response.status === 200) {
        toast.success("Employee Signup Successful!");
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

    console.log(data);
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-99 p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to PlantNet</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("name", {
                  required: true,
                  maxLength: {
                    value: 20,
                    message: "Name cannot exceed 20 characters",
                  },
                })}
              />
              <div className="h-3 w-70">
                {errors.name && (
                  <p className="text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <input
                name="image"
                type="file"
                id="image"
                accept="image/*"
                className="
                block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                bg-gray-100 border border-dashed border-blue-300 rounded-md cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                y-2"
                {...register("image")}
              />
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <div className="h-3 w-70">
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Date of Birth */}

              <label htmlFor="email" className="block mb-2 text-sm">
                Date of Birth{" "}
              </label>
              <input
                type="date"
                id="date"
                placeholder="Your Email"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("date", {
                  required: true,
                })}
              />
              <div className="h-3 w-70"></div>
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                autoComplete="new-password"
                id="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <div className="h-3 w-70">
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-400 w-full rounded-md py-3 text-white"
            >
              Continue
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>

          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-blue-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
