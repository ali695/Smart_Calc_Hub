import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RatioCalculator = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<any>(null);

  const gcd = (x: number, y: number): number => {
    return y === 0 ? x : gcd(y, x % y);
  };

  const calculate = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    
    if (numA > 0 && numB > 0) {
      const divisor = gcd(numA, numB);
      const simplified = {
        a: numA / divisor,
        b: numB / divisor
      };
      
      setResult({
        original: `${numA}:${numB}`,
        simplified: `${simplified.a}:${simplified.b}`,
        decimal: (numA / numB).toFixed(4),
        percentage: ((numA / numB) * 100).toFixed(2)
      });
    }
  };

  const faqs = [
    {
      question: "What is a ratio?",
      answer: "A ratio compares two quantities, showing the relative size of one compared to another. It's written as a:b (e.g., 3:2) and represents 'a to b'."
    },
    {
      question: "How do I simplify a ratio?",
      answer: "Divide both numbers by their greatest common divisor (GCD). For example, 12:8 simplifies to 3:2 because both can be divided by 4."
    },
    {
      question: "What are ratios used for?",
      answer: "Ratios are used in cooking (recipe scaling), mixing (paint, concrete), finance (profit margins), maps (scale), and many other applications where proportions matter."
    },
    {
      question: "Can ratios have more than two numbers?",
      answer: "Yes! Ratios can compare multiple quantities (e.g., 2:3:5). This calculator focuses on two-number ratios for simplicity."
    }
  ];

  return (
    <CalculatorLayout
      title="Ratio Calculator"
      description="Simplify ratios and convert between formats"
      howItWorks="This calculator simplifies ratios to their lowest terms by finding the greatest common divisor. It also shows the ratio as a decimal and percentage for easy comparison."
      formula="Simplified Ratio = A÷GCD(A,B) : B÷GCD(A,B) | Decimal = A÷B | Percentage = (A÷B)×100"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Number</Label>
            <Input type="number" placeholder="12" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Second Number</Label>
            <Input type="number" placeholder="8" value={b} onChange={(e) => setB(e.target.value)} />
          </div>
        </div>

        <Button onClick={calculate} className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" size="lg">Calculate Ratio</Button>

        {result && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 rounded-lg border border-primary text-center hover:scale-[1.02] transition-all duration-300">
              <p className="text-sm font-medium text-muted-foreground">Simplified Ratio</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">{result.simplified}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">As Decimal</p>
                <p className="text-2xl font-bold">{result.decimal}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">As Percentage</p>
                <p className="text-2xl font-bold">{result.percentage}%</p>
              </div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Original: {result.original}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default RatioCalculator;