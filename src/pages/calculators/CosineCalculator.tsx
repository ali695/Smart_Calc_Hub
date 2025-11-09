import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CosineCalculator = () => {
  const [angle, setAngle] = useState("");
  const [unit, setUnit] = useState("degrees");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(angle);
    if (!isNaN(a)) {
      const radians = unit === "degrees" ? (a * Math.PI) / 180 : a;
      setResult(Math.cos(radians));
    }
  };

  const faqs = [
    {
      question: "What is the cosine function?",
      answer: "Cosine (cos) is a trigonometric function that gives the ratio of the adjacent side to the hypotenuse in a right triangle. For an angle θ, cos(θ) = adjacent/hypotenuse."
    },
    {
      question: "How is cosine related to sine?",
      answer: "Cosine and sine are complementary functions: cos(θ) = sin(90° − θ). Also, cos²(θ) + sin²(θ) = 1 (Pythagorean identity)."
    },
    {
      question: "What is the range of cosine values?",
      answer: "The cosine function always returns values between −1 and 1, inclusive. cos(0°) = 1 and cos(180°) = −1 are the maximum and minimum values."
    },
    {
      question: "What are common cosine values?",
      answer: "cos(0°) = 1, cos(30°) ≈ 0.866, cos(45°) ≈ 0.707, cos(60°) = 0.5, cos(90°) = 0. These values are fundamental in trigonometry."
    }
  ];

  return (
    <CalculatorLayout
      title="Cosine Calculator (cos θ)"
      description="Calculate cosine values for any angle in degrees or radians"
      category="math"
      howItWorks="This calculator computes the cosine of an angle using the trigonometric cosine function. You can input angles in either degrees or radians. The result is always a value between -1 and 1."
      formula="cos(θ) = adjacent / hypotenuse (in a right triangle)"
      faqs={faqs}
      seoTitle="Cosine Calculator – Calculate cos(θ) Online | SmartCalc Hub"
      seoDescription="Free online cosine calculator for angles in degrees or radians. Get accurate cos(θ) values instantly for trigonometry calculations."
      keywords="cosine calculator, cos calculator, trigonometry calculator, cos theta, trig functions"
      canonicalUrl="https://smartcalchub.com/math/cosine-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Angle</Label>
            <Input
              type="number"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              placeholder="e.g., 60"
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
          Calculate cos(θ)
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Cosine Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                cos({angle}{unit === "degrees" ? "°" : " rad"}) = {result.toFixed(6)}
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

export default CosineCalculator;
