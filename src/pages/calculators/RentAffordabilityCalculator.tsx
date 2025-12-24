import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const RentAffordabilityCalculator = () => {
  const [income, setIncome] = useState("");
  const [result, setResult] = useState<{ conservative: number; moderate: number; stretch: number } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const monthlyIncome = parseFloat(income);
    if (!monthlyIncome || monthlyIncome <= 0) return;
    const resultData = {
      conservative: monthlyIncome * 0.25,
      moderate: monthlyIncome * 0.30,
      stretch: monthlyIncome * 0.35,
    };
    setResult(resultData);
    updateAIInsight({ monthlyIncome }, resultData);
  };

  const faqs = [{ question: "How much rent can I afford?", answer: "The 30% rule suggests spending no more than 30% of gross monthly income on rent. Conservative is 25%, stretch is 35%." }];

  return (
    <CalculatorLayout title="Rent Affordability Calculator" description="Calculate how much rent you can afford based on your income." category="finance" calculatorId="rent-affordability" howItWorks="Enter your monthly gross income to see affordable rent ranges." formula="Affordable Rent = Monthly Income × 25-35%" faqs={faqs}>
      <div className="space-y-6">
        <div><Label>Monthly Gross Income ($)</Label><Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="e.g., 5000" /></div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Affordability"}</Button>
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div><p className="text-sm text-muted-foreground">Recommended (30%)</p><p className="text-3xl font-bold text-primary">${result.moderate.toFixed(0)}/mo</p></div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.moderate.toFixed(0)}`, "Rent")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Rent Affordability", inputs: [{ label: "Income", value: `$${income}` }], results: [{ label: "Recommended", value: `$${result.moderate.toFixed(0)}` }] })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-500/10 rounded-lg"><p className="text-xs text-muted-foreground">Conservative (25%)</p><p className="text-lg font-semibold text-green-600">${result.conservative.toFixed(0)}</p></div>
                  <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-xs text-muted-foreground">Moderate (30%)</p><p className="text-lg font-semibold text-primary">${result.moderate.toFixed(0)}</p></div>
                  <div className="text-center p-3 bg-orange-500/10 rounded-lg"><p className="text-xs text-muted-foreground">Stretch (35%)</p><p className="text-lg font-semibold text-orange-600">${result.stretch.toFixed(0)}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default RentAffordabilityCalculator;
