'use client';

import { motion } from "framer-motion";
import Link from "next/link";

// Text reveal animation
const textReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Stagger animation for benefits
const benefitsStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

// Individual benefit animation
const benefitItem = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const HeroSection = () => {
  return (
    <section className="relative py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-green-200 rounded-full opacity-5"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline with Text Reveal */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textReveal}
            className="mb-6"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block"
              >
                Your Personal
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block text-blue-600 dark:text-blue-400"
              >
                Health Assistant
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle with Fade In */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Get instant health insights with AI-powered analysis. Track symptoms, analyze lab results, and receive personalized recommendations from our advanced health monitoring system.
          </motion.p>

          {/* Key Benefits with Stagger Animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={benefitsStagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            <motion.div
              variants={benefitItem}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div
                className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <span className="font-medium text-gray-900 dark:text-white">Instant Results</span>
            </motion.div>
            
            <motion.div
              variants={benefitItem}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div
                className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <span className="font-medium text-gray-900 dark:text-white">AI-Powered</span>
            </motion.div>
            
            <motion.div
              variants={benefitItem}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div
                className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </motion.div>
              <span className="font-medium text-gray-900 dark:text-white">Secure & Private</span>
            </motion.div>
          </motion.div>

          {/* CTA Buttons with Enhanced Animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/auth">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg"
              >
                Start Free Analysis
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#f3f4f6",
                color: "#374151"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-lg font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 