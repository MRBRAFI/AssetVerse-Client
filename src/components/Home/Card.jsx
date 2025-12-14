import { Link } from "react-router";
import { motion } from "framer-motion";

const Card = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        to={`/asset/1`}
        className="block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group h-full"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
            src="https://i.ibb.co.com/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg"
            alt="Plant Image"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-gray-700 shadow-sm">
            In Stock
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
              Money Plant
            </h3>
            <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-semibold">
              Indoor
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Quantity</span>
              <span className="font-medium text-gray-700">10 units</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Added</span>
              <span className="font-medium text-gray-700">2 days ago</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Price</span>
              <span className="text-xl font-bold text-gray-900">$15.00</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
