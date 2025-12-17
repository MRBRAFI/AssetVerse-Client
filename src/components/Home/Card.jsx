import { Link } from "react-router";
import { motion } from "framer-motion";

const Card = ({ asset }) => {
  const daysAgo = (dateString) => {
    const today = new Date();
    const pastDate = new Date(dateString);

    // Remove time to avoid timezone issues
    today.setHours(0, 0, 0, 0);
    pastDate.setHours(0, 0, 0, 0);

    const diffTime = today - pastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";

    return `${diffDays} days ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        to={`/asset/${asset._id}`}
        className="block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group h-full"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
            src={asset.image}
            alt="Plant Image"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-gray-700 shadow-sm">
            {asset.quantity > 0 ? "In Inventory" : "Out Of Inventory"}
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {asset.name}
            </h3>
            {asset.type === "Returnable" ? (
              <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-semibold">
                Gadgets
              </span>
            ) : (
              <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-semibold">
                Snacks
              </span>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Quantity</span>
              <span className="font-medium text-gray-700">
                {asset.quantity}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Added</span>
              <span className="font-medium text-gray-700">
                {daysAgo(asset.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
