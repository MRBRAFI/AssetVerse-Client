import { motion } from "framer-motion";

const Button = ({ 
  label, 
  onClick, 
  disabled, 
  variant = "primary", 
  size = "md",
  icon: Icon,
  fullWidth = false,
  className = ""
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border-transparent hover:shadow-blue-500/40",
    secondary: "bg-white border-gray-100 text-gray-900 shadow-sm hover:border-blue-500/30",
    outline: "bg-transparent border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-500/50 hover:bg-blue-50/50",
    danger: "bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white shadow-red-900/5",
    success: "bg-green-50 text-green-600 border-green-100 hover:bg-green-600 hover:text-white shadow-green-900/5",
    action: "bg-gray-900 text-white border-transparent hover:bg-black shadow-xl shadow-gray-200",
    ghost: "bg-transparent border-transparent text-gray-400 hover:text-gray-900 hover:bg-gray-50"
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px] rounded-xl",
    md: "px-6 py-3.5 text-xs rounded-2xl",
    lg: "px-8 py-4 text-sm rounded-[1.5rem]"
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative overflow-hidden
        inline-flex items-center justify-center gap-2
        font-black uppercase tracking-[0.2em]
        transition-all duration-300
        border-2
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {/* Glossy Overlay for primary/action */}
      {(variant === "primary" || variant === "action") && (
        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
      )}

      {Icon && (
        <Icon
          size={size === "sm" ? 14 : size === "md" ? 18 : 22}
          className="shrink-0"
        />
      )}
      
      <span className="relative z-10 leading-none">{label}</span>
      
      {/* Shine Animation on Hover */}
      <motion.div 
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
      />
    </motion.button>
  );
};

export default Button;
