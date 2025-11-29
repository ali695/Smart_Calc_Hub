import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send, HelpCircle, Shield, Lightbulb } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/PageHeader";

const quickFaqs = [
  {
    icon: HelpCircle,
    question: "How accurate are your calculators?",
    answer: "All our calculators are built with industry-standard formulas and regularly tested for accuracy. We use verified mathematical and scientific formulas to ensure reliable results."
  },
  {
    icon: Shield,
    question: "Are my inputs stored?",
    answer: "No, we don't store any of your calculation inputs. All calculations are performed locally in your browser, ensuring complete privacy and security of your data."
  },
  {
    icon: Lightbulb,
    question: "Can I suggest a new calculator?",
    answer: "Absolutely! We're always looking to expand our calculator collection. Please use the contact form below to suggest new calculators you'd like to see on SmartCalc Hub."
  }
];

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
    <>
      <SEOHead
        title="Contact Us | SmartCalc Hub - Get in Touch"
        description="Have questions about our calculators? Contact SmartCalc Hub for support, suggestions, or feedback. We're here to help you with all your calculation needs."
        keywords="contact SmartCalc Hub, calculator support, feedback, suggestions"
        canonicalUrl="https://smartcalchub.com/contact"
      />
      
      <PageHeader 
        title="Contact Us"
        description="Have questions or feedback? We'd love to hear from you."
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Quick FAQs Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Quick Answers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quickFaqs.map((faq, index) => (
                <Card key={index} className="glass-card hover-lift">
                  <CardContent className="pt-6">
                    <faq.icon className="w-10 h-10 mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <Button type="submit" className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a href="mailto:ma7122671@gmail.com" className="text-primary hover:underline">
                    ma7122671@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Follow Us</h3>
                  <div className="flex gap-2">
                    <a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      LinkedIn
                    </a>
                    <span>•</span>
                    <a href="https://www.instagram.com/ali_haiderseo/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Instagram
                    </a>
                    <span>•</span>
                    <a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Facebook
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
