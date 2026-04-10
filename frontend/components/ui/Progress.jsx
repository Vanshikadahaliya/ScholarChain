"use client";

import { motion } from "framer-motion";

const Progress = ({ 
  value = 0, 
  max = 100, 
  className = "",
  showLabel = true,
  color = "blue",
  size = "md",
  animated = true,
  ...props 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
    xl: "h-6"
  };
  
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    red: "from-red-500 to-red-600",
    yellow: "from-yellow-500 to-yellow-600"
  };
  
  const baseClasses = "w-full bg-white/20 rounded-full overflow-hidden";
  const progressClasses = `h-full bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-500`;
  
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/80">Progress</span>
          <span className="text-white font-semibold">{percentage.toFixed(1)}%</span>
        </div>
      )}
      <div className={`${baseClasses} ${sizeClasses[size]}`}>
        <motion.div
          className={progressClasses}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: animated ? 1.5 : 0.3, 
            ease: "easeOut",
            delay: animated ? 0.2 : 0
          }}
        />
      </div>
    </div>
  );
};

export default Progress;


