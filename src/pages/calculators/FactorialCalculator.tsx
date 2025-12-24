import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const FactorialCalculator = () => {
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{ factorial: string; steps: string } | null>(null);

  const calculateFactorial = (n: number): bigint => {
    if (n === 0 || n === 1) return BigInt(1);
    let result = BigInt(1);
    for (let i = 2; i <= n; i++) {
      result *= BigInt(i);
    }
    return result;
  };

  const calculate = () => {
    const n = parseInt(number);
    if (n >= 0 && n <= 170) {
      const factorial = calculateFactorial(n);
      const steps = n <= 10 
        ? Array.from({ length: n }, (_, i) => i + 1).join(' × ') || "1"
        : `1 × 2 × 3 × ... × ${n}`;
      setResult({ factorial: factorial.toString(), steps });
      updateAIInsight(
        { number: n },
        { factorial: factorial.toString(), steps, digitCount: factorial.toString().length }
      );
    }
  };

  const faqs = [
    {
      question: "What is a factorial?",
      answer: "A factorial of a non-negative integer n, written as n!, is the product of all positive integers less than or equal to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120."
    },
    {
      question: "What is 0 factorial?",
      answer: "By definition, 0! = 1. This is a convention that makes many mathematical formulas work consistently, especially in combinatorics and calculus."
    },
    {
      question: "Why do factorials grow so quickly?",
      answer: "Factorials grow exponentially because you're multiplying increasingly larger numbers. For example, 10! = 3,628,800 and 20! = 2,432,902,008,176,640,000."
    },
    {
      question: "What are factorials used for?",
      answer: "Factorials are used in permutations, combinations, probability calculations, Taylor series, and many areas of mathematics and statistics."
    }
  ];

  return (
    <CalculatorLayout
      title="Factorial Calculator"
      description="Calculate factorial (n!) of any non-negative integer instantly"
      category="math"
      howItWorks="This calculator computes the factorial of any non-negative integer up to 170. The factorial of n (written as n!) is the product of all positive integers from 1 to n."
      formula="n! = n × (n−1) × (n−2) × ... × 2 × 1, where 0! = 1"
      faqs={faqs}
      seoTitle="Factorial Calculator – Calculate n! Online | SmartCalc Hub"
      seoDescription="Free factorial calculator to compute n! for any non-negative integer. Get instant results with step-by-step calculation."
      keywords="factorial calculator, n factorial, math calculator, permutation calculator"
      canonicalUrl="https://smartcalhub.online/math/factorial-calculator"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Enter a Number (0-170)</Label>
          <Input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, calculate)}
            placeholder="e.g., 5"
            min="0"
            max="170"
          />
        </div>

        <Button 
          type="button"
          onClick={() => handleCalculation(calculate)} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Factorial"}
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Factorial Result</p>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.factorial, "Factorial Result")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => printCalculation({
                    title: "Factorial Calculator Result",
                    inputs: [{ label: "Number", value: number }],
                    results: [{ label: `${number}!`, value: result.factorial }],
                    formula: "n! = n × (n−1) × (n−2) × ... × 2 × 1"
                  })}>
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent break-all">
                  {number}! = {result.factorial}
                </p>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center">Calculation Steps</p>
                <p className="text-sm mt-2 text-center break-all">{result.steps}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default FactorialCalculator;
