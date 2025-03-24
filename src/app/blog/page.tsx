'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 'healthy-eating',
    category: 'Beslenme',
    readTime: '5 dk okuma',
    title: 'Sağlıklı Yaşam İçin Beslenme İpuçları',
    excerpt: 'Günlük hayatınızda uygulayabileceğiniz basit ama etkili beslenme önerileri ile sağlıklı bir yaşama adım atın.',
    author: 'Dr. Ayşe Yılmaz',
    date: '21 Mart 2024',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    href: '/blog/healthy-eating'
  },
  {
    id: 'mental-health',
    category: 'Mental Sağlık',
    readTime: '4 dk okuma',
    title: 'Düzenli Egzersizin Mental Sağlığa Etkileri',
    excerpt: 'Fiziksel aktivitenin sadece vücudunuzu değil, zihinsel sağlığınızı da nasıl olumlu etkilediğini keşfedin.',
    author: 'Uzm. Psk. Mehmet Demir',
    date: '19 Mart 2024',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
    href: '/blog/mental-health'
  },
  {
    id: 'sleep-quality',
    category: 'Uyku Sağlığı',
    readTime: '6 dk okuma',
    title: 'Uyku Kalitesini Artırmanın Yolları',
    excerpt: 'Kaliteli bir uyku için bilimsel olarak kanıtlanmış yöntemler ve gece rutini önerileri.',
    author: 'Dr. Can Öztürk',
    date: '18 Mart 2024',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop',
    href: '/blog/sleep-quality'
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Sağlık Rehberi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Uzmanlarımızdan güncel sağlık bilgileri ve öneriler
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <Link href={post.href} className="block">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
} 