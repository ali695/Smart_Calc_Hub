import { Mail, MessageSquare, Send, Linkedin, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for contacting SmartCalc Hub!",
      description: "We've received your message and will reply soon.",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header with Gradient */}
      <div className="bg-gradient-to-r from-primary via-accent to-primary-glow text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl opacity-95">
              Have a question or feedback? We'd love to hear from you!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Form - Glassmorphic Design */}
            <div className="md:col-span-3">
              <Card className="shadow-large border-2 border-primary/10 backdrop-blur-sm bg-card/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/20">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    Send us a message
                  </CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll respond as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is this about?" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Your message..." 
                      rows={5}
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2 bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300 text-base h-12">
                    <Send className="h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="md:col-span-2 space-y-6">
              <Card className="shadow-large border-2 border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/20">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    For general inquiries and support:
                  </p>
                  <a href="mailto:ma7122671@gmail.com" className="text-primary hover:text-primary-glow hover:underline font-semibold text-lg transition-colors">
                    ma7122671@gmail.com
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-large border-2 border-primary/10 bg-gradient-to-br from-card to-muted/30">
                <CardHeader>
                  <CardTitle className="text-xl">Connect with Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-5">
                    Follow us on social media for updates and tips:
                  </p>
                  <div className="flex flex-col gap-3">
                    <a 
                      href="https://www.linkedin.com/in/ali-haider-seo-consultant/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl bg-[#0077B5]/10 hover:bg-[#0077B5] text-[#0077B5] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                    >
                      <Linkedin className="h-6 w-6" />
                      <span className="font-semibold">LinkedIn</span>
                    </a>
                    <a 
                      href="https://www.instagram.com/ali_haiderseo/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] text-[#FD1D1D] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <Instagram className="h-6 w-6" />
                      <span className="font-semibold">Instagram</span>
                    </a>
                    <a 
                      href="https://www.facebook.com/AliHadi768" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <Facebook className="h-6 w-6" />
                      <span className="font-semibold">Facebook</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-large border-2 border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl">Quick FAQs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">Are all calculators free to use?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! SmartCalc Hub provides 100% free calculators with no hidden fees or sign-ups.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1">How are results calculated?</h3>
                    <p className="text-sm text-muted-foreground">
                      Our calculators use industry-standard formulas and are regularly tested for accuracy.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1">Do I need to create an account?</h3>
                    <p className="text-sm text-muted-foreground">
                      No account needed! All tools are instantly accessible without any registration.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1">Can I request a new calculator?</h3>
                    <p className="text-sm text-muted-foreground">
                      Absolutely! We'd love to hear your suggestions. Just send us a message using the form.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Do you save my data?</h3>
                    <p className="text-sm text-muted-foreground">
                      No, we don't store any of your calculation data. Everything is processed in your browser.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Are results medically or financially certified?</h3>
                    <p className="text-sm text-muted-foreground">
                      Our calculators provide estimates for informational purposes. Always consult professionals for medical or financial advice.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">How often are formulas updated?</h3>
                    <p className="text-sm text-muted-foreground">
                      We regularly review and update our formulas to ensure they reflect current standards and best practices.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Can I share my results?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! You can bookmark pages or take screenshots to save and share your calculation results.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Is there an app version coming soon?</h3>
                    <p className="text-sm text-muted-foreground">
                      Our website works great on mobile! A dedicated app may come in the future based on user demand.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Can I embed these calculators on my own site?</h3>
                    <p className="text-sm text-muted-foreground">
                      Please contact us to discuss embedding options and proper attribution requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
