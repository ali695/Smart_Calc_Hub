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

      // Don't reveal if already subscribed - same success message for all
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
    <section className="relative py-16 md:py-24 overflow-hidden mt-16" aria-label="Newsletter subscription">
      {/* Gradient Background with Glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 dark:from-primary/15 dark:via-primary/8 dark:to-accent/15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-72 md:h-72 bg-accent/15 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Glass Card */}
          <div className="relative backdrop-blur-xl bg-background/40 dark:bg-background/30 border border-border/30 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl shadow-primary/10 animate-fade-in">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            
            {/* Icon with Glow */}
            <div className="relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg shadow-primary/40">
              <Mail className="h-7 w-7 md:h-8 md:w-8 text-primary-foreground" />
              <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl -z-10" />
            </div>
            
            {/* Heading with Gradient Text */}
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-gradient-x">
                Stay Ahead
              </span>{" "}
              <span className="text-foreground">of the Curve</span>
            </h2>
            
            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl">
              Join thousands of users who get exclusive calculator tips, financial insights, 
              and health advice delivered straight to their inbox.
            </p>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 md:h-14 text-base bg-background/60 dark:bg-background/40 border-border/40 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all"
                  required
                  aria-label="Email address"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                size="lg"
                className="h-12 md:h-14 px-6 md:px-8 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 font-semibold"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span className="hidden sm:inline">Subscribing...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    <span>Subscribe</span>
                  </span>
                )}
              </Button>
            </form>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-start gap-4 md:gap-8 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 transition-transform hover:scale-105">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2 transition-transform hover:scale-105">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <span>Weekly insights</span>
              </div>
              <div className="flex items-center gap-2 transition-transform hover:scale-105">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  <BellOff className="h-4 w-4 text-primary" />
                </div>
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
