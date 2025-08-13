'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedGradient, AnimatedGradientText } from '../common/AnimatedGradient';

const features = [
  {
    id: 'health-test',
    title: "Smart Lab Analysis",
    subtitle: "Instant Results in Seconds",
    description: "Upload your lab results and get AI-powered analysis instantly. Our advanced technology identifies normal and abnormal values, providing personalized insights and actionable recommendations for your health journey.",
    benefits: ["Instant Analysis", "Personalized Insights", "Actionable Recommendations"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop&q=80",
    icon: "🔬",
    color: "from-blue-500 to-blue-600",
    glowColor: "from-blue-400/20 via-blue-400/20 to-blue-400/20"
  },
  {
    id: 'symptoms',
    title: "Symptom Checker",
    subtitle: "AI-Powered Diagnosis",
    description: "Describe your symptoms and receive instant AI analysis of potential causes, risks, and health patterns. Get personalized lifestyle recommendations and preventive measures based on your unique health profile.",
    benefits: ["Instant Analysis", "Risk Assessment", "Preventive Measures"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    icon: "🏥",
    color: "from-green-500 to-green-600",
    glowColor: "from-green-400/20 via-green-400/20 to-green-400/20"
  },
  {
    id: 'skin-analysis',
    title: "Skin Health Scanner",
    subtitle: "Early Detection Technology",
    description: "Upload photos of skin spots for AI-powered ABCDE analysis. Our advanced technology helps with early detection by analyzing changes in moles and skin lesions, providing detailed risk assessments.",
    benefits: ["Early Detection", "ABCDE Analysis", "Risk Assessment"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    icon: "🔍",
    color: "from-purple-500 to-purple-600",
    glowColor: "from-purple-400/20 via-purple-400/20 to-purple-400/20"
  },
  {
    id: 'medication',
    title: "Smart Medication Tracker",
    subtitle: "Never Miss a Dose",
    description: "Set up your medication schedule with dosage and timing. Our AI sends smart reminders, tracks your adherence, and alerts you for refills. Monitor side effects and get drug interaction warnings.",
    benefits: ["Smart Reminders", "Adherence Tracking", "Drug Interactions"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    icon: "💊",
    color: "from-orange-500 to-orange-600",
    glowColor: "from-orange-400/20 via-orange-400/20 to-orange-400/20"
  },
  {
    id: 'reports',
    title: "Comprehensive Health Reports",
    subtitle: "Complete Health Overview",
    description: "Get detailed PDF reports covering your complete health data: lab test analyses, symptom patterns, vital signs, medication adherence, and skin analyses. View your health trends with interactive charts.",
    benefits: ["Detailed Reports", "Interactive Charts", "Health Trends"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    icon: "📊",
    color: "from-red-500 to-red-600",
    glowColor: "from-red-400/20 via-red-400/20 to-red-400/20"
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
      id={feature.id}
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
            className="text-4xl w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden relative"
            whileHover={{ 
              scale: 1.1,
              rotate: 360,
              transition: { duration: 0.5 }
            }}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${feature.color}`}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <span className="text-white text-2xl relative z-10">{feature.icon}</span>
          </motion.div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <AnimatedGradient
              className="text-lg font-medium"
              duration={3}
              colors={feature.color.split(' ')}
            >
              {feature.subtitle}
            </AnimatedGradient>
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
                className={`w-2 h-2 rounded-full overflow-hidden relative`}
                whileHover={{ scale: 1.5 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color}`}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
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
            <AnimatedGradient
              type="button"
              className="shadow-lg"
              duration={4}
              colors={feature.color.split(' ')}
            >
              Download App
              <motion.svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ 
                  y: -2, 
                  rotate: 360,
                  scale: 1.2,
                  transition: { duration: 0.3 }
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </motion.svg>
            </AnimatedGradient>
            <motion.div
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.span
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                📱
              </motion.span>
              <span>Available on iOS & Android</span>
            </motion.div>
          </motion.div>
        ) : (
          <Link href="/auth">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, delay: 0.6 }
                }
              }}
            >
              <AnimatedGradient
                type="button"
                className="shadow-lg"
                duration={4}
                colors={feature.color.split(' ')}
              >
                Try Now
                <motion.svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ 
                    x: 5, 
                    rotate: 360,
                    scale: 1.2,
                    transition: { duration: 0.3 }
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </AnimatedGradient>
            </motion.div>
          </Link>
        )}
      </motion.div>

      {/* Modern Tech Placeholder */}
      <motion.div 
        className="flex-1"
        variants={imageVariants}
      >
        <motion.div 
          className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="aspect-video flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <motion.div 
                className="text-6xl mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {feature.icon}
              </motion.div>
              <div className="space-y-2">
                <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/4 mx-auto"></div>
                <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-1/2 mx-auto"></div>
                <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-2/3 mx-auto"></div>
              </div>
              <motion.div 
                className="flex justify-center space-x-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              </motion.div>
            </div>
          </div>
          {/* Tech overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"
            whileHover={{ opacity: 0.1 }}
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
    <section ref={sectionRef} className="pt-0 pb-12 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
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
            <AnimatedGradientText
              text="Advanced Health Features"
              className="text-4xl md:text-5xl font-bold"
              duration={4}
              colors={['from-blue-600', 'via-purple-600', 'to-emerald-600']}
            />
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
      </div>
    </section>
  );
}; 