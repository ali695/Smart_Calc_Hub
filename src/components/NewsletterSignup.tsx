import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, Sparkles, Bell, BellOff } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const emailSchema = z.string().email("Please enter a valid email address").max(255, "Email is too long");

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse(email);
      setIsSubmitting(true);
      
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email: email.toLowerCase().trim() }
      });

      if (error) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Thank you!", {
        description: "You'll receive our latest calculator tips and financial insights."
      });
      
      setEmail("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 md:py-20 overflow-hidden" aria-label="Newsletter subscription">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Card with subtle border */}
          <div className="relative bg-card/50 dark:bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10">
            
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary mb-6">
              <Mail className="h-7 w-7 text-primary-foreground" />
            </div>
            
            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="text-primary">Stay Ahead</span>{" "}
              <span className="text-foreground">of the Curve</span>
            </h2>
            
            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl">
              Join thousands of users who get exclusive calculator tips, financial insights, 
              and health advice delivered straight to their inbox.
            </p>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 text-base bg-background border-border focus:border-primary rounded-lg transition-colors"
                  required
                  aria-label="Email address"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                size="lg"
                className="h-12 px-6 rounded-lg bg-primary hover:bg-primary/90 transition-colors font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span className="hidden sm:inline">Subscribing...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    <span>Subscribe</span>
                  </span>
                )}
              </Button>
            </form>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <span>Weekly insights</span>
              </div>
              <div className="flex items-center gap-2">
                <BellOff className="h-4 w-4 text-primary" />
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
