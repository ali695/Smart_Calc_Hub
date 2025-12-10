import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message too long")
});

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitContact = useCallback(async (name: string, email: string, message: string) => {
    setIsSubmitting(true);

    const validation = contactSchema.safeParse({ name, email, message });
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return false;
    }

    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: validation.data.name,
        email: validation.data.email,
        message: validation.data.message
      });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit message. Please try again.",
        variant: "destructive"
      });
      return false;
    }

    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon."
    });
    return true;
  }, []);

  return { submitContact, isSubmitting };
};
