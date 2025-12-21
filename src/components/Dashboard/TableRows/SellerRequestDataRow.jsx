import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiCheck, FiX, FiClock } from "react-icons/fi";
import Button from "../../Shared/Button/Button";

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
    <tr className="hover:bg-blue-50/30 transition-colors duration-300 group">
      {/* Employee */}
      <td className="px-8 py-6 border-b border-gray-100 bg-white group-hover:bg-blue-50/30 transition-colors">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
               <span className="text-lg font-black text-gray-400">{requesterName?.[0]}</span>
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base font-black text-gray-900 group-hover:text-blue-600 transition-colors truncate uppercase tracking-tight">
              {requesterName}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Team Member
            </span>
          </div>
        </div>
      </td>

      {/* Asset */}
      <td className="px-8 py-6 border-b border-gray-100 bg-white group-hover:bg-blue-50/30 transition-colors">
        <div className="flex flex-col">
          <span className="text-sm font-black text-gray-700 uppercase tracking-tight">
            {assetName}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Asset Identifier
          </span>
        </div>
      </td>

      {/* Date */}
      <td className="px-8 py-6 border-b border-gray-100 bg-white group-hover:bg-blue-50/30 transition-colors">
        <div className="flex items-center gap-2 text-gray-600">
          <FiClock className="text-gray-400" />
          <span className="text-sm font-black tracking-tight">{onDate}</span>
        </div>
      </td>

      {/* Status */}
      <td className="px-8 py-6 border-b border-gray-100 bg-white group-hover:bg-blue-50/30 transition-colors text-center sm:text-left">
        <span
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all duration-500 shadow-sm ${
            localStatus === "pending"
              ? "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-900/5"
              : localStatus === "approved"
              ? "bg-green-50 text-green-600 border-green-100 shadow-green-900/5"
              : "bg-red-50 text-red-600 border-red-100 shadow-red-900/5"
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            localStatus === 'pending' ? 'bg-amber-500' : localStatus === 'approved' ? 'bg-green-500' : 'bg-red-500'
          }`} />
          {localStatus}
        </span>
      </td>

      {/* Actions */}
      <td className="px-8 py-6 border-b border-gray-100 bg-white group-hover:bg-blue-50/30 transition-colors">
        <div className="flex gap-2 justify-center">
          <Button
            label=""
            variant="success"
            size="sm"
            icon={FiCheck}
            onClick={() => handleAction("approve")}
            disabled={localStatus !== "pending" || loading}
            className="!px-3"
            title="Approve Request"
          />
          <Button
            label=""
            variant="danger"
            size="sm"
            icon={FiX}
            onClick={() => handleAction("reject")}
            disabled={localStatus !== "pending" || loading}
            className="!px-3"
            title="Reject Request"
          />
        </div>
      </td>
    </tr>
  );
};

export default SellerRequestDataRow;
