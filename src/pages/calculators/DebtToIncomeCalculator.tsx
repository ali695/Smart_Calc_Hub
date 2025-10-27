import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const DebtToIncomeCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyDebts, setMonthlyDebts] = useState("");
  const [result, setResult] = useState<{
    dti: number;
    category: string;
  } | null>(null);

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
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full" size="lg">
          Calculate DTI
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Debt-to-Income Ratio</p>
                  <p className="text-3xl font-bold text-primary">{result.dti.toFixed(2)}%</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Assessment</p>
                  <p className="text-xl font-semibold">{result.category}</p>
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
