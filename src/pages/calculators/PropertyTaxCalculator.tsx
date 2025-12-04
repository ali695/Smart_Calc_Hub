import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const PropertyTaxCalculator = () => {
  const [assessedValue, setAssessedValue] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [exemptions, setExemptions] = useState("0");
  const [result, setResult] = useState<{ annualTax: number; monthlyTax: number; effectiveRate: number } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const value = parseFloat(assessedValue);
    const rate = parseFloat(taxRate);
    const exempt = parseFloat(exemptions) || 0;

    if (!value || !rate || value <= 0 || rate <= 0) return;

    const taxableValue = Math.max(0, value - exempt);
    const annualTax = (taxableValue * rate) / 100;
    const monthlyTax = annualTax / 12;
    const effectiveRate = (annualTax / value) * 100;

    setResult({ annualTax, monthlyTax, effectiveRate });
  };

  const faqs = [
    { question: "How is property tax calculated?", answer: "Property tax = Assessed Value × Tax Rate. Some areas have exemptions for homeowners, seniors, or veterans that reduce the taxable value." }
  ];

  return (
    <CalculatorLayout title="Property Tax Calculator" description="Calculate annual and monthly property taxes." category="finance" calculatorId="property-tax" howItWorks="Enter your property's assessed value and local tax rate to calculate taxes." formula="Property Tax = (Assessed Value - Exemptions) × Tax Rate" faqs={faqs}>
      <div className="space-y-6">
        <div><Label>Assessed Property Value ($)</Label><Input type="number" value={assessedValue} onChange={(e) => setAssessedValue(e.target.value)} placeholder="e.g., 400000" /></div>
        <div><Label>Property Tax Rate (%)</Label><Input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} placeholder="e.g., 1.2" step="0.01" /></div>
        <div><Label>Exemptions ($)</Label><Input type="number" value={exemptions} onChange={(e) => setExemptions(e.target.value)} placeholder="e.g., 50000" /></div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Property Tax"}</Button>
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div><p className="text-sm text-muted-foreground">Annual Property Tax</p><p className="text-3xl font-bold text-primary">${result.annualTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.annualTax.toFixed(0)}`, "Property Tax")}><Copy className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Property Tax", inputs: [{ label: "Assessed Value", value: `$${assessedValue}` }], results: [{ label: "Annual Tax", value: `$${result.annualTax.toFixed(0)}` }] })}><Printer className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-xs text-muted-foreground">Monthly Tax</p><p className="text-lg font-semibold text-primary">${result.monthlyTax.toFixed(0)}</p></div>
                <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-xs text-muted-foreground">Effective Rate</p><p className="text-lg font-semibold text-primary">{result.effectiveRate.toFixed(2)}%</p></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PropertyTaxCalculator;
