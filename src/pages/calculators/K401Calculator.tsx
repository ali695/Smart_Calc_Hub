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

const K401Calculator = () => {
  const [currentBalance, setCurrentBalance] = useState("");
  const [salary, setSalary] = useState("");
  const [contributionPercent, setContributionPercent] = useState("10");
  const [employerMatch, setEmployerMatch] = useState("50");
  const [matchLimit, setMatchLimit] = useState("6");
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("65");
  const [expectedReturn, setExpectedReturn] = useState("7");
  const [result, setResult] = useState<{
    futureValue: number;
    totalContributions: number;
    employerContributions: number;
    investmentGrowth: number;
  } | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } =
    useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const balance = parseFloat(currentBalance) || 0;
    const salaryVal = parseFloat(salary);
    const contribPct = parseFloat(contributionPercent) / 100;
    const matchPct = parseFloat(employerMatch) / 100;
    const matchLimitPct = parseFloat(matchLimit) / 100;
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const returnRate = parseFloat(expectedReturn) / 100;

    if (!salaryVal || !age || !retAge || age >= retAge) return;

    const years = retAge - age;

    const annualContribution = Math.min(salaryVal * contribPct, 23000);
    const matchableContribution = Math.min(salaryVal * contribPct, salaryVal * matchLimitPct);
    const annualEmployerMatch = matchableContribution * matchPct;

    const totalAnnualContrib = annualContribution + annualEmployerMatch;
    const monthlyContrib = totalAnnualContrib / 12;
    const monthlyReturn = returnRate / 12;
    const months = years * 12;

    let futureValue = balance;
    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + monthlyContrib) * (1 + monthlyReturn);
    }

    const totalContributions = annualContribution * years;
    const employerContributions = annualEmployerMatch * years;
    const investmentGrowth = futureValue - balance - totalContributions - employerContributions;

    const resultData = { futureValue, totalContributions, employerContributions, investmentGrowth };
    setResult(resultData);

    updateAIInsight(
      {
        salary: salaryVal,
        contributionPercent: contribPct * 100,
        employerMatch: matchPct * 100,
        currentAge: age,
        retirementAge: retAge,
      },
      { futureValue, totalContributions, employerContributions, investmentGrowth }
    );
  };

  const faqs = [
    {
      question: "What is a 401(k)?",
      answer:
        "A 401(k) is an employer-sponsored retirement plan that lets you save and invest part of your paycheck before taxes are taken out. Many employers match a portion of your contributions.",
    },
    {
      question: "What's the 2024 401(k) contribution limit?",
      answer:
        "For 2024, you can contribute up to $23,000 ($30,500 if you're 50 or older with catch-up contributions). Employer matches don't count toward your limit.",
    },
    {
      question: "What is an employer match?",
      answer:
        "An employer match is when your company contributes to your 401(k) based on how much you contribute. A common formula is 50% match up to 6% of salary.",
    },
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "401(k) Calculator",
          description: "Calculate 401(k) retirement savings growth with employer matching",
          url: "https://smartcalchub.com/calculator/401k",
        }}
      />
      <CalculatorLayout
        title="401(k) Retirement Calculator"
        description="Calculate your 401(k) growth including employer matching contributions."
        category="finance"
        calculatorId="401k-calculator"
        howItWorks="Enter your salary, contribution rate, and employer match to project retirement savings."
        formula="FV = PV(1+r)^n + (Employee + Employer) × [((1+r)^n - 1) / r]"
        faqs={faqs}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="balance">Current 401(k) Balance ($)</Label>
              <Input
                id="balance"
                type="number"
                placeholder="e.g., 50000"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
              />
            </div>
            <div>
              <Label htmlFor="salary">Annual Salary ($)</Label>
              <Input
                id="salary"
                type="number"
                placeholder="e.g., 75000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="contrib">Your Contribution (%)</Label>
              <Input
                id="contrib"
                type="number"
                placeholder="e.g., 10"
                value={contributionPercent}
                onChange={(e) => setContributionPercent(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
              />
            </div>
            <div>
              <Label htmlFor="match">Employer Match (%)</Label>
              <Input
                id="match"
                type="number"
                placeholder="e.g., 50"
                value={employerMatch}
                onChange={(e) => setEmployerMatch(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
              />
            </div>
            <div>
              <Label htmlFor="limit">Match Limit (% of salary)</Label>
              <Input
                id="limit"
                type="number"
                placeholder="e.g., 6"
                value={matchLimit}
                onChange={(e) => setMatchLimit(e.target.value)}
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
              "Calculate 401(k) Growth"
            )}
          </Button>

          {result && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Projected 401(k) Balance</p>
                    <p className="text-3xl font-bold text-primary">
                      ${result.futureValue.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`$${result.futureValue.toFixed(0)}`, "Balance")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        printCalculation({
                          title: "401(k) Retirement Calculator",
                          inputs: [
                            { label: "Salary", value: `$${salary}` },
                            { label: "Your Contribution", value: `${contributionPercent}%` },
                            { label: "Employer Match", value: `${employerMatch}% up to ${matchLimit}%` },
                            { label: "Current Age", value: currentAge },
                            { label: "Retirement Age", value: retirementAge },
                            { label: "Expected Return", value: `${expectedReturn}%` },
                          ],
                          results: [
                            { label: "Projected Balance", value: `$${result.futureValue.toFixed(0)}` },
                            { label: "Your Contributions", value: `$${result.totalContributions.toFixed(0)}` },
                            { label: "Employer Contributions", value: `$${result.employerContributions.toFixed(0)}` },
                            { label: "Investment Growth", value: `$${result.investmentGrowth.toFixed(0)}` },
                          ],
                          formula: "FV = PV(1+r)^n + (Employee + Employer) × [((1+r)^n - 1) / r]",
                        })
                      }
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Contributions</p>
                    <p className="text-lg font-semibold">
                      ${result.totalContributions.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Employer Match</p>
                    <p className="text-lg font-semibold text-green-600">
                      ${result.employerContributions.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Investment Growth</p>
                    <p className="text-lg font-semibold text-primary">
                      ${result.investmentGrowth.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
};

export default K401Calculator;
