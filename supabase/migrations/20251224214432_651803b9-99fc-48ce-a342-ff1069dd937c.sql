-- Drop the existing restrictive policy and recreate as permissive
DROP POLICY IF EXISTS "Admins can view messages" ON public.contact_messages;

CREATE POLICY "Admins can view messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));