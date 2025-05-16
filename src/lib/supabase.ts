import { createClient } from '@supabase/supabase-js';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Supabase project URL and anonymous API key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jennsddzvedwzcylphnq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implbm5zZGR6dmVkd3pjeWxwaG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzI4MzksImV4cCI6MjA2Mjk0ODgzOX0.XHHXw2qa-nEj_w-Icee6PwFtIDGxkGq5XW4XLj3GzRA';

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client
export const createServerSupabaseClient = () => {
  return createServerComponentClient({ 
    cookies,
  });
};

// Database schema types
export type User = {
  id: string;
  email: string;
  username: string;
  avatar_url: string;
  role: string;
};

export type Prompt = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tool: string;
  tags: string[];
  category: string;
  slug: string;
  views: number;
  rating: number;
  created_at: string;
};

export type Vote = {
  id: string;
  user_id: string;
  prompt_id: string;
  vote_value: number;
};

export type Comment = {
  id: string;
  prompt_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: User;
};

export type Ad = {
  id: string;
  company_name: string;
  link: string;
  logo_url: string;
  description: string;
  active: boolean;
  created_at: string;
}; 