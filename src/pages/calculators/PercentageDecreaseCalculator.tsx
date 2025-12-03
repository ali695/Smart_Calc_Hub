import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const PercentageDecreaseCalculator = () => {
  const [originalValue, setOriginalValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<{ decrease: number; finalValue: number } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const original = parseFloat(originalValue);
    const pct = parseFloat(percentage);
    if (isNaN(original) || isNaN(pct)) return;

    const decrease = original * (pct / 100);
    const finalValue = original - decrease;
    setResult({ decrease, finalValue });
  };

  const faqs = [
    {
      question: "How do I calculate a percentage decrease?",
      answer: "Multiply the original value by the percentage divided by 100, then subtract from the original. Final = Original × (1 - Percentage/100)."
    },
  ];

  return (
    <CalculatorLayout
      title="Percentage Decrease Calculator"
      description="Calculate the result of decreasing a number by a given percentage."
      category="math"
      calculatorId="percentage-decrease"
      howItWorks="Enter the original value and the percentage you want to decrease it by."
      formula="Final Value = Original × (1 - Percentage/100)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="original">Original Value</Label>
            <Input id="original" type="number" step="any" placeholder="e.g., 100" value={originalValue} onChange={(e) => setOriginalValue(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label htmlFor="percentage">Decrease by (%)</Label>
            <Input id="percentage" type="number" step="any" placeholder="e.g., 20" value={percentage} onChange={(e) => setPercentage(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
        </div>

        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Decrease"}
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Final Value</p>
                    <p className="text-3xl font-bold text-red-600">{result.finalValue.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.finalValue.toString(), "Final Value")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({
                      title: "Percentage Decrease Calculator",
                      inputs: [{ label: "Original Value", value: originalValue }, { label: "Percentage", value: `${percentage}%` }],
                      results: [{ label: "Decrease Amount", value: result.decrease.toString() }, { label: "Final Value", value: result.finalValue.toString() }],
                    })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Decrease Amount</p>
                  <p className="text-xl font-semibold">-{result.decrease.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PercentageDecreaseCalculator;
