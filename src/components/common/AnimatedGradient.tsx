'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedGradientProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  colors?: string[];
  onClick?: () => void;
  type?: 'text' | 'button';
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedGradient = ({ 
  children, 
  className = '', 
  duration = 4, 
  colors = ['from-blue-500', 'via-purple-500', 'to-emerald-500'],
  onClick,
  type = 'text',
  size = 'md'
}: AnimatedGradientProps) => {
  const gradientClasses = colors.join(' ');
  
  if (type === 'button') {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    return (
      <motion.button
        onClick={onClick}
        className={`relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl overflow-hidden transition-all duration-300 ${sizeClasses[size]} ${className}`}
        whileHover={{ 
          scale: 1.02,
          y: -2,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradientClasses}`}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Subtle glow effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradientClasses} opacity-0`}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: duration * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Hover shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
        
        <div className="relative z-10 text-white inline-flex items-center gap-2">
          {children}
        </div>
      </motion.button>
    );
  }

  return (
    <motion.span
      className={`relative bg-gradient-to-r ${gradientClasses} bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {children}
    </motion.span>
  );
};

// Modern animated gradient text with letter-by-letter animation
export const AnimatedGradientText = ({ 
  text, 
  className = '', 
  duration = 4,
  colors = ['from-blue-500', 'via-purple-500', 'to-emerald-500'],
  staggerDelay = 0.05
}: { 
  text: string; 
  className?: string; 
  duration?: number;
  colors?: string[];
  staggerDelay?: number;
}) => {
  const gradientClasses = colors.join(' ');
  
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className={`inline-block bg-gradient-to-r ${gradientClasses} bg-clip-text text-transparent`}
          animate={{
            backgroundPosition: [
              `${(index * 15) % 100}% 50%`, 
              `${((index * 15) + 100) % 100}% 50%`, 
              `${(index * 15) % 100}% 50%`
            ]
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
            delay: index * staggerDelay
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

// Modern gradient card component
export const AnimatedGradientCard = ({ 
  children, 
  className = '', 
  duration = 6,
  colors = ['from-blue-500', 'via-purple-500', 'to-emerald-500']
}: { 
  children: ReactNode; 
  className?: string; 
  duration?: number;
  colors?: string[];
}) => {
  const gradientClasses = colors.join(' ');
  
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradientClasses}`}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
};

// Modern gradient border component
export const AnimatedGradientBorder = ({ 
  children, 
  className = '', 
  duration = 4,
  colors = ['from-blue-500', 'via-purple-500', 'to-emerald-500']
}: { 
  children: ReactNode; 
  className?: string; 
  duration?: number;
  colors?: string[];
}) => {
  const gradientClasses = colors.join(' ');
  
  return (
    <motion.div
      className={`relative rounded-2xl p-[2px] ${className}`}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Animated gradient border */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradientClasses} rounded-2xl`}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Inner content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6">
        {children}
      </div>
    </motion.div>
  );
};
