import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const EMICalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState<{ emi: number; totalPayment: number; totalInterest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100; // Monthly rate
    const n = parseFloat(tenure) * 12; // Total months

    if (p > 0 && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;
      setResult({ emi, totalPayment, totalInterest });
    }
  };

  const faqs = [
    {
      question: "What is EMI?",
      answer: "EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each month. It includes both principal and interest components."
    },
    {
      question: "How is EMI calculated?",
      answer: "EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1], where P is principal, r is monthly interest rate, and n is number of months."
    },
    {
      question: "Can I reduce my EMI?",
      answer: "Yes, you can reduce EMI by making a larger down payment, choosing a longer tenure, or negotiating a lower interest rate with your lender."
    },
    {
      question: "What happens if I miss an EMI payment?",
      answer: "Missing EMI payments can result in late fees, negative credit score impact, and potential legal action from the lender. Always contact your lender if you're facing payment difficulties."
    }
  ];

  return (
    <CalculatorLayout
      title="EMI Calculator"
      description="Calculate your Equated Monthly Installment for loans with accurate results"
      category="finance"
      howItWorks="This calculator determines your monthly loan payment (EMI) based on the loan amount, interest rate, and tenure. The EMI includes both principal and interest portions, distributed over the loan period."
      formula="EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1]"
      faqs={faqs}
      seoTitle="EMI Calculator – Calculate Monthly Loan Payments | SmartCalc Hub"
      seoDescription="Free EMI calculator to compute equated monthly installments for home loans, car loans, and personal loans. Get instant accurate results."
      keywords="emi calculator, loan emi, monthly installment calculator, home loan emi, car loan emi"
      canonicalUrl="https://smartcalchub.com/finance/emi-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Loan Amount ($)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g., 50000"
            />
          </div>

          <div className="space-y-2">
            <Label>Annual Interest Rate (%)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 7.5"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label>Loan Tenure (Years)</Label>
            <Input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="e.g., 5"
            />
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate EMI
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Monthly EMI</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  ${result.emi.toFixed(2)}
                </p>
              </div>
              <div className="pt-4 border-t border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Principal Amount:</span>
                  <span className="font-semibold">${parseFloat(principal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Total Interest:</span>
                  <span className="font-semibold">${result.totalInterest.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2 pt-2 border-t border-border/50">
                  <span className="text-muted-foreground font-semibold">Total Payment:</span>
                  <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                    ${result.totalPayment.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default EMICalculator;
