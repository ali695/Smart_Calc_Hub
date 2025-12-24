import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const DebtToIncomeCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyDebts, setMonthlyDebts] = useState("");
  const [result, setResult] = useState<{
    dti: number;
    category: string;
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const income = parseFloat(monthlyIncome);
    const debts = parseFloat(monthlyDebts);

    if (!income || !debts) return;

    const dti = (debts / income) * 100;
    let category = "";

    if (dti <= 20) category = "Excellent - Very low debt burden";
    else if (dti <= 36) category = "Good - Manageable debt level";
    else if (dti <= 43) category = "Fair - May affect loan approval";
    else category = "High - Difficult to qualify for loans";

    setResult({ dti, category });
    updateAIInsight(
      { monthlyIncome: income, monthlyDebts: debts },
      { dtiRatio: dti.toFixed(2) + "%", category }
    );
  };

  const faqs = [
    {
      question: "What is a good debt-to-income ratio?",
      answer: "A DTI of 36% or lower is generally considered good. Most lenders prefer a DTI of 43% or lower for mortgage approval."
    },
    {
      question: "What debts are included in DTI?",
      answer: "Include all monthly debt payments: mortgage/rent, car loans, credit cards, student loans, personal loans, and child support."
    },
    {
      question: "How can I improve my DTI ratio?",
      answer: "Increase your income, pay down existing debts, or avoid taking on new debt. Focus on paying off high-interest debts first."
    }
  ];

  return (
    <CalculatorLayout
      title="Debt-to-Income (DTI) Calculator"
      description="Calculate your debt-to-income ratio to understand your borrowing capacity and financial health."
      howItWorks="Enter your gross monthly income and total monthly debt payments. The calculator determines your DTI ratio and what it means for loan applications."
      formula="DTI = (Total Monthly Debt Payments / Gross Monthly Income) × 100"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="monthlyIncome">Gross Monthly Income ($)</Label>
            <Input
              id="monthlyIncome"
              type="number"
              placeholder="e.g., 5000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
            />
          </div>

          <div>
            <Label htmlFor="monthlyDebts">Total Monthly Debt Payments ($)</Label>
            <Input
              id="monthlyDebts"
              type="number"
              placeholder="e.g., 1500"
              value={monthlyDebts}
              onChange={(e) => setMonthlyDebts(e.target.value)}
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
            "Calculate DTI"
          )}
        </Button>

        {result && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Debt-to-Income Ratio</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">{result.dti.toFixed(2)}%</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Assessment</p>
                    <p className="text-xl font-semibold">{result.category}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`${result.dti.toFixed(2)}%`, "DTI Ratio")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => printCalculation({
                      title: "Debt-to-Income Calculator",
                      inputs: [
                        { label: "Monthly Income", value: `$${monthlyIncome}` },
                        { label: "Monthly Debts", value: `$${monthlyDebts}` }
                      ],
                      results: [
                        { label: "DTI Ratio", value: `${result.dti.toFixed(2)}%` },
                        { label: "Assessment", value: result.category }
                      ],
                      formula: "DTI = (Total Monthly Debt Payments / Gross Monthly Income) × 100"
                    })}
                  >
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default DebtToIncomeCalculator;
