import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const TriangleAreaCalculator = () => {
  const [base, setBase] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const b = parseFloat(base);
    const h = parseFloat(height);
    if (b > 0 && h > 0) {
      setResult((b * h) / 2);
    }
  };

  const faqs = [
    {
      question: "How do you calculate the area of a triangle?",
      answer: "The area of a triangle is calculated using the formula: Area = (base × height) / 2, where base is the length of one side and height is the perpendicular distance from that side to the opposite vertex."
    },
    {
      question: "What if I only know the three sides?",
      answer: "If you know all three sides, use Heron's formula: Area = √[s(s-a)(s-b)(s-c)], where s is the semi-perimeter (a+b+c)/2 and a, b, c are the side lengths."
    },
    {
      question: "How do I find the height of a triangle?",
      answer: "The height (altitude) is the perpendicular line from the base to the opposite vertex. It can be measured directly or calculated using the Pythagorean theorem in right triangles."
    },
    {
      question: "Does it matter which side I use as the base?",
      answer: "No, any side can be used as the base. You must use the corresponding height (perpendicular to that base). The area will be the same regardless of which side you choose."
    }
  ];

  return (
    <CalculatorLayout
      title="Triangle Area Calculator"
      description="Calculate the area of a triangle using base and height measurements"
      category="math"
      calculatorId="triangle-area"
      howItWorks="This calculator finds the area of a triangle when you know the base and height. The height must be perpendicular to the base. The formula works for all types of triangles: equilateral, isosceles, scalene, right, acute, and obtuse."
      formula="Area = (base × height) / 2"
      faqs={faqs}
      seoTitle="Triangle Area Calculator – Calculate Triangle Area Online | SmartCalc Hub"
      seoDescription="Free triangle area calculator using base and height. Get instant accurate results for any triangle type."
      keywords="triangle area calculator, area of triangle, triangle calculator, geometry calculator"
      canonicalUrl="https://smartcalchub.com/math/triangle-area-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Base (length)</Label>
            <Input
              type="number"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              placeholder="e.g., 10"
              min="0"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Height (perpendicular)</Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 8"
              min="0"
              step="any"
            />
          </div>
        </div>

        <Button 
          onClick={() => handleCalculation(calculate)} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate Area"
          )}
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Triangle Area</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  {result.toFixed(2)} units²
                </p>
                <div className="pt-4 border-t border-border/50 mt-4 space-y-1">
                  <p className="text-xs text-muted-foreground">Base: {base} units</p>
                  <p className="text-xs text-muted-foreground">Height: {height} units</p>
                  <p className="text-xs text-muted-foreground">Calculation: ({base} × {height}) / 2 = {result.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-center gap-2 pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(`${result.toFixed(2)} units²`, "Triangle Area")}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Result
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => printCalculation({
                    title: "Triangle Area Calculator",
                    inputs: [
                      { label: "Base", value: `${base} units` },
                      { label: "Height", value: `${height} units` }
                    ],
                    results: [
                      { label: "Area", value: `${result.toFixed(2)} units²` },
                      { label: "Calculation", value: `(${base} × ${height}) / 2 = ${result.toFixed(2)}` }
                    ],
                    formula: "Area = (base × height) / 2"
                  })}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default TriangleAreaCalculator;
