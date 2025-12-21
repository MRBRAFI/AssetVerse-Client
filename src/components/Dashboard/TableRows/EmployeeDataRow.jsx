import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EmployeeDataRow = ({ employee, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleAssignAsset = async () => {
    try {
      setLoading(true);

      // Step 1: Fetch all available assets for this HR
      const resAssets = await axiosSecure.get("/assets"); // You can add a query param to filter HR-owned assets
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

      // Step 2: Ask HR to pick an asset from dropdown
      const { value: selectedAssetId } = await Swal.fire({
        title: `Select asset to assign to ${employee.email}`,
        input: "select",
        inputOptions: availableAssets.reduce((acc, asset) => {
          acc[asset._id] = `${asset.name} (${asset.quantity} left)`;
          return acc;
        }, {}),
        inputPlaceholder: "Select an asset",
        showCancelButton: true,
        confirmButtonText: "Assign",
      });

      if (!selectedAssetId) return; // Cancelled

      // Step 3: Confirm assignment
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

      // Step 4: Assign asset
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

      refetch(); // Refresh employee list
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
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{employee.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{employee.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{employee.status || "Unavailable"}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={handleAssignAsset}
          disabled={loading}
          className="bg-indigo-500 text-white px-3 py-1 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Assign Asset
        </button>
      </td>
    </tr>
  );
};

export default EmployeeDataRow;
