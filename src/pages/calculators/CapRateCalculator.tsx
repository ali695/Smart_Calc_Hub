import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const CapRateCalculator = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [result, setResult] = useState<{ capRate: number; noi: number; assessment: string } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const value = parseFloat(propertyValue);
    const income = parseFloat(annualIncome);
    const exp = parseFloat(expenses) || 0;

    if (!value || !income || value <= 0 || income <= 0) return;

    const noi = income - exp;
    const capRate = (noi / value) * 100;

    let assessment = "Average";
    if (capRate >= 8) assessment = "Excellent (High Return)";
    else if (capRate >= 6) assessment = "Good";
    else if (capRate < 4) assessment = "Low Return";

    setResult({ capRate, noi, assessment });
  };

  const faqs = [
    { question: "What is a good cap rate?", answer: "Cap rates of 5-10% are common. Higher cap rates indicate higher returns but often come with more risk. Location, property type, and market conditions affect what's considered good." }
  ];

  return (
    <CalculatorLayout title="Cap Rate Calculator" description="Calculate capitalization rate for real estate investments." category="finance" calculatorId="cap-rate" howItWorks="Enter property value, annual rental income, and expenses to calculate cap rate." formula="Cap Rate = (Net Operating Income / Property Value) × 100" faqs={faqs}>
      <div className="space-y-6">
        <div><Label>Property Value ($)</Label><Input type="number" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} placeholder="e.g., 500000" /></div>
        <div><Label>Annual Rental Income ($)</Label><Input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} placeholder="e.g., 48000" /></div>
        <div><Label>Annual Operating Expenses ($)</Label><Input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} placeholder="e.g., 12000" /></div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Cap Rate"}</Button>
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div><p className="text-sm text-muted-foreground">Cap Rate</p><p className="text-3xl font-bold text-primary">{result.capRate.toFixed(2)}%</p><p className="text-sm text-muted-foreground">{result.assessment}</p></div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(`${result.capRate.toFixed(2)}%`, "Cap Rate")}><Copy className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Cap Rate Calculator", inputs: [{ label: "Property Value", value: `$${propertyValue}` }], results: [{ label: "Cap Rate", value: `${result.capRate.toFixed(2)}%` }] })}><Printer className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg"><p className="text-xs text-muted-foreground">Net Operating Income (NOI)</p><p className="text-lg font-semibold text-primary">${result.noi.toLocaleString()}/year</p></div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CapRateCalculator;
