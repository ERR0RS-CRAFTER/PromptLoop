-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables

-- Users table (extending Supabase auth)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  streak_start DATE,
  streak_current INTEGER DEFAULT 0,
  streak_longest INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE
);

-- Create category table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create tags table
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create prompts table
CREATE TABLE public.prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id),
  is_private BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  parent_id UUID REFERENCES public.prompts(id), -- For remixes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create prompt_tags junction table
CREATE TABLE public.prompt_tags (
  prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (prompt_id, tag_id)
);

-- Create likes table
CREATE TABLE public.likes (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  PRIMARY KEY (user_id, prompt_id)
);

-- Create saves table
CREATE TABLE public.saves (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  PRIMARY KEY (user_id, prompt_id)
);

-- Create follows table
CREATE TABLE public.follows (
  follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  PRIMARY KEY (follower_id, following_id)
);

-- Create prompt packs table
CREATE TABLE public.prompt_packs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create pack_prompts junction table
CREATE TABLE public.pack_prompts (
  pack_id UUID REFERENCES public.prompt_packs(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE,
  position INTEGER,
  PRIMARY KEY (pack_id, prompt_id)
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id), -- For threaded comments
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create comment votes table
CREATE TABLE public.comment_votes (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  is_upvote BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  PRIMARY KEY (user_id, comment_id)
);

-- Create roadmap items table
CREATE TABLE public.roadmap_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('planned', 'in_progress', 'released')),
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create roadmap votes table
CREATE TABLE public.roadmap_votes (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_id UUID REFERENCES public.roadmap_items(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  PRIMARY KEY (user_id, item_id)
);

-- Create pinned_prompts table
CREATE TABLE public.pinned_prompts (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE,
  position INTEGER NOT NULL CHECK (position BETWEEN 1 AND 3),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  PRIMARY KEY (user_id, prompt_id)
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updating timestamps
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_prompts_updated_at
BEFORE UPDATE ON public.prompts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_prompt_packs_updated_at
BEFORE UPDATE ON public.prompt_packs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_roadmap_items_updated_at
BEFORE UPDATE ON public.roadmap_items
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pack_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pinned_prompts ENABLE ROW LEVEL SECURITY;

-- Profile policies
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles
FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE USING (auth.uid() = id);

-- Prompt policies
CREATE POLICY "Public prompts are viewable by everyone"
ON public.prompts
FOR SELECT USING (is_private = false OR auth.uid() = author_id);

CREATE POLICY "Users can insert own prompts"
ON public.prompts
FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own prompts"
ON public.prompts
FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own prompts"
ON public.prompts
FOR DELETE USING (auth.uid() = author_id);

-- Similar policies for other tables...

-- Create views for common operations

-- Popular prompts
CREATE VIEW popular_prompts AS
SELECT p.*, 
       COUNT(DISTINCT l.user_id) as like_count,
       COUNT(DISTINCT s.user_id) as save_count,
       COUNT(DISTINCT c.id) as comment_count
FROM prompts p
LEFT JOIN likes l ON p.id = l.prompt_id
LEFT JOIN saves s ON p.id = s.prompt_id
LEFT JOIN comments c ON p.id = c.prompt_id
WHERE p.is_private = false
GROUP BY p.id
ORDER BY (p.view_count * 0.5) + (COUNT(DISTINCT l.user_id) * 2) + (COUNT(DISTINCT s.user_id) * 1.5) + (COUNT(DISTINCT c.id) * 1) DESC;

-- User statistics
CREATE VIEW user_stats AS
SELECT p.id,
       p.username,
       COUNT(DISTINCT pr.id) as prompt_count,
       COUNT(DISTINCT l.prompt_id) as total_likes_received,
       COUNT(DISTINCT f.follower_id) as follower_count,
       COUNT(DISTINCT f2.following_id) as following_count
FROM profiles p
LEFT JOIN prompts pr ON p.id = pr.author_id
LEFT JOIN likes l ON pr.id = l.prompt_id
LEFT JOIN follows f ON p.id = f.following_id
LEFT JOIN follows f2 ON p.id = f2.follower_id
GROUP BY p.id, p.username;

-- Create indexes for performance
CREATE INDEX idx_prompts_author_id ON public.prompts(author_id);
CREATE INDEX idx_prompts_category_id ON public.prompts(category_id);
CREATE INDEX idx_prompts_parent_id ON public.prompts(parent_id);
CREATE INDEX idx_prompt_tags_prompt_id ON public.prompt_tags(prompt_id);
CREATE INDEX idx_prompt_tags_tag_id ON public.prompt_tags(tag_id);
CREATE INDEX idx_likes_prompt_id ON public.likes(prompt_id);
CREATE INDEX idx_saves_prompt_id ON public.saves(prompt_id);
CREATE INDEX idx_comments_prompt_id ON public.comments(prompt_id);
CREATE INDEX idx_comments_author_id ON public.comments(author_id);
CREATE INDEX idx_comments_parent_id ON public.comments(parent_id);
CREATE INDEX idx_follows_follower_id ON public.follows(follower_id);
CREATE INDEX idx_follows_following_id ON public.follows(following_id); 