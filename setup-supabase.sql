-- Create tables
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT,
  username TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user'
);

CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tool TEXT,
  tags TEXT[],
  category TEXT,
  slug TEXT UNIQUE,
  views INT DEFAULT 0,
  rating FLOAT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  prompt_id UUID REFERENCES prompts(id),
  vote_value INT,
  UNIQUE(user_id, prompt_id)
);

CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID REFERENCES prompts(id),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  link TEXT,
  logo_url TEXT,
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public users are viewable by everyone." ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profiles." ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public prompts are viewable by everyone." ON prompts
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own prompts." ON prompts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prompts." ON prompts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prompts." ON prompts
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can vote on prompts." ON votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes." ON votes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes." ON votes
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public votes are viewable by everyone." ON votes
  FOR SELECT USING (true);

CREATE POLICY "Users can comment on prompts." ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments." ON comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments." ON comments
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public comments are viewable by everyone." ON comments
  FOR SELECT USING (true);

CREATE POLICY "Ads are viewable by everyone." ON ads
  FOR SELECT USING (true); 