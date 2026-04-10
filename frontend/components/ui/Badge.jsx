"use client";

import { motion } from "framer-motion";

const Badge = ({ 
  children, 
  variant = "default",
  size = "md",
  className = "",
  ...props 
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full transition-all duration-300";
  
  const variants = {
    default: "bg-slate-800/80 text-slate-200 border border-slate-600/60",
    success: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/35",
    warning: "bg-amber-500/15 text-amber-200 border border-amber-400/35",
    error: "bg-red-500/15 text-red-300 border border-red-400/35",
    info: "bg-cyan-500/15 text-cyan-200 border border-cyan-400/35",
    purple: "bg-violet-500/15 text-violet-200 border border-violet-400/35"
  };
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.span
      className={classes}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Badge;



