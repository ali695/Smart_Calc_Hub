import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";

const GrowthRateCalculator = () => {
  const [startingValue, setStartingValue] = useState("");
  const [endingValue, setEndingValue] = useState("");
  const [periods, setPeriods] = useState("");
  const [result, setResult] = useState<{ cagr: number; totalGrowth: number; yoyGrowth: number } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const start = parseFloat(startingValue);
    const end = parseFloat(endingValue);
    const n = parseFloat(periods);

    if (!isNaN(start) && !isNaN(end) && !isNaN(n) && start > 0 && n > 0) {
      const cagr = (Math.pow(end / start, 1 / n) - 1) * 100;
      const totalGrowth = ((end - start) / start) * 100;
      const yoyGrowth = cagr;
      
      const resultData = {
        cagr: parseFloat(cagr.toFixed(2)),
        totalGrowth: parseFloat(totalGrowth.toFixed(2)),
        yoyGrowth: parseFloat(yoyGrowth.toFixed(2))
      };
      setResult(resultData);
      
      updateAIInsight(
        { startingValue: start, endingValue: end, years: n },
        { cagr: resultData.cagr + "%", totalGrowth: resultData.totalGrowth + "%", absoluteGrowth: (end - start).toFixed(2) }
      );
    }
  };

  const faqs = [
    {
      question: "What is CAGR?",
      answer: "CAGR (Compound Annual Growth Rate) is the rate at which an investment grows annually over a specified time period, assuming profits are reinvested."
    },
    {
      question: "How is CAGR different from average growth?",
      answer: "CAGR provides a smoothed annual growth rate that accounts for compounding, while average growth simply divides total growth by the number of periods."
    },
    {
      question: "When should I use CAGR?",
      answer: "Use CAGR to analyze investment returns, revenue growth, customer acquisition, or any metric that grows over multiple periods."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Growth Rate Calculator",
          description: "Calculate CAGR and year-over-year growth rates for business analytics",
          url: "https://smartcalhub.online/calculator/growth-rate",
          applicationCategory: "BusinessApplication"
        }}
      />
      <CalculatorLayout
      title="Growth Rate Calculator"
      description="Calculate CAGR and year-over-year growth rates"
      category="business"
      howItWorks="Calculate the Compound Annual Growth Rate (CAGR) by entering starting value, ending value, and time periods. CAGR shows smooth annual growth assuming compounding."
      formula="CAGR = ((Ending Value / Starting Value)^(1/Years)) - 1"
      faqs={faqs}
      seoTitle="Growth Rate Calculator – CAGR & YoY Growth | SmartCalc Hub"
      seoDescription="Free growth rate calculator. Calculate compound annual growth rate (CAGR) and total growth percentage."
      keywords="growth rate, CAGR calculator, compound annual growth, revenue growth, business metrics"
      canonicalUrl="https://smartcalhub.online/calculator/growth-rate"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Starting Value ($)</Label>
            <Input
              type="number"
              value={startingValue}
              onChange={(e) => setStartingValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 100000"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>Ending Value ($)</Label>
            <Input
              type="number"
              value={endingValue}
              onChange={(e) => setEndingValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 150000"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>Number of Years</Label>
            <Input
              type="number"
              value={periods}
              onChange={(e) => setPeriods(e.target.value)}
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
            "Calculate Growth Rate"
          )}
        </Button>

        {result !== null && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">CAGR (Compound Annual Growth Rate)</p>
                    <p className="text-3xl font-bold text-primary">{result.cagr}%</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(result.cagr.toString(), "CAGR")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Growth</p>
                    <p className="text-2xl font-bold">{result.totalGrowth}%</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(result.totalGrowth.toString(), "Total Growth")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => printCalculation({
                    title: "Growth Rate Calculator",
                    inputs: [
                      { label: "Starting Value", value: `$${parseFloat(startingValue).toLocaleString()}` },
                      { label: "Ending Value", value: `$${parseFloat(endingValue).toLocaleString()}` },
                      { label: "Years", value: periods }
                    ],
                    results: [
                      { label: "CAGR", value: `${result.cagr}%` },
                      { label: "Total Growth", value: `${result.totalGrowth}%` }
                    ],
                    formula: "CAGR = ((Ending Value / Starting Value)^(1/Years)) - 1"
                  })}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Results
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
    </>
  );
};

export default GrowthRateCalculator;
