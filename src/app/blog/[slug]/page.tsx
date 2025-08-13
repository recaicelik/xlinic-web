'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Blog post data (in a real app, this would come from a database or API)
const blogPosts = {
  'healthy-eating-tips': {
    title: 'Healthy Eating Tips for a Better Life',
    description: 'Simple yet effective nutrition tips you can implement in your daily life for a healthier lifestyle.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60',
    category: 'Nutrition',
    readTime: '5 min read',
    date: 'Mar 21, 2024',
    content: `
      <h2>The Importance of Healthy Eating</h2>
      <p>Maintaining a healthy diet is crucial for overall well-being. Here are some key tips to help you develop better eating habits:</p>
      
      <h3>1. Eat More Whole Foods</h3>
      <p>Focus on consuming whole, unprocessed foods like fruits, vegetables, whole grains, and lean proteins. These foods provide essential nutrients and fiber that your body needs.</p>
      
      <h3>2. Practice Portion Control</h3>
      <p>Be mindful of portion sizes. Use smaller plates and bowls to help control serving sizes. Listen to your body's hunger and fullness signals.</p>
      
      <h3>3. Stay Hydrated</h3>
      <p>Drink plenty of water throughout the day. Sometimes thirst can be mistaken for hunger. Keep a water bottle handy and aim for 8 glasses daily.</p>
      
      <h3>4. Plan Your Meals</h3>
      <p>Meal planning helps you make healthier choices and avoid impulsive eating. Prepare meals in advance when possible.</p>
      
      <h3>5. Include Colorful Foods</h3>
      <p>Eat a rainbow of fruits and vegetables to ensure you're getting a variety of nutrients. Different colors often indicate different nutritional benefits.</p>
    `
  },
  'exercise-mental-health': {
    title: 'The Impact of Regular Exercise on Mental Health',
    description: 'Discover how physical activity positively affects not only your body but also your mental well-being.',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&auto=format&fit=crop&q=60',
    category: 'Mental Health',
    readTime: '4 min read',
    date: 'Mar 19, 2024',
    content: `
      <h2>Exercise and Mental Well-being</h2>
      <p>Regular physical activity has been proven to have significant benefits for mental health. Here's how exercise can improve your mental well-being:</p>
      
      <h3>1. Reduces Stress and Anxiety</h3>
      <p>Exercise helps reduce stress hormones and increases endorphins, the body's natural mood elevators.</p>
      
      <h3>2. Improves Sleep Quality</h3>
      <p>Regular physical activity can help you fall asleep faster and enjoy deeper sleep, which is essential for mental health.</p>
      
      <h3>3. Boosts Self-esteem</h3>
      <p>Achieving fitness goals and improving physical capabilities can significantly boost self-confidence and self-worth.</p>
      
      <h3>4. Enhances Cognitive Function</h3>
      <p>Exercise improves memory, focus, and overall brain function, helping you stay sharp and mentally active.</p>
      
      <h3>5. Fights Depression</h3>
      <p>Regular exercise has been shown to be an effective tool in managing and preventing depression symptoms.</p>
    `
  },
  'improve-sleep-quality': {
    title: 'Ways to Improve Your Sleep Quality',
    description: 'Science-backed methods and evening routine suggestions for better sleep quality.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=60',
    category: 'Sleep Health',
    readTime: '6 min read',
    date: 'Mar 18, 2024',
    content: `
      <h2>The Science of Better Sleep</h2>
      <p>Quality sleep is essential for both physical and mental health. Here are evidence-based strategies to improve your sleep:</p>
      
      <h3>1. Establish a Regular Sleep Schedule</h3>
      <p>Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body's internal clock.</p>
      
      <h3>2. Create an Ideal Sleep Environment</h3>
      <p>Keep your bedroom dark, quiet, and cool. Consider using blackout curtains, white noise machines, or earplugs if needed.</p>
      
      <h3>3. Develop a Relaxing Bedtime Routine</h3>
      <p>Engage in calming activities before bed, such as reading, gentle stretching, or meditation.</p>
      
      <h3>4. Limit Screen Time</h3>
      <p>Avoid blue light exposure from phones and computers at least an hour before bedtime.</p>
      
      <h3>5. Watch Your Diet</h3>
      <p>Avoid caffeine and heavy meals close to bedtime. Consider a light, healthy snack if you're hungry.</p>
    `
  }
};

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen py-12 bg-gray-200 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Blog post not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen py-12 bg-gray-200 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {post.description}
          </p>
          <time className="text-gray-500 dark:text-gray-400 text-sm block">
            {post.date}
          </time>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}; 