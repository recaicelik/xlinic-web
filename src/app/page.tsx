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
      className="flex flex-col bg-gray-100 dark:bg-gray-900 relative overflow-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
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
    </motion.main>
  );
}