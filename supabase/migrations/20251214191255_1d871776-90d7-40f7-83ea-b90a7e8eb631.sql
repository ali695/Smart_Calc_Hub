-- Ensure RLS is enabled on newsletter_subscribers and tighten SELECT access
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing SELECT policy if it exists so we can recreate it with strict admin-only access
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'newsletter_subscribers'
      AND policyname = 'Admins can view subscribers'
  ) THEN
    DROP POLICY "Admins can view subscribers" ON public.newsletter_subscribers;
  END IF;
END$$;

-- Admins (authenticated users with admin role) can view subscribers
CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Keep existing INSERT policy allowing anyone to subscribe
-- (Assumes a policy named "Anyone can subscribe to newsletter" already exists)
-- No changes required for INSERT; it should remain:
-- CREATE POLICY "Anyone can subscribe to newsletter"
-- ON public.newsletter_subscribers
-- FOR INSERT
-- WITH CHECK (true);

-- Optionally, ensure only admins can UPDATE/DELETE (if such policies are desired)
-- but this is not strictly required by the current request.
