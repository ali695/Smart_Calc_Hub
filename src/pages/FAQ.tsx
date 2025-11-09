import { HelpCircle, MessageSquare } from "lucide-react";
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
          q: "What makes SmartCalc Hub different from other calculator websites?",
          a: "SmartCalc Hub offers a comprehensive suite of professional-grade calculators with AI-powered recommendations, beautiful modern UI, and 100% free access. We focus on accuracy, user experience, and privacy - all calculations happen in your browser with no data storage."
        },
        {
          q: "Are all calculators free to use?",
          a: "Yes! SmartCalc Hub provides 100% free calculators with no hidden fees, subscriptions, or sign-ups required. All tools are instantly accessible."
        },
        {
          q: "How accurate are your calculators?",
          a: "Our calculators use industry-standard, verified formulas that are tested for accuracy. Each calculator page displays the exact formula used, so you can see how results are calculated. We regularly update our algorithms to ensure precision."
        },
        {
          q: "Can I use SmartCalc Hub offline?",
          a: "Our calculators require an internet connection to load initially, but once loaded, calculations are processed locally in your browser. We're working on a progressive web app (PWA) version for offline access."
        },
        {
          q: "How do you ensure data privacy?",
          a: "We take privacy seriously. All calculations are processed locally in your browser - we never store, track, or transmit your calculation data. No accounts, no tracking, complete privacy."
        },
        {
          q: "Do I need to create an account?",
          a: "No account needed! All our calculators are instantly accessible without any registration, login, or personal information."
        },
        {
          q: "Can I request a custom calculator?",
          a: "Absolutely! We're always looking to add more useful tools. Please use our contact form to suggest new calculators you'd like to see."
        },
        {
          q: "How does the AI recommendation system work?",
          a: "Our AI analyzes your calculation results and provides contextual insights, suggestions, and related calculators that might be helpful. It uses pattern recognition to offer personalized recommendations based on your inputs."
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
          q: "What formulas does your compound interest calculator use?",
          a: "We use the standard compound interest formula: A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual rate, n is compounding frequency, and t is time in years."
        },
        {
          q: "How is ROI different from profit margin?",
          a: "ROI (Return on Investment) measures the gain or loss on an investment relative to its cost, expressed as a percentage. Profit margin measures the percentage of revenue that becomes profit after expenses. ROI = (Gain - Cost)/Cost × 100, while Profit Margin = (Revenue - Cost)/Revenue × 100."
        },
        {
          q: "Can I calculate my monthly loan EMI manually?",
          a: "Yes! The EMI formula is: EMI = [P × r × (1+r)^n] / [(1+r)^n - 1], where P is principal, r is monthly interest rate, and n is number of months. Our calculator automates this for accuracy and speed."
        },
        {
          q: "How accurate are financial calculators?",
          a: "Our financial calculators use standard industry formulas and are very accurate for estimation purposes. However, actual loan terms, interest rates, and fees may vary by lender. Always verify with your financial institution."
        },
        {
          q: "Can I use these for tax filing?",
          a: "Our tax calculators provide estimates to help you plan. For actual tax filing, please consult a certified tax professional or use official tax software."
        },
        {
          q: "What's the difference between simple and compound interest?",
          a: "Simple interest is calculated only on the principal amount: I = P × r × t. Compound interest is calculated on principal plus accumulated interest, resulting in faster growth over time."
        },
        {
          q: "Are results medically or financially certified?",
          a: "Our calculators provide estimates for informational and educational purposes only. They are not a substitute for professional medical, financial, or legal advice. Always consult qualified professionals for important decisions."
        }
      ]
    },
    {
      category: "Health Calculators",
      questions: [
        {
          q: "What is BMR and why does it matter?",
          a: "BMR (Basal Metabolic Rate) is the number of calories your body burns at rest. It's crucial for weight management, as it represents 60-75% of your daily calorie expenditure. Understanding your BMR helps you set accurate calorie targets for weight loss, maintenance, or gain."
        },
        {
          q: "Understanding BMR vs BMI: What's the difference?",
          a: "BMI (Body Mass Index) is a measure of body fat based on height and weight, while BMR (Basal Metabolic Rate) measures calories burned at rest. BMI assesses if you're at a healthy weight; BMR helps plan your diet and exercise. Both are useful but serve different purposes."
        },
        {
          q: "Are health calculator results accurate?",
          a: "Our health calculators use widely accepted formulas (like BMI, BMR, TDEE) that provide good general estimates. However, they cannot replace personalized medical advice from healthcare professionals."
        },
        {
          q: "Should I make health decisions based on these results?",
          a: "No. These calculators are educational tools only. Always consult healthcare professionals before making any health, fitness, or dietary decisions."
        },
        {
          q: "Why do different calculators give different results?",
          a: "Different formulas and methods exist for calculating things like ideal weight or body fat. We clearly show which formula each calculator uses so you can choose the most appropriate one for your needs."
        },
        {
          q: "How do I calculate my daily calorie needs?",
          a: "First calculate your BMR using our BMR calculator, then multiply by your activity level to get TDEE (Total Daily Energy Expenditure). This gives you maintenance calories. Subtract 500 for weight loss or add 500 for weight gain."
        },
        {
          q: "What's the best BMI range for adults?",
          a: "For most adults, a BMI between 18.5 and 24.9 is considered healthy. However, BMI doesn't account for muscle mass, so athletes may have higher BMI despite being healthy. Always consider other factors like body composition."
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
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary via-primary-glow to-accent text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-5 rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <HelpCircle className="h-10 w-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl opacity-95">
              Find answers to common questions about SmartCalc Hub calculators
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          <div className="space-y-6">
            {faqCategories.map((category, idx) => (
              <Card key={idx} className="shadow-large border-2 border-primary/10 hover:border-primary/30 transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/20">
                      <HelpCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                      {category.category}
                    </h2>
                  </div>
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

          <Card className="mt-12 bg-gradient-to-br from-primary/10 to-primary-glow/10 border-2 border-primary/30 shadow-large">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-primary/20 mb-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Still have questions?</h3>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Can't find the answer you're looking for? We're here to help!
                </p>
                <a 
                  href="/contact" 
                  className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-xl font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1 text-lg"
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