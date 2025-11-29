import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse(email);
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Thank you for subscribing!", {
        description: "You'll receive our latest updates and articles in your inbox."
      });
      
      setEmail("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
          <p className="text-muted-foreground text-sm">
            Get the latest calculator tips, financial insights, and health advice delivered to your inbox
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="gap-2 shadow-neon hover:scale-105 transition-transform"
          >
            {isSubmitting ? (
              <>Subscribing...</>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Subscribe
              </>
            )}
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          No spam. Unsubscribe anytime.
        </p>
      </CardContent>
    </Card>
  );
};
