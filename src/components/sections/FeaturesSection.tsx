'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

type Feature = {
  title: string;
  description: string;
  image: string;
  id: string;
};

const features: Feature[] = [
  {
    title: 'Sağlık Testi Analizi',
    description: 'Yapay zeka destekli sağlık testi analizi ile sağlığınızı anlık olarak takip edin. Detaylı test sonuçlarınızı görüntüleyin ve kişiselleştirilmiş öneriler alın.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60',
    id: 'health-test'
  },
  {
    title: 'Semptom Takibi & Değerlendirme',
    description: 'Semptomlarınızı düzenli olarak kaydedin ve takip edin. Yapay zeka destekli sistemimiz, semptomlarınızı analiz ederek size özel değerlendirmeler sunar.',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&auto=format&fit=crop&q=60',
    id: 'symptoms'
  },
  {
    title: 'Cilt Tarama & Değerlendirme',
    description: 'Cilt sağlığınızı yapay zeka teknolojisi ile analiz edin. Cilt problemlerinizi erken tespit edin ve kişiselleştirilmiş bakım önerileri alın.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop&q=60',
    id: 'skin-analysis'
  },
  {
    title: 'Kalori Takibi',
    description: 'Yemeklerinizin fotoğrafını çekerek otomatik kalori hesaplaması yapın. Günlük beslenme alışkanlıklarınızı takip edin ve sağlıklı beslenme hedeflerinize ulaşın.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60',
    id: 'calories'
  },
  {
    title: 'Su Tüketimi Takibi',
    description: 'Günlük su tüketiminizi kolayca takip edin. Kişiselleştirilmiş hatırlatmalar ile yeterli su içtiğinizden emin olun.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format&fit=crop&q=60',
    id: 'water'
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {features.map((feature, index) => (
            <div
              id={feature.id}
              key={feature.title}
              className="bg-gray-100/80 dark:bg-gray-800/40 rounded-[2rem] overflow-hidden"
            >
              <div className={`flex items-center gap-12 p-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              } scroll-mt-32`}>
                <div className="flex-1 space-y-4">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-xl text-gray-600">
                    {feature.description}
                  </p>
                </div>
                <div className="flex-1 relative">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-xl">
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
      </div>
    </section>
  );
}; 