import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const UKIncomeTaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [result, setResult] = useState<{
    taxableIncome: number;
    incomeTax: number;
    nationalInsurance: number;
    totalTax: number;
    takeHome: number;
    effectiveRate: number;
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const grossIncome = parseFloat(income);
    if (!grossIncome || grossIncome <= 0) return;

    // UK 2024/25 Tax Brackets
    const personalAllowance = grossIncome > 100000 ? Math.max(0, 12570 - (grossIncome - 100000) / 2) : 12570;
    const taxableIncome = Math.max(0, grossIncome - personalAllowance);

    let incomeTax = 0;
    // Basic rate: 20% (up to £37,700 of taxable income)
    if (taxableIncome > 0) {
      const basicBand = Math.min(taxableIncome, 37700);
      incomeTax += basicBand * 0.20;
    }
    // Higher rate: 40% (£37,701 to £125,140)
    if (taxableIncome > 37700) {
      const higherBand = Math.min(taxableIncome - 37700, 87440);
      incomeTax += higherBand * 0.40;
    }
    // Additional rate: 45% (over £125,140)
    if (taxableIncome > 125140) {
      incomeTax += (taxableIncome - 125140) * 0.45;
    }

    // National Insurance (Class 1)
    let ni = 0;
    const weeklyIncome = grossIncome / 52;
    if (weeklyIncome > 242) {
      const niableLower = Math.min(weeklyIncome - 242, 725);
      ni += niableLower * 0.08 * 52;
      if (weeklyIncome > 967) {
        ni += (weeklyIncome - 967) * 0.02 * 52;
      }
    }

    const totalTax = incomeTax + ni;
    const takeHome = grossIncome - totalTax;

    setResult({
      taxableIncome,
      incomeTax,
      nationalInsurance: ni,
      totalTax,
      takeHome,
      effectiveRate: (totalTax / grossIncome) * 100,
    });
    
    updateAIInsight(
      { grossIncome },
      { taxableIncome, incomeTax, nationalInsurance: ni, totalTax, takeHome, effectiveRate: (totalTax / grossIncome) * 100 }
    );
  };

  const faqs = [
    {
      question: "What is the UK personal allowance?",
      answer: "The UK personal allowance for 2024/25 is £12,570. This is reduced by £1 for every £2 earned over £100,000."
    },
    {
      question: "What are the UK tax bands?",
      answer: "Basic rate: 20% (£12,571-£50,270), Higher rate: 40% (£50,271-£125,140), Additional rate: 45% (over £125,140)."
    },
  ];

  return (
    <CalculatorLayout
      title="UK Income Tax Calculator"
      description="Calculate your UK income tax and National Insurance for the 2024/25 tax year."
      category="finance"
      calculatorId="uk-income-tax"
      howItWorks="Enter your annual gross income. The calculator applies the personal allowance, income tax bands, and National Insurance contributions."
      formula="Total Tax = Income Tax + National Insurance"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="income">Annual Gross Income (£)</Label>
          <Input
            id="income"
            type="number"
            placeholder="e.g., 50000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, calculate)}
          />
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
                    <p className="text-3xl font-bold text-green-600">£{result.takeHome.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(`£${result.takeHome.toFixed(2)}`, "Take Home Pay")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({
                      title: "UK Income Tax Calculator",
                      inputs: [{ label: "Gross Income", value: `£${income}` }],
                      results: [
                        { label: "Income Tax", value: `£${result.incomeTax.toLocaleString()}` },
                        { label: "National Insurance", value: `£${result.nationalInsurance.toLocaleString()}` },
                        { label: "Total Tax", value: `£${result.totalTax.toLocaleString()}` },
                        { label: "Take Home", value: `£${result.takeHome.toLocaleString()}` },
                      ],
                    })}>
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Income Tax</p>
                    <p className="text-xl font-semibold">£{result.incomeTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">National Insurance</p>
                    <p className="text-xl font-semibold">£{result.nationalInsurance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tax</p>
                    <p className="text-xl font-semibold text-red-600">£{result.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Effective Rate</p>
                    <p className="text-xl font-semibold">{result.effectiveRate.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default UKIncomeTaxCalculator;
