import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Dashboard - PromptLoop',
  description: 'Manage your prompts and account settings on PromptLoop',
};

export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  // Redirect to login if not authenticated
  if (!session) {
    redirect('/auth/login');
  }
  
  // Fetch user data
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();
  
  // Fetch user's prompts
  const { data: userPrompts } = await supabase
    .from('prompts')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });
  
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/submit" className="btn btn-primary">
          Submit a New Prompt
        </Link>
      </div>
      
      {/* User Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4">
            <User className="text-primary-500 dark:text-primary-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{userData?.username || session.user.email}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Member since {new Date(session.user.created_at || '').toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      
      {/* User's Prompts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Prompts</h2>
          <Link 
            href="/dashboard/prompts" 
            className="text-primary-500 dark:text-dark-primary text-sm hover:underline flex items-center"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {userPrompts && userPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userPrompts.slice(0, 4).map((prompt) => (
              <div key={prompt.id} className="card p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-2 py-0.5 rounded-full">
                    {prompt.tool}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(prompt.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-medium mb-1">
                  <Link 
                    href={`/prompt/${prompt.slug}`}
                    className="hover:text-primary-500 dark:hover:text-dark-primary"
                  >
                    {prompt.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {prompt.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You haven't submitted any prompts yet.
            </p>
            <Link href="/submit" className="btn btn-primary">
              Create Your First Prompt
            </Link>
          </div>
        )}
      </div>
      
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link 
          href="/dashboard/settings" 
          className="card p-6 hover:shadow-md transition-shadow group"
        >
          <h3 className="font-semibold group-hover:text-primary-500 dark:group-hover:text-dark-primary mb-2">
            Account Settings
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Update your profile and preferences
          </p>
        </Link>
        
        <Link 
          href="/dashboard/saved" 
          className="card p-6 hover:shadow-md transition-shadow group"
        >
          <h3 className="font-semibold group-hover:text-primary-500 dark:group-hover:text-dark-primary mb-2">
            Saved Prompts
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            View prompts you've bookmarked
          </p>
        </Link>
        
        <Link 
          href="/dashboard/activity" 
          className="card p-6 hover:shadow-md transition-shadow group"
        >
          <h3 className="font-semibold group-hover:text-primary-500 dark:group-hover:text-dark-primary mb-2">
            Activity
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            See your votes and comments
          </p>
        </Link>
      </div>
    </div>
  );
} 