import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { CalculatorChart } from "@/components/CalculatorChart";

const QuadraticCalculator = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<{
    x1: string;
    x2: string;
    discriminant: number;
    type: string;
  } | null>(null);
  const { updateAIInsight } = useCalculatorEnhancements();

  const calculate = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);

    if (!aVal || aVal === 0) return;

    const discriminant = bVal * bVal - 4 * aVal * cVal;
    let x1 = "";
    let x2 = "";
    let type = "";

    if (discriminant > 0) {
      const root1 = (-bVal + Math.sqrt(discriminant)) / (2 * aVal);
      const root2 = (-bVal - Math.sqrt(discriminant)) / (2 * aVal);
      x1 = root1.toFixed(4);
      x2 = root2.toFixed(4);
      type = "Two Real Solutions";
    } else if (discriminant === 0) {
      const root = -bVal / (2 * aVal);
      x1 = root.toFixed(4);
      x2 = root.toFixed(4);
      type = "One Real Solution (Repeated Root)";
    } else {
      const realPart = (-bVal / (2 * aVal)).toFixed(4);
      const imagPart = (Math.sqrt(-discriminant) / (2 * aVal)).toFixed(4);
      x1 = `${realPart} + ${imagPart}i`;
      x2 = `${realPart} - ${imagPart}i`;
      type = "Two Complex Solutions";
    }

    setResult({ x1, x2, discriminant, type });
    
    updateAIInsight(
      { a: aVal, b: bVal, c: cVal, equation: `${aVal}x² + ${bVal}x + ${cVal} = 0` },
      { discriminant, solutionType: type, root1: x1, root2: x2, vertex: `(${(-bVal/(2*aVal)).toFixed(2)}, ${(aVal*Math.pow(-bVal/(2*aVal), 2) + bVal*(-bVal/(2*aVal)) + cVal).toFixed(2)})` }
    );
  };

  const faqs = [
    {
      question: "What is a quadratic equation?",
      answer: "A quadratic equation is a polynomial equation of degree 2 in the form ax² + bx + c = 0, where a ≠ 0."
    },
    {
      question: "What is the discriminant?",
      answer: "The discriminant (b² - 4ac) determines the nature of the roots. If positive: 2 real roots, if zero: 1 real root, if negative: 2 complex roots."
    },
    {
      question: "What is the quadratic formula?",
      answer: "x = [-b ± √(b² - 4ac)] / 2a. This formula solves any quadratic equation."
    }
  ];

  return (
    <CalculatorLayout
      title="Quadratic Equation Solver"
      description="Solve quadratic equations of the form ax² + bx + c = 0 and get step-by-step solutions."
      seoTitle="Quadratic Equation Solver - Find Roots & Discriminant | SmartCalc Hub"
      seoDescription="Free quadratic equation solver. Calculate roots, discriminant, and vertex for any quadratic equation ax² + bx + c = 0. Instant solutions with step-by-step explanation."
      keywords="quadratic equation solver, quadratic formula calculator, discriminant calculator, roots calculator, parabola calculator"
      canonicalUrl="https://smartcalhub.online/calculator/quadratic"
      category="math"
      calculatorId="quadratic"
      howItWorks="Enter the coefficients a, b, and c from your equation ax² + bx + c = 0. The calculator will find the roots using the quadratic formula."
      formula="x = [-b ± √(b² - 4ac)] / 2a"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">
            ax² + bx + c = 0
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="a">Coefficient a</Label>
            <Input
              id="a"
              type="number"
              step="any"
              placeholder="e.g., 1"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="b">Coefficient b</Label>
            <Input
              id="b"
              type="number"
              step="any"
              placeholder="e.g., -5"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="c">Coefficient c</Label>
            <Input
              id="c"
              type="number"
              step="any"
              placeholder="e.g., 6"
              value={c}
              onChange={(e) => setC(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" size="lg">
          Solve Equation
        </Button>

        {result && (
          <>
            <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Solution Type</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">{result.type}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">x₁</p>
                      <p className="text-lg font-semibold">{result.x1}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">x₂</p>
                      <p className="text-lg font-semibold">{result.x2}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Discriminant (b² - 4ac)</p>
                    <p className="text-lg font-semibold">{result.discriminant.toFixed(4)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {result.discriminant >= 0 && (
              <CalculatorChart
                chartType="line"
                data={Array.from({length: 50}, (_, i) => {
                  const x = (i - 25) / 5;
                  const y = parseFloat(a) * x * x + parseFloat(b) * x + parseFloat(c);
                  return { name: x.toFixed(1), value: y };
                })}
                title="Parabola Graph"
              />
            )}
          </>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default QuadraticCalculator;
