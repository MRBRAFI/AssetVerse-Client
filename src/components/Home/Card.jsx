import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiPackage, FiActivity, FiClock } from "react-icons/fi";

const Card = ({ asset }) => {
  const daysAgo = (dateString) => {
    const today = new Date();
    const pastDate = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    pastDate.setHours(0, 0, 0, 0);

    const diffTime = today - pastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";

    return `${diffDays} days ago`;
  };

  const isAvailable = asset.quantity > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Link
        to={`/asset/${asset._id}`}
        className="flex flex-col h-full bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 overflow-hidden group"
      >
        {/* Visual Header */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Status Overlay */}
          <div className="absolute top-4 left-4 z-20">
            <div className={`backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border shadow-sm ${
              isAvailable 
                ? 'bg-white/80 text-green-600 border-green-100/50' 
                : 'bg-red-50/80 text-red-600 border-red-100/50'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
              {isAvailable ? "Active Supply" : "Zero Stock"}
            </div>
          </div>

          <img
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
            src={asset.image || "/placeholder-asset.png"}
            alt={asset.name}
          />
          
          {/* Type Badge Overlay */}
          <div className="absolute bottom-4 right-4 z-20">
            <span className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-lg shadow-blue-600/20">
              {asset.type}
            </span>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Info Body */}
        <div className="p-7 flex-1 flex flex-col">
          <div className="mb-6 flex-1">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter line-clamp-2 group-hover:text-blue-600 transition-colors leading-none mb-4">
              {asset.name}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-400 group-hover:text-gray-600 transition-colors">
                  <FiPackage className="text-blue-500/50" size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">Resource Quantity</span>
                </div>
                <span className={`text-sm font-black tracking-tight leading-none ${isAvailable ? 'text-gray-900' : 'text-red-500'}`}>
                   {asset.quantity} Units
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-400 group-hover:text-gray-600 transition-colors">
                  <FiClock className="text-blue-500/50" size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">Registry Date</span>
                </div>
                <span className="text-xs font-bold text-gray-400 tracking-tight leading-none">
                   {daysAgo(asset.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <FiActivity className="text-blue-500/30" size={14} />
               <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">Institutional Nexus</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest group-hover:gap-4 transition-all duration-300">
               Access Details
               <FiArrowRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
