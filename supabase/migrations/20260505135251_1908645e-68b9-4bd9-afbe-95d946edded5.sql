
-- 1. Newsletter & contact: remove public INSERT, scope to authenticated user with matching email
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

-- Allow authenticated users to manage their own newsletter subscription (Profile page)
CREATE POLICY "Users can subscribe themselves to newsletter"
ON public.newsletter_subscribers
FOR INSERT
TO authenticated
WITH CHECK (lower((auth.jwt() ->> 'email')) = lower(email));

CREATE POLICY "Users can update their own newsletter subscription"
ON public.newsletter_subscribers
FOR UPDATE
TO authenticated
USING (lower((auth.jwt() ->> 'email')) = lower(email));

-- Public form submissions (anon contact + newsletter) must now go through the edge functions
-- which use the service role key and bypass RLS. No anon INSERT policy needed.

-- 2. ai_sessions: remove insecure anonymous policies (not used in client; auth-only going forward)
DROP POLICY IF EXISTS "Anonymous users can create sessions" ON public.ai_sessions;
DROP POLICY IF EXISTS "Anonymous users can update own sessions" ON public.ai_sessions;

-- 3. user_roles: add restrictive policies preventing privilege escalation
CREATE POLICY "No client inserts on user_roles"
ON public.user_roles AS RESTRICTIVE
FOR INSERT
TO authenticated, anon
WITH CHECK (false);

CREATE POLICY "No client updates on user_roles"
ON public.user_roles AS RESTRICTIVE
FOR UPDATE
TO authenticated, anon
USING (false);

CREATE POLICY "No client deletes on user_roles"
ON public.user_roles AS RESTRICTIVE
FOR DELETE
TO authenticated, anon
USING (false);

-- 4. analytics_logs: add validation constraints to prevent metadata injection / event spoofing
ALTER TABLE public.analytics_logs
  ADD CONSTRAINT analytics_event_type_check
  CHECK (event_type IN ('page_view','calculation','favorite','share','export','ai_insight'));

ALTER TABLE public.analytics_logs
  ADD CONSTRAINT analytics_metadata_size_limit
  CHECK (metadata IS NULL OR pg_column_size(metadata) < 10000);

ALTER TABLE public.analytics_logs
  ADD CONSTRAINT analytics_calculator_slug_length
  CHECK (calculator_slug IS NULL OR char_length(calculator_slug) <= 100);
