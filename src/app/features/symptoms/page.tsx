'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const commonSymptoms = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
  'Chest Pain', 'Shortness of Breath', 'Joint Pain', 'Back Pain',
  'Stomach Pain', 'Rash', 'Swelling', 'Insomnia', 'Anxiety'
];

const severityLevels = [
  { level: 1, label: 'Mild', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  { level: 2, label: 'Moderate', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { level: 3, label: 'Severe', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' }
];

// Symptom analysis questions
const symptomQuestions = [
  {
    id: 'duration',
    question: 'How long have you been experiencing these symptoms?',
    options: ['Less than 24 hours', '1-3 days', '3-7 days', '1-2 weeks', 'More than 2 weeks']
  },
  {
    id: 'frequency',
    question: 'How often do these symptoms occur?',
    options: ['Once', 'Occasionally', 'Daily', 'Multiple times per day', 'Constant']
  },
  {
    id: 'triggers',
    question: 'What seems to trigger or worsen your symptoms?',
    options: ['Stress', 'Food/Drink', 'Physical activity', 'Weather changes', 'No specific trigger', 'Other']
  },
  {
    id: 'medications',
    question: 'Are you currently taking any medications?',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    id: 'allergies',
    question: 'Do you have any known allergies?',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    id: 'family_history',
    question: 'Is there a family history of similar symptoms?',
    options: ['Yes', 'No', 'Not sure']
  }
];

interface SymptomEntry {
  id: string;
  symptom: string;
  severity: number;
  date: string;
  notes: string;
  aiAnalysis?: string;
}

interface SymptomAnalysis {
  id: string;
  date: string;
  symptoms: SymptomEntry[];
  questions: Record<string, string>;
  aiAnalysis: string;
  status: 'pending' | 'analyzed';
}

export default function SymptomsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [showAnalysisForm, setShowAnalysisForm] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  const [analysisQuestions, setAnalysisQuestions] = useState<Record<string, string>>({});
  const [symptomAnalyses, setSymptomAnalyses] = useState<SymptomAnalysis[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState({
    symptom: '',
    severity: 1,
    notes: ''
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleDeleteSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const handleAnalyzeWithAI = async () => {
    if (!currentSymptom.symptom.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add current symptom to symptoms list
    const newSymptom: SymptomEntry = {
      id: Date.now().toString(),
      symptom: currentSymptom.symptom,
      severity: currentSymptom.severity,
      date: new Date().toISOString().split('T')[0],
      notes: currentSymptom.notes
    };
    
    setSymptoms([newSymptom, ...symptoms]);
    
    // Create new analysis
    const newAnalysis: SymptomAnalysis = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      symptoms: [newSymptom],
      questions: { ...analysisQuestions },
      aiAnalysis: generateAIAnalysis([newSymptom], analysisQuestions),
      status: 'analyzed'
    };
    
    setSymptomAnalyses([newAnalysis, ...symptomAnalyses]);
    setSelectedAnalysis(newAnalysis.id);
    setShowAnalysisForm(false);
    setAnalysisQuestions({});
    setCurrentSymptom({ symptom: '', severity: 1, notes: '' });
    setIsAnalyzing(false);
  };

  const generateAIAnalysis = (symptoms: SymptomEntry[], questions: Record<string, string>): string => {
    const symptomList = symptoms.map(s => s.symptom).join(', ');
    const severity = symptoms.reduce((acc, s) => acc + s.severity, 0) / symptoms.length;
    const duration = questions.duration || 'Unknown';
    const frequency = questions.frequency || 'Unknown';
    const triggers = questions.triggers || 'Unknown';
    
    if (severity <= 1.5) {
      return `Based on your symptoms (${symptomList}), the AI analysis indicates mild symptoms that are likely manageable with self-care. Duration: ${duration}, Frequency: ${frequency}. Your symptoms appear to be of low concern, but monitor for any worsening. Consider rest, hydration, and over-the-counter remedies if appropriate. If symptoms persist or worsen, consult with a healthcare provider.`;
    } else if (severity <= 2.5) {
      return `Your symptoms (${symptomList}) are moderate in severity and may require attention. Duration: ${duration}, Frequency: ${frequency}, Triggers: ${triggers}. The AI analysis suggests monitoring your condition closely and considering medical consultation if symptoms don't improve within a few days. Pay attention to any triggers you mentioned and try to avoid them.`;
    } else {
      return `The AI analysis indicates severe symptoms (${symptomList}) that require immediate medical attention. Duration: ${duration}, Frequency: ${frequency}. These symptoms may indicate a serious underlying condition. Please consult with a healthcare provider as soon as possible. Do not delay seeking medical care.`;
    }
  };

  const getSeverityColor = (severity: number) => {
    return severityLevels.find(s => s.level === severity)?.color || '';
  };

  const getSeverityLabel = (severity: number) => {
    return severityLevels.find(s => s.level === severity)?.label || '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="auth-loading"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
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
            Symptom Tracking 📊
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and monitor your symptoms to identify patterns and trends
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Analysis Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-6">
              {/* AI Analysis Form */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  AI Symptom Analysis
                </h2>
                
                {!showAnalysisForm ? (
                  <motion.button
                    onClick={() => setShowAnalysisForm(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🤖 Analyze Symptoms with AI
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {/* Symptom Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        What symptom are you experiencing?
                      </label>
                      <select
                        value={currentSymptom.symptom}
                        onChange={(e) => setCurrentSymptom({ ...currentSymptom, symptom: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select a symptom</option>
                        {commonSymptoms.map((symptom) => (
                          <option key={symptom} value={symptom}>{symptom}</option>
                        ))}
                      </select>
                    </div>

                    {/* Severity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        How severe is this symptom?
                      </label>
                      <div className="flex space-x-2">
                        {severityLevels.map((level) => (
                          <button
                            key={level.level}
                            onClick={() => setCurrentSymptom({ ...currentSymptom, severity: level.level })}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                              currentSymptom.severity === level.level
                                ? level.color
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {level.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Additional notes (Optional)
                      </label>
                      <textarea
                        value={currentSymptom.notes}
                        onChange={(e) => setCurrentSymptom({ ...currentSymptom, notes: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={3}
                        placeholder="Describe your symptoms in detail..."
                      />
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Answer these questions to help AI provide better analysis:
                      </p>
                      
                      {symptomQuestions.map((question) => (
                        <div key={question.id} className="space-y-2 mb-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {question.question}
                          </label>
                          <select
                            value={analysisQuestions[question.id] || ''}
                            onChange={(e) => setAnalysisQuestions({
                              ...analysisQuestions,
                              [question.id]: e.target.value
                            })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          >
                            <option value="">Select an option</option>
                            {question.options.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      onClick={handleAnalyzeWithAI}
                      disabled={isAnalyzing || !currentSymptom.symptom}
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

                    <motion.button
                      onClick={() => {
                        setShowAnalysisForm(false);
                        setAnalysisQuestions({});
                        setCurrentSymptom({ symptom: '', severity: 1, notes: '' });
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

              {/* Analysis History */}
              {symptomAnalyses.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Analysis History
                  </h2>
                  
                  <div className="space-y-3">
                    {symptomAnalyses.map((analysis) => (
                      <motion.div
                        key={analysis.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          selectedAnalysis === analysis.id
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedAnalysis(analysis.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            Symptom Analysis
                          </h3>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                            {analysis.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {analysis.date} - {analysis.symptoms.length} symptoms
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Symptoms List & Analysis Results */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {selectedAnalysis ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                {(() => {
                  const analysis = symptomAnalyses.find(a => a.id === selectedAnalysis);
                  if (!analysis) return null;

                  return (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Symptom Analysis Results
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            Analysis Date: {analysis.date}
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                          {analysis.status}
                        </span>
                      </div>

                      {/* Symptoms Table */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Tracked Symptoms
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Symptom</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Severity</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Notes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {analysis.symptoms.map((symptom) => (
                                <tr key={symptom.id} className="border-b border-gray-100 dark:border-gray-800">
                                  <td className="py-3 px-4 text-gray-900 dark:text-white">{symptom.symptom}</td>
                                  <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(symptom.severity)}`}>
                                      {getSeverityLabel(symptom.severity)}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{symptom.date}</td>
                                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{symptom.notes || '-'}</td>
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
                          {analysis.aiAnalysis}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Symptoms
                </h2>
                
                {symptoms.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No symptoms tracked yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Start analyzing your symptoms with AI to track your health patterns
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {symptoms.map((symptom, index) => (
                      <motion.div
                        key={symptom.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {symptom.symptom}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(symptom.severity)}`}>
                                {getSeverityLabel(symptom.severity)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Date: {symptom.date}
                            </p>
                            {symptom.notes && (
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                Notes: {symptom.notes}
                              </p>
                            )}
                          </div>
                          <motion.button
                            onClick={() => handleDeleteSymptom(symptom.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
