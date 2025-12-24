import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<{ interest: number; total: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (p > 0 && r > 0 && t > 0) {
      const interest = (p * r * t) / 100;
      const total = p + interest;
      setResult({ interest, total });
    }
  };

  const faqs = [
    {
      question: "What is simple interest?",
      answer: "Simple interest is calculated only on the principal amount of a loan or deposit. It doesn't compound over time, making it easier to calculate than compound interest."
    },
    {
      question: "How is simple interest calculated?",
      answer: "Simple Interest = (Principal × Rate × Time) / 100, where rate is the annual interest rate and time is in years."
    },
    {
      question: "What's the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the principal, while compound interest is calculated on principal plus accumulated interest. Compound interest grows faster over time."
    },
    {
      question: "When is simple interest used?",
      answer: "Simple interest is commonly used in car loans, short-term loans, and some personal loans. It's preferred when transparency and ease of calculation are important."
    }
  ];

  return (
    <CalculatorLayout
      title="Simple Interest Calculator"
      description="Calculate simple interest on loans and investments with principal, rate, and time"
      category="finance"
      howItWorks="This calculator computes simple interest using the formula SI = (P × R × T) / 100, where P is principal, R is annual rate, and T is time in years. Unlike compound interest, simple interest is only calculated on the original principal amount."
      formula="Simple Interest = (Principal × Rate × Time) / 100"
      faqs={faqs}
      seoTitle="Simple Interest Calculator – Calculate Interest Online | SmartCalc Hub"
      seoDescription="Free simple interest calculator to compute interest on loans and investments. Enter principal, rate, and time for instant accurate results."
      keywords="simple interest calculator, interest calculator, loan interest, investment interest, financial calculator"
      canonicalUrl="https://smartcalhub.online/finance/simple-interest-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Principal Amount ($)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g., 10000"
            />
          </div>

          <div className="space-y-2">
            <Label>Annual Interest Rate (%)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 5"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label>Time Period (Years)</Label>
            <Input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 3"
              step="0.5"
            />
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate Interest
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Simple Interest</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  ${result.interest.toFixed(2)}
                </p>
              </div>
              <div className="pt-4 border-t border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Principal Amount:</span>
                  <span className="font-semibold">${parseFloat(principal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Total Interest:</span>
                  <span className="font-semibold">${result.interest.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2 pt-2 border-t border-border/50">
                  <span className="text-muted-foreground font-semibold">Total Amount:</span>
                  <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                    ${result.total.toFixed(2)}
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

export default SimpleInterestCalculator;
