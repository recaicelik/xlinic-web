'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Terms of Service
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </motion.p>
          </div>

          {/* Content */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  By accessing and using Xlinic ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Xlinic is an AI-powered health analysis platform that provides:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                  <li>Smart lab test analysis and interpretation</li>
                  <li>Symptom tracking and AI-powered health insights</li>
                  <li>Skin condition analysis using AI technology</li>
                  <li>Comprehensive health reports and recommendations</li>
                  <li>Personalized health monitoring and tracking</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Medical Disclaimer</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Important:</strong> Xlinic is not a substitute for professional medical advice, diagnosis, or treatment. The information provided by our AI analysis is for educational and informational purposes only.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Always seek the advice of qualified healthcare providers with questions you may have regarding medical conditions. Never disregard professional medical advice or delay in seeking it because of something you have read or analyzed on Xlinic.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. User Responsibilities</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">You agree to:</p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Not attempt to reverse engineer or hack the service</li>
                  <li>Respect the privacy and rights of other users</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Privacy and Data Protection</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Xlinic and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  In no event shall Xlinic, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Termination</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Changes to Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact Information</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    Email: legal@xlinic.com<br />
                    Address: [Your Company Address]<br />
                    Phone: [Your Phone Number]
                  </p>
                </div>
              </section>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/">
              <motion.button 
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>←</span>
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
