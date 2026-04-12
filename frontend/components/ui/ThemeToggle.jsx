"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		// Check for saved theme preference or default to light
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
			setIsDark(true);
			document.documentElement.classList.add('dark');
		} else {
			setIsDark(false);
			document.documentElement.classList.remove('dark');
		}
	}, []);

	const toggleTheme = () => {
		const newIsDark = !isDark;
		setIsDark(newIsDark);

		if (newIsDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	};

	return (
		<motion.button
			onClick={toggleTheme}
			className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
				isDark
					? 'bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 hover:text-white'
					: 'bg-white border border-gray-200 hover:bg-gray-50 shadow-sm text-gray-700 hover:text-gray-900'
			}`}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
		>
			<motion.div
				animate={{ rotate: isDark ? 0 : 180 }}
				transition={{ duration: 0.3 }}
				className="w-6 h-6 flex items-center justify-center"
			>
				{isDark ? (
					// Sun icon for light mode (when in dark mode, clicking shows sun to switch to light)
					<svg
						className="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				) : (
					// Moon icon for dark mode (when in light mode, clicking shows moon to switch to dark)
					<svg
						className="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
				)}
			</motion.div>
		</motion.button>
	);
};

export default ThemeToggle;



