import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer, Loader2 } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";

const RothIRACalculator = () => {
  const [currentBalance, setCurrentBalance] = useState("");
  const [annualContribution, setAnnualContribution] = useState("7000");
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("65");
  const [expectedReturn, setExpectedReturn] = useState("7");
  const [result, setResult] = useState<{
    futureValue: number;
    totalContributions: number;
    totalGrowth: number;
    taxSavings: number;
  } | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const balance = parseFloat(currentBalance) || 0;
    const contribution = parseFloat(annualContribution);
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const returnRate = parseFloat(expectedReturn) / 100;

    if (!contribution || !age || !retAge || age >= retAge) return;

    const years = retAge - age;
    const monthlyReturn = returnRate / 12;
    const months = years * 12;
    const monthlyContribution = contribution / 12;

    // Calculate future value with monthly compounding
    let futureValue = balance;
    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + monthlyContribution) * (1 + monthlyReturn);
    }

    const totalContributions = contribution * years + balance;
    const totalGrowth = futureValue - totalContributions;
    
    // Estimate tax savings (assuming 22% marginal rate at retirement)
    const taxSavings = totalGrowth * 0.22;

    const resultData = { futureValue, totalContributions, totalGrowth, taxSavings };
    setResult(resultData);

    updateAIInsight(
      { currentBalance: balance, annualContribution: contribution, currentAge: age, retirementAge: retAge, expectedReturn: returnRate * 100 },
      { futureValue, totalContributions, totalGrowth, taxSavings }
    );
  };

  const faqs = [
    {
      question: "What is a Roth IRA?",
      answer: "A Roth IRA is a retirement account where you contribute after-tax money, but all qualified withdrawals in retirement are completely tax-free, including investment gains."
    },
    {
      question: "What's the 2024 Roth IRA contribution limit?",
      answer: "For 2024, you can contribute up to $7,000 per year ($8,000 if you're 50 or older). Income limits apply for contribution eligibility."
    },
    {
      question: "How does Roth IRA compare to Traditional IRA?",
      answer: "Roth IRA contributions are made with after-tax dollars but grow and withdraw tax-free. Traditional IRA contributions may be tax-deductible, but withdrawals are taxed as income."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Roth IRA Calculator",
          description: "Calculate Roth IRA growth and tax-free retirement savings",
          url: "https://smartcalchub.com/calculator/roth-ira"
        }}
      />
      <CalculatorLayout
        title="Roth IRA Calculator"
        description="Calculate your Roth IRA growth and tax-free retirement savings potential."
        category="finance"
        calculatorId="roth-ira-calculator"
        howItWorks="Enter your contribution details and see how your Roth IRA will grow tax-free."
        formula="FV = PV(1+r)^n + PMT × [((1+r)^n - 1) / r]"
        faqs={faqs}
      >
        <div className="space-y-6" ref={printRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="balance">Current Balance ($)</Label>
              <Input
                id="balance"
                type="number"
                placeholder="e.g., 10000"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
              />
            </div>
            <div>
              <Label htmlFor="contribution">Annual Contribution ($)</Label>
              <Input
                id="contribution"
                type="number"
                placeholder="e.g., 7000"
                value={annualContribution}
                onChange={(e) => setAnnualContribution(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Current Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 30"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
              />
            </div>
            <div>
              <Label htmlFor="retAge">Retirement Age</Label>
              <Input
                id="retAge"
                type="number"
                placeholder="e.g., 65"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
              />
            </div>
            <div>
              <Label htmlFor="return">Expected Return (%)</Label>
              <Input
                id="return"
                type="number"
                placeholder="e.g., 7"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={() => handleCalculation(calculate)}
            className="w-full"
            size="lg"
            disabled={isCalculating}
          >
            {isCalculating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              "Calculate Growth"
            )}
          </Button>

          {result && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Future Value at Retirement</p>
                    <p className="text-3xl font-bold text-primary">
                      ${result.futureValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`$${result.futureValue.toFixed(0)}`, "Future Value")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handlePrint}>
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Contributions</p>
                    <p className="text-xl font-semibold">
                      ${result.totalContributions.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tax-Free Growth</p>
                    <p className="text-xl font-semibold text-green-600">
                      ${result.totalGrowth.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Estimated Tax Savings vs. Taxable Account</p>
                  <p className="text-xl font-semibold text-green-600">
                    ~${result.taxSavings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
};

export default RothIRACalculator;
