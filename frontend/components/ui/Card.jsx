"use client";

import { motion } from "framer-motion";

const Card = ({ 
  children, 
  className = "", 
  hover = true,
  glassmorphism = true,
  ...props 
}) => {
  const baseClasses = "rounded-2xl border transition-all duration-300";
  
  const glassClasses = glassmorphism 
    ? "border border-cyan-500/15 bg-slate-900/70 backdrop-blur-xl shadow-glow-sm shadow-inner-glow" 
    : "bg-slate-900 border border-slate-700 shadow-lg";
  
  const hoverClasses = hover 
    ? "hover:-translate-y-0.5 hover:border-cyan-400/25 hover:shadow-glow" 
    : "";
  
  const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${className}`;
  
  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-0 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;

