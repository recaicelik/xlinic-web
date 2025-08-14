'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How does Xlinic work?",
    answer: "Xlinic analyzes your health data using artificial intelligence technology. You can get instant analysis by taking a photo or uploading your test results, track your symptoms, and receive personalized health recommendations."
  },
  {
    question: "How can I analyze my test results?",
    answer: "Simply take a photo of your test results or upload a PDF file. Our AI technology automatically analyzes the results and prepares an easy-to-understand report."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, your data security is very important to us. We use the highest security standards and store your data in encrypted form. Your data is only used to the extent you permit."
  },
  {
    question: "How is skin analysis performed?",
    answer: "To perform skin analysis, simply take a photo of your skin. Our AI technology analyzes your skin condition and provides personalized care recommendations."
  },
  {
    question: "How can I track calories?",
    answer: "You can easily track calories by taking photos of your meals. Our AI technology recognizes your food and automatically calculates nutritional values."
  },
  {
    question: "Is the app paid?",
    answer: "Basic features of the app are free. We have monthly or yearly subscription plans for premium features."
  },
  {
    question: "Can I share results with my doctor?",
    answer: "Yes, you can easily share your analysis results and health data with your doctor. You can create detailed reports in PDF format and share them with anyone you want."
  },
  {
    question: "How long is my health data stored?",
    answer: "Your health data is securely stored indefinitely, allowing you to track your long-term health trends and progress. You have complete control over your data and can access, download, or delete it at any time."
  },
  {
    question: "Can I access my historical health data?",
    answer: "Absolutely! Xlinic maintains a comprehensive history of all your health data, including test results, symptom tracking, and analysis reports. You can view trends over time and compare results from different periods to better understand your health journey."
  },
  {
    question: "Is my health data backed up?",
    answer: "Yes, your health data is automatically backed up with enterprise-grade security. We use multiple redundant systems to ensure your valuable health information is never lost and is always accessible when you need it."
  }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      className="border-b border-gray-200 dark:border-gray-700"
    >
      <button
        className="flex justify-between items-center w-full py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white">{question}</span>
        <svg
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 dark:text-gray-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-12 pb-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Everything you need to know about Xlinic
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-300">
            Have more questions?{' '}
            <a href="mailto:support@xlinic.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </main>
  );
} 