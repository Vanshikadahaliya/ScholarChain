"use client";

import { motion } from "framer-motion";

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  disabled = false,
  loading = false,
  onClick,
  ...props 
}) => {
  const baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border border-cyan-400/30 bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-glow-sm hover:from-cyan-500 hover:to-teal-500 hover:shadow-glow hover:border-cyan-300/40",
    secondary: "border border-slate-600 bg-slate-800/90 text-slate-100 shadow-inner-glow hover:border-cyan-500/25 hover:bg-slate-800",
    outline: "border-2 border-cyan-500/50 text-cyan-200 hover:bg-cyan-500/15 hover:border-cyan-400",
    ghost: "text-cyan-300/90 hover:bg-white/5 hover:text-cyan-100",
    danger: "border border-red-500/40 bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500",
    success: "border border-emerald-500/40 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
    xl: "px-10 py-5 text-xl rounded-2xl"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
      <span className={loading ? "opacity-0" : "opacity-100"}>
        {children}
      </span>
    </motion.button>
  );
};

export default Button;

