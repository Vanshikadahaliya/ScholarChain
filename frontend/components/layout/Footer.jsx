"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const Footer = ({ contractAddress }) => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const footerLinks = {
    Platform: [
      { label: "How it Works", onClick: () => openModal({
        title: "How ScholarChain Works",
        content: (
          <div className="space-y-4">
            <p>ScholarChain is a blockchain-powered scholarship platform that ensures complete transparency in donation and allocation processes.</p>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-blue-600">1. Connect Your Wallet</h4>
                <p className="text-sm text-gray-600">Use MetaMask to connect your Ethereum wallet securely.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600">2. Choose a Scholarship Program</h4>
                <p className="text-sm text-gray-600">Browse verified scholarship programs and select one that matches your interests.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600">3. Make a Donation</h4>
                <p className="text-sm text-gray-600">Donate directly to the scholarship fund with full transparency on the blockchain.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600">4. Track Your Impact</h4>
                <p className="text-sm text-gray-600">Monitor how your donation is allocated and used through our audit logs.</p>
              </div>
            </div>
          </div>
        )
      })},
      { label: "Donate", href: "/donate" },
      { label: "Students", href: "/students" },
      { label: "Audit Logs", href: "/audit" }
    ],
    Support: [
      { label: "Help Center", onClick: () => openModal({
        title: "Help Center",
        content: (
          <div className="space-y-4">
            <p>Need help with ScholarChain? Here are some common questions and solutions:</p>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-blue-600">How do I connect my wallet?</h4>
                <p className="text-sm text-gray-600">Click the "Connect Wallet" button in the top right corner and follow the MetaMask prompts.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600">Why do I need to switch to Sepolia network?</h4>
                <p className="text-sm text-gray-600">ScholarChain operates on the Sepolia testnet for development and testing purposes.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600">How can I verify my donation?</h4>
                <p className="text-sm text-gray-600">All transactions are recorded on the blockchain. Check the audit logs or use a block explorer.</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Still need help?</strong> Contact our support team at{" "}
                <a href="mailto:support@scholarship.org" className="text-blue-600 underline">
                  support@scholarship.org
                </a>
              </p>
            </div>
          </div>
        )
      })},
      { label: "Contact Us", onClick: () => openModal({
        title: "Contact Us",
        content: (
          <div className="space-y-4">
            <p>Get in touch with the ScholarChain team:</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:contact@scholarship.org" className="text-blue-600 hover:underline">
                    contact@scholarship.org
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">+91-XXXXXXXXXX</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600">ScholarChain Foundation<br />Tech Park, Bangalore<br />Karnataka, India</p>
                </div>
              </div>
            </div>
          </div>
        )
      })},
      { label: "Community", href: "https://github.com/scholarship-org", external: true },
      { label: "Bug Reports", href: "https://github.com/scholarship-org/scholarship/issues", external: true }
    ],
    Legal: [
      { label: "Terms of Service", onClick: () => openModal({
        title: "Terms of Service",
        content: (
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold text-lg">Terms of Service</h3>
            <p><strong>Last updated:</strong> April 12, 2026</p>
            
            <h4 className="font-semibold mt-4">1. Acceptance of Terms</h4>
            <p>By accessing and using ScholarChain, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h4 className="font-semibold mt-4">2. Use License</h4>
            <p>Permission is granted to temporarily access the materials (information or software) on ScholarChain's website for personal, non-commercial transitory viewing only.</p>
            
            <h4 className="font-semibold mt-4">3. Disclaimer</h4>
            <p>The materials on ScholarChain's website are provided on an 'as is' basis. ScholarChain makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h4 className="font-semibold mt-4">4. Limitations</h4>
            <p>In no event shall ScholarChain or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ScholarChain's website.</p>
          </div>
        )
      })},
      { label: "Privacy Policy", onClick: () => openModal({
        title: "Privacy Policy",
        content: (
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold text-lg">Privacy Policy</h3>
            <p><strong>Last updated:</strong> April 12, 2026</p>
            
            <h4 className="font-semibold mt-4">Information We Collect</h4>
            <p>We collect information you provide directly to us, such as when you create an account, make a donation, or contact us for support.</p>
            
            <h4 className="font-semibold mt-4">How We Use Your Information</h4>
            <p>We use the information we collect to provide, maintain, and improve our services, process donations, and communicate with you.</p>
            
            <h4 className="font-semibold mt-4">Information Sharing</h4>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            
            <h4 className="font-semibold mt-4">Data Security</h4>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h4 className="font-semibold mt-4">Blockchain Transparency</h4>
            <p>Please note that blockchain transactions are public by nature. Donation amounts and recipient information may be visible on the blockchain.</p>
          </div>
        )
      })},
      { label: "Cookie Policy", onClick: () => openModal({
        title: "Cookie Policy",
        content: (
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold text-lg">Cookie Policy</h3>
            <p><strong>Last updated:</strong> April 12, 2026</p>
            
            <h4 className="font-semibold mt-4">What Are Cookies</h4>
            <p>Cookies are small text files that are stored on your computer or mobile device when you visit our website.</p>
            
            <h4 className="font-semibold mt-4">How We Use Cookies</h4>
            <p>We use cookies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from.</p>
            
            <h4 className="font-semibold mt-4">Types of Cookies We Use</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            </ul>
            
            <h4 className="font-semibold mt-4">Managing Cookies</h4>
            <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
          </div>
        )
      })},
      { label: "Disclaimer", onClick: () => openModal({
        title: "Disclaimer",
        content: (
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold text-lg">Disclaimer</h3>
            <p><strong>Last updated:</strong> April 12, 2026</p>
            
            <p>The information contained on the ScholarChain website is for general information purposes only. The information is provided by ScholarChain and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
            
            <p>Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>
            
            <p>Through this website you are able to link to other websites which are not under the control of ScholarChain. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>
            
            <p>Every effort is made to keep the website up and running smoothly. However, ScholarChain takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.</p>
          </div>
        )
      })}
    ]
  };

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/scholarship", icon: "🐦", external: true },
    { name: "GitHub", href: "https://github.com/scholarship-org", icon: "💻", external: true }
  ];

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 font-bold text-sm text-blue-700 shadow-sm dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                SC
              </div>
              <div>
                <span className="block text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  ScholarChain
                </span>
                <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Transparency First
                </span>
              </div>
            </div>
            <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-400 text-sm">
              On-chain donation and allocation transparency. Student records stay off-chain.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
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
              <h3 className="mb-4 font-semibold text-sm uppercase tracking-wide text-gray-900 dark:text-white">{title}</h3>
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
                        className="inline-block text-left text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                      >
                        {link.label}
                      </button>
                    ) : link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-block text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
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
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2026 ScholarChain. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Target network</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">Sepolia</span>
              </div>
            </div>
            
            {contractAddress && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Contract:</span>
                <code className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-1 font-mono text-xs text-gray-700 dark:text-gray-300">
                  {contractAddress.slice(0, 8)}...{contractAddress.slice(-6)}
                </code>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{modalContent.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                {modalContent.content}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </footer>
  );
};

export default Footer;



