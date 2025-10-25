import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  howItWorks: string;
  formula: string;
  faqs: FAQ[];
}

export const CalculatorLayout = ({
  title,
  description,
  children,
  howItWorks,
  formula,
  faqs
}: CalculatorLayoutProps) => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>

          {/* Calculator Card */}
          <Card className="p-6 md:p-8 shadow-large">
            {children}
          </Card>

          {/* How It Works */}
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{howItWorks}</p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Formula</h3>
              <code className="text-sm">{formula}</code>
            </div>
          </Card>

          {/* FAQ Section */}
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </div>
    </div>
  );
};
