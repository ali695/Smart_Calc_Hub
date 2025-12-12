-- Add explicit restrictive policies for contact_messages table
CREATE POLICY "Only admins can view messages" 
ON public.contact_messages FOR SELECT 
USING (false);

CREATE POLICY "Only admins can update messages" 
ON public.contact_messages FOR UPDATE 
USING (false);

CREATE POLICY "Only admins can delete messages" 
ON public.contact_messages FOR DELETE 
USING (false);

-- Add explicit restrictive policies for analytics_logs table
CREATE POLICY "Only admins can view analytics" 
ON public.analytics_logs FOR SELECT 
USING (false);

CREATE POLICY "No updates allowed on analytics" 
ON public.analytics_logs FOR UPDATE 
USING (false);

CREATE POLICY "No deletes allowed on analytics" 
ON public.analytics_logs FOR DELETE 
USING (false);