import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FiCreditCard, FiAlertCircle } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const CheckoutForm = ({ selectedPackage, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (selectedPackage) {
      console.log(
        "🔄 Creating payment intent for package:",
        selectedPackage.name
      );

      axiosSecure
        .post("/create-payment-intent", {
          price: selectedPackage.price,
        })
        .then((res) => {
          console.log("✅ Payment intent created:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("❌ Payment intent error:", error);
          toast.error("Failed to initialize payment");
        });
    }
  }, [selectedPackage, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    setProcessing(true);
    setError("");

    console.log("💳 Starting payment process...");

    // Create payment method
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      console.error("❌ Payment method error:", paymentMethodError);
      setError(paymentMethodError.message);
      setProcessing(false);
      return;
    }

    console.log("✅ Payment method created:", paymentMethod.id);

    // Confirm card payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "anonymous@example.com",
          },
        },
      });

    if (confirmError) {
      console.error("❌ Payment confirmation error:", confirmError);
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log("✅ Payment succeeded:", paymentIntent.id);

      try {
        const upgradeData = {
          packageName: selectedPackage.name,
          employeeLimit: selectedPackage.employeeLimit,
          price: selectedPackage.price,
          transactionId: paymentIntent.id,
          paymentStatus: "completed",
        };

        console.log("📤 Sending upgrade request:", upgradeData);

        // ✅ Use axiosSecure which includes JWT token
        const response = await axiosSecure.post(
          "/upgrade-package",
          upgradeData
        );

        console.log("✅ Upgrade response:", response.data);

        toast.success("Package upgraded successfully!");
        setProcessing(false);
        onSuccess();
      } catch (error) {
        console.error("❌ Upgrade error:", error);
        console.error("Error response:", error.response?.data);
        setError(
          error.response?.data?.message ||
            "Payment succeeded but upgrade failed. Contact support."
        );
        setProcessing(false);
      }
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1f2937",
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontWeight: "500",
        "::placeholder": {
          color: "#9ca3af",
        },
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Package Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              Package
            </p>
            <h3 className="text-2xl font-black text-gray-900">
              {selectedPackage.name}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              Total
            </p>
            <p className="text-3xl font-black text-blue-600">
              ${selectedPackage.price}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiCreditCard />
          <span className="font-medium">
            Up to {selectedPackage.employeeLimit} employees
          </span>
        </div>
      </div>

      {/* Card Element */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
          Card Information
        </label>
        <div className="p-4 border-2 border-gray-200 rounded-xl focus-within:border-blue-500 transition-colors">
          <CardElement options={cardStyle} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <FiAlertCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-900 text-sm">Payment Error</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!stripe || processing || !clientSecret}
        className={`w-full py-4 rounded-2xl font-bold uppercase tracking-wider transition-all ${
          !stripe || processing || !clientSecret
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/50"
        }`}
      >
        {processing ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          `Pay $${selectedPackage.price}`
        )}
      </button>

      {/* Security Notice */}
      <p className="text-xs text-center text-gray-500 font-medium">
        Your payment is secured by Stripe. We never store your card details.
      </p>
    </div>
  );
};

export default CheckoutForm;
