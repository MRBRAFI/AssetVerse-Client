import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState("");
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/${user.email}`)
        .then((res) => {
          setUserInfo(res.data);
          setRole(res.data.role); // hr or employee
        })
        .catch((err) => console.log(err));
    }
  }, [user?.email, axiosSecure]);

  console.log(userInfo);
  console.log(user);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          alt="cover photo"
          src={
            userInfo?.role === "HR"
              ? userInfo?.companyLogo
              : "https://i.ibb.co.com/DPdCjBvr/images-1.jpg"
          }
          className="w-[50%] h-[50%] mx-auto mb-4 rounded-t-lg"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </a>

          <p className="p-2 px-4 text-xs text-white bg-blue-400 rounded-full">
            {role || "No Information"}
          </p>

          <p className="mt-2 text-xl font-medium text-gray-800">
            User Id: {user?.uid}
          </p>

          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-gray-600">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-gray-600">{user?.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
