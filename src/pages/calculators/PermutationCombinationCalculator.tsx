import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PermutationCombinationCalculator = () => {
  const [n, setN] = useState("");
  const [r, setR] = useState("");
  const [result, setResult] = useState<{ permutation: number; combination: number } | null>(null);

  const factorial = (num: number): number => {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  };

  const calculate = () => {
    const nVal = parseInt(n);
    const rVal = parseInt(r);
    
    if (nVal >= 0 && rVal >= 0 && rVal <= nVal && nVal <= 170) {
      const permutation = factorial(nVal) / factorial(nVal - rVal);
      const combination = factorial(nVal) / (factorial(rVal) * factorial(nVal - rVal));
      setResult({ permutation, combination });
    }
  };

  const faqs = [
    {
      question: "What is the difference between permutation and combination?",
      answer: "Permutations care about order (ABC ≠ BAC), while combinations do not (ABC = BAC). Permutation formula: P(n,r) = n!/(n-r)!. Combination formula: C(n,r) = n!/(r!(n-r)!)."
    },
    {
      question: "When do I use permutations?",
      answer: "Use permutations when order matters, such as arranging people in a line, creating passwords, or determining race finishing positions."
    },
    {
      question: "When do I use combinations?",
      answer: "Use combinations when order doesn't matter, such as selecting a committee, choosing lottery numbers, or picking pizza toppings."
    },
    {
      question: "Why is nPr always greater than or equal to nCr?",
      answer: "Permutations count more arrangements because order matters. For the same n and r, nPr ≥ nCr, with equality only when r = 0 or r = 1."
    }
  ];

  return (
    <CalculatorLayout
      title="Permutation & Combination Calculator"
      description="Calculate permutations and combinations for probability and statistics"
      category="math"
      calculatorId="permutation-combination"
      howItWorks="This calculator computes both permutations (nPr) where order matters, and combinations (nCr) where order doesn't matter. Enter total items (n) and items to select (r) to get both results."
      formula="Permutation: P(n,r) = n!/(n-r)! | Combination: C(n,r) = n!/(r!(n-r)!)"
      faqs={faqs}
      seoTitle="Permutation & Combination Calculator – nPr and nCr | SmartCalc Hub"
      seoDescription="Free permutation and combination calculator for probability and statistics. Calculate nPr and nCr instantly with explanations."
      keywords="permutation calculator, combination calculator, nPr, nCr, probability calculator, statistics"
      canonicalUrl="https://smartcalchub.com/math/permutation-combination-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Total Items (n)</Label>
            <Input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              placeholder="e.g., 10"
              min="0"
              max="170"
            />
          </div>

          <div className="space-y-2">
            <Label>Items to Select (r)</Label>
            <Input
              type="number"
              value={r}
              onChange={(e) => setR(e.target.value)}
              placeholder="e.g., 3"
              min="0"
            />
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate
        </Button>

        {result && (
          <div className="space-y-4 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Permutation (Order Matters)</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  P({n},{r}) = {result.permutation.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Number of ways to arrange {r} items from {n} items
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary-accent/10 to-primary/10 border-primary hover:scale-[1.02] transition-all duration-300">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Combination (Order Doesn't Matter)</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  C({n},{r}) = {result.combination.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Number of ways to select {r} items from {n} items
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PermutationCombinationCalculator;
