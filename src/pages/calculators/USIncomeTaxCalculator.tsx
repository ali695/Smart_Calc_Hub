import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CalculatorChart, generateBreakdownData } from "@/components/CalculatorChart";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { useRegion } from "@/contexts/RegionContext";
import { Copy, Loader2, Printer } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const USIncomeTaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState("single");
  const [result, setResult] = useState<{
    taxableIncome: number;
    federalTax: number;
    effectiveRate: number;
    marginalRate: number;
    takeHomePay: number;
    brackets: { bracket: string; tax: number }[];
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();
  const { formatCurrency } = useRegion();

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
    let marginalRate = 0;
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
        marginalRate = bracket.rate;
      }
      totalTax += taxInBracket;
      remainingIncome -= taxableInBracket;
    }

    const calculatedResult = {
      taxableIncome,
      federalTax: totalTax,
      effectiveRate: (totalTax / grossIncome) * 100,
      marginalRate: marginalRate * 100,
      takeHomePay: grossIncome - totalTax,
      brackets: bracketDetails,
    };

    setResult(calculatedResult);

    // Update AI insight with calculation data
    updateAIInsight(
      { 
        grossIncome: grossIncome, 
        filingStatus: filingStatus,
        standardDeduction: standardDeduction 
      },
      { 
        taxableIncome: calculatedResult.taxableIncome,
        federalTax: calculatedResult.federalTax.toFixed(2),
        effectiveRate: calculatedResult.effectiveRate.toFixed(2) + "%",
        marginalRate: calculatedResult.marginalRate.toFixed(0) + "%",
        takeHomePay: calculatedResult.takeHomePay.toFixed(2),
        taxByBracket: bracketDetails
      }
    );
  };

  const faqs = [
    {
      question: "How does US federal income tax work?",
      answer: "US federal income tax uses a progressive bracket system. Your income is taxed at increasing rates as it moves through different brackets. For example, in 2024, the first $11,600 of taxable income for single filers is taxed at 10%, the next portion up to $47,150 at 12%, and so on up to 37% for income over $609,350."
    },
    {
      question: "What is the standard deduction for 2024?",
      answer: "For 2024, the standard deduction is $14,600 for single filers and $29,200 for married couples filing jointly. This amount is subtracted from your gross income before calculating your tax liability."
    },
    {
      question: "What's the difference between marginal and effective tax rate?",
      answer: "Your marginal tax rate is the rate applied to your last dollar of income (your highest bracket). Your effective tax rate is your total tax divided by your gross income, representing the average rate you actually pay across all your income."
    },
    {
      question: "Does this calculator include state taxes?",
      answer: "No, this calculator only calculates federal income tax. State income taxes vary by state and are calculated separately. Some states have no income tax while others have rates up to 13%."
    },
  ];

  return (
    <CalculatorLayout
      title="US Income Tax Calculator"
      description="Calculate your US federal income tax based on 2024 tax brackets and filing status."
      seoTitle="US Income Tax Calculator 2024 - Federal Tax Estimator | SmartCalc Hub"
      seoDescription="Free US income tax calculator for 2024. Calculate federal income tax, effective rate, and take-home pay based on your filing status. Accurate 2024 tax brackets."
      keywords="us income tax calculator, federal tax calculator, 2024 tax brackets, tax estimator, take home pay calculator, effective tax rate"
      canonicalUrl="https://smartcalhub.online/calculator/us-income-tax"
      category="finance"
      calculatorId="us-income-tax"
      howItWorks="Enter your annual gross income and select your filing status. The calculator applies the 2024 standard deduction and calculates your tax using the current federal tax brackets. It shows your taxable income, total federal tax, effective rate, marginal rate, and estimated take-home pay."
      formula="Tax = Sum of (Income in each bracket × Bracket rate). Effective Rate = Total Tax ÷ Gross Income × 100"
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
          <>
            <Card className="bg-primary/5 border-primary animate-fade-in">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Federal Tax Owed</p>
                      <p className="text-3xl font-bold text-primary">{formatCurrency(result.federalTax)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(formatCurrency(result.federalTax), "Federal Tax")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => printCalculation({
                        title: "US Income Tax Calculator",
                        inputs: [
                          { label: "Gross Income", value: formatCurrency(parseFloat(income)) }, 
                          { label: "Filing Status", value: filingStatus === "single" ? "Single" : "Married Filing Jointly" }
                        ],
                        results: [
                          { label: "Taxable Income", value: formatCurrency(result.taxableIncome) },
                          { label: "Federal Tax", value: formatCurrency(result.federalTax) },
                          { label: "Effective Rate", value: `${result.effectiveRate.toFixed(2)}%` },
                          { label: "Marginal Rate", value: `${result.marginalRate.toFixed(0)}%` },
                          { label: "Take-Home Pay", value: formatCurrency(result.takeHomePay) },
                        ],
                        formula: "Tax = Sum of (Income in each bracket × Bracket rate)"
                      })}>
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Taxable Income</p>
                      <p className="text-lg font-semibold">{formatCurrency(result.taxableIncome)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Effective Rate</p>
                      <p className="text-lg font-semibold">{result.effectiveRate.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Marginal Rate</p>
                      <p className="text-lg font-semibold">{result.marginalRate.toFixed(0)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Take-Home Pay</p>
                      <p className="text-lg font-semibold text-green-600">{formatCurrency(result.takeHomePay)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Breakdown Chart */}
            <CalculatorChart
              chartType="pie"
              data={[
                { name: "Take-Home Pay", value: result.takeHomePay },
                { name: "Federal Tax", value: result.federalTax }
              ]}
              title="Income Distribution"
              category="finance"
              valueFormatter={(v) => formatCurrency(v)}
            />

            {/* Tax by Bracket Chart */}
            {result.brackets.length > 0 && (
              <CalculatorChart
                chartType="bar"
                data={result.brackets.map(b => ({
                  name: b.bracket,
                  value: b.tax
                }))}
                title="Tax by Bracket"
                category="finance"
                valueFormatter={(v) => formatCurrency(v)}
              />
            )}
          </>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default USIncomeTaxCalculator;
