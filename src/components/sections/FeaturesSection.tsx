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
    glowColor: "from-blue-400/20 via-blue-400/20 to-blue-400/20",
    href: "/features/health-test"
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
    glowColor: "from-green-400/20 via-green-400/20 to-green-400/20",
    href: "/features/symptoms"
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
    glowColor: "from-purple-400/20 via-purple-400/20 to-purple-400/20",
    href: "/features/skin-analysis"
  },
  {
    id: 'medication',
    title: "Smart Medication Tracker",
    subtitle: "Smart Reminders & Tracking",
    description: "Set up your medication schedule with dosage and timing. Our AI sends smart reminders, tracks your adherence, and alerts you for refills. Monitor side effects and get drug interaction warnings. Available exclusively on our mobile app.",
    benefits: ["Smart Reminders", "Adherence Tracking", "Drug Interactions"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    icon: "💊",
    color: "from-orange-500 to-orange-600",
    glowColor: "from-orange-400/20 via-orange-400/20 to-orange-400/20",
    mobileOnly: true,
    href: "/features/medication"
  },
  {
    id: 'drug-safety',
    title: "Drug Safety & Interaction Control",
    subtitle: "Safety & Interaction Control",
    description: "Comprehensive drug information database with interaction checking, dosage guidance, and side effect monitoring. Report adverse reactions and get alerts for drug recalls. Our AI-powered system ensures medication safety for patients, doctors, and pharmacists.",
    benefits: ["Drug Interactions", "Side Effect Monitoring", "Safety Alerts", "Adverse Reporting"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    icon: "🛡️",
    color: "from-teal-500 to-teal-600",
    glowColor: "from-teal-400/20 via-teal-400/20 to-teal-400/20",
    comingSoon: true,
    href: "/features/drug-safety"
  },
  {
    id: 'chronic-disease',
    title: "Chronic Disease Management",
    subtitle: "Personalized Care Plans",
    description: "Comprehensive management system for diabetes, hypertension, COPD, and other chronic conditions. Features device integration, health data analysis, personalized care plans, and progress tracking.",
    benefits: ["Device Integration", "Personalized Care", "Progress Tracking"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    icon: "🫀",
    color: "from-indigo-500 to-indigo-600",
    glowColor: "from-indigo-400/20 via-indigo-400/20 to-indigo-400/20",
    comingSoon: true,
    href: "/features/chronic-disease"
  },
  {
    id: 'community-blog',
    title: "Health Community Blog",
    subtitle: "Share Your Journey",
    description: "Share your health experiences, tips, and success stories with our community. Write blog posts about your health journey and earn 2 bonus tickets for each published article. Connect with others on similar health paths.",
    benefits: ["Community Sharing", "Bonus Tickets", "Health Stories", "Peer Support"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    icon: "✍️",
    color: "from-pink-500 to-pink-600",
    glowColor: "from-pink-400/20 via-pink-400/20 to-pink-400/20",
    comingSoon: false,
    href: "/blog"
  },
  {
    id: 'reports',
    title: "Comprehensive Health Reports",
    subtitle: "Complete Health Overview",
    description: "Get detailed PDF reports covering your complete health data: lab test analyses, symptom patterns, vital signs, medication adherence, and skin analyses. View your health trends with interactive charts. All your data is securely stored for long-term access, allowing you to track your health journey over time and make informed decisions based on historical trends.",
    benefits: ["Detailed Reports", "Interactive Charts", "Health Trends", "Long-term Storage"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    icon: "📊",
    color: "from-red-500 to-red-600",
    glowColor: "from-red-400/20 via-red-400/20 to-red-400/20",
    href: "/features/reports"
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
        {/* Modern Feature Header */}
        <motion.div 
          className="flex items-start justify-between mb-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5, delay: 0.3 }
            }
          }}
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden relative"
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
              <span className="text-white text-xl relative z-10">{feature.icon}</span>
            </motion.div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {feature.title}
              </h3>
              <AnimatedGradient
                className="text-base font-medium"
                duration={3}
                colors={feature.color.split(' ')}
              >
                {feature.subtitle}
              </AnimatedGradient>
            </div>
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

        {/* Modern Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
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
              className="flex items-center gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.3 }
                }
              }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <motion.div 
                className={`w-3 h-3 rounded-full overflow-hidden relative`}
                whileHover={{ scale: 1.3 }}
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
              <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                {benefit}
              </span>
            </motion.div>
          ))}
        </motion.div>

                {/* Modern CTA Section */}
        <motion.div
          className="mt-8 flex items-center justify-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5, delay: 0.6 }
            }
          }}
        >
          {feature.id === 'medication' ? (
            <div className="flex items-center justify-center">
              <motion.div
                className="px-10 py-5 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl font-semibold border border-orange-200/50 text-orange-600 dark:text-orange-400 cursor-not-allowed flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  📱
                </motion.span>
                <span className="text-lg">Coming Soon - Mobile App in Development</span>
              </motion.div>
            </div>
          ) : feature.mobileOnly ? (
            <motion.div
              className="px-10 py-5 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl font-semibold border border-orange-200/50 text-orange-600 dark:text-orange-400 cursor-not-allowed flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                📱
              </motion.span>
              <span className="text-lg">Mobile App Only - Download our app to access this feature</span>
            </motion.div>
          ) : feature.comingSoon ? (
            <motion.div
              className={`px-10 py-5 bg-gradient-to-r ${feature.color.replace('500', '500/10').replace('600', '600/10')} rounded-xl font-semibold border ${feature.id === 'drug-safety' ? 'border-teal-200/50 text-teal-600 dark:text-teal-400' : feature.id === 'chronic-disease' ? 'border-indigo-200/50 text-indigo-600 dark:text-indigo-400' : 'border-yellow-200/50 text-yellow-600 dark:text-yellow-400'} cursor-not-allowed flex items-center gap-3`}
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🚀
              </motion.span>
              <span className="text-lg">Coming Soon - We're working hard to bring this feature to you</span>
            </motion.div>
          ) : feature.id === 'community-blog' ? (
            <Link href={feature.href}>
              <motion.button
                className="group relative px-10 py-5 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 text-lg">Visit Blog</span>
                <motion.svg 
                  className="w-6 h-6 relative z-10" 
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
              </motion.button>
            </Link>
          ) : (
            <Link href={feature.href}>
              <motion.button
                className={`group relative px-10 py-5 bg-gradient-to-r ${feature.color} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 overflow-hidden`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color.replace('500', '600').replace('600', '700')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <span className="relative z-10 text-lg">Try Now</span>
                <motion.svg 
                  className="w-6 h-6 relative z-10" 
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
              </motion.button>
            </Link>
          )}
        </motion.div>
      </motion.div>

      {/* Modern Tech Placeholder */}
      <motion.div 
        className="flex-1"
        variants={imageVariants}
      >
        <motion.div 
          className="flex items-center justify-center"
          whileHover={{ 
            scale: 1.02
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="text-9xl"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0],
              filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {feature.icon}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="pt-0 pb-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >

          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatedGradientText
              text="Advanced Health Features"
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              duration={4}
              colors={['from-blue-600', 'via-purple-600', 'to-emerald-600']}
            />
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Experience the future of healthcare with our cutting-edge AI-powered tools designed to keep you healthy, informed, and in control of your wellness journey.
          </motion.p>
          
          {/* Modern Stats Row */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-2">8+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Health Tools</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">AI Analysis</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Secure</div>
            </motion.div>
          </motion.div>
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