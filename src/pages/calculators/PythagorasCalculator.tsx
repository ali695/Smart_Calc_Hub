import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PythagorasCalculator = () => {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [result, setResult] = useState<{ hypotenuse: number; area: number; perimeter: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    if (a > 0 && b > 0) {
      const hypotenuse = Math.sqrt(a * a + b * b);
      const area = (a * b) / 2;
      const perimeter = a + b + hypotenuse;
      setResult({ hypotenuse, area, perimeter });
    }
  };

  const faqs = [
    {
      question: "What is the Pythagorean theorem?",
      answer: "The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (longest side) equals the sum of squares of the other two sides: a² + b² = c², where c is the hypotenuse."
    },
    {
      question: "What is a right triangle?",
      answer: "A right triangle is a triangle with one 90-degree angle. The side opposite the right angle is called the hypotenuse, and it's always the longest side."
    },
    {
      question: "Who discovered the Pythagorean theorem?",
      answer: "The theorem is named after ancient Greek mathematician Pythagoras, though it was known to earlier civilizations. It's one of the most important theorems in mathematics."
    },
    {
      question: "What are Pythagorean triples?",
      answer: "Pythagorean triples are sets of three positive integers that satisfy a² + b² = c². Common examples include (3,4,5), (5,12,13), and (8,15,17)."
    }
  ];

  return (
    <CalculatorLayout
      title="Pythagorean Theorem Calculator"
      description="Calculate the hypotenuse and properties of right triangles"
      category="math"
      calculatorId="pythagoras"
      howItWorks="This calculator uses the Pythagorean theorem (a² + b² = c²) to find the hypotenuse of a right triangle when you know the other two sides. It also calculates the triangle's area and perimeter."
      formula="c = √(a² + b²) where c is the hypotenuse"
      faqs={faqs}
      seoTitle="Pythagorean Theorem Calculator – Right Triangle Calculator | SmartCalc Hub"
      seoDescription="Free Pythagorean theorem calculator to find the hypotenuse and properties of right triangles. Instant accurate results."
      keywords="pythagorean theorem calculator, right triangle calculator, hypotenuse calculator, pythagoras calculator"
      canonicalUrl="https://smartcalchub.com/math/pythagoras-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Side A (leg)</Label>
            <Input
              type="number"
              value={sideA}
              onChange={(e) => setSideA(e.target.value)}
              placeholder="e.g., 3"
              min="0"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Side B (leg)</Label>
            <Input
              type="number"
              value={sideB}
              onChange={(e) => setSideB(e.target.value)}
              placeholder="e.g., 4"
              min="0"
              step="any"
            />
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate Hypotenuse
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Hypotenuse (Side C)</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  {result.hypotenuse.toFixed(4)} units
                </p>
              </div>
              <div className="pt-4 border-t border-border/50 space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Triangle Area:</span>
                  <span className="font-bold text-lg">{result.area.toFixed(4)} units²</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Perimeter:</span>
                  <span className="font-bold text-lg">{result.perimeter.toFixed(4)} units</span>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-xs text-center text-muted-foreground">
                    Verification: {sideA}² + {sideB}² = {result.hypotenuse.toFixed(2)}²
                    <br />
                    {(parseFloat(sideA) ** 2).toFixed(2)} + {(parseFloat(sideB) ** 2).toFixed(2)} = {(result.hypotenuse ** 2).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PythagorasCalculator;
