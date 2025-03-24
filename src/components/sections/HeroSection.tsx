'use client';

import { motion } from "framer-motion";
import Image from "next/image";

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
              <button className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.07-.48-2.09-.48-3.19 0-1.35.62-2.24.51-3.08-.41C3.21 15.64 3.86 8.37 9.09 8.13c1.09.07 1.88.56 2.77.56.84 0 1.71-.56 2.91-.56 1.89.06 3.31.95 4.14 2.48-3.52 2.17-2.94 6.89.14 9.67zM15.84 6.41c.73-.96 1.25-2.29 1.05-3.66-1.06.13-2.27.89-2.97 1.85-.66.78-1.19 2.06-1.02 3.42 1.14.05 2.33-.74 2.94-1.61z"/>
                </svg>
                App Store
              </button>
              <button className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7.5a.75.75 0 000-1.5h-7.5a.25.25 0 01-.25-.25V3.75z"/>
                  <path d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"/>
                </svg>
                Google Play
              </button>
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