import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const ProbabilityCalculator = () => {
  const [favorable, setFavorable] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState<{ probability: number; percentage: number; odds: string } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const fav = parseFloat(favorable);
    const tot = parseFloat(total);
    if (!fav || !tot || tot === 0 || fav > tot) return;
    const probability = fav / tot;
    const percentage = probability * 100;
    const odds = `${fav}:${tot - fav}`;
    setResult({ probability, percentage, odds });
  };

  const faqs = [{ question: "What is probability?", answer: "Probability measures the likelihood of an event occurring, expressed as a number between 0 (impossible) and 1 (certain)." }];

  return (
    <CalculatorLayout title="Probability Calculator" description="Calculate the probability, percentage, and odds of an event." category="math" calculatorId="probability" howItWorks="Enter favorable outcomes and total possible outcomes." formula="P(A) = Favorable Outcomes / Total Outcomes" faqs={faqs}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Favorable Outcomes</Label><Input type="number" value={favorable} onChange={(e) => setFavorable(e.target.value)} placeholder="e.g., 1" /></div>
          <div><Label>Total Outcomes</Label><Input type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="e.g., 6" /></div>
        </div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Probability"}</Button>
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div><p className="text-sm text-muted-foreground">Probability</p><p className="text-3xl font-bold text-primary">{result.probability.toFixed(4)}</p></div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.probability.toFixed(4), "Probability")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Probability Calculator", inputs: [{ label: "Favorable", value: favorable }, { label: "Total", value: total }], results: [{ label: "Probability", value: result.probability.toFixed(4) }, { label: "Percentage", value: `${result.percentage.toFixed(2)}%` }] })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground">Percentage</p><p className="text-xl font-semibold">{result.percentage.toFixed(2)}%</p></div>
                  <div><p className="text-sm text-muted-foreground">Odds</p><p className="text-xl font-semibold">{result.odds}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default ProbabilityCalculator;
