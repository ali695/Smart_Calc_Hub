-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Drop old false policies and create proper admin policies for newsletter_subscribers
DROP POLICY IF EXISTS "Only admins can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Only admins can update subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Only admins can delete subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update subscribers"
ON public.newsletter_subscribers
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete subscribers"
ON public.newsletter_subscribers
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop old false policies and create proper admin policies for contact_messages
DROP POLICY IF EXISTS "Only admins can view messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Only admins can update messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Only admins can delete messages" ON public.contact_messages;

CREATE POLICY "Admins can view messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete messages"
ON public.contact_messages
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop old false policies and create proper admin policies for analytics_logs
DROP POLICY IF EXISTS "Only admins can view analytics" ON public.analytics_logs;

CREATE POLICY "Admins can view analytics"
ON public.analytics_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));