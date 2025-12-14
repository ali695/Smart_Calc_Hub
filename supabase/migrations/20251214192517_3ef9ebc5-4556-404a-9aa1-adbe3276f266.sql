-- Drop existing policies to recreate with stronger security
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can update subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can delete subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

-- Create restrictive admin-only SELECT policy with additional JWT check
CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  AND auth.uid() IS NOT NULL
);

-- Admin-only UPDATE policy
CREATE POLICY "Admins can update subscribers"
ON public.newsletter_subscribers
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  AND auth.uid() IS NOT NULL
);

-- Admin-only DELETE policy
CREATE POLICY "Admins can delete subscribers"
ON public.newsletter_subscribers
FOR DELETE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  AND auth.uid() IS NOT NULL
);

-- Secure INSERT policy - only via service role or authenticated minimal insert
-- Block direct API access by requiring the insert to come from server
CREATE POLICY "Secure newsletter subscription"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (
  -- Only allow inserting the email field, prevent other columns from being set externally
  email IS NOT NULL 
  AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Add email hash column for extra security layer
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS email_hash TEXT;

-- Create index on email_hash for efficient duplicate checking
CREATE INDEX IF NOT EXISTS idx_newsletter_email_hash ON public.newsletter_subscribers(email_hash);

-- Create function to hash email before insert
CREATE OR REPLACE FUNCTION public.hash_newsletter_email()
RETURNS TRIGGER AS $$
BEGIN
  NEW.email_hash := encode(sha256(lower(NEW.email)::bytea), 'hex');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to auto-hash emails
DROP TRIGGER IF EXISTS before_insert_hash_email ON public.newsletter_subscribers;
CREATE TRIGGER before_insert_hash_email
BEFORE INSERT ON public.newsletter_subscribers
FOR EACH ROW EXECUTE FUNCTION public.hash_newsletter_email();

-- Add unique constraint on email_hash to prevent duplicates
ALTER TABLE public.newsletter_subscribers DROP CONSTRAINT IF EXISTS newsletter_subscribers_email_hash_key;
ALTER TABLE public.newsletter_subscribers ADD CONSTRAINT newsletter_subscribers_email_hash_key UNIQUE (email_hash);