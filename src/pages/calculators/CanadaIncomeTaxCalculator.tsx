import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CanadaIncomeTaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [province, setProvince] = useState("ON");
  const [result, setResult] = useState<{
    federalTax: number;
    provincialTax: number;
    totalTax: number;
    takeHome: number;
    effectiveRate: number;
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const grossIncome = parseFloat(income);
    if (!grossIncome || grossIncome <= 0) return;

    // 2024 Federal Tax Brackets
    const federalBrackets = [
      { min: 0, max: 55867, rate: 0.15 },
      { min: 55867, max: 111733, rate: 0.205 },
      { min: 111733, max: 173205, rate: 0.26 },
      { min: 173205, max: 246752, rate: 0.29 },
      { min: 246752, max: Infinity, rate: 0.33 },
    ];

    // Ontario Provincial Brackets (simplified)
    const provincialRates: Record<string, { brackets: { min: number; max: number; rate: number }[] }> = {
      ON: { brackets: [
        { min: 0, max: 51446, rate: 0.0505 },
        { min: 51446, max: 102894, rate: 0.0915 },
        { min: 102894, max: 150000, rate: 0.1116 },
        { min: 150000, max: 220000, rate: 0.1216 },
        { min: 220000, max: Infinity, rate: 0.1316 },
      ]},
      BC: { brackets: [
        { min: 0, max: 47937, rate: 0.0506 },
        { min: 47937, max: 95875, rate: 0.077 },
        { min: 95875, max: 110076, rate: 0.105 },
        { min: 110076, max: 133664, rate: 0.1229 },
        { min: 133664, max: 181232, rate: 0.147 },
        { min: 181232, max: Infinity, rate: 0.168 },
      ]},
      AB: { brackets: [
        { min: 0, max: 148269, rate: 0.10 },
        { min: 148269, max: 177922, rate: 0.12 },
        { min: 177922, max: 237230, rate: 0.13 },
        { min: 237230, max: 355845, rate: 0.14 },
        { min: 355845, max: Infinity, rate: 0.15 },
      ]},
    };

    const calculateBracketTax = (taxableIncome: number, brackets: { min: number; max: number; rate: number }[]) => {
      let tax = 0;
      let remaining = taxableIncome;
      for (const bracket of brackets) {
        if (remaining <= 0) break;
        const taxableInBracket = Math.min(remaining, bracket.max - bracket.min);
        tax += taxableInBracket * bracket.rate;
        remaining -= taxableInBracket;
      }
      return tax;
    };

    const basicPersonalAmount = 15705;
    const taxableIncome = Math.max(0, grossIncome - basicPersonalAmount);
    
    const federalTax = calculateBracketTax(taxableIncome, federalBrackets);
    const provincialTax = calculateBracketTax(grossIncome, provincialRates[province]?.brackets || provincialRates.ON.brackets);
    const totalTax = federalTax + provincialTax;
    const takeHome = grossIncome - totalTax;

    const effectiveRate = (totalTax / grossIncome) * 100;
    setResult({
      federalTax,
      provincialTax,
      totalTax,
      takeHome,
      effectiveRate,
    });
    updateAIInsight(
      { grossIncome, province, country: "Canada" },
      { federalTax, provincialTax, totalTax, takeHome, effectiveRate: effectiveRate.toFixed(1) + "%" }
    );
  };

  const faqs = [
    {
      question: "How is Canadian income tax calculated?",
      answer: "Canadian income tax combines federal and provincial taxes. Both use progressive brackets, meaning higher income portions are taxed at higher rates."
    },
  ];

  return (
    <CalculatorLayout
      title="Canada Income Tax Calculator"
      description="Calculate your Canadian federal and provincial income tax for 2024."
      category="finance"
      calculatorId="canada-income-tax"
      howItWorks="Enter your gross income and select your province. The calculator computes both federal and provincial taxes."
      formula="Total Tax = Federal Tax + Provincial Tax"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="income">Annual Gross Income (CAD)</Label>
            <Input id="income" type="number" placeholder="e.g., 80000" value={income} onChange={(e) => setIncome(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label>Province</Label>
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ON">Ontario</SelectItem>
                <SelectItem value="BC">British Columbia</SelectItem>
                <SelectItem value="AB">Alberta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Tax"}
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Take Home Pay</p>
                    <p className="text-3xl font-bold text-green-600">${result.takeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })} CAD</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.takeHome.toFixed(2)} CAD`, "Take Home")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({
                      title: "Canada Income Tax Calculator",
                      inputs: [{ label: "Gross Income", value: `$${income} CAD` }, { label: "Province", value: province }],
                      results: [
                        { label: "Federal Tax", value: `$${result.federalTax.toLocaleString()}` },
                        { label: "Provincial Tax", value: `$${result.provincialTax.toLocaleString()}` },
                        { label: "Take Home", value: `$${result.takeHome.toLocaleString()}` },
                      ],
                    })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground">Federal Tax</p><p className="text-xl font-semibold">${result.federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                  <div><p className="text-sm text-muted-foreground">Provincial Tax</p><p className="text-xl font-semibold">${result.provincialTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                  <div><p className="text-sm text-muted-foreground">Total Tax</p><p className="text-xl font-semibold text-red-600">${result.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                  <div><p className="text-sm text-muted-foreground">Effective Rate</p><p className="text-xl font-semibold">{result.effectiveRate.toFixed(1)}%</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CanadaIncomeTaxCalculator;
