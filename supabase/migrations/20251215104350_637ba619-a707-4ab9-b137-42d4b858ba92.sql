-- Create AI insights cache table
CREATE TABLE public.ai_insights_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  calculator_slug text NOT NULL,
  inputs_hash text NOT NULL,
  region text NOT NULL DEFAULT 'US',
  insight_text text NOT NULL,
  module_name text NOT NULL,
  module_icon text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '7 days'),
  UNIQUE(user_id, calculator_slug, inputs_hash, region)
);

-- Enable RLS
ALTER TABLE public.ai_insights_cache ENABLE ROW LEVEL SECURITY;

-- Users can view their own cached insights
CREATE POLICY "Users can view own cached insights"
ON public.ai_insights_cache
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own cached insights
CREATE POLICY "Users can insert own cached insights"
ON public.ai_insights_cache
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own cached insights
CREATE POLICY "Users can delete own cached insights"
ON public.ai_insights_cache
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_ai_insights_lookup ON public.ai_insights_cache(user_id, calculator_slug, inputs_hash, region);

-- Create index for cleanup of expired entries
CREATE INDEX idx_ai_insights_expires ON public.ai_insights_cache(expires_at);