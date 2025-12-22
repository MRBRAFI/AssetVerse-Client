import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiPackage, FiUsers, FiCreditCard, FiX } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import Container from "../../../components/Shared/Container";
import CheckoutForm from "../../../components/Dashboard/CheckoutForm";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

// Load Stripe only if key is available
const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

// Default packages (fallback if backend not ready)
const DEFAULT_PACKAGES = [
  {
    _id: "1",
    name: "Basic",
    employeeLimit: 5,
    price: 5,
    features: ["Asset Tracking", "Employee Management", "Basic Support"],
  },
  {
    _id: "2",
    name: "Standard",
    employeeLimit: 10,
    price: 8,
    features: ["All Basic features", "Advanced Analytics", "Priority Support"],
  },
  {
    _id: "3",
    name: "Premium",
    employeeLimit: 20,
    price: 15,
    features: ["All Standard features", "Custom Branding", "24/7 Support"],
  },
];

const UpgradePackage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentPackageInfo, setCurrentPackageInfo] = useState(null);
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useStripePayment, setUseStripePayment] = useState(false);

  // Fetch user's current package info
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch user data
        const userResponse = await axiosSecure.get(`/users/${user.email}`);
        setCurrentPackageInfo(userResponse.data);

        // Try to fetch packages from backend, fallback to defaults
        try {
          const packagesResponse = await axiosSecure.get(`/packages`);
          if (packagesResponse.data && packagesResponse.data.length > 0) {
            setPackages(packagesResponse.data);
          }
        } catch (error) {
          console.log("Using default packages (backend endpoint not found)");
          // Keep using DEFAULT_PACKAGES
        }

        // Try to fetch payment history, ignore if not available
        try {
          const historyResponse = await axiosSecure.get(
            `/payment-history/${user.email}`
          );
          setPaymentHistory(historyResponse.data || []);
        } catch (error) {
          console.log("Payment history not available");
          setPaymentHistory([]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load user information. Please refresh the page.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user, axiosSecure]);

  const handleSelectPackage = (pkg) => {
    const TIER_HIERARCHY = { basic: 1, standard: 2, premium: 3 };
    const currentSubName = (
      currentPackageInfo?.subscription || "basic"
    ).toLowerCase();
    const pkgName = pkg.name.toLowerCase();
    const currentTier = TIER_HIERARCHY[currentSubName] || 0;
    const pkgTier = TIER_HIERARCHY[pkgName] || 0;

    if (pkgName === currentSubName) {
      Swal.fire({
        icon: "info",
        title: "Current Plan",
        text: "This is your current active package plan.",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (pkgTier < currentTier) {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: `You are currently on the ${currentSubName} plan. Downgrades are not available through this portal.`,
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    // Check if Stripe is configured
    if (stripePromise) {
      setSelectedPackage(pkg);
      setShowCheckout(true);
      setUseStripePayment(true);
    } else {
      // Fallback to demo mode if Stripe not configured
      handleDemoUpgrade(pkg);
    }
  };

  const handleDemoUpgrade = async (pkg) => {
    const result = await Swal.fire({
      title: `Upgrade to ${pkg.name}?`,
      html: `
        <div class="text-left space-y-2">
          <p class="text-gray-600"><strong>Package:</strong> ${pkg.name}</p>
          <p class="text-gray-600"><strong>Price:</strong> $${pkg.price}/month</p>
          <p class="text-gray-600"><strong>Employee Limit:</strong> ${pkg.employeeLimit}</p>
          <hr class="my-4">
          <p class="text-sm text-amber-600 font-semibold">⚠️ Demo Mode: Stripe payment not configured</p>
          <p class="text-xs text-gray-500">This will simulate the upgrade process.</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Confirm Upgrade (Demo)",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Processing...",
        html: "Please wait while we process your upgrade.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        // Try to upgrade via backend
        await axiosSecure.post(`/upgrade-package`, {
          packageName: pkg.name,
          employeeLimit: pkg.employeeLimit,
          price: pkg.price,
          transactionId: `demo_${Date.now()}`,
          paymentStatus: "demo",
        });

        // Refresh user data
        const userResponse = await axiosSecure.get(`/users/${user.email}`);
        setCurrentPackageInfo(userResponse.data);

        Swal.fire({
          icon: "success",
          title: "Upgrade Successful!",
          html: `
            <div class="text-left space-y-2">
              <p class="text-gray-600">Your package has been upgraded to <strong>${pkg.name}</strong></p>
              <p class="text-sm text-green-600 mt-4">✓ Package limit updated to ${pkg.employeeLimit} employees</p>
              <p class="text-xs text-amber-600 mt-2">Note: This was a demo upgrade. Configure Stripe for real payments.</p>
            </div>
          `,
          confirmButtonColor: "#10b981",
        });
      } catch (error) {
        console.error("Upgrade error:", error);
        Swal.fire({
          icon: "error",
          title: "Upgrade Failed",
          text: "Unable to process upgrade. Please contact support.",
        });
      }
    }
  };

  const handlePaymentSuccess = async () => {
    setShowCheckout(false);
    setSelectedPackage(null);

    // Refresh user data
    try {
      const userResponse = await axiosSecure.get(`/users/${user.email}`);
      setCurrentPackageInfo(userResponse.data);

      try {
        const historyResponse = await axiosSecure.get(
          `/payment-history/${user.email}`
        );
        setPaymentHistory(historyResponse.data || []);
      } catch (error) {
        console.log("Payment history not available");
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="min-h-screen bg-[#f8fbff] py-12">
      <Container>
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-4 border border-blue-100"
          >
            <FiPackage className="text-blue-500" />
            <span>Package Management</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            Upgrade Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Subscription
            </span>
          </motion.h1>
          <p className="mt-6 text-lg text-gray-500 font-medium max-w-2xl">
            Scale your operations with flexible pricing plans designed for
            growing businesses.
          </p>

          {/* Stripe Status Indicator */}
          {!stripePromise && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-xs font-bold text-amber-800">
                ⚠️ Demo Mode: Stripe payment not configured
              </span>
            </div>
          )}
        </div>

        {/* Current Package Info */}
        {currentPackageInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20 mb-12"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl">
                    <FiUsers className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-wider">
                      Current Plan
                    </h3>
                    <p className="text-blue-100 font-medium text-sm">
                      {currentPackageInfo.companyName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Package</p>
                    <p className="text-3xl font-black capitalize">
                      {currentPackageInfo.subscription || "Basic"}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Employees</p>
                    <p className="text-3xl font-black">
                      {currentPackageInfo.currentEmployees || 0} /{" "}
                      {currentPackageInfo.packageLimit || 5}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4">
                <p className="text-blue-100 text-sm mb-1">Slots Available</p>
                <p className="text-4xl font-black">
                  {(currentPackageInfo.packageLimit || 5) -
                    (currentPackageInfo.currentEmployees || 0)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Available Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => {
            const isPopular = pkg.name === "Standard";
            const currentSubName = (
              currentPackageInfo?.subscription || "basic"
            ).toLowerCase();
            const pkgName = pkg.name.toLowerCase();
            const isCurrent = pkgName === currentSubName;

            // Define hierarchy
            const TIER_HIERARCHY = { basic: 1, standard: 2, premium: 3 };
            const currentTier = TIER_HIERARCHY[currentSubName] || 0;
            const pkgTier = TIER_HIERARCHY[pkgName] || 0;
            const isLowerTier = pkgTier < currentTier;

            return (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!isCurrent && !isLowerTier ? { y: -10 } : {}}
                className={`relative bg-white rounded-[2rem] p-8 shadow-2xl shadow-gray-200/20 border-2 transition-all ${
                  isCurrent
                    ? "border-green-500"
                    : isPopular
                    ? "border-blue-500"
                    : "border-gray-100"
                } ${isLowerTier ? "opacity-60 grayscale-[0.5]" : ""}`}
              >
                {isPopular && !isLowerTier && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    Current Plan
                  </div>
                )}
                {isLowerTier && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    Lower Tier
                  </div>
                )}

                <div className="mb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      isCurrent
                        ? "bg-green-50 text-green-600"
                        : isPopular && !isLowerTier
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    <FiPackage className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-gray-900">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-500 font-medium">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 font-semibold">
                    Up to {pkg.employeeLimit} Employees
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <div
                        className={`mt-1 p-1 rounded-full ${
                          isCurrent
                            ? "bg-green-100 text-green-600"
                            : isPopular && !isLowerTier
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <FiCheck className="text-sm" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSelectPackage(pkg)}
                  disabled={isCurrent || isLowerTier}
                  className={`w-full py-4 rounded-2xl font-bold uppercase tracking-wider transition-all ${
                    isCurrent || isLowerTier
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : isPopular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/50"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {isCurrent
                    ? "Current Plan"
                    : isLowerTier
                    ? "Limited Access"
                    : "Upgrade Now"}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Payment History */}
        {paymentHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/20 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 rounded-2xl">
                <FiCreditCard className="text-2xl text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  Payment History
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  Your recent transactions
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paymentHistory.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {payment.packageName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        ${payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                        {payment.transactionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "demo"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </Container>

      {/* Checkout Modal (Only if Stripe is configured) */}
      {showCheckout && selectedPackage && stripePromise && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-gray-900">
                Complete Payment
              </h2>
              <button
                onClick={() => {
                  setShowCheckout(false);
                  setSelectedPackage(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="text-2xl text-gray-600" />
              </button>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm
                selectedPackage={selectedPackage}
                onSuccess={handlePaymentSuccess}
              />
            </Elements>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default UpgradePackage;
