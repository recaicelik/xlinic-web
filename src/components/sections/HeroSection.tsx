'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { StoreBadge } from "../ui/store-badge";
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export const HeroSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-start bg-white relative overflow-hidden">
      <div className="container mx-auto px-8 pt-16 pb-16 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-0 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left lg:pr-8 max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6">
              {t.hero.title}
              <br />
              <span className="text-blue-600">{t.hero.subtitle}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t.hero.description}
            </p>

            {/* Store Badges */}
            <div className="flex flex-wrap gap-4">
              <StoreBadge type="apple" href="https://apps.apple.com/app/xlinic" />
              <StoreBadge type="google" href="https://play.google.com/store/apps/details?id=com.xlinic" />
            </div>
          </motion.div>

          {/* Right Column - Device Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative flex justify-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative z-10"
              >
                <div className="relative overflow-hidden shadow-2xl rounded-[2.5rem] border-8 border-gray-900">
                  <Image
                    src="/images/herosection.jpg"
                    alt="Xlinic App Interface"
                    width={380}
                    height={760}
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