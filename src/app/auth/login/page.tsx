"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, Github, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      setMagicLinkSent(true);
    } catch (err: any) {
      console.error('Error during login:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGitHubLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (err: any) {
      console.error('Error during GitHub login:', err);
      setError(err.message || 'Something went wrong with GitHub login. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Sign in to your PromptLoop account
        </p>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-start">
          <AlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
          <div>
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        </div>
      )}
      
      {magicLinkSent ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
          <h2 className="font-semibold text-lg text-green-800 dark:text-green-400 mb-2">
            Check your email
          </h2>
          <p className="text-green-700 dark:text-green-300 mb-4">
            We've sent a magic link to <strong>{email}</strong>. Click the link in your email to sign in.
          </p>
          <button
            onClick={() => setMagicLinkSent(false)}
            className="text-primary-500 dark:text-dark-primary hover:underline text-sm font-medium"
          >
            Use a different email address
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* GitHub Login Button */}
          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white py-2.5 px-4 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors mb-6"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Github size={18} />
            )}
            <span>Continue with GitHub</span>
          </button>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>
          
          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !email}
              className="btn btn-primary w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  <span>Sending link...</span>
                </>
              ) : (
                "Send magic link"
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link 
                href="/auth/register" 
                className="text-primary-500 dark:text-dark-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        By signing in, you agree to our{' '}
        <Link href="/terms" className="text-primary-500 dark:text-dark-primary hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-primary-500 dark:text-dark-primary hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
} 