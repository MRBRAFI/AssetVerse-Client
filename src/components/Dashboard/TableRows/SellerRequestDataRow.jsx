import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
const SellerRequestDataRow = ({ request }) => {
  const { requesterName, assetName, requestDate, requestStatus } = request;
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const onDate = requestDate.split("T")[0];
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white">
        <p className="text-gray-900 ">{requesterName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white">
        <p className="text-gray-900 ">{assetName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white">
        <p className="text-gray-900 ">{onDate}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          {requestStatus === "pending" ? (
            <option
              value="Pending"
              className="bg-blue-500 p-1 rounded text-white"
            >
              Pending
            </option>
          ) : requestStatus === "approved" ? (
            <option
              value="In Progress"
              className="bg-green-500 p-1 rounded text-white"
            >
              Approved
            </option>
          ) : (
            <option
              value="Delivered"
              className="bg-red-500 p-1 rounded text-white"
            >
              Rejected
            </option>
          )}
        </div>
        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
      <td className="flex gap-2 justify-center px-5 py-5 border-b border-gray-200 bg-white">
        <button
          className="relative disabled:cursor-not-allowed bg-indigo-500 text-white cursor-pointer inline-block px-3 py-1 rounded leading-tight disabled:opacity-30"
          disabled={
            requestStatus === "approved" || requestStatus === "rejected"
              ? true
              : false
          }
        >
          Accept
        </button>

        <button
          onClick={() => setIsOpen(true)}
          className="relative disabled:cursor-not-allowed bg-red-500 text-white cursor-pointer inline-block px-3 py-1 rounded leading-tight disabled:opacity-30"
          disabled={requestStatus === "pending" ? false : true}
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default SellerRequestDataRow;
