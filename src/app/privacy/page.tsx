'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
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
              Privacy Policy
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Personal Information:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                  <li>Name and email address</li>
                  <li>Health data and medical information you choose to share</li>
                  <li>Lab test results and analysis data</li>
                  <li>Symptom tracking information</li>
                  <li>Skin analysis images and data</li>
                  <li>Usage data and preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and analyze your health data</li>
                  <li>Generate AI-powered health insights and recommendations</li>
                  <li>Send you important updates and notifications</li>
                  <li>Respond to your comments and questions</li>
                  <li>Ensure the security and integrity of our platform</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Data Security</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your health data is encrypted both in transit and at rest using industry-standard encryption protocols. We regularly review and update our security practices to ensure the highest level of protection.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Sharing and Disclosure</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your explicit consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Your Rights and Choices</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Update or correct your information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of certain communications</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Health Data Protection</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Special Protection:</strong> Your health information receives enhanced protection under applicable laws and regulations. We treat all health-related data with the highest level of confidentiality and security.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We implement additional safeguards for health data, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                  <li>Enhanced encryption for health records</li>
                  <li>Strict access controls and audit logging</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Compliance with healthcare data protection standards</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Cookies and Tracking</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Data Retention and Long-term Storage</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Long-term Health Data Storage:</strong> We retain your health data indefinitely to provide you with comprehensive health tracking and trend analysis. This long-term storage allows you to:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                  <li>Track your health progress over time</li>
                  <li>Compare results from different periods</li>
                  <li>Identify long-term health trends and patterns</li>
                  <li>Make informed decisions based on historical data</li>
                  <li>Share comprehensive health history with healthcare providers</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your health data is securely stored with enterprise-grade backup systems, ensuring it's never lost and always accessible when you need it. You maintain complete control over your data and can access, download, or delete it at any time.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. International Data Transfers</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Children's Privacy</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Changes to This Policy</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Contact Us</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    Email: privacy@xlinic.com<br />
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
