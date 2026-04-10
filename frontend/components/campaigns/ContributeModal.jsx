"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";

const ContributeModal = ({ 
  isOpen, 
  onClose, 
  campaign, 
  onContribute, 
  account,
  loading = false 
}) => {
  const [amount, setAmount] = useState("");
  const [quickAmount, setQuickAmount] = useState("");

  const quickAmounts = ["0.01", "0.05", "0.1", "0.5", "1.0"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && parseFloat(amount) > 0) {
      onContribute(amount);
    }
  };

  const handleQuickAmount = (quickAmount) => {
    setAmount(quickAmount);
    setQuickAmount(quickAmount);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">💎 Support This Campaign</h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {campaign && (
              <div className="mb-6 p-4 bg-white/5 rounded-xl">
                <h3 className="font-semibold text-white mb-2">{campaign.title}</h3>
                <div className="flex justify-between text-sm text-white/70">
                  <span>Goal: {parseFloat(campaign.goal).toFixed(4)} ETH</span>
                  <span>Raised: {parseFloat(campaign.fundsRaised).toFixed(4)} ETH</span>
                </div>
                <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(campaign.progress, 100)}%` }}
                  />
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-3">
                  Quick Amount (ETH)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      type="button"
                      variant={amount === quickAmount ? "primary" : "outline"}
                      size="sm"
                      onClick={() => handleQuickAmount(quickAmount)}
                      className="text-xs"
                    >
                      {quickAmount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <Input
                label="Custom Amount (ETH)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.01"
                step="0.001"
                min="0.001"
                required
              />

              {/* Contribution Summary */}
              {amount && parseFloat(amount) > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                >
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Your Contribution:</span>
                      <span className="text-white font-semibold">{amount} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Platform Fee (2%):</span>
                      <span className="text-white/70">{(parseFloat(amount) * 0.02).toFixed(4)} ETH</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2">
                      <span className="text-white font-semibold">Total:</span>
                      <span className="text-white font-semibold">
                        {(parseFloat(amount) * 1.02).toFixed(4)} ETH
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={!account || loading || !amount || parseFloat(amount) <= 0}
                  loading={loading}
                >
                  {!account ? "Connect Wallet" : loading ? "Processing..." : "💎 Contribute"}
                </Button>
              </div>

              {!account && (
                <p className="text-center text-white/60 text-sm">
                  Please connect your wallet to contribute
                </p>
              )}
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContributeModal;



