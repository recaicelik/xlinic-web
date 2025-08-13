'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Skin analysis questions
const skinQuestions = [
  {
    id: 'location',
    question: 'Where is the skin condition located?',
    options: ['Face', 'Arms', 'Legs', 'Torso', 'Neck', 'Hands', 'Feet', 'Other']
  },
  {
    id: 'duration',
    question: 'How long have you had this skin condition?',
    options: ['Less than 1 week', '1-2 weeks', '2-4 weeks', '1-3 months', '3-6 months', 'More than 6 months']
  },
  {
    id: 'symptoms',
    question: 'What symptoms are you experiencing?',
    options: ['Itching', 'Pain', 'Burning', 'Tingling', 'No symptoms', 'Other']
  },
  {
    id: 'triggers',
    question: 'What seems to trigger or worsen the condition?',
    options: ['Sun exposure', 'Stress', 'Food/Drink', 'Cosmetics', 'Weather', 'No specific trigger', 'Other']
  },
  {
    id: 'skin_type',
    question: 'What is your skin type?',
    options: ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal', 'Not sure']
  },
  {
    id: 'previous_treatments',
    question: 'Have you tried any treatments before?',
    options: ['Yes - Prescription medication', 'Yes - Over-the-counter products', 'Yes - Home remedies', 'No', 'Not sure']
  },
  {
    id: 'family_history',
    question: 'Is there a family history of skin conditions?',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    id: 'allergies',
    question: 'Do you have any known skin allergies?',
    options: ['Yes', 'No', 'Not sure']
  }
];

interface SkinAnalysis {
  id: string;
  date: string;
  image: string;
  questions: Record<string, string>;
  aiAnalysis: string;
  condition: string;
  confidence: number;
  severity: string;
  recommendations: string[];
  status: 'pending' | 'analyzed';
}

