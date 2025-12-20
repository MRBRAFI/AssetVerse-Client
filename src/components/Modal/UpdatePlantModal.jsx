import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import UpdatePlantForm from "../Form/UpdatePlantForm";
import { FiX } from "react-icons/fi";

const UpdatePlantModal = ({ setIsEditModalOpen, isOpen }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={() => setIsEditModalOpen(false)}
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
                className="text-xl font-semibold text-gray-900"
              >
                Update Plant Info
              </DialogTitle>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mt-4 w-full">
              <UpdatePlantForm />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdatePlantModal;
