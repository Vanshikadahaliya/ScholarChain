"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const SearchAndFilters = ({ 
  onSearch, 
  onFilterChange, 
  onSortChange,
  searchQuery = "",
  activeFilter = "all",
  sortBy = "newest"
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categories = [
    { id: "all", label: "All", icon: "🌐" },
    { id: "innovation", label: "Innovation", icon: "💡" },
    { id: "education", label: "Education", icon: "📚" },
    { id: "health", label: "Health", icon: "🏥" },
    { id: "environment", label: "Environment", icon: "🌱" },
    { id: "art", label: "Art & Culture", icon: "🎨" },
    { id: "technology", label: "Technology", icon: "💻" },
    { id: "social", label: "Social Impact", icon: "🤝" }
  ];

  const sortOptions = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "most_funded", label: "Most Funded" },
    { id: "least_funded", label: "Least Funded" },
    { id: "deadline", label: "Deadline Soon" },
    { id: "trending", label: "Trending" }
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-12 pr-4"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">
            🔍
          </div>
        </div>
      </motion.div>

      {/* Filters and Sort */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Category Filters */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Button
                  variant={activeFilter === category.id ? "primary" : "outline"}
                  size="sm"
                  onClick={() => onFilterChange(category.id)}
                  className="flex items-center space-x-2"
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sort Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      {/* Active Filters Display */}
      {(activeFilter !== "all" || searchQuery) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap gap-2"
        >
          {searchQuery && (
            <Badge variant="info" size="sm">
              Search: "{searchQuery}"
            </Badge>
          )}
          {activeFilter !== "all" && (
            <Badge variant="purple" size="sm">
              Category: {categories.find(c => c.id === activeFilter)?.label}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onSearch("");
              onFilterChange("all");
            }}
            className="text-white/60 hover:text-white"
          >
            Clear All
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default SearchAndFilters;



