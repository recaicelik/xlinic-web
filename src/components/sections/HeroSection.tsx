'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { StoreBadge } from "../ui/store-badge";
import { translations } from '@/translations';

export const HeroSection = () => {
  const t = translations['en'];

  return (
    <section className="w-full bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 tracking-tight leading-tight mb-8" style={{ fontFamily: 'system-ui' }}>
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl font-normal" style={{ fontFamily: 'system-ui' }}>
              {t.hero.description}
            </p>

            {/* Store Badges */}
            <div className="flex flex-wrap gap-4 mt-2">
              <StoreBadge type="apple" href="https://apps.apple.com/app/xlinic" />
              <StoreBadge type="google" href="https://play.google.com/store/apps/details?id=com.xlinic" />
            </div>
          </motion.div>

          {/* Right Column - Device Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-8 lg:mt-0 flex justify-center"
          >
            <div className="relative flex items-center">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 