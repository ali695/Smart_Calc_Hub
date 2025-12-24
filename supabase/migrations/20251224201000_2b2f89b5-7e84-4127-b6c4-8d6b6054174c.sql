-- Drop the existing permissive INSERT policy on newsletter_subscribers
DROP POLICY IF EXISTS "Secure newsletter subscription" ON public.newsletter_subscribers;

-- Drop the existing permissive INSERT policy on contact_messages
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_messages;

-- Make email_hash NOT NULL for new records (existing records will be handled by trigger)
-- First ensure all existing records have email_hash
UPDATE public.newsletter_subscribers 
SET email_hash = encode(sha256(lower(email)::bytea), 'hex') 
WHERE email_hash IS NULL;

-- Add a unique constraint on email_hash if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'newsletter_subscribers_email_hash_key'
  ) THEN
    ALTER TABLE public.newsletter_subscribers 
    ADD CONSTRAINT newsletter_subscribers_email_hash_key UNIQUE (email_hash);
  END IF;
END $$;

-- Note: We intentionally do NOT create INSERT policies for these tables
-- Inserts will only be possible via Edge Functions using the service role key
-- This completely prevents any public/anonymous inserts directly to the database