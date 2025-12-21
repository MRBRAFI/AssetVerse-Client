import { useQuery } from "@tanstack/react-query";
import SellerRequestDataRow from "../../../components/Dashboard/TableRows/SellerRequestDataRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const ManageRequests = () => {
  const { user } = useAuth();
  const hrEmail = user.email;
  const axiosSecure = useAxiosSecure();

  const {
    data: request = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employeeRequests", hrEmail],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/hr");
      return res.data;
    },
  });
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Employee
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Asset
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="flex items-center justify-center px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal 
                      "
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  <tbody>
                    <tr>
                      <td colSpan={5}>
                        <LoadingSpinner />
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {request.map((request, index) => (
                      <SellerRequestDataRow
                        key={index}
                        request={request}
                        refetch={refetch}
                      />
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageRequests;
