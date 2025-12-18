import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AssetDetails from "../pages/AssetDetails/AssetDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddAsset from "../pages/Dashboard/HR/AddAsset";
import ManageEmployees from "../pages/Dashboard/Admin/ManageEmployees";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/HR/MyInventory";
import ManageRequests from "../pages/Dashboard/HR/ManageRequests";
import MyRequests from "../pages/Dashboard/Employee/MyRequests";
import { createBrowserRouter } from "react-router";
import HrSignUp from "../pages/SignUp/HrSignUp/HrSignUp";
import ContactUs from "../pages/ContactUs.jsx/ContactUs";
import AboutUs from "../pages/AboutUs/AboutUs";
import Packages from "../pages/Dashboard/HR/Packages";
import AssetList from "../pages/Dashboard/Admin/AssetList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/asset/:id",
        element: <AssetDetails></AssetDetails>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/hr-signup", element: <HrSignUp></HrSignUp> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-asset",
        element: (
          <PrivateRoute>
            <AddAsset></AddAsset>
          </PrivateRoute>
        ),
      },
      {
        path: "all-asset",
        element: (
          <PrivateRoute>
            <AssetList></AssetList>
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-employees",
        element: (
          <PrivateRoute>
            <ManageEmployees />
          </PrivateRoute>
        ),
      },
      {
        path: "my-packages",
        element: (
          <PrivateRoute>
            <Packages></Packages>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-requests",
        element: (
          <PrivateRoute>
            <MyRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <PrivateRoute>
            <ManageRequests />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
