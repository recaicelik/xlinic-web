'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const mockReports = [
  {
    id: '1',
    title: 'Monthly Health Summary',
    date: '2024-01-15',
    type: 'summary',
    status: 'completed',
    summary: {
      overallHealth: 85,
      testsCompleted: 3,
      medicationsAdherence: 92,
      symptomsTracked: 5
    }
  },
  {
    id: '2',
    title: 'Blood Work Analysis',
    date: '2024-01-10',
    type: 'analysis',
    status: 'completed',
    summary: {
      overallHealth: 78,
      testsCompleted: 1,
      medicationsAdherence: 100,
      symptomsTracked: 2
    }
  },
  {
    id: '3',
    title: 'Quarterly Health Review',
    date: '2024-01-01',
    type: 'review',
    status: 'in-progress',
    summary: {
      overallHealth: 82,
      testsCompleted: 8,
      medicationsAdherence: 88,
      symptomsTracked: 12
    }
  }
];

export default function ReportsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'pending': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'summary': return '📊';
      case 'analysis': return '🔬';
      case 'review': return '📋';
      default: return '📄';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="auth-loading"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <motion.header 
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 dark:text-gray-400">Health Reports</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-900 dark:text-white font-medium">
                {user?.name}
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Health Reports 📋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive health reports and analytics to track your wellness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generate Report */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Generate New Report
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Report Type
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="summary">Health Summary</option>
                    <option value="analysis">Detailed Analysis</option>
                    <option value="review">Comprehensive Review</option>
                    <option value="trends">Trend Analysis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time Period
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="quarter">Last Quarter</option>
                    <option value="year">Last Year</option>
                  </select>
                </div>

                <motion.button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="auth-loading mr-2"></div>
                      Generating Report with AI...
                    </div>
                  ) : (
                    '🤖 Generate Report with AI'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Reports List */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recent Reports
              </h2>
              
              {mockReports.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No reports generated yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Generate your first health report to start tracking your progress
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockReports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedReport === report.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedReport(report.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{getTypeIcon(report.type)}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {report.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Generated on {report.date}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Health Score:</span>
                                <span className="ml-1 text-green-600 dark:text-green-400 font-semibold">
                                  {report.summary.overallHealth}%
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Tests:</span>
                                <span className="ml-1 text-blue-600 dark:text-blue-400">
                                  {report.summary.testsCompleted}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                          <motion.button
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Report Details */}
        {selectedReport && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {(() => {
                const report = mockReports.find(r => r.id === selectedReport);
                if (!report) return null;

                return (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {report.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Generated on {report.date}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>

                    {/* Health Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {report.summary.overallHealth}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Overall Health</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {report.summary.testsCompleted}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Tests Completed</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {report.summary.medicationsAdherence}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Medication Adherence</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                          {report.summary.symptomsTracked}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Symptoms Tracked</div>
                      </div>
                    </div>

                    {/* Report Actions */}
                    <div className="flex space-x-4">
                      <motion.button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Download PDF
                      </motion.button>
                      <motion.button
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Share Report
                      </motion.button>
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
