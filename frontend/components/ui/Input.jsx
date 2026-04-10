"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const Input = ({ 
  label,
  error,
  className = "",
  glassmorphism = true,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  
  const baseClasses = "w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none";
  
  const glassClasses = glassmorphism 
    ? "border border-slate-600/80 bg-slate-950/50 text-slate-100 placeholder-slate-500 backdrop-blur-sm focus:border-cyan-500/50 focus:bg-slate-900/80 focus:ring-1 focus:ring-cyan-500/30" 
    : "border border-slate-600 bg-slate-900 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30";
  
  const errorClasses = error 
    ? "border-red-400 focus:border-red-500 focus:ring-red-200" 
    : "";
  
  const classes = `${baseClasses} ${glassClasses} ${errorClasses} ${className}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <motion.label 
          className="block text-xs font-medium uppercase tracking-wider text-slate-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {label}
        </motion.label>
      )}
      <motion.input
        className={classes}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      />
      {error && (
        <motion.p 
          className="text-red-400 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;

