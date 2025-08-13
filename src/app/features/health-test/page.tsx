'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const mockTestResults: Array<{
  id: number;
  name: string;
  date: string;
  status: string;
  results: Record<string, { value: string; unit: string; normal: string; status: string }>;
  aiAnalysis: string;
}> = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    date: '2024-01-15',
    status: 'normal',
    results: {
      'White Blood Cells': { value: '7.5', unit: 'K/µL', normal: '4.5-11.0', status: 'normal' },
      'Red Blood Cells': { value: '4.8', unit: 'M/µL', normal: '4.5-5.9', status: 'normal' },
      'Hemoglobin': { value: '14.2', unit: 'g/dL', normal: '13.5-17.5', status: 'normal' },
      'Platelets': { value: '250', unit: 'K/µL', normal: '150-450', status: 'normal' }
    },
    aiAnalysis: 'Your Complete Blood Count results are excellent! All values are within normal ranges, indicating a healthy immune system, good oxygen-carrying capacity, and proper blood clotting function. Your overall blood health appears to be optimal with no concerning patterns detected. Continue maintaining your current lifestyle habits as they are supporting your good health.'
  },
  {
    id: 2,
    name: 'Comprehensive Metabolic Panel',
    date: '2024-01-10',
    status: 'warning',
    results: {
      'Glucose': { value: '105', unit: 'mg/dL', normal: '70-100', status: 'high' },
      'Creatinine': { value: '1.1', unit: 'mg/dL', normal: '0.7-1.3', status: 'normal' },
      'BUN': { value: '18', unit: 'mg/dL', normal: '7-20', status: 'normal' },
      'ALT': { value: '45', unit: 'U/L', normal: '7-55', status: 'normal' }
    },
    aiAnalysis: 'Your metabolic panel shows mostly normal results with one area of concern. Your glucose level is slightly elevated (105 mg/dL), which may indicate prediabetes. However, your kidney and liver function markers are healthy. I recommend monitoring your carbohydrate intake, increasing physical activity, and following up with your healthcare provider for further evaluation of your glucose levels.'
  }
];

export default function HealthTestPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyzeWithAI = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add new test to the list with AI-generated results
    const newTest = {
      id: Date.now(),
      name: `AI Analyzed Test - ${uploadedFile.name}`,
      date: new Date().toISOString().split('T')[0],
      status: 'analyzed',
      results: {
        'Complete Blood Count': { value: '8.2', unit: 'K/µL', normal: '4.5-11.0', status: 'normal' },
        'Hemoglobin': { value: '15.1', unit: 'g/dL', normal: '13.5-17.5', status: 'normal' },
        'Platelets': { value: '280', unit: 'K/µL', normal: '150-450', status: 'normal' },
        'Glucose': { value: '92', unit: 'mg/dL', normal: '70-100', status: 'normal' }
      },
      aiAnalysis: 'Excellent news! Your uploaded test results show a healthy blood profile with all values within normal ranges. Your immune system is functioning well, oxygen transport is optimal, and metabolic health appears stable. The AI analysis detected no concerning patterns or abnormalities. Your current health status is very good - continue with your healthy lifestyle habits!'
    };
    
    mockTestResults.unshift(newTest);
    setSelectedTest(newTest.id);
    setUploadedFile(null);
    setShowFileInput(false);
    setIsAnalyzing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'analyzed': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

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
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Smart Test Analysis 🔬
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered analysis of your lab results with personalized insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Test List & Upload */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-6">
              {/* Upload New Test */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  AI Test Analysis
                </h2>
                
                {!showFileInput ? (
                  <motion.button
                    onClick={() => setShowFileInput(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🤖 Analyze Test with AI
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      {uploadedFile ? (
                        <div className="space-y-3">
                          <div className="text-green-500 text-2xl">📄</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <motion.button
                            onClick={() => setUploadedFile(null)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Remove File
                          </motion.button>
                        </div>
                      ) : (
                        <div>
                          <div className="text-4xl mb-4">📁</div>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                            Supports PDF, JPG, PNG files
                          </p>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="test-file-upload"
                          />
                          <label
                            htmlFor="test-file-upload"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                          >
                            Choose File
                          </label>
                        </div>
                      )}
                    </div>

                    {uploadedFile && (
                      <motion.button
                        onClick={handleAnalyzeWithAI}
                        disabled={isAnalyzing}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isAnalyzing ? (
                          <div className="flex items-center justify-center">
                            <div className="auth-loading mr-2"></div>
                            Analyzing with AI...
                          </div>
                        ) : (
                          'Analysis with AI'
                        )}
                      </motion.button>
                    )}

                    <motion.button
                      onClick={() => {
                        setShowFileInput(false);
                        setUploadedFile(null);
                      }}
                      className="w-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  </motion.div>
                )}
              </div>

              {/* Existing Test Results */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Your Test Results
                </h2>
                
                <div className="space-y-3">
                  {mockTestResults.map((test) => (
                    <motion.div
                      key={test.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedTest === test.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedTest(test.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {test.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                          {test.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {test.date}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Test Details */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {selectedTest ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                {(() => {
                  const test = mockTestResults.find(t => t.id === selectedTest);
                  if (!test) return null;

                  return (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {test.name}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            Test Date: {test.date}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(test.status)}`}>
                          {test.status}
                        </span>
                      </div>

                      {/* Results Table */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Test Results
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Test</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Result</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Normal Range</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(test.results).map(([key, value]) => (
                                <tr key={key} className="border-b border-gray-100 dark:border-gray-800">
                                  <td className="py-3 px-4 text-gray-900 dark:text-white">{key}</td>
                                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                                    {value.value} {value.unit}
                                  </td>
                                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                    {value.normal}
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value.status)}`}>
                                      {value.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* AI Analysis Section */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-blue-600 dark:text-blue-400 text-2xl">🤖</div>
                          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            AI Analysis & Recommendations
                          </h3>
                        </div>
                        <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                          {test.aiAnalysis}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔬</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Select a Test
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose a test result from the list to view detailed analysis
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
