import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";

const DiscountCalculator = () => {
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [result, setResult] = useState<{ finalPrice: number; savings: number } | null>(null);

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (price > 0 && discount >= 0 && discount <= 100) {
      const savings = (price * discount) / 100;
      const finalPrice = price - savings;
      setResult({ finalPrice, savings });
      updateAIInsight(
        { originalPrice: price, discountPercent: discount },
        { finalPrice: finalPrice.toFixed(2), savings: savings.toFixed(2), savingsPercent: discount + "%" }
      );
    }
  };

  const faqs = [
    {
      question: "How do you calculate discount percentage?",
      answer: "Discount Amount = Original Price × (Discount % / 100). Final Price = Original Price − Discount Amount."
    },
    {
      question: "What is a 20% discount on $100?",
      answer: "A 20% discount on $100 is $20 off, making the final price $80."
    },
    {
      question: "How to calculate discount in reverse?",
      answer: "To find the original price from a discounted price: Original Price = Discounted Price / (1 − Discount % / 100)."
    },
    {
      question: "Can discount percentage exceed 100%?",
      answer: "No, a discount percentage cannot exceed 100% as that would mean you're paying negative money. Valid discounts range from 0% to 100%."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Discount Calculator",
          description: "Calculate final price and savings with discount percentage instantly",
          url: "https://smartcalchub.com/finance/discount-calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
          }
        }}
      />
      <CalculatorLayout
      title="Discount Calculator"
      description="Calculate final price and savings with discount percentage instantly"
      category="finance"
      howItWorks="This calculator helps you find the final price after applying a discount percentage. It shows both the amount saved and the price you'll pay, making it easy to evaluate sales and offers."
      formula="Final Price = Original Price − (Original Price × Discount % / 100)"
      faqs={faqs}
      seoTitle="Discount Calculator – Calculate Sale Prices & Savings | SmartCalc Hub"
      seoDescription="Free discount calculator to find final prices and savings instantly. Perfect for shopping, sales, and budgeting calculations."
      keywords="discount calculator, sale price calculator, percentage off calculator, savings calculator"
      canonicalUrl="https://smartcalchub.com/finance/discount-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Original Price ($)</Label>
            <Input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="e.g., 100"
              onKeyPress={(e) => handleKeyPress(e, calculate)}
            />
          </div>

          <div className="space-y-2">
            <Label>Discount Percentage (%)</Label>
            <Input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 20"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>

        <Button 
          type="button"
          onClick={() => handleCalculation(calculate)} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Discount"}
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Final Price</p>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(`$${result.finalPrice.toFixed(2)}`, "Final Price")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => printCalculation({
                    title: "Discount Calculator Result",
                    inputs: [{ label: "Original Price", value: `$${originalPrice}` }, { label: "Discount", value: `${discountPercent}%` }],
                    results: [{ label: "Final Price", value: `$${result.finalPrice.toFixed(2)}` }, { label: "Savings", value: `$${result.savings.toFixed(2)}` }],
                    formula: "Final Price = Original Price − (Original Price × Discount % / 100)"
                  })}>
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  ${result.finalPrice.toFixed(2)}
                </p>
              </div>
              <div className="pt-4 border-t border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Original Price:</span>
                  <span className="font-semibold">${parseFloat(originalPrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Discount ({discountPercent}%):</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">−${result.savings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2 pt-2 border-t border-border/50">
                  <span className="text-muted-foreground font-semibold">You Pay:</span>
                  <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                    ${result.finalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
    </>
  );
};

export default DiscountCalculator;
