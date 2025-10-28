import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
  const faqCategories = [
    {
      category: "General",
      questions: [
        {
          q: "Are all calculators free to use?",
          a: "Yes! SmartCalc Hub provides 100% free calculators with no hidden fees, subscriptions, or sign-ups required. All tools are instantly accessible."
        },
        {
          q: "How are results calculated?",
          a: "Our calculators use industry-standard formulas that are verified and tested for accuracy. Each calculator page shows the formula used so you can understand how results are derived."
        },
        {
          q: "Do I need to create an account?",
          a: "No account needed! All our calculators are instantly accessible without any registration, login, or personal information."
        },
        {
          q: "Can I request a new calculator?",
          a: "Absolutely! We're always looking to add more useful tools. Please use our contact form to suggest new calculators you'd like to see."
        }
      ]
    },
    {
      category: "Privacy & Data",
      questions: [
        {
          q: "Do you save my data?",
          a: "No, we don't store any of your calculation data or personal information. All calculations are processed locally in your browser for complete privacy."
        },
        {
          q: "Are my calculations private?",
          a: "Yes! Your calculations are completely private. We don't track, store, or share any of the values you enter into our calculators."
        },
        {
          q: "Do you use cookies?",
          a: "We only use essential cookies for basic functionality like remembering your dark mode preference. We don't use tracking or advertising cookies."
        }
      ]
    },
    {
      category: "Finance Calculators",
      questions: [
        {
          q: "Are results medically or financially certified?",
          a: "Our calculators provide estimates for informational and educational purposes only. They are not a substitute for professional medical, financial, or legal advice. Always consult qualified professionals for important decisions."
        },
        {
          q: "How accurate are financial calculators?",
          a: "Our financial calculators use standard industry formulas and are very accurate for estimation purposes. However, actual loan terms, interest rates, and fees may vary by lender."
        },
        {
          q: "Can I use these for tax filing?",
          a: "Our tax calculators provide estimates to help you plan. For actual tax filing, please consult a certified tax professional or use official tax software."
        }
      ]
    },
    {
      category: "Health Calculators",
      questions: [
        {
          q: "Are health calculator results accurate?",
          a: "Our health calculators use widely accepted formulas (like BMI, BMR) that provide good general estimates. However, they cannot replace personalized medical advice."
        },
        {
          q: "Should I make health decisions based on these results?",
          a: "No. These calculators are educational tools only. Always consult healthcare professionals before making any health, fitness, or dietary decisions."
        },
        {
          q: "Why do different calculators give different results?",
          a: "Different formulas and methods exist for calculating things like ideal weight or body fat. We clearly show which formula each calculator uses."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "How often are formulas updated?",
          a: "We regularly review and update our formulas to ensure they reflect current standards, best practices, and any changes in industry guidelines."
        },
        {
          q: "Can I share my results?",
          a: "Yes! You can bookmark calculator pages with your inputs in the URL, take screenshots, or manually record your results to save and share them."
        },
        {
          q: "Is there an app version coming soon?",
          a: "Our website is fully mobile-responsive and works great on all devices. A dedicated mobile app may be developed in the future based on user demand."
        },
        {
          q: "Can I embed these calculators on my own site?",
          a: "Please contact us to discuss embedding options, licensing, and proper attribution requirements for using our calculators on external websites."
        },
        {
          q: "Do the calculators work offline?",
          a: "The calculators require an initial internet connection to load, but once loaded, most calculations are done locally in your browser without needing an active connection."
        }
      ]
    },
    {
      category: "Math & Conversion",
      questions: [
        {
          q: "How precise are conversion results?",
          a: "Our conversion calculators use precise conversion factors and display results to several decimal places for high accuracy in most practical applications."
        },
        {
          q: "Can I trust math calculator results for homework?",
          a: "Yes! Our math calculators use standard mathematical formulas and are accurate. However, we encourage understanding the concepts rather than just copying answers."
        },
        {
          q: "Why don't you show step-by-step solutions?",
          a: "Some calculators show the formula used. We're constantly improving our tools and may add step-by-step solutions in future updates."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about SmartCalc Hub calculators
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category, idx) => (
              <Card key={idx} className="shadow-soft">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 text-primary">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, qIdx) => (
                      <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                        <AccordionTrigger className="text-left hover:text-primary">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <h3 className="text-xl font-semibold">Still have questions?</h3>
                <p className="text-muted-foreground">
                  Can't find the answer you're looking for? We're here to help!
                </p>
                <a 
                  href="/contact" 
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqCategories.flatMap((category) =>
            category.questions.map((item) => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
              }
            }))
          )
        })}
      </script>
    </div>
  );
};

export default FAQ;