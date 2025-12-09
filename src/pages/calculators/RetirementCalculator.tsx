import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [returnRate, setReturnRate] = useState("7");
  const [result, setResult] = useState<{
    totalSavings: number;
    totalContributions: number;
    totalInterest: number;
  } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const age = parseFloat(currentAge);
    const retAge = parseFloat(retirementAge);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(returnRate) / 100;

    if (!age || !retAge || age >= retAge) return;

    const years = retAge - age;
    const monthlyRate = rate / 12;
    const months = years * 12;

    // Future value of current savings
    const futureValueCurrent = savings * Math.pow(1 + monthlyRate, months);

    // Future value of monthly contributions
    const futureValueContributions = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const total = futureValueCurrent + futureValueContributions;
    const totalContrib = savings + (monthly * months);
    const totalInt = total - totalContrib;

    setResult({
      totalSavings: total,
      totalContributions: totalContrib,
      totalInterest: totalInt
    });

    // Update AI insight
    updateAIInsight(
      { 
        currentAge: age, 
        retirementAge: retAge, 
        yearsToRetirement: years,
        currentSavings: savings, 
        monthlyContribution: monthly, 
        returnRate: parseFloat(returnRate) 
      },
      { 
        totalSavings: total.toFixed(0),
        totalContributions: totalContrib.toFixed(0),
        totalInterest: totalInt.toFixed(0),
        monthlyIncomeAt4Percent: (total * 0.04 / 12).toFixed(0)
      }
    );
  };

  const faqs = [
    {
      question: "How much should I save for retirement?",
      answer: "A common rule is to save 10-15% of your income. Aim for 25x your annual expenses by retirement age."
    },
    {
      question: "What is a good retirement savings rate?",
      answer: "Financial experts recommend aiming for a 7-8% average annual return over the long term through diversified investments."
    },
    {
      question: "When should I start saving for retirement?",
      answer: "The earlier you start, the better. Thanks to compound interest, starting in your 20s can significantly increase your retirement savings."
    }
  ];

  return (
    <CalculatorLayout
      title="Retirement Calculator"
      description="Plan your retirement savings and estimate how much wealth you'll accumulate by retirement age."
      category="finance"
      calculatorId="retirement"
      howItWorks="Enter your current age, planned retirement age, current savings, monthly contributions, and expected annual return rate. The calculator will show your projected retirement savings."
      formula="FV = PV(1 + r)^n + PMT × [((1 + r)^n - 1) / r]"
      faqs={faqs}
      seoTitle="Retirement Calculator - Plan Your Retirement Savings | SmartCalc Hub"
      seoDescription="Free retirement calculator to project your retirement savings. Plan for your future with accurate compound interest calculations."
      keywords="retirement calculator, retirement savings, retirement planning, compound interest, 401k calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currentAge">Current Age</Label>
            <Input
              id="currentAge"
              type="number"
              placeholder="e.g., 30"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="retirementAge">Retirement Age</Label>
            <Input
              id="retirementAge"
              type="number"
              placeholder="e.g., 65"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="currentSavings">Current Savings ($)</Label>
            <Input
              id="currentSavings"
              type="number"
              placeholder="e.g., 50000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              placeholder="e.g., 500"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="returnRate">Annual Return Rate (%)</Label>
            <Input
              id="returnRate"
              type="number"
              step="0.1"
              placeholder="e.g., 7"
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
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
            "Calculate Retirement Savings"
          )}
        </Button>

        {result && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Retirement Savings</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                      ${result.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`$${result.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, "Total Savings")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => printCalculation({
                        title: "Retirement Calculator",
                        inputs: [
                          { label: "Current Age", value: currentAge },
                          { label: "Retirement Age", value: retirementAge },
                          { label: "Current Savings", value: `$${currentSavings}` },
                          { label: "Monthly Contribution", value: `$${monthlyContribution}` },
                          { label: "Return Rate", value: `${returnRate}%` }
                        ],
                        results: [
                          { label: "Total Savings", value: `$${result.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                          { label: "Total Interest", value: `$${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` }
                        ]
                      })}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Contributions</p>
                    <p className="text-xl font-semibold">
                      ${result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Interest Earned</p>
                    <p className="text-xl font-semibold text-green-600">
                      ${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
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

export default RetirementCalculator;
