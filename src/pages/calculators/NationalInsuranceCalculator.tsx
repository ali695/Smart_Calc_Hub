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

const NationalInsuranceCalculator = () => {
  const [income, setIncome] = useState("");
  const [niClass, setNiClass] = useState("class1");
  const [result, setResult] = useState<{
    niContribution: number;
    effectiveRate: number;
    weeklyNI: number;
  } | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } =
    useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const incomeVal = parseFloat(income);
    if (!incomeVal || incomeVal <= 0) return;

    let niContribution = 0;

    if (niClass === "class1") {
      const primaryThreshold = 12570;
      const upperEarningsLimit = 50270;
      const mainRate = 0.08;
      const additionalRate = 0.02;

      if (incomeVal > primaryThreshold) {
        if (incomeVal <= upperEarningsLimit) {
          niContribution = (incomeVal - primaryThreshold) * mainRate;
        } else {
          niContribution =
            (upperEarningsLimit - primaryThreshold) * mainRate +
            (incomeVal - upperEarningsLimit) * additionalRate;
        }
      }
    } else if (niClass === "class2") {
      if (incomeVal > 12570) {
        niContribution = 3.45 * 52;
      }
    } else if (niClass === "class4") {
      const lowerProfitsLimit = 12570;
      const upperProfitsLimit = 50270;
      const mainRate = 0.06;
      const additionalRate = 0.02;

      if (incomeVal > lowerProfitsLimit) {
        if (incomeVal <= upperProfitsLimit) {
          niContribution = (incomeVal - lowerProfitsLimit) * mainRate;
        } else {
          niContribution =
            (upperProfitsLimit - lowerProfitsLimit) * mainRate +
            (incomeVal - upperProfitsLimit) * additionalRate;
        }
      }
    }

    const effectiveRate = incomeVal > 0 ? (niContribution / incomeVal) * 100 : 0;
    const weeklyNI = niContribution / 52;

    const resultData = { niContribution, effectiveRate, weeklyNI };
    setResult(resultData);

    updateAIInsight({ income: incomeVal, niClass }, { niContribution, effectiveRate, weeklyNI });
  };

  const faqs = [
    {
      question: "What is National Insurance?",
      answer:
        "National Insurance is a UK tax on earnings and self-employed profits that funds state benefits including the State Pension and NHS.",
    },
    {
      question: "What are the NI thresholds for 2024/25?",
      answer:
        "The primary threshold is £12,570 per year. You pay 8% on earnings between £12,570 and £50,270, then 2% on earnings above £50,270.",
    },
    {
      question: "What's the difference between Class 1, 2, and 4?",
      answer:
        "Class 1 is for employees, Class 2 is a flat weekly rate for self-employed (£3.45/week), and Class 4 is percentage-based on self-employed profits.",
    },
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "UK National Insurance Calculator",
          description: "Calculate UK National Insurance contributions for Class 1, 2, and 4",
          url: "https://smartcalchub.com/calculator/national-insurance",
        }}
      />
      <CalculatorLayout
        title="UK National Insurance Calculator"
        description="Calculate your National Insurance contributions for 2024/25 tax year."
        category="finance"
        calculatorId="national-insurance-calculator"
        howItWorks="Enter your annual earnings and select your NI class to calculate contributions."
        formula="Class 1: 8% on £12,570-£50,270 + 2% above £50,270"
        faqs={faqs}
      >
        <div className="space-y-6">
          <div>
            <Label htmlFor="income">Annual Earnings (£)</Label>
            <Input
              id="income"
              type="number"
              placeholder="e.g., 45000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              className="text-lg"
            />
          </div>

          <div>
            <Label>NI Class</Label>
            <Select value={niClass} onValueChange={setNiClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select NI class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="class1">Class 1 (Employee)</SelectItem>
                <SelectItem value="class2">Class 2 (Self-Employed Flat Rate)</SelectItem>
                <SelectItem value="class4">Class 4 (Self-Employed Profits)</SelectItem>
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
              "Calculate NI"
            )}
          </Button>

          {result && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Annual NI Contribution</p>
                    <p className="text-3xl font-bold text-primary">£{result.niContribution.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`£${result.niContribution.toFixed(2)}`, "NI Contribution")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        printCalculation({
                          title: "UK National Insurance Calculator",
                          inputs: [
                            { label: "Annual Earnings", value: `£${income}` },
                            { label: "NI Class", value: niClass },
                          ],
                          results: [
                            { label: "Annual NI", value: `£${result.niContribution.toFixed(2)}` },
                            { label: "Weekly NI", value: `£${result.weeklyNI.toFixed(2)}` },
                            { label: "Effective Rate", value: `${result.effectiveRate.toFixed(2)}%` },
                          ],
                        })
                      }
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Weekly NI</p>
                    <p className="text-xl font-semibold">£{result.weeklyNI.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Effective Rate</p>
                    <p className="text-xl font-semibold">{result.effectiveRate.toFixed(2)}%</p>
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

export default NationalInsuranceCalculator;
