export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  created_at: string;
  updated_at: string;
  streak_start?: string;
  streak_current: number;
  streak_longest: number;
  is_verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Prompt {
  id: string;
  title: string;
  description?: string;
  content: string;
  author_id: string;
  category_id?: string;
  is_private: boolean;
  view_count: number;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface PromptWithDetails extends Prompt {
  author: Profile;
  category?: Category;
  parent?: Prompt;
  tags: Tag[];
  like_count: number;
  save_count: number;
  comment_count: number;
  is_liked?: boolean;
  is_saved?: boolean;
}

export interface Like {
  user_id: string;
  prompt_id: string;
  created_at: string;
}

export interface Save {
  user_id: string;
  prompt_id: string;
  created_at: string;
}

export interface Follow {
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface PromptPack {
  id: string;
  title: string;
  description?: string;
  cover_image?: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface PackPrompt {
  pack_id: string;
  prompt_id: string;
  position?: number;
}

export interface Comment {
  id: string;
  content: string;
  prompt_id: string;
  author_id: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CommentWithDetails extends Comment {
  author: Profile;
  upvotes: number;
  downvotes: number;
  current_user_vote?: 'up' | 'down' | null;
  replies?: CommentWithDetails[];
}

export interface CommentVote {
  user_id: string;
  comment_id: string;
  is_upvote: boolean;
  created_at: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description?: string;
  status: 'planned' | 'in_progress' | 'released';
  votes: number;
  created_at: string;
  updated_at: string;
}

export interface RoadmapVote {
  user_id: string;
  item_id: string;
  created_at: string;
}

export interface PinnedPrompt {
  user_id: string;
  prompt_id: string;
  position: number;
  created_at: string;
}

export interface UserStats {
  id: string;
  username: string;
  prompt_count: number;
  total_likes_received: number;
  follower_count: number;
  following_count: number;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  sortBy?: 'newest' | 'popular' | 'most_liked' | 'most_viewed';
  page: number;
  limit: number;
}

export interface Locale {
  lang: 'en' | 'ar';
  isRTL: boolean;
} 