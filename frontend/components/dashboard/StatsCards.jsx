"use client";

import { motion } from "framer-motion";
import Card from "../ui/Card";
import { useState, useEffect } from "react";

const StatsCards = ({ campaigns = [] }) => {
  const [stats, setStats] = useState({
    totalRaised: 0,
    activeCampaigns: 0,
    successfulCampaigns: 0,
    totalContributors: 0
  });

  useEffect(() => {
    const totalRaised = campaigns.reduce((sum, campaign) => {
      return sum + parseFloat(campaign.fundsRaised || 0);
    }, 0);

    const activeCampaigns = campaigns.filter(campaign => {
      const deadline = new Date(parseInt(campaign.deadline) * 1000);
      const now = new Date();
      return deadline > now && campaign.progress < 100;
    }).length;

    const successfulCampaigns = campaigns.filter(campaign => 
      campaign.progress >= 100
    ).length;

    setStats({
      totalRaised,
      activeCampaigns,
      successfulCampaigns,
      totalContributors: campaigns.length * 2.5 // Mock data
    });
  }, [campaigns]);

  const statCards = [
    {
      title: "Total Raised",
      value: `${stats.totalRaised.toFixed(2)} ETH`,
      icon: "💰",
      color: "from-blue-500 to-blue-600",
      change: "+12.5%",
      changeType: "positive"
    },
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns.toString(),
      icon: "🔥",
      color: "from-blue-500 to-cyan-500",
      change: "+3",
      changeType: "positive"
    },
    {
      title: "Successful",
      value: stats.successfulCampaigns.toString(),
      icon: "✅",
      color: "from-purple-500 to-pink-500",
      change: "+8.2%",
      changeType: "positive"
    },
    {
      title: "Contributors",
      value: Math.floor(stats.totalContributors).toString(),
      icon: "👥",
      color: "from-orange-500 to-red-500",
      change: "+15.3%",
      changeType: "positive"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-blue-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </div>
                <div className="text-xs text-white/60">vs last month</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <p className="text-white/70 text-sm">{stat.title}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;



