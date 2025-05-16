# Supabase Setup Guide for PromptLoop

This guide will help you set up and configure your Supabase project for PromptLoop.

## Project Configuration

1. Your Supabase project URL is: `https://jennsddzvedwzcylphnq.supabase.co`
2. Your Supabase anonymous key is: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implbm5zZGR6dmVkd3pjeWxwaG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzI4MzksImV4cCI6MjA2Mjk0ODgzOX0.XHHXw2qa-nEj_w-Icee6PwFtIDGxkGq5XW4XLj3GzRA`

## Setting Up the Database

You can set up the database schema in one of two ways:

### Option 1: Using the SQL Editor

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Create a new query
4. Copy and paste the contents of the `setup-supabase.sql` file
5. Run the query

### Option 2: Using the Supabase CLI

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Run the SQL setup file:
   ```bash
   supabase db push -f setup-supabase.sql
   ```

## Authentication Setup

1. Go to the Authentication section in your Supabase dashboard
2. Enable Email Sign-In
3. Configure the Site URL to match your deployment URL (e.g., `https://promptloop.vercel.app`)
4. For GitHub OAuth:
   - Go to GitHub Developer Settings and create a new OAuth application
   - Set the Authorization callback URL to: `https://jennsddzvedwzcylphnq.supabase.co/auth/v1/callback`
   - Copy the Client ID and Client Secret to the GitHub provider settings in Supabase

## Environment Variables

Make sure to set up your environment variables in your development and production environments:

```
NEXT_PUBLIC_SUPABASE_URL=https://jennsddzvedwzcylphnq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implbm5zZGR6dmVkd3pjeWxwaG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzI4MzksImV4cCI6MjA2Mjk0ODgzOX0.XHHXw2qa-nEj_w-Icee6PwFtIDGxkGq5XW4XLj3GzRA
```

For local development, create a `.env.local` file in the project root with these variables.

## Testing the Connection

To test if your Supabase connection is working correctly:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Try signing up for an account or browse the prompts section
3. Check the Supabase dashboard to see if data is being stored correctly

## Troubleshooting

- If you're having authentication issues, make sure your site URL and redirect URLs are correctly configured
- If you're seeing permission errors, verify that the Row Level Security policies are correctly set up
- For any data errors, check the Supabase logs in the dashboard 