import Container from "../../components/Shared/Container";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { FiCheck, FiCpu, FiPackage, FiShield, FiTag, FiUser } from "react-icons/fi";

const AssetDetails = () => {
  const { id } = useParams(); // Hook to get ID if needed for fetching later
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  // Mock Data - In a real app, fetch this based on `id`
  const asset = {
    id: id || "1",
    name: "Money Plant",
    category: "Succulent",
    image: "https://i.ibb.co/DDnw6j9/1738597899-golden-money-plant.jpg",
    description:
      "Professionally deliver sticky testing procedures for next-generation portals. Objectively communicate just in time infrastructures before. Perfect for office environments to boost morale and air quality.",
    seller: {
      name: "MRB RAFI",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c",
    },
    quantity: 10,
    price: 10,
    features: [
      "Low maintenance required",
      "Air purifying properties",
      "Indoor friendly",
      "Brings good luck (Feng Shui)",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 relative bg-gray-100 group overflow-hidden">
               <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="object-cover w-full h-full min-h-[400px] lg:min-h-[600px] group-hover:scale-105 transition-transform duration-700"
                src={asset.image}
                alt={asset.name}
              />
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                  <FiTag className="text-blue-500" />
                  {asset.category}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between relative bg-white/70 backdrop-blur-3xl">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <FiPackage className="text-9xl text-blue-600 transform -rotate-12" />
              </div>

              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    {asset.name}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-500 mb-8">
                    <span className="flex items-center gap-1">
                      <FiShield className="text-green-500" /> Verified Item
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>ID: #{asset.id.padStart(4, '0')}</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="prose prose-lg text-gray-600 mb-8 font-light leading-relaxed"
                >
                  <p>{asset.description}</p>
                </motion.div>

                {/* Features Grid */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                >
                  {asset.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <FiCheck className="text-xs" />
                      </div>
                      <span className="font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </motion.div>
                
                <div className="border-t border-gray-100 my-8"></div>

                {/* Seller Info */}
                <div className="flex items-center justify-between mb-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                       <img
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        src={asset.seller.avatar}
                         alt={asset.seller.name}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">Asset Provider</p>
                      <p className="text-gray-900 font-bold">{asset.seller.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-xs text-gray-500 font-medium">Available Qty</p>
                     <p className="text-xl font-bold text-gray-900">{asset.quantity} Units</p>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between gap-6 pt-4"
              >
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Price</p>
                  <p className="text-4xl font-extrabold text-gray-900">
                    ${asset.price}
                    <span className="text-lg text-gray-400 font-normal ml-1">/unit</span>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(true)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all flex items-center justify-center gap-2"
                >
                  <FiCpu className="text-xl" />
                  Request Item
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
      
      <PurchaseModal closeModal={closeModal} isOpen={isOpen} />
    </div>
  );
};

export default AssetDetails;
