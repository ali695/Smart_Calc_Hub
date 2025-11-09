import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SineCalculator = () => {
  const [angle, setAngle] = useState("");
  const [unit, setUnit] = useState("degrees");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(angle);
    if (!isNaN(a)) {
      const radians = unit === "degrees" ? (a * Math.PI) / 180 : a;
      setResult(Math.sin(radians));
    }
  };

  const faqs = [
    {
      question: "What is the sine function?",
      answer: "Sine (sin) is a trigonometric function that gives the ratio of the opposite side to the hypotenuse in a right triangle. For an angle θ, sin(θ) = opposite/hypotenuse."
    },
    {
      question: "What is the difference between degrees and radians?",
      answer: "Degrees and radians are two units for measuring angles. 360° = 2π radians, so 1 radian ≈ 57.3°. Radians are commonly used in calculus and higher mathematics."
    },
    {
      question: "What is the range of sine values?",
      answer: "The sine function always returns values between −1 and 1, inclusive. sin(90°) = 1 and sin(270°) = −1 are the maximum and minimum values."
    },
    {
      question: "What are common sine values to remember?",
      answer: "sin(0°) = 0, sin(30°) = 0.5, sin(45°) ≈ 0.707, sin(60°) ≈ 0.866, sin(90°) = 1. These values repeat in a periodic pattern."
    }
  ];

  return (
    <CalculatorLayout
      title="Sine Calculator (sin θ)"
      description="Calculate sine values for any angle in degrees or radians"
      category="math"
      howItWorks="This calculator computes the sine of an angle using the trigonometric sine function. You can input angles in either degrees or radians. The result is always a value between -1 and 1."
      formula="sin(θ) = opposite / hypotenuse (in a right triangle)"
      faqs={faqs}
      seoTitle="Sine Calculator – Calculate sin(θ) Online | SmartCalc Hub"
      seoDescription="Free online sine calculator for angles in degrees or radians. Get accurate sin(θ) values instantly for trigonometry calculations."
      keywords="sine calculator, sin calculator, trigonometry calculator, sin theta, trig functions"
      canonicalUrl="https://smartcalchub.com/math/sine-calculator"
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
          Calculate sin(θ)
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Sine Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                sin({angle}{unit === "degrees" ? "°" : " rad"}) = {result.toFixed(6)}
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

export default SineCalculator;
