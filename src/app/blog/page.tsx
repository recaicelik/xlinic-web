'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const blogPosts = [
  {
    slug: 'healthy-eating-tips',
    title: 'Healthy Eating Tips for a Better Life',
    description: 'Simple yet effective nutrition tips you can implement in your daily life for a healthier lifestyle.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60',
    category: 'Nutrition',
    readTime: '5 min read',
    date: 'Mar 21, 2024',
    author: 'Xlinic Team'
  },
  {
    slug: 'exercise-mental-health',
    title: 'The Impact of Regular Exercise on Mental Health',
    description: 'Discover how physical activity positively affects not only your body but also your mental well-being.',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&auto=format&fit=crop&q=60',
    category: 'Mental Health',
    readTime: '4 min read',
    date: 'Mar 19, 2024',
    author: 'Xlinic Team'
  },
  {
    slug: 'improve-sleep-quality',
    title: 'Ways to Improve Your Sleep Quality',
    description: 'Science-backed methods and evening routine suggestions for better sleep quality.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=60',
    category: 'Sleep Health',
    readTime: '6 min read',
    date: 'Mar 18, 2024',
    author: 'Xlinic Team'
  }
];

export default function BlogPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Health Blog & Community
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover health insights, tips, and stories from our community. Share your own health journey and earn bonus tickets!
          </p>
        </motion.div>

        {/* Write Your Story Section */}
        {isAuthenticated && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Share Your Health Journey</h2>
                  <p className="text-pink-100 mb-4">
                    Write about your health experiences, tips, or success stories. Earn 2 bonus tickets for each published article!
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="bg-white/20 px-2 py-1 rounded">✍️</span>
                      <span>Share your story</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-white/20 px-2 py-1 rounded">🎫</span>
                      <span>Earn 2 bonus tickets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-white/20 px-2 py-1 rounded">👥</span>
                      <span>Help others</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Write Article
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Link 
                href={`/blog/${post.slug}`} 
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group block"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {post.date}
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 font-medium">
                      {post.author}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action for Non-Authenticated Users */}
        {!isAuthenticated && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Join Our Health Community
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sign up to read and write health articles, share your experiences, and earn bonus tickets!
              </p>
              <Link href="/auth">
                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 