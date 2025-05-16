import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Star, Users, Zap } from 'lucide-react';
import { Prompt } from '@/lib/supabase';

// Temporary mock data until we connect to Supabase
const FEATURED_PROMPTS: Partial<Prompt>[] = [
  {
    id: '1',
    title: 'Professional LinkedIn Post Generator',
    content: 'Generate a professional LinkedIn post about [TOPIC] that incorporates industry best practices and encourages engagement...',
    tool: 'ChatGPT',
    category: 'Marketing',
    tags: ['linkedin', 'social-media', 'professional'],
    slug: 'professional-linkedin-post-generator',
    rating: 4.9,
    views: 1240,
  },
  {
    id: '2',
    title: 'Detailed Product Description Writer',
    content: 'Create a compelling product description for [PRODUCT] that highlights its key features, benefits, and unique selling points...',
    tool: 'ChatGPT',
    category: 'E-commerce',
    tags: ['product-description', 'copywriting', 'sales'],
    slug: 'detailed-product-description-writer',
    rating: 4.7,
    views: 983,
  },
  {
    id: '3',
    title: 'Cinematic Fantasy Landscape Generator',
    content: 'Create a fantasy landscape with magical elements, dramatic lighting, cinematic composition, mountains, mysterious forest...',
    tool: 'Midjourney',
    category: 'Design',
    tags: ['landscape', 'fantasy', 'cinematic'],
    slug: 'cinematic-fantasy-landscape-generator',
    rating: 4.8,
    views: 1578,
  },
];

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight">
          The First Social Network for{' '}
          <span className="text-primary-500 dark:text-dark-primary">
            AI Prompts
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover, share, and rate high-quality prompts for ChatGPT, Midjourney, and other AI tools.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto pt-6">
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="Search for prompts..."
              className="input pl-10 pr-4 py-3 w-full text-base rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <button className="btn btn-primary absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full py-2">
              Search
            </button>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/prompts" className="btn btn-primary">
            Browse Prompts
          </Link>
          <Link href="/submit" className="btn btn-secondary">
            Submit a Prompt
          </Link>
        </div>
      </section>
      
      {/* Featured Prompts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Prompts</h2>
          <Link href="/prompts" className="text-primary-500 dark:text-dark-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROMPTS.map((prompt) => (
            <div key={prompt.id} className="card group">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 mb-2">
                      {prompt.tool}
                    </span>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                      {prompt.category}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                    <span className="ml-1 text-sm font-medium">{prompt.rating}</span>
                  </div>
                </div>
                
                <h3 className="mt-2 text-lg font-semibold group-hover:text-primary-500 dark:group-hover:text-dark-primary transition-colors">
                  <Link href={`/prompt/${prompt.slug}`}>
                    {prompt.title}
                  </Link>
                </h3>
                
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {prompt.content}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users size={14} className="mr-1" />
                    <span>{prompt.views} views</span>
                  </div>
                  <Link 
                    href={`/prompt/${prompt.slug}`}
                    className="text-primary-500 dark:text-dark-primary text-sm font-medium hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-12">Why PromptLoop?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-primary-500 dark:text-dark-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find the perfect prompts for your projects. Filter by AI tool, category, rating, and more.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
              <Users size={24} className="text-primary-500 dark:text-dark-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Share</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Contribute your best prompts to the community. Build your profile and gain recognition.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
              <Zap size={24} className="text-primary-500 dark:text-dark-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Improve</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Rate and review prompts. Leave comments to help others improve their results.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center bg-primary-500 dark:bg-dark-primary text-white -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to level up your AI game?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join the PromptLoop community today and unlock the full potential of your AI tools.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/auth/register" 
            className="btn bg-white text-primary-500 dark:text-dark-primary hover:bg-gray-100"
          >
            Sign Up - It's Free
          </Link>
          <Link 
            href="/prompts" 
            className="btn bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-800 dark:hover:bg-primary-700"
          >
            Browse Prompts
          </Link>
        </div>
      </section>
    </div>
  );
}
