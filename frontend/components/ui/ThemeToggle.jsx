"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		// Default to dark mode for this app
		document.documentElement.classList.add('dark');
	}, []);

	const toggleTheme = () => {
		setIsDark(!isDark);
		if (isDark) {
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.add('dark');
		}
	};

	return (
		<motion.button
			onClick={toggleTheme}
			className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<motion.div
				animate={{ rotate: isDark ? 0 : 180 }}
				transition={{ duration: 0.3 }}
				className="text-2xl"
			>
				{isDark ? "🌙" : "☀️"}
			</motion.div>
		</motion.button>
	);
};

export default ThemeToggle;



