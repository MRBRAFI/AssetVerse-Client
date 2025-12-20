import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../Shared/Button/Button";
import { FiX, FiTrash2 } from "react-icons/fi";

const DeleteModal = ({ closeModal, isOpen }) => {
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
            <div className="flex items-start justify-between gap-4">
              <DialogTitle
                as="h3"
                className="text-xl font-semibold text-gray-900"
              >
                Confirm delete
              </DialogTitle>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              You cannot undo this action. This will permanently remove the
              item.
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button label="Delete" onClick={() => closeModal()} />
              <Button label="Cancel" outline onClick={closeModal} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
