import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RadianDegreeConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("degrees");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v = parseFloat(value);
    if (!isNaN(v)) {
      if (fromUnit === "degrees") {
        setResult((v * Math.PI) / 180);
      } else {
        setResult((v * 180) / Math.PI);
      }
    }
  };

  const faqs = [
    {
      question: "How do you convert degrees to radians?",
      answer: "To convert degrees to radians, multiply the degree value by π/180. For example, 90° = 90 × π/180 = π/2 radians ≈ 1.5708 radians."
    },
    {
      question: "How do you convert radians to degrees?",
      answer: "To convert radians to degrees, multiply the radian value by 180/π. For example, π radians = π × 180/π = 180°."
    },
    {
      question: "Why do we use radians?",
      answer: "Radians are the standard unit in mathematics and physics because they simplify many formulas. One radian is the angle subtended when the arc length equals the radius."
    },
    {
      question: "What are common angle conversions?",
      answer: "30° = π/6 rad, 45° = π/4 rad, 60° = π/3 rad, 90° = π/2 rad, 180° = π rad, 360° = 2π rad."
    }
  ];

  return (
    <CalculatorLayout
      title="Radian Degree Converter"
      description="Convert angles between radians and degrees with instant accurate results"
      category="math"
      calculatorId="radian-degree"
      howItWorks="This converter transforms angles between degrees and radians using the standard conversion formulas. Degrees are more intuitive for everyday use, while radians are preferred in calculus and advanced mathematics."
      formula="Radians = Degrees × π/180 | Degrees = Radians × 180/π"
      faqs={faqs}
      seoTitle="Radian to Degree Converter – Convert Angles Online | SmartCalc Hub"
      seoDescription="Free radian to degree converter. Instantly convert between radians and degrees for trigonometry calculations."
      keywords="radian to degree, degree to radian, angle converter, rad to deg, deg to rad"
      canonicalUrl="https://smartcalchub.com/math/radian-degree-converter"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g., 90"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Convert From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
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
          Convert
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Conversion Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {value}{fromUnit === "degrees" ? "°" : " rad"} = {result.toFixed(6)}{fromUnit === "degrees" ? " rad" : "°"}
              </p>
              <div className="pt-4 border-t border-border/50 mt-4 space-y-1">
                <p className="text-xs text-muted-foreground">
                  Formula: {fromUnit === "degrees" ? `${value} × π/180` : `${value} × 180/π`}
                </p>
                <p className="text-xs text-muted-foreground">
                  In terms of π: {fromUnit === "degrees" 
                    ? `${(parseFloat(value) / 180).toFixed(4)}π rad`
                    : `${(parseFloat(value) / Math.PI).toFixed(4)}π = ${result.toFixed(2)}°`
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

export default RadianDegreeConverter;
