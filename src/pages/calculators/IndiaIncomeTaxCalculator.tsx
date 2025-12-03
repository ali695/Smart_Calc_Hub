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

const IndiaIncomeTaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [regime, setRegime] = useState("new");
  const [result, setResult] = useState<{
    taxableIncome: number;
    incomeTax: number;
    cess: number;
    totalTax: number;
    takeHome: number;
    effectiveRate: number;
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const grossIncome = parseFloat(income);
    if (!grossIncome || grossIncome <= 0) return;

    let incomeTax = 0;
    
    if (regime === "new") {
      // New Tax Regime 2024-25
      if (grossIncome <= 300000) {
        incomeTax = 0;
      } else if (grossIncome <= 700000) {
        incomeTax = (grossIncome - 300000) * 0.05;
      } else if (grossIncome <= 1000000) {
        incomeTax = 20000 + (grossIncome - 700000) * 0.10;
      } else if (grossIncome <= 1200000) {
        incomeTax = 50000 + (grossIncome - 1000000) * 0.15;
      } else if (grossIncome <= 1500000) {
        incomeTax = 80000 + (grossIncome - 1200000) * 0.20;
      } else {
        incomeTax = 140000 + (grossIncome - 1500000) * 0.30;
      }
      // Rebate u/s 87A (up to ₹7 lakh income)
      if (grossIncome <= 700000) incomeTax = 0;
    } else {
      // Old Tax Regime
      if (grossIncome <= 250000) {
        incomeTax = 0;
      } else if (grossIncome <= 500000) {
        incomeTax = (grossIncome - 250000) * 0.05;
      } else if (grossIncome <= 1000000) {
        incomeTax = 12500 + (grossIncome - 500000) * 0.20;
      } else {
        incomeTax = 112500 + (grossIncome - 1000000) * 0.30;
      }
      // Rebate u/s 87A (up to ₹5 lakh income)
      if (grossIncome <= 500000) incomeTax = 0;
    }

    // Health & Education Cess (4%)
    const cess = incomeTax * 0.04;
    const totalTax = incomeTax + cess;
    const takeHome = grossIncome - totalTax;

    setResult({
      taxableIncome: grossIncome,
      incomeTax,
      cess,
      totalTax,
      takeHome,
      effectiveRate: (totalTax / grossIncome) * 100,
    });
  };

  const faqs = [
    {
      question: "What is the difference between old and new tax regime in India?",
      answer: "The new regime has lower tax rates but fewer deductions. The old regime allows various deductions under sections 80C, 80D, etc."
    },
    {
      question: "What is the rebate under section 87A?",
      answer: "Section 87A provides a rebate for individuals earning up to ₹7 lakh (new regime) or ₹5 lakh (old regime), making their tax liability zero."
    },
  ];

  return (
    <CalculatorLayout
      title="India Income Tax Calculator"
      description="Calculate your Indian income tax for FY 2024-25 under both old and new tax regimes."
      category="finance"
      calculatorId="india-income-tax"
      howItWorks="Enter your annual income and select tax regime. The calculator applies the applicable slabs and 4% cess."
      formula="Total Tax = Income Tax + Health & Education Cess (4%)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="income">Annual Gross Income (₹)</Label>
            <Input id="income" type="number" placeholder="e.g., 1200000" value={income} onChange={(e) => setIncome(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label>Tax Regime</Label>
            <Select value={regime} onValueChange={setRegime}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Regime (2024-25)</SelectItem>
                <SelectItem value="old">Old Regime</SelectItem>
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
                    <p className="text-3xl font-bold text-green-600">₹{result.takeHome.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(`₹${result.takeHome.toLocaleString('en-IN')}`, "Take Home")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({
                      title: "India Income Tax Calculator",
                      inputs: [{ label: "Gross Income", value: `₹${income}` }, { label: "Regime", value: regime }],
                      results: [
                        { label: "Income Tax", value: `₹${result.incomeTax.toLocaleString('en-IN')}` },
                        { label: "Cess (4%)", value: `₹${result.cess.toLocaleString('en-IN')}` },
                        { label: "Take Home", value: `₹${result.takeHome.toLocaleString('en-IN')}` },
                      ],
                    })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground">Income Tax</p><p className="text-xl font-semibold">₹{result.incomeTax.toLocaleString('en-IN')}</p></div>
                  <div><p className="text-sm text-muted-foreground">Health & Education Cess</p><p className="text-xl font-semibold">₹{result.cess.toLocaleString('en-IN')}</p></div>
                  <div><p className="text-sm text-muted-foreground">Total Tax</p><p className="text-xl font-semibold text-red-600">₹{result.totalTax.toLocaleString('en-IN')}</p></div>
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

export default IndiaIncomeTaxCalculator;
