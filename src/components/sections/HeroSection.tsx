'use client';

import { motion } from "framer-motion";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100vh-48px)] pt-12 pb-32 flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8"
          style={{ fontFamily: 'system-ui' }}
        >
          AI-Powered Health Management
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mb-16"
          style={{ fontFamily: 'system-ui' }}
        >
          Transform your health journey with advanced AI technology. Get personalized insights, track your progress, and make informed decisions about your well-being.
        </motion.p>

        {/* Phone Mockups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex items-center justify-center mt-12"
        >
          {/* First Phone - Slightly behind */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 -mr-14 transform -rotate-6"
          >
            <div className="relative overflow-hidden shadow-2xl rounded-[2.5rem] border-8 border-gray-900">
              <Image
                src="/images/herosection.jpeg"
                alt="Xlinic App Interface - Health Dashboard"
                width={280}
                height={560}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
          
          {/* Second Phone - In front */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-20"
          >
            <div className="relative overflow-hidden shadow-2xl rounded-[2.5rem] border-8 border-gray-900">
              <Image
                src="/images/herosection2.jpeg"
                alt="Xlinic App Interface - Medication Tracking"
                width={300}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 