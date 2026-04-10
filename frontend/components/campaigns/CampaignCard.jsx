"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Card from "../ui/Card";
import Progress from "../ui/Progress";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const CampaignCard = ({ campaign, index = 0 }) => {
  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleDateString();
  };

  const formatETH = (wei) => {
    return parseFloat(wei).toFixed(4);
  };

  const isExpired = new Date(parseInt(campaign.deadline) * 1000) < new Date();
  const isFunded = campaign.progress >= 100;
  const isActive = !isExpired && !isFunded;

  const getStatusBadge = () => {
    if (isFunded) return { variant: "success", text: "✅ Funded", icon: "🎉" };
    if (isExpired) return { variant: "error", text: "❌ Expired", icon: "⏰" };
    return { variant: "info", text: "🔄 Active", icon: "🔥" };
  };

  const status = getStatusBadge();

  const getCategoryIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("tech") || titleLower.includes("ai")) return "💻";
    if (titleLower.includes("art") || titleLower.includes("music")) return "🎨";
    if (titleLower.includes("health") || titleLower.includes("medical")) return "🏥";
    if (titleLower.includes("education") || titleLower.includes("learn")) return "📚";
    if (titleLower.includes("environment") || titleLower.includes("green")) return "🌱";
    return "💡";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/campaign/${campaign.id}`}>
        <Card className="overflow-hidden cursor-pointer group">
          {/* Campaign Image */}
          <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-4 left-4">
              <Badge variant="purple" size="sm">
                {getCategoryIcon(campaign.title)} Innovation
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant={status.variant} size="sm">
                {status.icon} {status.text}
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-white/90 text-sm">
                <span className="font-semibold">Creator:</span> {campaign.creator.slice(0, 6)}...{campaign.creator.slice(-4)}
              </div>
            </div>
          </div>

          {/* Campaign Content */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Title and Description */}
              <div>
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                  {campaign.title}
                </h3>
                <p className="text-white/70 text-sm line-clamp-3 leading-relaxed">
                  {campaign.description}
                </p>
              </div>

              {/* Progress Section */}
              <div className="space-y-3">
                <Progress 
                  value={campaign.progress} 
                  color="blue" 
                  size="md"
                  animated={true}
                />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/80">
                    {formatETH(campaign.fundsRaised)} / {formatETH(campaign.goal)} ETH
                  </span>
                  <span className="text-white font-semibold">
                    {campaign.progress.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Campaign Meta */}
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <span className="flex items-center space-x-1">
                    <span>⏰</span>
                    <span>{formatDate(campaign.deadline)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>👥</span>
                    <span>{Math.floor(Math.random() * 50) + 10}</span>
                  </span>
                </div>
                
                <Button
                  variant={isActive ? "primary" : "secondary"}
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {isActive ? "Support" : isFunded ? "Funded" : "Expired"}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CampaignCard;



