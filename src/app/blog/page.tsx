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
    image: 'https://images.unsplash.com/photo-1631157834633-3697f425e3da?w=800&auto=format&fit=crop&q=60',
    category: 'Sleep Health',
    readTime: '6 min read',
    date: 'Mar 18, 2024'
  }
];

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug}
              className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="text-gray-500 text-sm">
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