import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../Shared/Button/Button";
import { FiX } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PurchaseModal = ({ closeModal, isOpen, asset }) => {
  // Total Price Calculation
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleRequest = async () => {
    try {
      await axiosSecure.post(`${import.meta.env.VITE_BACKEND_URL}/requests`, {
        assetId: asset._id,
        assetName: asset.name,
        assetType: asset.type,
        hrEmail: asset.HR.email,
        companyName: asset.HR.companyName,
      });
      toast.success("Request sent successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send request.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-6">
          <DialogPanel className="w-full max-w-lg bg-white border border-gray-100 rounded-3xl shadow-xl p-6">
            <div className="flex items-start justify-between">
              <DialogTitle
                as="h3"
                className="text-xl font-semibold text-gray-900 text-center w-full"
              >
                Review Info Before Request
              </DialogTitle>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>Asset: {asset.name}</p>
              <p>Category: {asset.type}</p>
              <p>Customer: {user.email}</p>
              <p>Available Quantity: {asset.quantity}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button label="Request" onClick={handleRequest} />
              <Button label="Cancel" outline onClick={closeModal} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
