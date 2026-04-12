"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Toast = ({ 
	message, 
	type = "info", 
	isVisible, 
	onClose, 
	duration = 5000 
}) => {
	useEffect(() => {
		if (isVisible && duration > 0) {
			const timer = setTimeout(() => {
				onClose();
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [isVisible, duration, onClose]);

	const getToastStyles = () => {
		switch (type) {
			case "success":
				return "bg-blue-500/20 border-blue-400/30 text-blue-300";
			case "error":
				return "bg-red-500/20 border-red-400/30 text-red-300";
			case "warning":
				return "bg-yellow-500/20 border-yellow-400/30 text-yellow-300";
			default:
				return "bg-blue-500/20 border-blue-400/30 text-blue-300";
		}
	};

	const getIcon = () => {
		switch (type) {
			case "success":
				return "✅";
			case "error":
				return "❌";
			case "warning":
				return "⚠️";
			default:
				return "ℹ️";
		}
	};

	if (!isVisible) return null;

	return (
		<AnimatePresence>
			<motion.div
				className={`fixed top-4 right-4 z-50 max-w-sm w-full ${getToastStyles()} backdrop-blur-xl border rounded-xl p-4 shadow-xl`}
				initial={{ opacity: 0, x: 300, scale: 0.8 }}
				animate={{ opacity: 1, x: 0, scale: 1 }}
				exit={{ opacity: 0, x: 300, scale: 0.8 }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
			>
				<div className="flex items-center space-x-3">
					<span className="text-xl">{getIcon()}</span>
					<p className="flex-1 text-sm font-medium">{message}</p>
					<button
						onClick={onClose}
						className="text-white/60 hover:text-white transition-colors"
					>
						✕
					</button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Toast;



