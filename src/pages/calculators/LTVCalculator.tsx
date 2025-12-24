import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CalculatorChart, generateComparisonData } from "@/components/CalculatorChart";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const LTVCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [result, setResult] = useState<{
    ltv: number;
    category: string;
    equity: number;
    equityPercent: number;
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const loan = parseFloat(loanAmount);
    const value = parseFloat(propertyValue);

    if (!loan || !value || value <= 0) return;

    const ltv = (loan / value) * 100;
    const equity = value - loan;
    const equityPercent = 100 - ltv;
    let category = "";

    if (ltv <= 80) category = "Excellent - No PMI required";
    else if (ltv <= 90) category = "Good - PMI may be required";
    else if (ltv <= 95) category = "Fair - Higher interest rates likely";
    else category = "High Risk - Difficult to qualify";

    setResult({ ltv, category, equity, equityPercent });

    // Update AI insight
    updateAIInsight(
      { 
        loanAmount: loan, 
        propertyValue: value 
      },
      { 
        ltv: ltv.toFixed(2) + "%",
        category,
        equity: equity.toFixed(0),
        equityPercent: equityPercent.toFixed(2) + "%",
        pmiRequired: ltv > 80 ? "Yes" : "No"
      }
    );
  };

  const chartData = result ? generateComparisonData([
    { name: "Loan Amount", value: parseFloat(loanAmount) || 0 },
    { name: "Equity", value: result.equity }
  ]) : [];

  const pieData = result ? [
    { name: "Loan", value: parseFloat(loanAmount) || 0 },
    { name: "Equity", value: result.equity }
  ] : [];

  const faqs = [
    {
      question: "What is LTV ratio?",
      answer: "Loan-to-Value (LTV) ratio is the percentage of the property value that you're borrowing. It's calculated by dividing the loan amount by the property value. Lenders use this to assess mortgage risk."
    },
    {
      question: "What is a good LTV ratio?",
      answer: "An LTV of 80% or lower is considered excellent and typically doesn't require private mortgage insurance (PMI). Lower LTV ratios generally qualify for better interest rates."
    },
    {
      question: "How does LTV affect my mortgage?",
      answer: "Lower LTV ratios usually result in better interest rates and terms. High LTV ratios may require PMI and result in higher interest rates, increasing your monthly payments."
    },
    {
      question: "How can I lower my LTV ratio?",
      answer: "You can lower your LTV by making a larger down payment, paying down your loan principal faster, or waiting for your property value to increase through appreciation or improvements."
    },
    {
      question: "What is private mortgage insurance (PMI)?",
      answer: "PMI is insurance that protects the lender if you default on your loan. It's typically required when your LTV exceeds 80%. Once your LTV drops below 80%, you can usually request PMI removal."
    }
  ];

  return (
    <CalculatorLayout
      title="Loan-to-Value (LTV) Calculator"
      description="Calculate your loan-to-value ratio to understand your mortgage terms and requirements."
      seoTitle="LTV Calculator - Loan-to-Value Ratio Calculator | SmartCalc Hub"
      seoDescription="Free LTV calculator to determine your loan-to-value ratio. Understand PMI requirements and get better mortgage terms with our easy-to-use calculator."
      keywords="LTV calculator, loan to value ratio, mortgage calculator, PMI calculator, home equity, down payment calculator"
      canonicalUrl="https://smartcalhub.online/calculator/ltv"
      category="real-estate"
      calculatorId="ltv"
      howItWorks="Enter your loan amount and property value. The calculator will determine your LTV ratio and what it means for your mortgage, including PMI requirements and equity position."
      formula="LTV = (Loan Amount / Property Value) × 100"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="loanAmount">Loan Amount ($)</Label>
            <Input
              id="loanAmount"
              type="number"
              placeholder="e.g., 240000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
            />
          </div>

          <div>
            <Label htmlFor="propertyValue">Property Value ($)</Label>
            <Input
              id="propertyValue"
              type="number"
              placeholder="e.g., 300000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
            />
          </div>
        </div>

        <Button 
          type="button"
          onClick={() => handleCalculation(calculate)} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" 
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate LTV"
          )}
        </Button>

        {result && (
          <>
            <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Loan-to-Value Ratio</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">{result.ltv.toFixed(2)}%</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(`${result.ltv.toFixed(2)}%`, "LTV Ratio")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => printCalculation({
                          title: "LTV Calculator",
                          inputs: [
                            { label: "Loan Amount", value: `$${parseFloat(loanAmount).toLocaleString()}` },
                            { label: "Property Value", value: `$${parseFloat(propertyValue).toLocaleString()}` }
                          ],
                          results: [
                            { label: "LTV Ratio", value: `${result.ltv.toFixed(2)}%` },
                            { label: "Equity", value: `$${result.equity.toLocaleString()}` },
                            { label: "Category", value: result.category }
                          ]
                        })}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Your Equity</p>
                      <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                        ${result.equity.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">{result.equityPercent.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">PMI Required?</p>
                      <p className={`text-xl font-semibold ${result.ltv > 80 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                        {result.ltv > 80 ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="text-lg font-semibold">{result.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart visualization */}
            <CalculatorChart
              title="Loan vs. Equity Breakdown"
              data={pieData}
              chartType="pie"
              category="real-estate"
              valueFormatter={(v) => `$${v.toLocaleString()}`}
            />
          </>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default LTVCalculator;
