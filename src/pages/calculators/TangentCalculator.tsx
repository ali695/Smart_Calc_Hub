import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TangentCalculator = () => {
  const [angle, setAngle] = useState("");
  const [unit, setUnit] = useState("degrees");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(angle);
    if (!isNaN(a)) {
      const radians = unit === "degrees" ? (a * Math.PI) / 180 : a;
      setResult(Math.tan(radians));
    }
  };

  const faqs = [
    {
      question: "What is the tangent function?",
      answer: "Tangent (tan) is a trigonometric function that gives the ratio of the opposite side to the adjacent side in a right triangle. For an angle θ, tan(θ) = opposite/adjacent."
    },
    {
      question: "How is tangent related to sine and cosine?",
      answer: "Tangent is defined as tan(θ) = sin(θ) / cos(θ). This relationship is fundamental in trigonometry and helps derive many identities."
    },
    {
      question: "What happens at 90 degrees?",
      answer: "At 90° (π/2 radians), tangent is undefined because cos(90°) = 0, resulting in division by zero. The tangent function approaches infinity as it nears 90°."
    },
    {
      question: "What are common tangent values?",
      answer: "tan(0°) = 0, tan(30°) ≈ 0.577, tan(45°) = 1, tan(60°) ≈ 1.732. The tangent function has a period of 180° (π radians)."
    }
  ];

  return (
    <CalculatorLayout
      title="Tangent Calculator (tan θ)"
      description="Calculate tangent values for any angle in degrees or radians"
      category="math"
      calculatorId="tangent"
      howItWorks="This calculator computes the tangent of an angle using the trigonometric tangent function. You can input angles in either degrees or radians. The tangent function can return any real number value."
      formula="tan(θ) = opposite / adjacent = sin(θ) / cos(θ)"
      faqs={faqs}
      seoTitle="Tangent Calculator – Calculate tan(θ) Online | SmartCalc Hub"
      seoDescription="Free online tangent calculator for angles in degrees or radians. Get accurate tan(θ) values instantly for trigonometry calculations."
      keywords="tangent calculator, tan calculator, trigonometry calculator, tan theta, trig functions"
      canonicalUrl="https://smartcalchub.com/math/tangent-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Angle</Label>
            <Input
              type="number"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              placeholder="e.g., 45"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="degrees">Degrees (°)</SelectItem>
                <SelectItem value="radians">Radians (rad)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate tan(θ)
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Tangent Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                tan({angle}{unit === "degrees" ? "°" : " rad"}) = {result.toFixed(6)}
              </p>
              <div className="pt-4 border-t border-border/50 mt-4">
                <p className="text-xs text-muted-foreground">
                  {unit === "degrees" 
                    ? `In radians: ${((parseFloat(angle) * Math.PI) / 180).toFixed(4)} rad`
                    : `In degrees: ${((parseFloat(angle) * 180) / Math.PI).toFixed(4)}°`
                  }
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default TangentCalculator;
