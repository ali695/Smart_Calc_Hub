import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const ConversionRateCalculator = () => {
  const [conversions, setConversions] = useState("");
  const [visitors, setVisitors] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const conv = parseFloat(conversions);
    const vis = parseFloat(visitors);

    if (!isNaN(conv) && !isNaN(vis) && vis > 0) {
      const rate = (conv / vis) * 100;
      setResult(parseFloat(rate.toFixed(2)));
    }
  };

  const faqs = [
    {
      question: "What is a good conversion rate?",
      answer: "Average conversion rates vary by industry, but 2-5% is typical for e-commerce. Landing pages can achieve 10-15% or higher with optimization."
    },
    {
      question: "How can I improve my conversion rate?",
      answer: "Focus on clear value propositions, strong CTAs, fast loading times, mobile optimization, trust signals, and A/B testing different elements."
    },
    {
      question: "What counts as a conversion?",
      answer: "A conversion is any desired action: purchase, signup, download, form submission, or any goal you've defined for your campaign."
    }
  ];

  return (
    <CalculatorLayout
      title="Conversion Rate Calculator"
      description="Calculate conversion rates and optimize marketing ROI"
      category="business"
      howItWorks="Conversion rate is the percentage of visitors who complete a desired action. It's calculated by dividing conversions by total visitors and multiplying by 100."
      formula="Conversion Rate (%) = (Conversions ÷ Total Visitors) × 100"
      faqs={faqs}
      seoTitle="Conversion Rate Calculator – Optimize Marketing ROI | SmartCalc Hub"
      seoDescription="Free conversion rate calculator. Measure and optimize your website, landing page, and marketing campaign performance."
      keywords="conversion rate calculator, marketing metrics, ROI calculator, landing page optimization, e-commerce analytics"
      canonicalUrl="https://smartcalhub.online/calculator/conversion-rate"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Number of Conversions</Label>
            <Input
              type="number"
              value={conversions}
              onChange={(e) => setConversions(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 150"
              step="1"
            />
          </div>

          <div className="space-y-2">
            <Label>Total Visitors</Label>
            <Input
              type="number"
              value={visitors}
              onChange={(e) => setVisitors(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 5000"
              step="1"
            />
          </div>
        </div>

        <Button 
          onClick={() => handleCalculation(calculate)} 
          className="w-full"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate Conversion Rate"
          )}
        </Button>

        {result !== null && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-5xl font-bold text-primary">{result}%</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(result.toString(), "Conversion Rate")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Conversions</p>
                    <p className="text-2xl font-bold">{parseFloat(conversions).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Visitors</p>
                    <p className="text-2xl font-bold">{parseFloat(visitors).toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    {result < 2 ? "📊 Below average - Consider optimization strategies" :
                     result < 5 ? "✅ Average - Good performance" :
                     result < 10 ? "🎯 Above average - Great performance!" :
                     "🚀 Excellent - Outstanding conversion rate!"}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => printCalculation({
                    title: "Conversion Rate Calculator",
                    inputs: [
                      { label: "Conversions", value: conversions },
                      { label: "Total Visitors", value: visitors }
                    ],
                    results: [
                      { label: "Conversion Rate", value: `${result}%` }
                    ],
                    formula: "Conversion Rate = (Conversions ÷ Visitors) × 100"
                  })}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default ConversionRateCalculator;
