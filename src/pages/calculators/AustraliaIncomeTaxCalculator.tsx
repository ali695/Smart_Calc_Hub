import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const AustraliaIncomeTaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [result, setResult] = useState<{
    incomeTax: number;
    medicareLevy: number;
    totalTax: number;
    takeHome: number;
    effectiveRate: number;
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const grossIncome = parseFloat(income);
    if (!grossIncome || grossIncome <= 0) return;

    // 2024-25 Australian Tax Brackets (Resident)
    let incomeTax = 0;
    if (grossIncome <= 18200) {
      incomeTax = 0;
    } else if (grossIncome <= 45000) {
      incomeTax = (grossIncome - 18200) * 0.16;
    } else if (grossIncome <= 135000) {
      incomeTax = 4288 + (grossIncome - 45000) * 0.30;
    } else if (grossIncome <= 190000) {
      incomeTax = 31288 + (grossIncome - 135000) * 0.37;
    } else {
      incomeTax = 51638 + (grossIncome - 190000) * 0.45;
    }

    // Medicare Levy (2%)
    const medicareLevy = grossIncome > 24276 ? grossIncome * 0.02 : 0;
    const totalTax = incomeTax + medicareLevy;
    const takeHome = grossIncome - totalTax;

    const effectiveRate = (totalTax / grossIncome) * 100;
    setResult({
      incomeTax,
      medicareLevy,
      totalTax,
      takeHome,
      effectiveRate,
    });
    updateAIInsight(
      { grossIncome, country: "Australia" },
      { incomeTax, medicareLevy, totalTax, takeHome, effectiveRate: effectiveRate.toFixed(1) + "%" }
    );
  };

  const faqs = [
    {
      question: "What is the tax-free threshold in Australia?",
      answer: "The tax-free threshold is $18,200. If you earn less than this, you don't pay any income tax."
    },
    {
      question: "What is the Medicare levy?",
      answer: "The Medicare levy is 2% of your taxable income and funds Australia's public health system."
    },
  ];

  return (
    <CalculatorLayout
      title="Australia Income Tax Calculator"
      description="Calculate your Australian income tax and Medicare levy for 2024-25."
      category="finance"
      calculatorId="australia-income-tax"
      howItWorks="Enter your annual income. The calculator applies the tax-free threshold and 2024-25 tax rates plus the Medicare levy."
      formula="Total Tax = Income Tax + Medicare Levy (2%)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="income">Annual Gross Income (AUD)</Label>
          <Input id="income" type="number" placeholder="e.g., 90000" value={income} onChange={(e) => setIncome(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
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
                    <p className="text-3xl font-bold text-green-600">${result.takeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })} AUD</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.takeHome.toFixed(2)} AUD`, "Take Home")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({
                      title: "Australia Income Tax Calculator",
                      inputs: [{ label: "Gross Income", value: `$${income} AUD` }],
                      results: [
                        { label: "Income Tax", value: `$${result.incomeTax.toLocaleString()}` },
                        { label: "Medicare Levy", value: `$${result.medicareLevy.toLocaleString()}` },
                        { label: "Take Home", value: `$${result.takeHome.toLocaleString()}` },
                      ],
                    })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground">Income Tax</p><p className="text-xl font-semibold">${result.incomeTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                  <div><p className="text-sm text-muted-foreground">Medicare Levy</p><p className="text-xl font-semibold">${result.medicareLevy.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
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

export default AustraliaIncomeTaxCalculator;
