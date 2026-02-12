import { HelpCircle, MessageSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { expandedFAQs } from "@/data/expandedFAQs";
import { PageHeader } from "@/components/PageHeader";
import { SEOHead } from "@/components/SEOHead";
import { getFullUrl } from "@/config/siteConfig";

const FAQ = () => {
  const faqCategories = [
    {
      category: "Finance",
      questions: expandedFAQs.finance
    },
    {
      category: "Health",
      questions: expandedFAQs.health
    },
    {
      category: "Math",
      questions: expandedFAQs.math
    },
    {
      category: "Conversion",
      questions: expandedFAQs.conversion
    },
    {
      category: "Tech",
      questions: expandedFAQs.tech
    },
    {
      category: "Engineering",
      questions: expandedFAQs.engineering
    },
    {
      category: "Business",
      questions: expandedFAQs.business
    },
    {
      category: "Science",
      questions: expandedFAQs.science
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="FAQ – Frequently Asked Questions | SmartCalc Hub"
        description="Find answers to common questions about SmartCalc Hub's free online calculators for finance, health, math, conversions, and more."
        keywords="FAQ, frequently asked questions, calculator help, SmartCalc Hub support"
        canonicalUrl={getFullUrl("/faq")}
      />
      <PageHeader 
        title="Frequently Asked Questions"
        description="Find answers to common questions about SmartCalc Hub calculators"
        icon={<HelpCircle className="h-10 w-10" />}
        category="faq"
      />

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