import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SquareRootCalculator = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const n = parseFloat(number);
    if (n >= 0) {
      setResult(Math.sqrt(n));
    }
  };

  const faqs = [
    {
      question: "What is a square root?",
      answer: "A square root of a number x is a value that, when multiplied by itself, gives x. For example, √16 = 4 because 4 × 4 = 16."
    },
    {
      question: "Can you find the square root of a negative number?",
      answer: "In real numbers, you cannot find the square root of a negative number. However, in complex numbers, negative numbers have imaginary square roots (e.g., √−1 = i)."
    },
    {
      question: "What is the square root of 0?",
      answer: "The square root of 0 is 0, since 0 × 0 = 0."
    },
    {
      question: "How do you calculate square roots manually?",
      answer: "Manual methods include the long division method or the Babylonian method (averaging). For most practical purposes, calculators or computers are used for accuracy."
    }
  ];

  return (
    <CalculatorLayout
      title="Square Root Calculator"
      description="Calculate square roots of any positive number with precision"
      category="math"
      howItWorks="This calculator finds the square root of any non-negative number using the built-in mathematical square root function. The square root of x is the number that, when multiplied by itself, equals x."
      formula="√x = y where y × y = x"
      faqs={faqs}
      seoTitle="Square Root Calculator – Calculate √x Instantly | SmartCalc Hub"
      seoDescription="Free online square root calculator. Find square roots of any positive number with accurate decimal results instantly."
      keywords="square root calculator, sqrt calculator, root calculator, math calculator"
      canonicalUrl="https://smartcalchub.com/math/square-root-calculator"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Enter Number</Label>
          <Input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="e.g., 144"
            min="0"
          />
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate Square Root
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Square Root</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                √{number} = {result.toFixed(6)}
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                Verification: {result.toFixed(6)} × {result.toFixed(6)} ≈ {(result * result).toFixed(6)}
              </p>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default SquareRootCalculator;
