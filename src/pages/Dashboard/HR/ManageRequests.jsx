import { useQuery } from "@tanstack/react-query";
import SellerRequestDataRow from "../../../components/Dashboard/TableRows/SellerRequestDataRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import { FiClipboard, FiInbox } from "react-icons/fi";
import Container from "../../../components/Shared/Container";

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f8fbff] py-12">
      <Container>
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-4 border border-blue-100"
          >
            <FiClipboard className="text-blue-500" />
            <span>Request Management</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            Pending <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Employee Requests
            </span>
          </motion.h1>
          <p className="mt-6 text-lg text-gray-500 font-medium max-w-lg">
            Review and take action on asset requests from your team members.
            Maintain efficient inventory control with simple approvals.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2.5rem] border border-white shadow-2xl shadow-blue-900/5 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-6 text-left text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                    Employee Info
                  </th>
                  <th className="px-8 py-6 text-left text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                    Requested Asset
                  </th>
                  <th className="px-8 py-6 text-left text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                    Request Date
                  </th>
                  <th className="px-8 py-6 text-left text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                    Status
                  </th>
                  <th className="px-8 py-6 text-center text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {request.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="p-8 bg-gray-50 rounded-full mb-6">
                          <FiInbox className="text-6xl text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">
                          No Pending Requests
                        </h3>
                        <p className="text-gray-400 font-medium">
                          Everything is up to date! Check back later for new
                          submissions.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  request.map((req, index) => (
                    <SellerRequestDataRow
                      key={req._id || index}
                      request={req}
                      refetch={refetch}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ManageRequests;
