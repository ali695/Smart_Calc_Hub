import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const PaybackPeriodCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [annualCashFlow, setAnnualCashFlow] = useState("");
  const [result, setResult] = useState<{ years: number; months: number; totalMonths: number } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const investment = parseFloat(initialInvestment);
    const cashFlow = parseFloat(annualCashFlow);

    if (!isNaN(investment) && !isNaN(cashFlow) && cashFlow > 0) {
      const totalMonths = (investment / cashFlow) * 12;
      const years = Math.floor(totalMonths / 12);
      const months = Math.round(totalMonths % 12);
      
      setResult({
        years,
        months,
        totalMonths: parseFloat(totalMonths.toFixed(1))
      });
    }
  };

  const faqs = [
    {
      question: "What is payback period?",
      answer: "Payback period is the time it takes for an investment to generate enough cash flow to recover the initial investment cost."
    },
    {
      question: "What's a good payback period?",
      answer: "Generally, shorter is better. Most businesses look for payback periods under 3-5 years, though this varies by industry and risk tolerance."
    },
    {
      question: "Does payback period account for time value of money?",
      answer: "No, simple payback period doesn't discount future cash flows. For that, use discounted payback period or NPV analysis."
    }
  ];

  return (
    <CalculatorLayout
      title="Payback Period Calculator"
      description="Calculate investment recovery time and break-even analysis"
      category="business"
      howItWorks="Payback period shows how long it takes to recover your initial investment through annual cash flows. Divide initial investment by annual cash flow to get the recovery time."
      formula="Payback Period = Initial Investment ÷ Annual Cash Flow"
      faqs={faqs}
      seoTitle="Payback Period Calculator – Investment Recovery Time | SmartCalc Hub"
      seoDescription="Free payback period calculator. Determine how long it takes to recover your business investment with break-even analysis."
      keywords="payback period calculator, investment recovery, ROI calculator, break-even analysis, capital budgeting"
      canonicalUrl="https://smartcalhub.online/calculator/payback-period"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Initial Investment ($)</Label>
            <Input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 100000"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>Annual Cash Flow ($)</Label>
            <Input
              type="number"
              value={annualCashFlow}
              onChange={(e) => setAnnualCashFlow(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 25000"
              step="0.01"
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
            "Calculate Payback Period"
          )}
        </Button>

        {result !== null && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Payback Period</p>
                    <p className="text-4xl font-bold text-primary">
                      {result.years} {result.years === 1 ? 'year' : 'years'} {result.months} {result.months === 1 ? 'month' : 'months'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(`${result.years} years ${result.months} months`, "Payback Period")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Months</p>
                    <p className="text-2xl font-bold">{result.totalMonths}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(result.totalMonths.toString(), "Total Months")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    {result.years < 2 ? "⚡ Excellent - Very quick payback!" :
                     result.years < 4 ? "✅ Good - Acceptable payback period" :
                     result.years < 6 ? "⚠️ Fair - Consider if this aligns with your goals" :
                     "❌ Long - High risk, requires careful evaluation"}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => printCalculation({
                    title: "Payback Period Calculator",
                    inputs: [
                      { label: "Initial Investment", value: `$${parseFloat(initialInvestment).toLocaleString()}` },
                      { label: "Annual Cash Flow", value: `$${parseFloat(annualCashFlow).toLocaleString()}` }
                    ],
                    results: [
                      { label: "Payback Period", value: `${result.years} years ${result.months} months` },
                      { label: "Total Months", value: result.totalMonths.toString() }
                    ],
                    formula: "Payback Period = Initial Investment ÷ Annual Cash Flow"
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

export default PaybackPeriodCalculator;
