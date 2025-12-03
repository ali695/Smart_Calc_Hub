import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [result, setResult] = useState<{ oneRM: number; percentages: { percent: number; weight: number }[] } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);
    if (!w || !r || r < 1 || r > 30) return;
    // Brzycki Formula
    const oneRM = w * (36 / (37 - r));
    const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60].map(p => ({ percent: p, weight: oneRM * (p / 100) }));
    setResult({ oneRM, percentages });
  };

  const faqs = [{ question: "What is 1RM?", answer: "One-Rep Max (1RM) is the maximum weight you can lift for one repetition of an exercise." }];

  return (
    <CalculatorLayout title="One-Rep Max (1RM) Calculator" description="Calculate your one-rep max based on weight and reps performed." category="health" calculatorId="one-rep-max" howItWorks="Enter the weight lifted and reps completed to estimate your 1RM." formula="1RM = Weight × (36 / (37 - Reps)) [Brzycki]" faqs={faqs}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Weight Lifted</Label><Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 100" /></div>
          <div><Label>Reps Performed (1-30)</Label><Input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="e.g., 8" min="1" max="30" /></div>
        </div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate 1RM"}</Button>
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div><p className="text-sm text-muted-foreground">Estimated 1RM</p><p className="text-3xl font-bold text-primary">{result.oneRM.toFixed(1)}</p></div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.oneRM.toFixed(1), "1RM")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "1RM Calculator", inputs: [{ label: "Weight", value: weight }, { label: "Reps", value: reps }], results: [{ label: "1RM", value: result.oneRM.toFixed(1) }] })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {result.percentages.map(p => (<div key={p.percent} className="bg-muted/50 p-2 rounded text-center"><span className="text-muted-foreground">{p.percent}%</span><p className="font-semibold">{p.weight.toFixed(1)}</p></div>))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default OneRepMaxCalculator;
