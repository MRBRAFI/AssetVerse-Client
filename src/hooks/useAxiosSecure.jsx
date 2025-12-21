import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken(true);
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err?.response?.status === 401) {
          logOut().catch(console.error);
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, loading, logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
