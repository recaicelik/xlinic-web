'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatedGradient } from '@/components/common/AnimatedGradient';

const features = [
  {
    id: 'health-test',
    title: 'Smart Test Analysis',
    description: 'Analyze your lab results with AI-powered insights',
    icon: '🔬',
    color: 'from-blue-500 to-blue-600',
    glowColor: 'from-blue-400/20 via-blue-400/20 to-blue-400/20',
    href: '/features/health-test',
    stats: '98% Accuracy'
  },
  {
    id: 'symptoms',
    title: 'Symptom Analysis',
    description: 'Track and monitor your symptoms over time',
    icon: '🏥',
    color: 'from-green-500 to-green-600',
    glowColor: 'from-green-400/20 via-green-400/20 to-green-400/20',
    href: '/features/symptoms',
    stats: '24/7 Available'
  },
  {
    id: 'skin-analysis',
    title: 'Skin Health Scanner',
    description: 'Get instant analysis of skin conditions',
    icon: '🔍',
    color: 'from-purple-500 to-purple-600',
    glowColor: 'from-purple-400/20 via-purple-400/20 to-purple-400/20',
    href: '/features/skin-analysis',
    stats: 'Early Detection'
  },
  {
    id: 'drug-safety',
    title: 'Drug Safety & Interaction Control',
    description: 'Coming Soon - Comprehensive drug information and safety monitoring',
    icon: '🛡️',
    color: 'from-teal-500 to-teal-600',
    glowColor: 'from-teal-400/20 via-teal-400/20 to-teal-400/20',
    href: '#',
    comingSoon: true,
    stats: 'Coming Soon'
  },
  {
    id: 'chronic-disease',
    title: 'Chronic Disease Management',
    description: 'Coming Soon - Manage diabetes, hypertension, COPD and more',
    icon: '🫀',
    color: 'from-indigo-500 to-indigo-600',
    glowColor: 'from-indigo-400/20 via-indigo-400/20 to-indigo-400/20',
    href: '#',
    comingSoon: true,
    stats: 'Coming Soon'
  },
  {
    id: 'community-blog',
    title: 'Health Community Blog',
    description: 'Share your health journey and earn bonus credits',
    icon: '✍️',
    color: 'from-pink-500 to-pink-600',
    glowColor: 'from-pink-400/20 via-pink-400/20 to-pink-400/20',
    href: '/blog',
    comingSoon: false,
    stats: 'Earn Credits'
  },
  {
    id: 'reports',
    title: 'Health Reports',
    description: 'Generate comprehensive health reports',
    icon: '📊',
    color: 'from-red-500 to-red-600',
    glowColor: 'from-red-400/20 via-red-400/20 to-red-400/20',
    href: '/features/reports',
    stats: 'Detailed Insights'
  }
];

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Welcome Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4">
            Hello, {user?.name}! 👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your health journey continues. Explore your features and track your wellness progress.
          </p>
        </motion.div>

        {/* Subscription Status Card */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Subscription Status</h2>
                  <p className="text-blue-100">Manage your plan and credits</p>
                </div>
                <motion.div
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-2xl">💳</span>
                </motion.div>
              </div>
              
              {user?.subscription ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold mb-1">
                      {user.subscription.plan}
                    </div>
                    <div className="text-blue-100 text-sm">Current Plan</div>
                  </motion.div>
                  
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold mb-1 text-green-300">
                      {user.subscription.tickets - user.subscription.usedTickets + user.subscription.bonusTickets}
                    </div>
                    <div className="text-blue-100 text-sm">Remaining Credits</div>
                  </motion.div>
                  
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold mb-1 text-orange-300">
                      {user.subscription.usedTickets}
                    </div>
                    <div className="text-blue-100 text-sm">Used Credits</div>
                  </motion.div>
                  
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold mb-1 text-yellow-300">
                      {user.subscription.bonusTickets}
                    </div>
                    <div className="text-blue-100 text-sm">Bonus Credits</div>
                  </motion.div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-2">No subscription yet</h3>
                  <p className="text-blue-100 mb-6">Choose a plan to start your health journey</p>
                  <Link href="/pricing">
                    <motion.button
                      className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Choose Plan
                    </motion.button>
                  </Link>
                </div>
              )}
              
              {user?.subscription && (
                <div className="mt-6 flex justify-center">
                  <Link href="/pricing">
                    <motion.button
                      className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Change Plan
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your Health Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Access all your health tools and track your progress
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setSelectedFeature(feature.id)}
                onHoverEnd={() => setSelectedFeature(null)}
              >
                {feature.comingSoon ? (
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50 cursor-not-allowed opacity-75">
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center text-2xl opacity-60"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                        Coming Soon
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {feature.stats}
                      </span>
                      <motion.span
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-2xl"
                      >
                        🚀
                      </motion.span>
                    </div>
                  </div>
                ) : (
                  <Link href={feature.href}>
                    <motion.div
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50 cursor-pointer group-hover:shadow-2xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <motion.div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl shadow-lg`}
                          whileHover={{ 
                            scale: 1.1,
                            rotate: 360,
                            transition: { duration: 0.6 }
                          }}
                        >
                          {feature.icon}
                        </motion.div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {feature.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {feature.stats}
                        </span>
                        <motion.div
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Your Health Journey
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">12</div>
                <div className="text-gray-600 dark:text-gray-400">Analyses Completed</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">85%</div>
                <div className="text-gray-600 dark:text-gray-400">Health Score</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">30</div>
                <div className="text-gray-600 dark:text-gray-400">Days Active</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>


    </div>
  );
}
