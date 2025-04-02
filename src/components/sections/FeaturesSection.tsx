'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Feature = {
  title: string;
  description: string;
  image: string;
  id: string;
};

const features = [
  {
    id: 'health-test',
    title: "Smart Test Analysis",
    description: "Simply snap a photo of your lab results for instant AI analysis. Our advanced technology identifies normal and abnormal values, providing personalized insights and actionable recommendations for your health journey.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 'symptoms',
    title: "Symptom Tracking",
    description: "Select your symptoms and let our AI analyze potential causes, risks, and health patterns. Get personalized lifestyle recommendations, preventive measures, and insights about how your daily habits might be affecting your health.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 'skin-analysis',
    title: "Skin Analysis",
    description: "Upload photos of your skin spots for AI-powered ABCDE analysis (Asymmetry, Border, Color, Diameter, Evolution). Our advanced technology helps with early detection by analyzing changes in moles and skin lesions, providing detailed risk assessments.",
    image: "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 'integration',
    title: "Health App Integration",
    description: "Connect seamlessly with Apple Health and Google Fit to monitor your vital signs 24/7. Our AI system analyzes your health data in real-time, sending instant alerts for abnormal patterns.",
    image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 'calories',
    title: "Calorie Tracking",
    description: "Set your health and fitness goals while our AI tracks your nutrition. Simply upload food photos for instant analysis of calories, macronutrients, and portion sizes. Get personalized meal plans and recommendations based on your goals, whether it's weight management, muscle gain, or maintaining a balanced diet.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 'water',
    title: "Water Tracking",
    description: "Get personalized daily water intake goals based on your age, weight, activity level, and climate. Our AI tracks your hydration patterns, sends smart reminders, and adjusts recommendations during exercise, illness, or weather changes. Monitor your hydration status with detailed insights and weekly progress reports.",
    image: "https://images.unsplash.com/photo-1606938704652-3e588c2c9fd4?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 'medication',
    title: "Medication Reminders",
    description: "Set up your medication schedule with dosage and timing. Our AI sends smart reminders, tracks your adherence, and alerts you for refills. Monitor side effects and get drug interaction warnings.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 'reports',
    title: "Health Reports",
    description: "Get detailed PDF reports covering your complete health data: lab test analyses, symptom patterns, vital signs, nutrition tracking, hydration levels, medication adherence, and skin analyses. View your health trends with interactive charts and comprehensive wellness statistics.",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=60"
  }
];

const handleScrollToEarlyAccess = (e: React.MouseEvent) => {
  e.preventDefault();
  const element = document.getElementById('coming-soon');
  if (element) {
    const offset = 100; // Header height offset
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              id={feature.id}
              className="bg-gray-100/80 dark:bg-gray-800/40 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
                <div className="w-full md:w-[40%] h-64 md:h-80 relative">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div id="try-xlinic" className="mt-24 text-center scroll-mt-24">
          <div className="space-y-8">
            <h2 className="text-4xl font-medium text-gray-900" style={{ fontFamily: 'system-ui' }}>
              Start Managing Your Health
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-normal" style={{ fontFamily: 'system-ui' }}>
              Managing your health is now easier with Xlinic.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={handleScrollToEarlyAccess}
                className="px-6 py-3 bg-black text-white text-lg font-medium rounded-lg hover:bg-gray-900 transition-colors"
              >
                Try Xlinic
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 