
-- Fix ai_sessions: Replace overly permissive ALL policy for anonymous users
-- with separate INSERT and UPDATE policies (no SELECT/DELETE for anonymous)
DROP POLICY IF EXISTS "Anonymous users can use sessions" ON public.ai_sessions;

CREATE POLICY "Anonymous users can create sessions"
ON public.ai_sessions
FOR INSERT
WITH CHECK (user_id IS NULL);

CREATE POLICY "Anonymous users can update own sessions"
ON public.ai_sessions
FOR UPDATE
USING (user_id IS NULL);
