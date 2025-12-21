import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Package } from "lucide-react";
import { FiUserPlus } from "react-icons/fi";
import Button from "../../Shared/Button/Button";

const EmployeeDataRow = ({ employee, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleAssignAsset = async () => {
    try {
      setLoading(true);

      const resAssets = await axiosSecure.get("/assets");
      const availableAssets = resAssets.data.result.filter(
        (a) => a.quantity > 0
      );

      if (availableAssets.length === 0) {
        await Swal.fire({
          icon: "info",
          title: "No available assets to assign",
        });
        return;
      }

      console.log(employee);

      const { value: selectedAssetId } = await Swal.fire({
        title: `Select asset to assign to ${employee.email}`,
        input: "select",
        inputOptions: availableAssets.reduce((acc, asset) => {
          acc[
            asset._id
          ] = `${asset.name} (${asset.quantity} left) ${asset.HR.email}`;
          return acc;
        }, {}),
        inputPlaceholder: "Select an asset",
        showCancelButton: true,
        confirmButtonText: "Assign",
      });

      if (!selectedAssetId) return;

      const confirm = await Swal.fire({
        title: `Assign ${
          availableAssets.find((a) => a._id === selectedAssetId).name
        } to ${employee.email}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, assign",
        cancelButtonText: "Cancel",
      });

      if (!confirm.isConfirmed) return;

      const res = await axiosSecure.post("/assign-asset", {
        employeeEmail: employee.email,
        assetId: selectedAssetId,
      });

      await Swal.fire({
        icon: "success",
        title: res.data.message,
        timer: 1500,
        showConfirmButton: false,
      });

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

  console.log(employee);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusStyles = (status) => {
    const styles = {
      active: "bg-emerald-100 text-emerald-700 border-emerald-200",
      inactive: "bg-gray-100 text-gray-700 border-gray-200",
      pending: "bg-amber-100 text-amber-700 border-amber-200",
    };
    return styles[status?.toLowerCase()] || styles.inactive;
  };

  const getRoleBadgeStyles = (role) => {
    const styles = {
      EMPLOYEE: "bg-blue-100 text-blue-700 border-blue-200",
      HR: "bg-purple-100 text-purple-700 border-purple-200",
      ADMIN: "bg-rose-100 text-rose-700 border-rose-200",
    };
    return styles[role] || styles.EMPLOYEE;
  };

  return (
    <tr className="hover:bg-blue-50/30 transition-colors duration-300 group ring-inset focus-within:ring-2 focus-within:ring-blue-500">
      {/* Employee Info with Photo */}
      <td className="px-8 py-6 border-b border-gray-100 bg-white group-hover:bg-blue-50/30 transition-colors">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
            <img
              src={employee.photo || "/placeholder-avatar.png"}
              alt={employee.name}
              className="relative w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
            />
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                employee.status === "active" ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base font-black text-gray-900 group-hover:text-blue-600 transition-colors truncate uppercase tracking-tight">
              {employee.name}
            </span>
            <span className="text-xs font-bold text-gray-400 truncate tracking-tight">
              {employee.email}
            </span>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-8 py-6 border-b border-gray-100 bg-white group-hover:bg-blue-50/30 transition-colors">
        <span
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
            employee.status === "active"
              ? "bg-green-50 text-green-600 border-green-100"
              : "bg-gray-50 text-gray-400 border-gray-100"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${employee.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
          {employee.status || "Inactive"}
        </span>
      </td>

      {/* Join Date */}
      <td className="px-8 py-6 border-b border-gray-100 bg-white group-hover:bg-blue-50/30 transition-colors">
        <div className="flex flex-col">
          <span className="text-sm font-black text-gray-700">
            {formatDate(employee.joinDate)}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Registration Date
          </span>
        </div>
      </td>

      {/* Assets Count */}
      <td className="px-8 py-6 border-b border-gray-100 bg-white group-hover:bg-blue-50/30 transition-colors text-center sm:text-left">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100 group-hover:border-blue-100 transition-colors">
          <Package className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <span className="text-lg font-black text-gray-900 leading-none">
            {employee.assetsCount || 0}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Assets
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-8 py-6 border-b border-gray-100 bg-white group-hover:bg-blue-50/30 transition-colors text-center">
        <Button
          label={loading ? "SYNCING..." : "ASSIGN"}
          variant="action"
          size="sm"
          icon={FiUserPlus}
          onClick={handleAssignAsset}
          disabled={loading}
        />
      </td>
    </tr>
  );
};

export default EmployeeDataRow;
