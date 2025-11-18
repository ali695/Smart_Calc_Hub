import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const CustomerLifetimeValueCalculator = () => {
  const [averagePurchase, setAveragePurchase] = useState("");
  const [purchaseFrequency, setPurchaseFrequency] = useState("");
  const [customerLifespan, setCustomerLifespan] = useState("");
  const [result, setResult] = useState<{ clv: number; yearlyValue: number } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const avgPurchase = parseFloat(averagePurchase);
    const frequency = parseFloat(purchaseFrequency);
    const lifespan = parseFloat(customerLifespan);

    if (!isNaN(avgPurchase) && !isNaN(frequency) && !isNaN(lifespan)) {
      const clv = avgPurchase * frequency * lifespan;
      const yearlyValue = avgPurchase * frequency;
      
      setResult({
        clv: parseFloat(clv.toFixed(2)),
        yearlyValue: parseFloat(yearlyValue.toFixed(2))
      });
    }
  };

  const faqs = [
    {
      question: "What is Customer Lifetime Value (CLV)?",
      answer: "CLV is the total revenue a business can expect from a single customer account throughout their relationship. It's crucial for understanding customer profitability."
    },
    {
      question: "How do I calculate purchase frequency?",
      answer: "Divide the total number of purchases by the total number of unique customers over a specific period (usually one year)."
    },
    {
      question: "Why is CLV important?",
      answer: "CLV helps determine how much to invest in customer acquisition, retention strategies, and marketing campaigns while maintaining profitability."
    }
  ];

  return (
    <CalculatorLayout
      title="Customer Lifetime Value Calculator"
      description="Calculate CLV for business analytics and customer profitability"
      category="business"
      howItWorks="CLV is calculated by multiplying average purchase value by purchase frequency and customer lifespan. This shows the total revenue expected from a customer."
      formula="CLV = Average Purchase Value × Purchase Frequency × Customer Lifespan (years)"
      faqs={faqs}
      seoTitle="Customer Lifetime Value Calculator – CLV Analysis | SmartCalc Hub"
      seoDescription="Free CLV calculator. Calculate customer lifetime value to optimize marketing spend and improve customer retention strategies."
      keywords="CLV calculator, customer lifetime value, customer profitability, marketing ROI, business metrics"
      canonicalUrl="https://smartcalchub.com/calculator/customer-lifetime-value"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Average Purchase Value ($)</Label>
            <Input
              type="number"
              value={averagePurchase}
              onChange={(e) => setAveragePurchase(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 50"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>Purchase Frequency (per year)</Label>
            <Input
              type="number"
              value={purchaseFrequency}
              onChange={(e) => setPurchaseFrequency(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 12"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label>Customer Lifespan (years)</Label>
            <Input
              type="number"
              value={customerLifespan}
              onChange={(e) => setCustomerLifespan(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 5"
              step="0.1"
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
            "Calculate CLV"
          )}
        </Button>

        {result !== null && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Lifetime Value</p>
                    <p className="text-4xl font-bold text-primary">${result.clv.toLocaleString()}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(result.clv.toString(), "CLV")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Yearly Customer Value</p>
                    <p className="text-2xl font-bold">${result.yearlyValue.toLocaleString()}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(result.yearlyValue.toString(), "Yearly Value")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    💡 Your customer acquisition cost should be significantly lower than the CLV for profitable growth.
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => printCalculation({
                    title: "Customer Lifetime Value Calculator",
                    inputs: [
                      { label: "Average Purchase Value", value: `$${parseFloat(averagePurchase).toLocaleString()}` },
                      { label: "Purchase Frequency", value: `${purchaseFrequency}/year` },
                      { label: "Customer Lifespan", value: `${customerLifespan} years` }
                    ],
                    results: [
                      { label: "Customer Lifetime Value", value: `$${result.clv.toLocaleString()}` },
                      { label: "Yearly Customer Value", value: `$${result.yearlyValue.toLocaleString()}` }
                    ],
                    formula: "CLV = Avg Purchase × Frequency × Lifespan"
                  })}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CustomerLifetimeValueCalculator;
