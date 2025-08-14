'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatedGradient, AnimatedGradientText } from "../common/AnimatedGradient";

export const HeroSection = () => {
  const [iconPositions, setIconPositions] = useState<Array<{x: string, y: string}>>([]);

  // Generate random positions for icons
  useEffect(() => {
    const generateRandomPosition = () => {
      const x = Math.random() * 60 + 20; // 20% to 80% of container width
      const y = Math.random() * 60 + 20; // 20% to 80% of container height
      return { x: `${x}%`, y: `${y}%` };
    };

    const positions = Array.from({ length: 8 }, generateRandomPosition);
    setIconPositions(positions);
  }, []);

  return (
    <section className="relative bg-gray-200 text-gray-900 overflow-hidden">
      {/* Enhanced Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
          backgroundSize: '80px 80px'
        }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(139, 92, 246, 0.1) 50%, transparent 60%)`,
          backgroundSize: '200px 200px'
        }} />
      </div>

      {/* Floating Feature Icons - Random positions */}
      <div className="absolute inset-0 pointer-events-none flex justify-center">
        <div className="relative w-full max-w-6xl">
          {/* Lab Analysis Icon */}
          {iconPositions[0] && (
            <motion.div
              className="absolute text-3xl opacity-25"
              style={{
                left: iconPositions[0].x,
                top: iconPositions[0].y,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                rotate: [0, 8, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🔬
            </motion.div>
          )}

          {/* Symptom Checker Icon */}
          {iconPositions[1] && (
            <motion.div
              className="absolute text-2xl opacity-20"
              style={{
                left: iconPositions[1].x,
                top: iconPositions[1].y,
              }}
              animate={{
                y: [0, 25, 0],
                x: [0, -18, 0],
                rotate: [0, -5, 0],
                scale: [1, 0.9, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              🏥
            </motion.div>
          )}

          {/* Skin Analysis Icon */}
          {iconPositions[2] && (
            <motion.div
              className="absolute text-2xl opacity-22"
              style={{
                left: iconPositions[2].x,
                top: iconPositions[2].y,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 15, 0],
                rotate: [0, 6, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              🔍
            </motion.div>
          )}



          {/* Medication Tracker Icon */}
          {iconPositions[3] && (
            <motion.div
              className="absolute text-xl opacity-18"
              style={{
                left: iconPositions[3].x,
                top: iconPositions[3].y,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, -12, 0],
                rotate: [0, -3, 0],
                scale: [1, 0.95, 1]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              💊
            </motion.div>
          )}

          {/* Health Reports Icon */}
          {iconPositions[4] && (
            <motion.div
              className="absolute text-2xl opacity-24"
              style={{
                left: iconPositions[4].x,
                top: iconPositions[4].y,
              }}
              animate={{
                y: [0, 28, 0],
                x: [0, 12, 0],
                rotate: [0, 4, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              📊
            </motion.div>
          )}

          {/* Medical Symbol Icon */}
          {iconPositions[5] && (
            <motion.div
              className="absolute text-lg opacity-15"
              style={{
                left: iconPositions[5].x,
                top: iconPositions[5].y,
              }}
              animate={{
                y: [0, 12, 0],
                x: [0, -8, 0],
                rotate: [0, -2, 0],
                scale: [1, 0.9, 1]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5
              }}
            >
              ⚕️
            </motion.div>
          )}

          {/* DNA Icon */}
          {iconPositions[6] && (
            <motion.div
              className="absolute text-lg opacity-16"
              style={{
                left: iconPositions[6].x,
                top: iconPositions[6].y,
              }}
              animate={{
                y: [0, -18, 0],
                x: [0, 10, 0],
                rotate: [0, 3, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            >
              🧬
            </motion.div>
          )}

          {/* Additional Lab Icon */}
          {iconPositions[7] && (
            <motion.div
              className="absolute text-lg opacity-14"
              style={{
                left: iconPositions[7].x,
                top: iconPositions[7].y,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, -6, 0],
                rotate: [0, 2, 0],
                scale: [1, 1.03, 1]
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }}
            >
              🔬
            </motion.div>
          )}

          {/* Keep some geometric shapes for variety */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full opacity-20 overflow-hidden relative"
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-4 pb-32">
        <div className="text-center">
          {/* Enhanced Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12"
          >
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 mb-8 leading-[0.85] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                AI-Powered
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <AnimatedGradientText
                  text="Health Assistant"
                  className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black"
                  duration={4}
                  colors={['from-blue-500', 'via-purple-500', 'to-emerald-500']}
                />
              </motion.div>
            </motion.h1>
          </motion.div>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed font-light"
          >
            Transform your health journey with cutting-edge AI technology. 
            Get instant analysis, personalized insights, and comprehensive health tracking 
            that adapts to your unique needs. Your health data is securely stored for long-term access, 
            allowing you to track your progress and make informed decisions anytime, anywhere.
          </motion.p>

          {/* Enhanced Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            <motion.div 
              className="flex items-center gap-4 px-8 py-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -5, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden relative"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <span className="text-sm font-semibold text-gray-800">Instant Results</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4 px-8 py-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -5, rotateY: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden relative"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <span className="text-sm font-semibold text-gray-800">AI-Powered</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4 px-8 py-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -5, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden relative"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </motion.div>
              <span className="text-sm font-semibold text-gray-800">Secure & Private</span>
            </motion.div>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/auth">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <AnimatedGradient
                  type="button"
                  className="px-10 py-5 text-xl font-bold rounded-3xl shadow-lg"
                  duration={4}
                  size="lg"
                  colors={['from-blue-500', 'via-purple-500', 'to-emerald-500']}
                >
                  Start Free Analysis
                </AnimatedGradient>
              </motion.div>
            </Link>
            
            <motion.button
              whileHover={{ 
                scale: 1.08, 
                y: -5,
                rotateY: -10,
                transition: { duration: 0.4 }
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-gray-300 text-gray-700 text-xl font-bold rounded-3xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {/* Subtle glow effect for secondary button */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-400/10 via-gray-300/10 to-gray-400/10 rounded-3xl blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Hover shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              
              <span className="relative z-10 flex items-center gap-3">
                Watch Demo
                <motion.svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ 
                    x: 5, 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.4 }
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 