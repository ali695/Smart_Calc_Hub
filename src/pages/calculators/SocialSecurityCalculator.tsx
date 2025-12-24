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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SocialSecurityCalculator = () => {
  const [averageEarnings, setAverageEarnings] = useState("");
  const [retirementAge, setRetirementAge] = useState("67");
  const [result, setResult] = useState<{
    monthlyBenefit: number;
    annualBenefit: number;
    lifetimeBenefit: number;
    adjustmentPercent: number;
  } | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } =
    useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const earnings = parseFloat(averageEarnings);
    const age = parseInt(retirementAge);
    if (!earnings || earnings <= 0) return;

    const bendPoint1 = 1174;
    const bendPoint2 = 7078;

    let pia = 0;
    if (earnings <= bendPoint1) {
      pia = earnings * 0.9;
    } else if (earnings <= bendPoint2) {
      pia = bendPoint1 * 0.9 + (earnings - bendPoint1) * 0.32;
    } else {
      pia = bendPoint1 * 0.9 + (bendPoint2 - bendPoint1) * 0.32 + (earnings - bendPoint2) * 0.15;
    }

    const fullRetirementAge = 67;
    let adjustmentPercent = 0;
    let adjustedBenefit = pia;

    if (age < fullRetirementAge) {
      const monthsEarly = (fullRetirementAge - age) * 12;
      if (monthsEarly <= 36) {
        adjustmentPercent = monthsEarly * (5 / 9);
      } else {
        adjustmentPercent = 36 * (5 / 9) + (monthsEarly - 36) * (5 / 12);
      }
      adjustedBenefit = pia * (1 - adjustmentPercent / 100);
    } else if (age > fullRetirementAge) {
      const monthsDelayed = Math.min((age - fullRetirementAge) * 12, 36);
      adjustmentPercent = monthsDelayed * (2 / 3);
      adjustedBenefit = pia * (1 + adjustmentPercent / 100);
    }

    const monthlyBenefit = Math.round(adjustedBenefit);
    const annualBenefit = monthlyBenefit * 12;
    const lifeExpectancy = 85;
    const yearsReceiving = lifeExpectancy - age;
    const lifetimeBenefit = annualBenefit * yearsReceiving;

    const resultData = { monthlyBenefit, annualBenefit, lifetimeBenefit, adjustmentPercent };
    setResult(resultData);

    updateAIInsight(
      { averageEarnings: earnings, retirementAge: age },
      { monthlyBenefit, annualBenefit, lifetimeBenefit }
    );
  };

  const faqs = [
    {
      question: "How is Social Security calculated?",
      answer:
        "Benefits are based on your 35 highest-earning years, adjusted for inflation. The formula applies different percentages to portions of your average monthly earnings.",
    },
    {
      question: "What is full retirement age?",
      answer:
        "For people born in 1960 or later, full retirement age is 67. You can claim as early as 62 with reduced benefits, or delay until 70 for increased benefits.",
    },
    {
      question: "How much does early retirement reduce benefits?",
      answer:
        "Claiming at 62 instead of 67 reduces benefits by about 30%. Delaying until 70 increases benefits by about 24% (8% per year after full retirement age).",
    },
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "US Social Security Benefits Estimator",
          description: "Estimate your Social Security retirement benefits based on earnings history",
          url: "https://smartcalhub.online/calculator/social-security",
        }}
      />
      <CalculatorLayout
        title="US Social Security Benefits Estimator"
        description="Estimate your Social Security retirement benefits based on average monthly earnings."
        category="finance"
        calculatorId="social-security-calculator"
        howItWorks="Enter your average monthly indexed earnings and planned retirement age."
        formula="PIA = 90% of first $1,174 + 32% of $1,174-$7,078 + 15% above $7,078"
        faqs={faqs}
      >
        <div className="space-y-6">
          <div>
            <Label htmlFor="earnings">Average Monthly Indexed Earnings ($)</Label>
            <Input
              id="earnings"
              type="number"
              placeholder="e.g., 5000"
              value={averageEarnings}
              onChange={(e) => setAverageEarnings(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              className="text-lg"
            />
            <p className="text-sm text-muted-foreground mt-1">
              This is your AIME - average of your 35 highest earning years (monthly)
            </p>
          </div>

          <div>
            <Label>Planned Retirement Age</Label>
            <Select value={retirementAge} onValueChange={setRetirementAge}>
              <SelectTrigger>
                <SelectValue placeholder="Select retirement age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="62">62 (Earliest - Reduced Benefits)</SelectItem>
                <SelectItem value="63">63</SelectItem>
                <SelectItem value="64">64</SelectItem>
                <SelectItem value="65">65</SelectItem>
                <SelectItem value="66">66</SelectItem>
                <SelectItem value="67">67 (Full Retirement Age)</SelectItem>
                <SelectItem value="68">68</SelectItem>
                <SelectItem value="69">69</SelectItem>
                <SelectItem value="70">70 (Maximum Benefits)</SelectItem>
              </SelectContent>
            </Select>
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
              "Estimate Benefits"
            )}
          </Button>

          {result && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Benefit</p>
                    <p className="text-3xl font-bold text-primary">${result.monthlyBenefit.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`$${result.monthlyBenefit}`, "Monthly Benefit")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        printCalculation({
                          title: "US Social Security Benefits Estimator",
                          inputs: [
                            { label: "Average Monthly Earnings (AIME)", value: `$${averageEarnings}` },
                            { label: "Retirement Age", value: retirementAge },
                          ],
                          results: [
                            { label: "Monthly Benefit", value: `$${result.monthlyBenefit}` },
                            { label: "Annual Benefit", value: `$${result.annualBenefit}` },
                            { label: "Lifetime Benefits", value: `$${result.lifetimeBenefit}` },
                          ],
                          formula:
                            "PIA = 90% of first $1,174 + 32% of $1,174-$7,078 + 15% above $7,078",
                        })
                      }
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Benefit</p>
                    <p className="text-xl font-semibold">${result.annualBenefit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adjustment</p>
                    <p className="text-xl font-semibold">
                      {result.adjustmentPercent > 0 ? "+" : ""}
                      {result.adjustmentPercent.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Estimated Lifetime Benefits (to age 85)</p>
                  <p className="text-xl font-semibold text-primary">${result.lifetimeBenefit.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
};

export default SocialSecurityCalculator;
