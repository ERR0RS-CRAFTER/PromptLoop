import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Categories - PromptLoop',
  description: 'Browse AI prompts by categories and AI tools on PromptLoop',
};

// This would come from the database in a real app
const AI_TOOLS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Text generation, conversations, coding assistance, and more',
    promptCount: 458,
    color: 'bg-green-500',
    icon: '🤖',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Image generation with artistic styles and realistic outputs',
    promptCount: 342,
    color: 'bg-blue-500',
    icon: '🎨',
  },
  {
    id: 'dalle',
    name: 'DALL-E',
    description: 'AI image generation from OpenAI with photorealistic capabilities',
    promptCount: 275,
    color: 'bg-purple-500',
    icon: '🖼️',
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: 'Open-source image generation with extensive customization',
    promptCount: 310,
    color: 'bg-yellow-500',
    icon: '✨',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s conversational AI with strong reasoning capabilities',
    promptCount: 187,
    color: 'bg-indigo-500',
    icon: '💬',
  },
  {
    id: 'gpt4',
    name: 'GPT-4',
    description: 'Advanced language model with improved reasoning and context',
    promptCount: 415,
    color: 'bg-teal-500',
    icon: '🧠',
  },
];

// This would come from the database in a real app
const CATEGORIES = [
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Content creation, social media, SEO, and advertising prompts',
    promptCount: 325,
    color: 'bg-pink-500',
    icon: '📢',
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Graphics, UI/UX, illustrations, and visual content generation',
    promptCount: 278,
    color: 'bg-orange-500',
    icon: '🎭',
  },
  {
    id: 'writing',
    name: 'Writing',
    description: 'Essays, stories, blog posts, and creative writing assistance',
    promptCount: 412,
    color: 'bg-emerald-500',
    icon: '✍️',
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Code generation, debugging, and programming assistance',
    promptCount: 245,
    color: 'bg-sky-500',
    icon: '💻',
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Learning materials, explanations, and educational content',
    promptCount: 187,
    color: 'bg-amber-500',
    icon: '📚',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Task management, organization, and efficiency improvements',
    promptCount: 153,
    color: 'bg-lime-500',
    icon: '⚡',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Professional emails, reports, presentations, and business docs',
    promptCount: 201,
    color: 'bg-gray-500',
    icon: '💼',
  },
  {
    id: 'e-commerce',
    name: 'E-commerce',
    description: 'Product descriptions, listings, and marketplace content',
    promptCount: 164,
    color: 'bg-red-500',
    icon: '🛒',
  },
];

export default function CategoriesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold mb-6">Browse by Category</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Explore our collection of high-quality prompts organized by category to find exactly what you need.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link 
              key={category.id}
              href={`/prompts?category=${category.id}`}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all group-hover:shadow-lg h-full flex flex-col">
                <div className={`${category.color} p-4 text-white text-center`}>
                  <span className="text-4xl">{category.icon}</span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-500 dark:group-hover:text-dark-primary transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {category.promptCount} prompts
                    </span>
                    <div className="flex items-center text-primary-500 dark:text-dark-primary">
                      <span className="text-sm font-medium">Browse</span>
                      <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-3xl font-bold mb-6">Browse by AI Tool</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Find prompts specialized for your favorite AI tools and platforms.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_TOOLS.map((tool) => (
            <Link 
              key={tool.id}
              href={`/prompts?tool=${tool.id}`}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all group-hover:shadow-lg h-full flex flex-col">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${tool.color} rounded-full flex items-center justify-center text-white text-2xl mr-4`}>
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary-500 dark:group-hover:text-dark-primary transition-colors">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {tool.promptCount} prompts
                    </span>
                    <div className="flex items-center text-primary-500 dark:text-dark-primary">
                      <span className="text-sm font-medium">View All</span>
                      <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="bg-primary-50 dark:bg-gray-800 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Submit your own prompt to our community and help others enhance their AI workflows.
          </p>
          <Link 
            href="/submit" 
            className="btn btn-primary inline-flex items-center"
          >
            Submit a Prompt
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
} 