import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Copy,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  User,
  Calendar,
  Eye,
  Share2,
  Bookmark,
  Tag,
} from 'lucide-react';
import { Prompt, Comment } from '@/lib/supabase';
import { formatRelativeDate } from '@/utils';

interface PromptPageProps {
  params: {
    slug: string;
  };
}

// Mock data for a single prompt
const prompt: Partial<Prompt> = {
  id: '1',
  title: 'Professional LinkedIn Post Generator',
  content: `Generate a professional LinkedIn post about [TOPIC] that incorporates industry best practices and encourages engagement.

The post should:
- Start with a compelling hook or question
- Include relevant insights from your experience
- Mention current industry trends
- End with a clear call-to-action
- Use appropriate hashtags for visibility

Make the tone professional yet conversational, and limit to 1300 characters (LinkedIn's limit).`,
  tool: 'ChatGPT',
  category: 'Marketing',
  tags: ['linkedin', 'social-media', 'professional', 'content-creation', 'networking'],
  slug: 'professional-linkedin-post-generator',
  rating: 4.9,
  views: 1240,
  created_at: '2023-10-15T18:23:45Z',
  user_id: 'user1',
};

// Mock user data
const user = {
  id: 'user1',
  username: 'sarahsmith',
  avatar_url: 'https://i.pravatar.cc/150?img=32',
  role: 'user',
};

// Mock comments
const comments: Partial<Comment>[] = [
  {
    id: 'c1',
    prompt_id: '1',
    user_id: 'user2',
    content: 'I've been using this prompt for my weekly LinkedIn updates, and the engagement has increased by 70%! Highly recommend adding specific industry keywords for even better results.',
    created_at: '2023-10-23T14:32:11Z',
    user: {
      id: 'user2',
      username: 'techguru42',
      avatar_url: 'https://i.pravatar.cc/150?img=68',
      role: 'user',
    },
  },
  {
    id: 'c2',
    prompt_id: '1',
    user_id: 'user3',
    content: 'Great prompt, but I found it works even better if you replace [TOPIC] with a controversial opinion in your industry. Got 125+ comments on my last post!',
    created_at: '2023-11-05T09:18:44Z',
    user: {
      id: 'user3',
      username: 'marketingpro',
      avatar_url: 'https://i.pravatar.cc/150?img=47',
      role: 'user',
    },
  },
];

export async function generateMetadata({ params }: PromptPageProps) {
  // In a real app, we would fetch this data from the database
  const slug = params.slug;
  
  return {
    title: `${prompt.title} - PromptLoop`,
    description: prompt.content?.substring(0, 160),
    openGraph: {
      title: `${prompt.title} - PromptLoop`,
      description: prompt.content?.substring(0, 160),
      type: 'article',
      url: `https://promptloop.vercel.app/prompt/${slug}`,
      images: [
        {
          url: `https://promptloop.vercel.app/api/og?title=${encodeURIComponent(prompt.title || '')}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function PromptPage({ params }: PromptPageProps) {
  const { slug } = params;
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Breadcrumb */}
        <nav className="text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary">
                Home
              </Link>
            </li>
            <li className="text-gray-500 dark:text-gray-400">/</li>
            <li>
              <Link href="/prompts" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary">
                Prompts
              </Link>
            </li>
            <li className="text-gray-500 dark:text-gray-400">/</li>
            <li className="text-gray-700 dark:text-gray-200 truncate">{prompt.title}</li>
          </ol>
        </nav>
        
        {/* Prompt Header */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              {prompt.tool}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
              {prompt.category}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold">{prompt.title}</h1>
          
          <div className="flex items-center mt-4 space-x-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <Image 
                  src={user.avatar_url} 
                  alt={user.username} 
                  width={32} 
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">{user.username}</span>
            </div>
            
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar size={16} className="mr-1" />
              <span>{formatRelativeDate(prompt.created_at || '')}</span>
            </div>
            
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Eye size={16} className="mr-1" />
              <span>{prompt.views} views</span>
            </div>
            
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400" fill="currentColor" />
              <span className="ml-1 text-sm font-medium">{prompt.rating}</span>
            </div>
          </div>
        </div>
        
        {/* Prompt Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Prompt</h2>
              <button className="btn btn-secondary flex items-center space-x-2">
                <Copy size={16} />
                <span>Copy</span>
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4 whitespace-pre-wrap font-mono text-sm">
              {prompt.content}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {prompt.tags?.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/prompts?tag=${tag}`} 
                  className="flex items-center text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="border-t dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-dark-primary">
                <ThumbsUp size={18} className="mr-1" />
                <span>Upvote</span>
              </button>
              <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-dark-primary">
                <ThumbsDown size={18} className="mr-1" />
                <span>Downvote</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-dark-primary">
                <Bookmark size={18} className="mr-1" />
                <span>Save</span>
              </button>
              <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-dark-primary">
                <Share2 size={18} className="mr-1" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center">
            <MessageSquare size={20} className="mr-2" />
            Comments ({comments.length})
          </h2>
          
          {/* Comment Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium mb-4">Leave a comment</h3>
            <div className="mb-4">
              <textarea 
                className="input min-h-24 w-full" 
                placeholder="Share your experience with this prompt..."
              />
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary">Post Comment</button>
            </div>
          </div>
          
          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image 
                      src={comment.user?.avatar_url || ''} 
                      alt={comment.user?.username || ''} 
                      width={40} 
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{comment.user?.username}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatRelativeDate(comment.created_at || '')}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                    
                    <div className="mt-2 flex items-center space-x-4">
                      <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary">Reply</button>
                      <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-dark-primary">Report</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Related Prompts */}
        <div>
          <h2 className="text-xl font-semibold mb-4">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card group">
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                    ChatGPT
                  </span>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-400" fill="currentColor" />
                    <span className="ml-1 text-xs font-medium">4.8</span>
                  </div>
                </div>
                <h3 className="text-base font-medium group-hover:text-primary-500 dark:group-hover:text-dark-primary">
                  <Link href="/prompt/twitter-thread-creator">
                    Twitter Thread Creator for Thought Leaders
                  </Link>
                </h3>
              </div>
            </div>
            
            <div className="card group">
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                    ChatGPT
                  </span>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-400" fill="currentColor" />
                    <span className="ml-1 text-xs font-medium">4.7</span>
                  </div>
                </div>
                <h3 className="text-base font-medium group-hover:text-primary-500 dark:group-hover:text-dark-primary">
                  <Link href="/prompt/social-media-content-calendar">
                    Monthly Social Media Content Calendar Generator
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 