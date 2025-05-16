import Link from 'next/link';
import { Star, Filter, Search } from 'lucide-react';
import { Prompt } from '@/lib/supabase';

// This would eventually come from the database
const TOOLS = [
  { id: 'chatgpt', name: 'ChatGPT' },
  { id: 'midjourney', name: 'Midjourney' },
  { id: 'dalle', name: 'DALL-E' },
  { id: 'stable-diffusion', name: 'Stable Diffusion' },
  { id: 'anthropic-claude', name: 'Claude' },
];

// This would eventually come from the database
const CATEGORIES = [
  { id: 'marketing', name: 'Marketing' },
  { id: 'design', name: 'Design' },
  { id: 'development', name: 'Development' },
  { id: 'writing', name: 'Writing' },
  { id: 'education', name: 'Education' },
  { id: 'e-commerce', name: 'E-commerce' },
];

// Mock data for prompts
const PROMPTS: Partial<Prompt>[] = [
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
  {
    id: '4',
    title: 'JavaScript Code Refactoring Assistant',
    content: 'Refactor this JavaScript code to be more efficient, readable, and follow modern best practices: ```[CODE]```...',
    tool: 'ChatGPT',
    category: 'Development',
    tags: ['javascript', 'coding', 'refactoring'],
    slug: 'javascript-code-refactoring-assistant',
    rating: 4.6,
    views: 876,
  },
  {
    id: '5',
    title: 'SEO Blog Post Outline Creator',
    content: 'Create a detailed SEO-optimized blog post outline for the keyword "[KEYWORD]" including H2s, H3s, and key points to cover...',
    tool: 'ChatGPT',
    category: 'Marketing',
    tags: ['seo', 'blog', 'content-strategy'],
    slug: 'seo-blog-post-outline-creator',
    rating: 4.5,
    views: 1122,
  },
  {
    id: '6',
    title: 'Photorealistic Portrait Generator',
    content: 'Create a photorealistic portrait of a [AGE] [GENDER] with [FEATURES], professional lighting, high detail, 4K...',
    tool: 'DALL-E',
    category: 'Design',
    tags: ['portrait', 'realistic', 'character'],
    slug: 'photorealistic-portrait-generator',
    rating: 4.9,
    views: 2034,
  },
];

export const metadata = {
  title: 'Browse Prompts - PromptLoop',
  description: 'Discover and filter high-quality AI prompts for ChatGPT, Midjourney, and other tools.',
};

export default function PromptsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Browse Prompts</h1>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Box */}
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search prompts..."
            className="input pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        {/* Filter Dropdown Button (Mobile) */}
        <div className="md:hidden">
          <button className="btn btn-secondary w-full flex items-center justify-center gap-2">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>
      
      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden md:block col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-3">AI Tools</h3>
              <div className="space-y-2">
                {TOOLS.map((tool) => (
                  <div key={tool.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`tool-${tool.id}`}
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label htmlFor={`tool-${tool.id}`} className="ml-2 text-sm">
                      {tool.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t dark:border-gray-700 pt-6">
              <h3 className="font-medium text-lg mb-3">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-sm">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t dark:border-gray-700 pt-6">
              <h3 className="font-medium text-lg mb-3">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`rating-${rating}`}
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-sm flex items-center">
                      {rating}+ <Star size={14} className="ml-1 text-yellow-400" fill="currentColor" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <button className="btn btn-primary w-full">Apply Filters</button>
            </div>
          </div>
        </div>
        
        {/* Prompts Grid */}
        <div className="col-span-1 md:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PROMPTS.map((prompt) => (
              <div key={prompt.id} className="card group">
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                        {prompt.tool}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
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
                  
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {prompt.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {prompt.views} views
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
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50">
                Previous
              </button>
              
              <button className="px-3 py-2 rounded-md text-sm bg-primary-500 dark:bg-dark-primary text-white">
                1
              </button>
              
              <button className="px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                2
              </button>
              
              <button className="px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                3
              </button>
              
              <button className="px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 