export default function SkinAnalysisPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysisForm, setShowAnalysisForm] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  const [analysisQuestions, setAnalysisQuestions] = useState<Record<string, string>>({});
  const [skinAnalyses, setSkinAnalyses] = useState<SkinAnalysis[]>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeWithAI = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate AI analysis based on questions
    const analysis = generateAIAnalysis(analysisQuestions);
    
    // Create new analysis
    const newAnalysis: SkinAnalysis = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      image: selectedImage,
      questions: { ...analysisQuestions },
      aiAnalysis: analysis.aiAnalysis,
      condition: analysis.condition,
      confidence: analysis.confidence,
      severity: analysis.severity,
      recommendations: analysis.recommendations,
      status: 'analyzed'
    };
    
    setSkinAnalyses([newAnalysis, ...skinAnalyses]);
    setSelectedAnalysis(newAnalysis.id);
    setShowAnalysisForm(false);
    setAnalysisQuestions({});
    setSelectedImage(null);
    setIsAnalyzing(false);
  };

  const generateAIAnalysis = (questions: Record<string, string>) => {
    const location = questions.location || 'Unknown';
    const duration = questions.duration || 'Unknown';
    const symptoms = questions.symptoms || 'Unknown';
    const skinType = questions.skin_type || 'Unknown';
    
    // Mock analysis based on common patterns
    const conditions = [
      {
        condition: 'Acne Vulgaris',
        confidence: 87,
        severity: 'Mild',
        recommendations: [
          'Use gentle cleanser twice daily',
          'Avoid touching affected areas frequently',
          'Consider over-the-counter benzoyl peroxide (2.5-5%)',
          'Use non-comedogenic moisturizer',
          'Schedule follow-up if condition worsens'
        ],
        aiAnalysis: `Based on the image analysis and your responses, the AI has identified ${location} skin condition. Duration: ${duration}, Symptoms: ${symptoms}, Skin Type: ${skinType}. The analysis suggests a mild inflammatory condition that appears manageable with proper skincare routine. The condition shows typical characteristics of common skin issues.`
      },
      {
        condition: 'Eczema/Dermatitis',
        confidence: 92,
        severity: 'Moderate',
        recommendations: [
          'Use fragrance-free moisturizer regularly',
          'Avoid hot showers and harsh soaps',
          'Apply prescribed topical corticosteroids if recommended',
          'Identify and avoid triggers',
          'Consider humidifier for dry environments'
        ],
        aiAnalysis: `The AI analysis indicates a moderate inflammatory skin condition affecting ${location}. Duration: ${duration}, Symptoms: ${symptoms}. This appears to be related to environmental or allergic triggers. The condition requires careful management and trigger avoidance.`
      },
      {
        condition: 'Melanoma Risk Assessment',
        confidence: 78,
        severity: 'High',
        recommendations: [
          'Immediate consultation with dermatologist required',
          'Avoid sun exposure completely',
          'Monitor for changes in size, shape, or color',
          'Document with photos for tracking',
          'Consider biopsy for definitive diagnosis'
        ],
        aiAnalysis: `The AI analysis has identified concerning features in the ${location} area. Duration: ${duration}, Symptoms: ${symptoms}. The analysis suggests features that require immediate medical attention. This is a high-priority assessment requiring professional evaluation.`
      }
    ];
    
    // Return random condition for demo
    return conditions[Math.floor(Math.random() * conditions.length)];
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
            Skin Analysis 🔍
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload a photo of your skin condition for AI-powered analysis and recommendations
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
                  AI Skin Analysis
                </h2>
                
                {!showAnalysisForm ? (
                  <motion.button
                    onClick={() => setShowAnalysisForm(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🤖 Analyze Skin with AI
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Upload a clear photo of your skin condition
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        {selectedImage ? (
                          <div className="space-y-3">
                            <img 
                              src={selectedImage} 
                              alt="Selected skin condition" 
                              className="max-w-full h-32 object-cover rounded-lg mx-auto"
                            />
                            <motion.button
                              onClick={() => setSelectedImage(null)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Remove Image
                            </motion.button>
                          </div>
                        ) : (
                          <div>
                            <div className="text-3xl mb-3">📷</div>
                            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                              Click to upload or drag and drop
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                            />
                            <label
                              htmlFor="image-upload"
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm"
                            >
                              Choose Image
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Answer these questions to help AI provide better analysis:
                      </p>
                      
                      {skinQuestions.map((question) => (
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
                      disabled={isAnalyzing || !selectedImage}
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
                        setSelectedImage(null);
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
              {skinAnalyses.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Analysis History
                  </h2>
                  
                  <div className="space-y-3">
                    {skinAnalyses.map((analysis) => (
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
                            Skin Analysis
                          </h3>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                            {analysis.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {analysis.date} - {analysis.condition}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {selectedAnalysis ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                {(() => {
                  const analysis = skinAnalyses.find(a => a.id === selectedAnalysis);
                  if (!analysis) return null;

                  return (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Skin Analysis Results
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            Analysis Date: {analysis.date}
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                          {analysis.status}
                        </span>
                      </div>

                      {/* Image and Condition */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Uploaded Image
                          </h3>
                          <img 
                            src={analysis.image} 
                            alt="Skin condition" 
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Condition Details
                          </h3>
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {analysis.condition}
                            </h4>
                            <div className="flex items-center space-x-4 mb-3">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Confidence: {analysis.confidence}%
                              </span>
                              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs font-medium rounded-full">
                                {analysis.severity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Analysis Section */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-blue-600 dark:text-blue-400 text-2xl">🤖</div>
                          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            AI Analysis & Assessment
                          </h3>
                        </div>
                        <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                          {analysis.aiAnalysis}
                        </p>
                      </div>

                      {/* Recommendations */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Recommendations
                        </h3>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                          <ul className="space-y-2">
                            {analysis.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Medical Disclaimer */}
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          <strong>Important:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. Please consult with a dermatologist or healthcare provider for proper diagnosis and treatment, especially if symptoms persist or worsen.
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No analysis yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start analyzing your skin condition with AI to get detailed insights
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
