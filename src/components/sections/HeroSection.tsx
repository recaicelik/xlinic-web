'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { StoreBadge } from "../ui/store-badge";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-start bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 pt-2 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Yapay Zeka Destekli
              <br />
              <span className="text-blue-600">Sağlık Asistanınız</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Test sonuçlarınızı analiz eden, sağlık verilerinizi takip eden ve size özel öneriler sunan akıllı sağlık asistanı.
            </p>

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