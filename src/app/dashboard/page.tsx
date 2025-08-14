'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const features = [
  {
    id: 'health-test',
    title: 'Smart Test Analysis',
    description: 'Analyze your lab results with AI-powered insights',
    icon: '🔬',
    color: 'from-blue-500 to-blue-600',
    href: '/features/health-test'
  },
  {
    id: 'symptoms',
    title: 'Symptom Tracking',
    description: 'Track and monitor your symptoms over time',
    icon: '📊',
    color: 'from-green-500 to-green-600',
    href: '/features/symptoms'
  },
  {
    id: 'skin-analysis',
    title: 'Skin Analysis',
    description: 'Get instant analysis of skin conditions',
    icon: '🔍',
    color: 'from-purple-500 to-purple-600',
    href: '/features/skin-analysis'
  },
  {
    id: 'reports',
    title: 'Health Reports',
    description: 'Generate comprehensive health reports',
    icon: '📋',
    color: 'from-red-500 to-red-600',
    href: '/features/reports'
  }
];

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex items-center justify-center">
        <div className="auth-loading"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Access your health features and manage your wellness journey
          </p>
        </motion.div>

        {/* Subscription Status */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                          <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Subscription Status 💳
                </h2>
                <Link href="/pricing">
                  <motion.button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Change Plan
                  </motion.button>
                </Link>
              </div>
            
            {user?.subscription ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {user.subscription.plan}
                  </div>
                                     <div className="text-sm text-gray-600 dark:text-gray-400">
                     Current Plan
                   </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {user.subscription.tickets - user.subscription.usedTickets + user.subscription.bonusTickets}
                  </div>
                                     <div className="text-sm text-gray-600 dark:text-gray-400">
                     Remaining Tickets
                   </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                    {user.subscription.usedTickets}
                  </div>
                                     <div className="text-sm text-gray-600 dark:text-gray-400">
                     Used Tickets
                   </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {user.subscription.bonusTickets}
                  </div>
                                     <div className="text-sm text-gray-600 dark:text-gray-400">
                     Bonus Tickets
                   </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">💳</div>
                                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                   No subscription yet
                 </h3>
                 <p className="text-gray-600 dark:text-gray-400 mb-4">
                   Choose a plan to access all features of AI-powered health analysis
                 </p>
                 <Link href="/pricing">
                   <motion.button
                     className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     Choose Plan
                   </motion.button>
                 </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <Link href={feature.href}>
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white text-xl mb-4`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span>Access Feature</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-lg">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tests</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-lg">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Health Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 text-lg">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Check</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2 days</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
