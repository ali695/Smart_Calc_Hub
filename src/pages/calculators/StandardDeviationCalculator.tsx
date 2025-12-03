import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const StandardDeviationCalculator = () => {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState<{ mean: number; variance: number; stdDev: number; count: number } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const nums = numbers.split(/[,\s]+/).map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (nums.length < 2) return;
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    const variance = nums.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / nums.length;
    const stdDev = Math.sqrt(variance);
    setResult({ mean, variance, stdDev, count: nums.length });
  };

  const faqs = [{ question: "What is standard deviation?", answer: "Standard deviation measures the spread of data points from the mean. A low SD means data is clustered around the mean." }];

  return (
    <CalculatorLayout title="Standard Deviation Calculator" description="Calculate standard deviation, variance, and mean for a set of numbers." category="math" calculatorId="standard-deviation" howItWorks="Enter numbers separated by commas or spaces." formula="σ = √(Σ(x - μ)² / N)" faqs={faqs}>
      <div className="space-y-6">
        <div><Label>Numbers (comma or space separated)</Label><Input value={numbers} onChange={(e) => setNumbers(e.target.value)} placeholder="e.g., 10, 20, 30, 40, 50" /></div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate"}</Button>
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div><p className="text-sm text-muted-foreground">Standard Deviation (σ)</p><p className="text-3xl font-bold text-primary">{result.stdDev.toFixed(4)}</p></div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.stdDev.toFixed(4), "Std Dev")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Standard Deviation", inputs: [{ label: "Numbers", value: numbers }], results: [{ label: "Std Dev", value: result.stdDev.toFixed(4) }, { label: "Mean", value: result.mean.toFixed(4) }] })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div><p className="text-sm text-muted-foreground">Mean</p><p className="text-xl font-semibold">{result.mean.toFixed(4)}</p></div>
                  <div><p className="text-sm text-muted-foreground">Variance</p><p className="text-xl font-semibold">{result.variance.toFixed(4)}</p></div>
                  <div><p className="text-sm text-muted-foreground">Count</p><p className="text-xl font-semibold">{result.count}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default StandardDeviationCalculator;
