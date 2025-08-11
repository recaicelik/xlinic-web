'use client';

import { motion } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

// Page transition timing
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8
};

// Stagger animation for children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <motion.main 
      className="flex flex-col bg-white"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Background Animation - Reduced Opacity */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob animation-delay-4000"></div>
      </motion.div>

      {/* Content Container */}
      <motion.div
        variants={staggerContainer}
        animate="animate"
        className="relative z-10"
      >
        <motion.div
          variants={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          variants={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <FeaturesSection />
        </motion.div>
      </motion.div>

      {/* Floating Elements Animation - Reduced Opacity */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1 }}
      >
        {/* Floating Icons */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-4xl opacity-3"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🏥
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 right-1/4 text-3xl opacity-3"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          ⚕️
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 left-1/3 text-2xl opacity-3"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 3, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          🔬
        </motion.div>
      </motion.div>
    </motion.main>
  );
}