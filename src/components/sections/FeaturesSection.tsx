'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { translations } from '@/translations';
import Link from 'next/link';

type Feature = {
  title: string;
  description: string;
  image: string;
  id: string;
};

export const FeaturesSection = () => {
  const t = translations['en'];

  const features: Feature[] = [
    {
      title: t.features.healthTest.title,
      description: t.features.healthTest.description,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60',
      id: 'health-test'
    },
    {
      title: t.features.medication.title,
      description: t.features.medication.description,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60',
      id: 'medication'
    },
    {
      title: t.features.symptoms.title,
      description: t.features.symptoms.description,
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&auto=format&fit=crop&q=60',
      id: 'symptoms'
    },
    {
      title: t.features.skinAnalysis.title,
      description: t.features.skinAnalysis.description,
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop&q=60',
      id: 'skin-analysis'
    },
    {
      title: t.features.calories.title,
      description: t.features.calories.description,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60',
      id: 'calories'
    },
    {
      title: t.features.water.title,
      description: t.features.water.description,
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format&fit=crop&q=60',
      id: 'water'
    }
  ];

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid gap-16">
          {features.map((feature, index) => (
            <div
              id={feature.id}
              key={feature.title}
              className="bg-gray-100/80 dark:bg-gray-800/40 rounded-[2rem] overflow-hidden"
            >
              <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } scroll-mt-24`}>
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-medium text-gray-900" style={{ fontFamily: 'system-ui' }}>
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-500 font-normal leading-relaxed" style={{ fontFamily: 'system-ui' }}>
                    {feature.description}
                  </p>
                </div>
                <div className="flex-1 relative flex justify-center">
                  <div className="w-[80%] aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-xl">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
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
              Managing your health is now easier with Xlinic. Try it for free.
            </p>
            
            <div className="flex flex-col items-center">
              <Link 
                href="/#try-xlinic"
                className="bg-black hover:bg-gray-900 text-white text-base font-bold px-6 py-2 rounded-full transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Try Xlinic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 