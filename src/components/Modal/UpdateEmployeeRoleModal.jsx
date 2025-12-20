import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import Button from "../Shared/Button/Button";
import { FiX } from "react-icons/fi";

const UpdateEmployeeRoleModal = ({ isOpen, closeModal, role }) => {
  const [updatedRole, setUpdatedRole] = useState(role);

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
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-6">
          <DialogPanel className="w-full max-w-md rounded-3xl bg-white border border-gray-100 p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <DialogTitle
                as="h3"
                className="text-lg font-semibold text-gray-900"
              >
                Update Employee Role
              </DialogTitle>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>

            <form className="mt-4">
              <div>
                <select
                  value={updatedRole}
                  onChange={(e) => setUpdatedRole(e.target.value)}
                  className="w-full my-3 border border-gray-200 rounded-xl px-3 py-3"
                  name="role"
                >
                  <option value="employee">Employee</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button label="Update" onClick={() => closeModal()} />
                <Button label="Cancel" outline onClick={closeModal} />
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
export default UpdateEmployeeRoleModal;
