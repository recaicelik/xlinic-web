'use client';

import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    slug: 'healthy-eating-tips',
    title: 'Healthy Eating Tips for a Better Life',
    description: 'Simple yet effective nutrition tips you can implement in your daily life for a healthier lifestyle.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60',
    category: 'Nutrition',
    readTime: '5 min read',
    date: 'Mar 21, 2024'
  },
  {
    slug: 'exercise-mental-health',
    title: 'The Impact of Regular Exercise on Mental Health',
    description: 'Discover how physical activity positively affects not only your body but also your mental well-being.',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&auto=format&fit=crop&q=60',
    category: 'Mental Health',
    readTime: '4 min read',
    date: 'Mar 19, 2024'
  },
  {
    slug: 'improve-sleep-quality',
    title: 'Ways to Improve Your Sleep Quality',
    description: 'Science-backed methods and evening routine suggestions for better sleep quality.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=60',
    category: 'Sleep Health',
    readTime: '6 min read',
    date: 'Mar 18, 2024'
  }
];

export default function BlogPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group"
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
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 