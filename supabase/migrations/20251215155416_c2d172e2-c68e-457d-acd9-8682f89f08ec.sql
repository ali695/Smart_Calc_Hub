-- Create ai_sessions table for storing user conversation history
CREATE TABLE public.ai_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  message_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  mode TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_ai_sessions_user_id ON public.ai_sessions(user_id);
CREATE INDEX idx_ai_sessions_session_id ON public.ai_sessions(session_id);

-- Enable Row Level Security
ALTER TABLE public.ai_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own sessions" 
ON public.ai_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions" 
ON public.ai_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
ON public.ai_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions" 
ON public.ai_sessions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Allow anonymous users to create sessions (stored locally only)
CREATE POLICY "Anonymous users can use sessions" 
ON public.ai_sessions 
FOR ALL 
USING (user_id IS NULL)
WITH CHECK (user_id IS NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ai_sessions_updated_at
BEFORE UPDATE ON public.ai_sessions
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();