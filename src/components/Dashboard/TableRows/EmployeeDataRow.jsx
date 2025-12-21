import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Package, Calendar, Shield } from "lucide-react";

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
    <tr className="hover:bg-slate-50 transition-colors duration-150 group">
      {/* Employee Info with Photo */}
      <td className="px-6 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={employee.photo}
              alt={employee.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                employee.status === "active" ? "bg-emerald-500" : "bg-gray-400"
              }`}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900">
              {employee.name}
            </span>
            <span className="text-xs text-slate-500">{employee.email}</span>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4 border-b border-slate-200 bg-white">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleBadgeStyles(
            employee.role
          )}`}
        >
          <Shield className="w-3 h-3" />
          {employee.name}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4 border-b border-slate-200 bg-white">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
            employee.status
          )}`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-current" />
          {employee.status || "Unavailable"}
        </span>
      </td>

      {/* Join Date */}
      <td className="px-6 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4 text-slate-400" />
          {formatDate(employee.joinDate)}
        </div>
      </td>

      {/* Assets Count */}
      <td className="px-6 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-700">
            {employee.assetsCount || 0}
          </span>
          <span className="text-xs text-slate-500">assets</span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 border-b border-slate-200 bg-white">
        <button
          onClick={handleAssignAsset}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 shadow-sm hover:shadow-md"
        >
          <Package className="w-4 h-4" />
          {loading ? "Assigning..." : "Assign Asset"}
        </button>
      </td>
    </tr>
  );
};

export default EmployeeDataRow;
