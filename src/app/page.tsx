'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.main 
      ref={containerRef}
      className="flex flex-col bg-gray-200 relative overflow-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Modern Enhanced Background Animation */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{ y: backgroundY }}
      >
        {/* Enhanced Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
        
        {/* Modern Floating Geometric Shapes with Enhanced Effects */}
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full mix-blend-multiply filter blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.08, 0.15, 0.08],
            x: [0, 20, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-48 h-48 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full mix-blend-multiply filter blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.08, 0.15, 0.08],
            x: [0, -25, 0],
            y: [0, 35, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-44 h-44 bg-gradient-to-r from-emerald-400/8 to-blue-400/8 rounded-full mix-blend-multiply filter blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [180, 360, 180],
            opacity: [0.08, 0.12, 0.08],
            x: [0, 30, 0],
            y: [0, -40, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Enhanced Additional Floating Elements */}
        <motion.div
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-orange-400/8 to-red-400/8 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            y: [0, -40, 0],
            x: [0, 25, 0],
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.12, 0.05],
            rotate: [0, 90, 180]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-gradient-to-r from-pink-400/8 to-purple-400/8 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [180, 270, 360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* New Modern Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-16 h-16 bg-gradient-to-r from-cyan-400/6 to-blue-400/6 rounded-full mix-blend-multiply filter blur-lg"
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.15, 1],
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, 45, 90]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/5 w-20 h-20 bg-gradient-to-r from-yellow-400/6 to-orange-400/6 rounded-full mix-blend-multiply filter blur-lg"
          animate={{
            y: [0, 35, 0],
            x: [0, -18, 0],
            scale: [1.1, 1, 1.1],
            opacity: [0.03, 0.09, 0.03],
            rotate: [90, 180, 270]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
      </motion.div>

      {/* Modern Content Container with Enhanced Animations */}
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

      {/* Enhanced Floating Elements Animation with Modern Icons */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1 }}
      >
        {/* Modern Floating Icons with Enhanced Animations */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-4xl opacity-4"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🏥
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 right-1/4 text-3xl opacity-4"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -6, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          ⚕️
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 left-1/3 text-2xl opacity-4"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 4, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          🔬
        </motion.div>

        {/* New Modern Floating Icons */}
        <motion.div
          className="absolute top-1/2 right-1/3 text-2xl opacity-3"
          animate={{
            y: [0, -18, 0],
            rotate: [0, -5, 0],
            scale: [1, 1.06, 1]
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

        <motion.div
          className="absolute bottom-1/4 right-1/5 text-3xl opacity-3"
          animate={{
            y: [0, 22, 0],
            rotate: [0, 7, 0],
            scale: [1, 1.07, 1]
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

        <motion.div
          className="absolute top-2/3 left-1/5 text-2xl opacity-3"
          animate={{
            y: [0, -12, 0],
            rotate: [0, -3, 0],
            scale: [1, 1.04, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        >
          🔍
        </motion.div>
      </motion.div>

      {/* Modern Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.main>
  );
}