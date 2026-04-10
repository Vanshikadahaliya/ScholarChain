"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = ({ account, onConnectWallet, network }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/donate", label: "Donate" },
    { href: "/students", label: "Students" },
    { href: "/allocate", label: "Allocate" },
    { href: "/audit", label: "Audit" }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-cyan-500/20 bg-slate-950/85 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-cyan-500/10 bg-slate-950/40 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-teal-600/10 shadow-glow-sm">
                <span className="font-mono text-sm font-bold tracking-tight text-cyan-200">SC</span>
                <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-cyan-400/10" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold tracking-tight text-slate-100">
                  ScholarChain
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-500/80">
                  Transparency layer
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400 transition-colors hover:bg-cyan-500/10 hover:text-cyan-200"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Network Status */}
            {network && (
              <Badge 
                variant={network === "11155111" ? "success" : "warning"}
                size="sm"
                className="font-mono uppercase tracking-wider"
              >
                {network === "11155111" ? "Sepolia" : "Wrong net"}
              </Badge>
            )}

            {/* Connect Button */}
            <Button
              variant={account ? "success" : "primary"}
              size="sm"
              onClick={onConnectWallet}
              className="min-w-[140px]"
            >
              {account ? (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
                </div>
              ) : (
                "Connect Wallet"
              )}
            </Button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="rounded-md p-2 text-slate-300 hover:bg-white/5 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? "auto" : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="mt-2 space-y-1 rounded-lg border border-cyan-500/15 bg-slate-950/90 p-2 backdrop-blur-xl">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wider text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
