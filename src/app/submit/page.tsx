"use client";

import { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { createSlug } from '@/utils';

const TOOLS = [
  { id: 'chatgpt', name: 'ChatGPT' },
  { id: 'midjourney', name: 'Midjourney' },
  { id: 'dalle', name: 'DALL-E' },
  { id: 'stable-diffusion', name: 'Stable Diffusion' },
  { id: 'anthropic-claude', name: 'Claude' },
  { id: 'gpt4', name: 'GPT-4' },
];

const CATEGORIES = [
  { id: 'marketing', name: 'Marketing' },
  { id: 'design', name: 'Design' },
  { id: 'development', name: 'Development' },
  { id: 'writing', name: 'Writing' },
  { id: 'education', name: 'Education' },
  { id: 'e-commerce', name: 'E-commerce' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'business', name: 'Business' },
];

export default function SubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tool: '',
    category: '',
    tags: '',
    description: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Check if user is logged in
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        setError('You must be logged in to submit a prompt');
        setIsSubmitting(false);
        return;
      }
      
      // Basic validation
      if (!formData.title || !formData.content || !formData.tool || !formData.category) {
        setError('Please fill out all required fields');
        setIsSubmitting(false);
        return;
      }
      
      // Process tags
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0);
      
      // Create a slug from the title
      const slug = createSlug(formData.title);
      
      // Submit the prompt to Supabase
      const { error } = await supabase.from('prompts').insert({
        title: formData.title,
        content: formData.content,
        tool: formData.tool,
        category: formData.category,
        tags: tagsArray,
        description: formData.description,
        slug,
        user_id: sessionData.session.user.id,
        created_at: new Date().toISOString(),
      });
      
      if (error) throw error;
      
      setSuccess(true);
      
      // Reset form after success
      setFormData({
        title: '',
        content: '',
        tool: '',
        category: '',
        tags: '',
        description: '',
      });
      
    } catch (err: any) {
      console.error('Error submitting prompt:', err);
      setError(err.message || 'An error occurred while submitting your prompt');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Submit a Prompt</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Share your best prompts with the community. High-quality submissions may be featured on our homepage.
      </p>
      
      {/* Success Message */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8 flex items-start">
          <CheckCircle2 className="text-green-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
          <div>
            <h3 className="font-medium text-green-800 dark:text-green-400">Submission Successful!</h3>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              Thank you for your contribution. Your prompt has been submitted and is pending review.
            </p>
            <button 
              onClick={() => setSuccess(false)}
              className="text-green-600 dark:text-green-400 text-sm font-medium mt-2 hover:underline"
            >
              Submit another prompt
            </button>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8 flex items-start">
          <AlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
          <div>
            <h3 className="font-medium text-red-800 dark:text-red-400">Submission Failed</h3>
            <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}
      
      {!success && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Prompt Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="E.g., Professional LinkedIn Post Generator"
              className="input w-full"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Choose a clear, descriptive title (5-10 words)
            </p>
          </div>
          
          {/* Prompt Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Prompt Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter your prompt text here..."
              className="input w-full min-h-40"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Paste your complete prompt. Use [PLACEHOLDER] for variables.
            </p>
          </div>
          
          {/* Tool and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tool" className="block text-sm font-medium mb-1">
                AI Tool <span className="text-red-500">*</span>
              </label>
              <select
                id="tool"
                name="tool"
                value={formData.tool}
                onChange={handleChange}
                className="input w-full"
                required
              >
                <option value="">Select an AI tool</option>
                {TOOLS.map(tool => (
                  <option key={tool.id} value={tool.id}>{tool.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input w-full"
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="E.g., social-media, copywriting, business (comma-separated)"
              className="input w-full"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Add 3-5 relevant tags, separated by commas
            </p>
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add any tips, context, or additional information about your prompt..."
              className="input w-full min-h-20"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Share any specific use cases, tips, or context about your prompt
            </p>
          </div>
          
          {/* Guidelines */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-2">Submission Guidelines</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
              <li>Your prompt must be original or significantly improved from existing ones</li>
              <li>Ensure your prompt doesn't contain sensitive personal information</li>
              <li>All submissions are reviewed by our team before being published</li>
              <li>By submitting, you agree to share your prompt with the community</li>
            </ul>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Prompt'}
              {!isSubmitting && <ArrowRight size={16} className="ml-2" />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 