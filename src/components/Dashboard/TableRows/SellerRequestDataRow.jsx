import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SellerRequestDataRow = ({ request, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { _id, requesterName, assetName, requestDate, requestStatus } = request;

  // 🔥 LOCAL UI STATE (KEY FIX)
  const [localStatus, setLocalStatus] = useState(requestStatus);
  const [loading, setLoading] = useState(false);

  // 🔄 Keep local state in sync if parent refetches
  useEffect(() => {
    setLocalStatus(requestStatus);
  }, [requestStatus]);

  const onDate = requestDate.split("T")[0];

  const handleAction = async (action) => {
    const confirm = await Swal.fire({
      title: `Are you sure you want to ${action} this request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText:
        action === "approve" ? "Yes, approve it!" : "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const res = await axiosSecure.patch(`/requests/${_id}/action`, {
        action,
      });

      // 🚀 INSTANT UI UPDATE (NO WAITING)
      setLocalStatus(action === "approve" ? "approved" : "rejected");

      await Swal.fire({
        icon: "success",
        title: res.data.message,
        timer: 1200,
        showConfirmButton: false,
      });

      // 🔄 Background sync (safe)
      refetch();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      {/* Employee */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white">
        <p className="text-gray-900">{requesterName}</p>
      </td>

      {/* Asset */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white">
        <p className="text-gray-900">{assetName}</p>
      </td>

      {/* Date */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white">
        <p className="text-gray-900">{onDate}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white">
        {localStatus === "pending" && (
          <span className="bg-blue-500 px-2 py-1 rounded text-white">
            Pending
          </span>
        )}
        {localStatus === "approved" && (
          <span className="bg-green-500 px-2 py-1 rounded text-white">
            Approved
          </span>
        )}
        {localStatus === "rejected" && (
          <span className="bg-red-500 px-2 py-1 rounded text-white">
            Rejected
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="flex gap-2 justify-center px-5 py-5 border-b border-gray-200 bg-white">
        <button
          onClick={() => handleAction("approve")}
          disabled={localStatus !== "pending" || loading}
          className="bg-indigo-500 text-white px-3 py-1 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Accept
        </button>

        <button
          onClick={() => handleAction("reject")}
          disabled={localStatus !== "pending" || loading}
          className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default SellerRequestDataRow;
