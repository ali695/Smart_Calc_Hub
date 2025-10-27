import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const LTVCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [result, setResult] = useState<{
    ltv: number;
    category: string;
  } | null>(null);

  const calculate = () => {
    const loan = parseFloat(loanAmount);
    const value = parseFloat(propertyValue);

    if (!loan || !value) return;

    const ltv = (loan / value) * 100;
    let category = "";

    if (ltv <= 80) category = "Excellent - No PMI required";
    else if (ltv <= 90) category = "Good - PMI may be required";
    else if (ltv <= 95) category = "Fair - Higher interest rates likely";
    else category = "High Risk - Difficult to qualify";

    setResult({ ltv, category });
  };

  const faqs = [
    {
      question: "What is LTV ratio?",
      answer: "Loan-to-Value (LTV) ratio is the percentage of the property value that you're borrowing. It's calculated by dividing the loan amount by the property value."
    },
    {
      question: "What is a good LTV ratio?",
      answer: "An LTV of 80% or lower is considered excellent and typically doesn't require private mortgage insurance (PMI)."
    },
    {
      question: "How does LTV affect my mortgage?",
      answer: "Lower LTV ratios usually result in better interest rates and terms. High LTV ratios may require PMI and result in higher interest rates."
    }
  ];

  return (
    <CalculatorLayout
      title="Loan-to-Value (LTV) Calculator"
      description="Calculate your loan-to-value ratio to understand your mortgage terms and requirements."
      howItWorks="Enter your loan amount and property value. The calculator will determine your LTV ratio and what it means for your mortgage."
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
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full" size="lg">
          Calculate LTV
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Loan-to-Value Ratio</p>
                  <p className="text-3xl font-bold text-primary">{result.ltv.toFixed(2)}%</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
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

export default LTVCalculator;
