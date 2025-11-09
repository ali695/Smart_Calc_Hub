import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CircleCalculator = () => {
  const [radius, setRadius] = useState("");
  const [result, setResult] = useState<{ area: number; circumference: number; diameter: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(radius);
    if (r > 0) {
      const area = Math.PI * r * r;
      const circumference = 2 * Math.PI * r;
      const diameter = 2 * r;
      setResult({ area, circumference, diameter });
    }
  };

  const faqs = [
    {
      question: "How do you calculate the area of a circle?",
      answer: "The area of a circle is calculated using the formula: Area = πr², where r is the radius and π (pi) ≈ 3.14159. The radius is the distance from the center to any point on the circle."
    },
    {
      question: "What is the circumference of a circle?",
      answer: "Circumference is the distance around the circle, calculated as C = 2πr or C = πd, where d is the diameter. It's the circle's perimeter."
    },
    {
      question: "What is the relationship between radius and diameter?",
      answer: "The diameter is twice the radius: d = 2r. The radius is the distance from center to edge, while diameter is the distance across the circle through the center."
    },
    {
      question: "What is pi (π) and why is it important?",
      answer: "Pi (π) is a mathematical constant approximately equal to 3.14159. It represents the ratio of a circle's circumference to its diameter, and it's the same for all circles regardless of size."
    }
  ];

  return (
    <CalculatorLayout
      title="Circle Calculator"
      description="Calculate circle area, circumference, and diameter from radius"
      category="math"
      calculatorId="circle"
      howItWorks="This calculator computes all circle properties when you enter the radius. It calculates area using πr², circumference using 2πr, and diameter as 2r. These formulas work for any circle size."
      formula="Area = πr² | Circumference = 2πr | Diameter = 2r"
      faqs={faqs}
      seoTitle="Circle Calculator – Area, Circumference, Diameter | SmartCalc Hub"
      seoDescription="Free circle calculator to find area, circumference, and diameter from radius. Instant accurate results for all circle calculations."
      keywords="circle calculator, area of circle, circumference calculator, circle area, geometry calculator"
      canonicalUrl="https://smartcalchub.com/math/circle-calculator"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Radius</Label>
          <Input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            placeholder="e.g., 5"
            min="0"
            step="any"
          />
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate Circle Properties
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Circle Properties</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  r = {radius} units
                </p>
              </div>
              <div className="pt-4 border-t border-border/50 space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Area:</span>
                  <span className="font-bold text-lg">{result.area.toFixed(4)} units²</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Circumference:</span>
                  <span className="font-bold text-lg">{result.circumference.toFixed(4)} units</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Diameter:</span>
                  <span className="font-bold text-lg">{result.diameter.toFixed(4)} units</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CircleCalculator;
