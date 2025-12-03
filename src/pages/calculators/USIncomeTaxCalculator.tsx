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

const USIncomeTaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState("single");
  const [result, setResult] = useState<{
    taxableIncome: number;
    federalTax: number;
    effectiveRate: number;
    brackets: { bracket: string; tax: number }[];
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const grossIncome = parseFloat(income);
    if (!grossIncome || grossIncome <= 0) return;

    // 2024 Tax Brackets
    const brackets = {
      single: [
        { min: 0, max: 11600, rate: 0.10 },
        { min: 11600, max: 47150, rate: 0.12 },
        { min: 47150, max: 100525, rate: 0.22 },
        { min: 100525, max: 191950, rate: 0.24 },
        { min: 191950, max: 243725, rate: 0.32 },
        { min: 243725, max: 609350, rate: 0.35 },
        { min: 609350, max: Infinity, rate: 0.37 },
      ],
      married: [
        { min: 0, max: 23200, rate: 0.10 },
        { min: 23200, max: 94300, rate: 0.12 },
        { min: 94300, max: 201050, rate: 0.22 },
        { min: 201050, max: 383900, rate: 0.24 },
        { min: 383900, max: 487450, rate: 0.32 },
        { min: 487450, max: 731200, rate: 0.35 },
        { min: 731200, max: Infinity, rate: 0.37 },
      ],
    };

    const standardDeduction = filingStatus === "single" ? 14600 : 29200;
    const taxableIncome = Math.max(0, grossIncome - standardDeduction);
    
    let totalTax = 0;
    const bracketDetails: { bracket: string; tax: number }[] = [];
    const selectedBrackets = filingStatus === "single" ? brackets.single : brackets.married;
    
    let remainingIncome = taxableIncome;
    for (const bracket of selectedBrackets) {
      if (remainingIncome <= 0) break;
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      const taxInBracket = taxableInBracket * bracket.rate;
      if (taxInBracket > 0) {
        bracketDetails.push({
          bracket: `${(bracket.rate * 100).toFixed(0)}%`,
          tax: taxInBracket,
        });
      }
      totalTax += taxInBracket;
      remainingIncome -= taxableInBracket;
    }

    setResult({
      taxableIncome,
      federalTax: totalTax,
      effectiveRate: (totalTax / grossIncome) * 100,
      brackets: bracketDetails,
    });
  };

  const faqs = [
    {
      question: "How does US federal income tax work?",
      answer: "US federal income tax uses a progressive bracket system. Income is taxed at increasing rates as it moves through different brackets."
    },
    {
      question: "What is the standard deduction for 2024?",
      answer: "For 2024, the standard deduction is $14,600 for single filers and $29,200 for married filing jointly."
    },
  ];

  return (
    <CalculatorLayout
      title="US Income Tax Calculator"
      description="Calculate your US federal income tax based on 2024 tax brackets and filing status."
      category="finance"
      calculatorId="us-income-tax"
      howItWorks="Enter your gross income and select your filing status. The calculator applies the standard deduction and calculates tax using 2024 federal brackets."
      formula="Tax = Sum of (Income in each bracket × Bracket rate)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="income">Annual Gross Income ($)</Label>
            <Input
              id="income"
              type="number"
              placeholder="e.g., 75000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
            />
          </div>
          <div>
            <Label htmlFor="status">Filing Status</Label>
            <Select value={filingStatus} onValueChange={setFilingStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married Filing Jointly</SelectItem>
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
                    <p className="text-sm text-muted-foreground">Federal Tax Owed</p>
                    <p className="text-3xl font-bold text-primary">${result.federalTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.federalTax.toFixed(2)}`, "Federal Tax")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({
                      title: "US Income Tax Calculator",
                      inputs: [{ label: "Gross Income", value: `$${income}` }, { label: "Filing Status", value: filingStatus }],
                      results: [
                        { label: "Taxable Income", value: `$${result.taxableIncome.toLocaleString()}` },
                        { label: "Federal Tax", value: `$${result.federalTax.toLocaleString()}` },
                        { label: "Effective Rate", value: `${result.effectiveRate.toFixed(2)}%` },
                      ],
                    })}>
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Taxable Income</p>
                    <p className="text-xl font-semibold">${result.taxableIncome.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Effective Rate</p>
                    <p className="text-xl font-semibold">{result.effectiveRate.toFixed(2)}%</p>
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

export default USIncomeTaxCalculator;
