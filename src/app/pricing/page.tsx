'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const plans = [
  {
    name: 'Standard Plan',
    price: 19,
    originalPrice: 29,
    period: 'month',
    tickets: 6,
    bonus: 2,
    features: [
      '6 Analysis Tickets',
      '2 Bonus Tickets (First month)',
      'Basic AI Analysis',
      'Email Support',
      'Standard Reports'
    ],
    popular: false,
    color: 'from-blue-500 to-blue-600',
    glowColor: 'from-blue-400/20 via-blue-400/20 to-blue-400/20'
  },
  {
    name: 'Premium Plan',
    price: 39,
    originalPrice: 49,
    period: 'month',
    tickets: 15,
    bonus: 5,
    features: [
      '15 Analysis Tickets',
      '5 Bonus Tickets (First month)',
      'Priority AI Analysis',
      'Priority Support',
      'Detailed Reports',
      'Trend Analysis',
      'Doctor Sharing Feature'
    ],
    popular: true,
    color: 'from-purple-500 to-purple-600',
    glowColor: 'from-purple-400/20 via-purple-400/20 to-purple-400/20'
  },
  {
    name: 'Annual Premium',
    price: 349,
    originalPrice: 468,
    period: 'year',
    tickets: 180,
    bonus: 30,
    features: [
      '180 Analysis Tickets',
      '30 Bonus Tickets',
      '2 Months Free',
      'Priority AI Analysis',
      '24/7 Priority Support',
      'Advanced Reports',
      'Trend Analysis',
      'Doctor Sharing Feature',
      'Personal Health Consultation'
    ],
    popular: false,
    color: 'from-emerald-500 to-emerald-600',
    glowColor: 'from-emerald-400/20 via-emerald-400/20 to-emerald-400/20'
  }
];

const ticketPricing = [
  {
    feature: 'Symptom Analysis',
    tickets: 1,
    description: 'AI-powered symptom assessment'
  },
  {
    feature: 'Skin Analysis',
    tickets: 2,
    description: 'ABCDE analysis and risk assessment'
  },
  {
    feature: 'Test Analysis',
    tickets: 2,
    description: 'Laboratory and medical test report analysis'
  },
  {
    feature: 'Long-term Health Report',
    tickets: 2,
    description: 'Comprehensive health trend analysis'
  },
  {
    feature: 'Medication Tracking',
    tickets: 0,
    description: 'Free - Unlimited usage'
  },
  {
    feature: 'Short-term Reports',
    tickets: 0,
    description: 'Free - Weekly summaries'
  }
];

const extraPackages = [
  {
    name: 'Extra Package',
    tickets: 10,
    price: 12,
    description: 'When your monthly limit is reached'
  },
  {
    name: 'Large Package',
    tickets: 25,
    price: 25,
    description: 'For intensive usage'
  },
  {
    name: 'Mega Package',
    tickets: 50,
    price: 45,
    description: 'For corporate usage'
  }
];

export default function PricingPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (planName: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to complete your purchase');
      router.push('/auth');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`Successfully subscribed to ${planName}!`);
    setIsProcessing(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Pricing 💰
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your health. Pay only for what you use with our ticket system.
          </p>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 ${
                plan.popular 
                  ? 'border-purple-500 scale-105' 
                  : 'border-gray-200 dark:border-gray-700'
              } overflow-hidden`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                                             <span className="text-4xl font-bold text-gray-900 dark:text-white">
                         ${plan.price}
                       </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /{plan.period}
                      </span>
                    </div>
                    {plan.originalPrice > plan.price && (
                      <div className="flex items-center justify-center gap-2">
                                               <span className="text-lg text-gray-400 line-through">
                           ${plan.originalPrice}
                         </span>
                                                 <span className="text-sm text-green-600 font-semibold">
                           %{Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)} Off
                         </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-6">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {plan.tickets + plan.bonus} Ticket
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {plan.tickets} + {plan.bonus} Bonus
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + featureIndex * 0.1 }}
                    >
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={isProcessing}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                      : `bg-gradient-to-r ${plan.color} hover:scale-105`
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      İşleniyor...
                    </span>
                                     ) : (
                     'Choose Plan'
                   )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ticket Pricing */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
                     <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
             Ticket Costs 🎫
           </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ticketPricing.map((item, index) => (
              <motion.div
                key={item.feature}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.feature}
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.tickets === 0 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  }`}>
                                         {item.tickets === 0 ? 'Free' : `${item.tickets} Ticket`}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Extra Packages */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
                     <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
             Extra Packages 📦
           </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extraPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {pkg.name}
                  </h3>
                                     <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                     ${pkg.price}
                   </div>
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {pkg.tickets} Ticket
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {pkg.description}
                  </p>
                                     <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
                     Buy Now
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>




      </div>
    </div>
  );
}
