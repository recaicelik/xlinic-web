'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    id: 'health-test',
    title: "Smart Lab Analysis",
    subtitle: "Instant Results in Seconds",
    description: "Upload your lab results and get AI-powered analysis instantly. Our advanced technology identifies normal and abnormal values, providing personalized insights and actionable recommendations for your health journey.",
    benefits: ["Instant Analysis", "Personalized Insights", "Actionable Recommendations"],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=60",
    icon: "🔬"
  },
  {
    id: 'symptoms',
    title: "Symptom Checker",
    subtitle: "AI-Powered Diagnosis",
    description: "Describe your symptoms and receive instant AI analysis of potential causes, risks, and health patterns. Get personalized lifestyle recommendations and preventive measures based on your unique health profile.",
    benefits: ["Instant Analysis", "Risk Assessment", "Preventive Measures"],
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&auto=format&fit=crop&q=60",
    icon: "🏥"
  },
  {
    id: 'skin-analysis',
    title: "Skin Health Scanner",
    subtitle: "Early Detection Technology",
    description: "Upload photos of skin spots for AI-powered ABCDE analysis. Our advanced technology helps with early detection by analyzing changes in moles and skin lesions, providing detailed risk assessments.",
    benefits: ["Early Detection", "ABCDE Analysis", "Risk Assessment"],
    image: "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?w=800&auto=format&fit=crop&q=60",
    icon: "🔍"
  },
  {
    id: 'medication',
    title: "Smart Medication Tracker",
    subtitle: "Never Miss a Dose",
    description: "Set up your medication schedule with dosage and timing. Our AI sends smart reminders, tracks your adherence, and alerts you for refills. Monitor side effects and get drug interaction warnings.",
    benefits: ["Smart Reminders", "Adherence Tracking", "Drug Interactions"],
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60",
    icon: "💊"
  },
  {
    id: 'reports',
    title: "Comprehensive Health Reports",
    subtitle: "Complete Health Overview",
    description: "Get detailed PDF reports covering your complete health data: lab test analyses, symptom patterns, vital signs, medication adherence, and skin analyses. View your health trends with interactive charts.",
    benefits: ["Detailed Reports", "Interactive Charts", "Health Trends"],
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=60",
    icon: "📊"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotateY: -15
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      className={`scroll-mt-24 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex flex-col md:flex items-center gap-12`}
    >
      {/* Content */}
      <motion.div 
        className="flex-1 space-y-6"
        variants={{
          hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.6, delay: 0.2 }
          }
        }}
      >
        {/* Feature Header */}
        <motion.div 
          className="flex items-center gap-4 mb-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5, delay: 0.3 }
            }
          }}
        >
          <motion.div 
            className="text-4xl"
            whileHover={{ 
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.5 }
            }}
          >
            {feature.icon}
          </motion.div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
              {feature.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5, delay: 0.4 }
            }
          }}
        >
          {feature.description}
        </motion.p>

        {/* Benefits */}
        <motion.div 
          className="space-y-3"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5
              }
            }
          }}
        >
          {feature.benefits.map((benefit: string, idx: number) => (
            <motion.div 
              key={idx} 
              className="flex items-center gap-3"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.3 }
                }
              }}
            >
              <motion.div 
                className="w-2 h-2 bg-blue-600 rounded-full"
                whileHover={{ scale: 1.5 }}
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {benefit}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button - Conditional for Medication Tracker */}
        {feature.id === 'medication' ? (
          <motion.div
            className="flex items-center gap-3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.5, delay: 0.6 }
              }
            }}
          >
            <motion.button 
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Download App</span>
              <motion.svg 
                className="w-4 h-4 relative z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </motion.svg>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            <motion.div
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span>📱</span>
              <span>Available on iOS & Android</span>
            </motion.div>
          </motion.div>
        ) : (
          <Link href="/auth">
            <motion.button 
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, delay: 0.6 }
                }
              }}
            >
              <span className="relative z-10">Try Now</span>
              <motion.svg 
                className="w-4 h-4 relative z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </Link>
        )}
      </motion.div>

      {/* Image */}
      <motion.div 
        className="flex-1"
        variants={imageVariants}
      >
        <motion.div 
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={feature.image}
            alt={feature.title}
            width={600}
            height={400}
            className="w-full h-auto"
            loading="lazy"
            quality={85}
          />
          {/* Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="pt-0 pb-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Advanced Health Features
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Experience the future of healthcare with our AI-powered tools designed to keep you healthy and informed.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="space-y-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Ready to Transform Your Health?
            </motion.h2>
            <motion.p 
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Join thousands of users who are already taking control of their health with AI-powered insights.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Link href="/auth">
                <motion.button 
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                </motion.button>
              </Link>
              <motion.button 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>📱</span>
                  Download App
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              <Link href="/faq">
                <motion.button 
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}; 