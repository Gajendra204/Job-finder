import React, { useState } from "react";
import { Search, Sparkles, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

function HeroSection() {
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim()) {
      // Set the search query in Redux store
      dispatch(setSearchedQuery(query));
      // Navigate to jobs page with search results
      navigate("/browse");
    }
  };

  const navigateToBrowse = () => {
    // Clear any existing search and navigate to browse
    dispatch(setSearchedQuery(""));
    navigate("/browse");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchJobHandler();
    }
  };

  const handleSuggestionClick = (term) => {
    setQuery(term);
    dispatch(setSearchedQuery(term));
    navigate("/browse");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-indigo-200 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-200 rounded-full opacity-15"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="relative">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-lg">
              <Sparkles className="w-4 h-4" />
              #1 Job Hunt Platform
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent">
              Discover Your
            </span>
            <br />
            <motion.span
              className="relative inline-block bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateToBrowse()}
            >
              Dream Career
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Connect with top companies, explore opportunities that match your
          skills, and take the next step in your professional journey.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-12"
        >
          <div
            className={`relative max-w-2xl mx-auto transition-all duration-300 ${
              isSearchFocused ? "transform scale-105" : ""
            }`}
          >
            <div className="flex items-center bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-3xl transition-shadow duration-300">
              <div className="flex-1 flex items-center px-6 py-4">
                <Search className="w-5 h-5 text-gray-400 mr-4" />
                <input
                  type="text"
                  placeholder="Search for jobs, companies, or skills..."
                  className="flex-1 outline-none border-none text-lg placeholder-gray-400"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    setTimeout(() => setIsSearchFocused(false), 200)
                  }
                  onKeyPress={handleKeyPress}
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={searchJobHandler}
                  className="h-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-none rounded-r-2xl transition-all duration-300 cursor-pointer border-none outline-none"
                >
                  Search Jobs
                </button>
              </motion.div>
            </div>

            {/* Search suggestions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isSearchFocused ? 1 : 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
            >
              <div className="p-4 space-y-2">
                <p className="text-sm text-gray-500 font-medium">
                  Popular searches:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Software Engineer",
                    "Product Manager",
                    "Data Analyst",
                    "UI/UX Designer",
                  ].map((term) => (
                    <button
                      key={term}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-purple-100 hover:text-purple-700 rounded-full transition-colors duration-200"
                      onClick={() => handleSuggestionClick(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: TrendingUp, number: "50K+", label: "Active Jobs" },
            { icon: Users, number: "100K+", label: "Happy Users" },
            { icon: Sparkles, number: "500+", label: "Top Companies" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroSection;
