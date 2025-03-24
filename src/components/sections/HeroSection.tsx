'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { StoreBadge } from "../ui/store-badge";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#f3f4ff] dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Sağlık Uzmanlarına
              <br />
              <span className="text-blue-600">Anında Ulaşın</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Xlinic ile sağlık uzmanlarına 7/24 ulaşın, randevularınızı yönetin ve sağlığınızı takip edin.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-12 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100K+</div>
                <div className="text-sm text-gray-500">Kullanıcı</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-gray-500">Uzman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-500">Uzmanlık</div>
              </div>
            </div>

            {/* Store Badges */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <StoreBadge type="apple" href="https://apps.apple.com/app/xlinic" />
              <StoreBadge type="google" href="https://play.google.com/store/apps/details?id=com.xlinic" />
            </div>
          </motion.div>

          {/* Right Column - Device Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[300px] lg:max-w-[400px]">
              {/* iPhone Mockup */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-[3rem] transform rotate-6 scale-95 opacity-20"></div>
                <div className="relative bg-black rounded-[3rem] overflow-hidden shadow-2xl">
                  {/* Status Bar */}
                  <div className="relative bg-black pt-12">
                    <div className="absolute top-0 inset-x-0 h-6 flex items-center justify-between px-8">
                      <span className="text-white text-sm">10:09</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl"></div>
                  </div>
                  
                  {/* App Content */}
                  <div className="bg-white">
                    <Image
                      src="/images/example.png"
                      alt="Xlinic App Interface"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Apple Watch */}
              <div className="absolute -right-16 bottom-0 w-48">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-100 rounded-3xl transform -rotate-6 scale-95 opacity-20"></div>
                  <div className="relative bg-black rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/example.png"
                      alt="Xlinic Watch Interface"
                      width={200}
                      height={200}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 