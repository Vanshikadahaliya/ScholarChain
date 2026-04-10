"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = ({ contractAddress }) => {
  const footerLinks = {
    Platform: [
      { label: "How it Works", href: "#", onClick: () => alert("How it Works: Donations and scholarship allocations are recorded on-chain for transparency.") },
      { label: "Donate", href: "/donate" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Audit Logs", href: "/audit" }
    ],
    Support: [
      { label: "Help Center", href: "#", onClick: () => alert("Help Center: Contact the NGO for help with ScholarChain.") },
      { label: "Contact Us", href: "#", onClick: () => alert("Contact Us: Add NGO contact details here.") },
      { label: "Community", href: "#", onClick: () => alert("Community: Add community links here.") },
      { label: "Bug Reports", href: "#", onClick: () => alert("Bug Reports: Add your GitHub repo link here.") }
    ],
    Legal: [
      { label: "Terms of Service", href: "#", onClick: () => alert("Terms of Service: By using our platform, you agree to our terms. Full terms available upon request.") },
      { label: "Privacy Policy", href: "#", onClick: () => alert("Privacy Policy: We respect your privacy. Your data is secure and never shared without consent.") },
      { label: "Cookie Policy", href: "#", onClick: () => alert("Cookie Policy: We use essential cookies for functionality. No tracking cookies are used.") },
      { label: "Disclaimer", href: "#", onClick: () => alert("Disclaimer: This platform is for transparency logging and educational use.") }
    ]
  };

  const socialLinks = [
    { name: "Twitter", href: "#", icon: "🐦", onClick: () => alert("Add your NGO social links here.") },
    { name: "GitHub", href: "#", icon: "💻", onClick: () => alert("Add your repository link here.") }
  ];

  return (
    <footer className="border-t border-cyan-500/15 bg-slate-950/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 to-teal-600/10 font-mono text-sm font-bold text-cyan-200 shadow-glow-sm">
                SC
              </div>
              <div>
                <span className="block text-lg font-semibold tracking-tight text-slate-100">
                  ScholarChain
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-500/70">
                  Audit-grade logs
                </span>
              </div>
            </div>
            <p className="mb-4 leading-relaxed text-slate-400">
              On-chain donation and allocation transparency. Student records stay off-chain.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.button
                  key={social.name}
                  onClick={social.onClick}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/80 transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/5"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], sectionIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
            >
              <h3 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-500/90">{title}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + sectionIndex * 0.1 + index * 0.05 }}
                  >
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="inline-block text-left text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-200"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-block text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-slate-500">
                © 2026 ScholarChain. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-slate-500">Target network</span>
                <span className="font-mono text-emerald-400/90">Sepolia</span>
              </div>
            </div>
            
            {contractAddress && (
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-sm">Contract:</span>
                <code className="rounded border border-cyan-500/20 bg-slate-900/90 px-2 py-1 font-mono text-xs text-cyan-200/90">
                  {contractAddress.slice(0, 8)}...{contractAddress.slice(-6)}
                </code>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;



