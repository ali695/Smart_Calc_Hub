import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const PercentageIncreaseCalculator = () => {
  const [originalValue, setOriginalValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<{
    increase: number;
    finalValue: number;
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const original = parseFloat(originalValue);
    const pct = parseFloat(percentage);
    if (isNaN(original) || isNaN(pct)) return;

    const increase = original * (pct / 100);
    const finalValue = original + increase;
    setResult({ increase, finalValue });
    updateAIInsight({ originalValue: original, percentage: pct }, { increase, finalValue });
  };

  const faqs = [
    {
      question: "How do I calculate a percentage increase?",
      answer: "Multiply the original value by the percentage divided by 100, then add to the original. Final = Original × (1 + Percentage/100)."
    },
    {
      question: "What is a 15% increase of 200?",
      answer: "15% of 200 is 30 (200 × 0.15), so a 15% increase of 200 equals 230."
    },
  ];

  return (
    <CalculatorLayout
      title="Percentage Increase Calculator"
      description="Calculate the result of increasing a number by a given percentage."
      category="math"
      calculatorId="percentage-increase"
      howItWorks="Enter the original value and the percentage you want to increase it by. The calculator shows the increase amount and final value."
      formula="Final Value = Original × (1 + Percentage/100)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="original">Original Value</Label>
            <Input id="original" type="number" step="any" placeholder="e.g., 100" value={originalValue} onChange={(e) => setOriginalValue(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label htmlFor="percentage">Increase by (%)</Label>
            <Input id="percentage" type="number" step="any" placeholder="e.g., 25" value={percentage} onChange={(e) => setPercentage(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
        </div>

        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Increase"}
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Final Value</p>
                    <p className="text-3xl font-bold text-green-600">{result.finalValue.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.finalValue.toString(), "Final Value")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({
                      title: "Percentage Increase Calculator",
                      inputs: [{ label: "Original Value", value: originalValue }, { label: "Percentage", value: `${percentage}%` }],
                      results: [{ label: "Increase Amount", value: result.increase.toString() }, { label: "Final Value", value: result.finalValue.toString() }],
                      formula: "Final = Original × (1 + %/100)",
                    })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Increase Amount</p>
                  <p className="text-xl font-semibold">+{result.increase.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PercentageIncreaseCalculator;
