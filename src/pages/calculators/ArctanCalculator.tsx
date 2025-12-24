import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const ArctanCalculator = () => {
  const { updateAIInsight } = useCalculatorEnhancements();
  const [value, setValue] = useState("");
  const [outputUnit, setOutputUnit] = useState("degrees");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v = parseFloat(value);
    if (!isNaN(v)) {
      const radians = Math.atan(v);
      const res = outputUnit === "degrees" ? (radians * 180) / Math.PI : radians;
      setResult(res);
      updateAIInsight(
        { value: v, outputUnit },
        { result: res.toFixed(6), radians: radians.toFixed(6), degrees: ((radians * 180) / Math.PI).toFixed(6) }
      );
    }
  };

  const faqs = [
    {
      question: "What is arctangent (arctan)?",
      answer: "Arctangent (arctan or tan⁻¹) is the inverse function of tangent. It returns the angle whose tangent is the given value. The output is an angle in the range [-90°, 90°] or [-π/2, π/2] radians."
    },
    {
      question: "What values can I input for arctan?",
      answer: "Unlike arcsin and arccos, arctan accepts any real number as input since tangent can produce any real value. The output angle is always between -90° and 90°."
    },
    {
      question: "How is arctan used in real applications?",
      answer: "Arctan is commonly used in navigation, robotics, and computer graphics to calculate angles from slopes or ratios. For example, finding the angle of a ramp from its rise/run ratio."
    },
    {
      question: "What are common arctan values?",
      answer: "arctan(0) = 0°, arctan(1/√3) ≈ 30°, arctan(1) = 45°, arctan(√3) ≈ 60°. As x approaches infinity, arctan(x) approaches 90°."
    }
  ];

  return (
    <CalculatorLayout
      title="Arctangent Calculator (tan⁻¹)"
      description="Calculate inverse tangent values to find angles from tangent ratios"
      category="math"
      calculatorId="arctan"
      howItWorks="This calculator computes the arctangent (inverse tangent) of a value, returning the angle whose tangent equals the input. It accepts any real number and returns angles in degrees or radians."
      formula="arctan(x) = tan⁻¹(x), for all real x"
      faqs={faqs}
      seoTitle="Arctangent Calculator – Calculate tan⁻¹(x) Online | SmartCalc Hub"
      seoDescription="Free inverse tangent (arctan) calculator. Convert tangent ratios to angles in degrees or radians instantly."
      keywords="arctan calculator, inverse tangent, tan^-1, arctangent, trigonometry calculator"
      canonicalUrl="https://smartcalhub.online/calculator/arctan"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Value (any number)</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g., 1"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Output Unit</Label>
            <Select value={outputUnit} onValueChange={setOutputUnit}>
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
          Calculate arctan
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Arctangent Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                arctan({value}) = {result.toFixed(6)}{outputUnit === "degrees" ? "°" : " rad"}
              </p>
              <div className="pt-4 border-t border-border/50 mt-4">
                <p className="text-xs text-muted-foreground">
                  {outputUnit === "degrees" 
                    ? `In radians: ${((result * Math.PI) / 180).toFixed(6)} rad`
                    : `In degrees: ${((result * 180) / Math.PI).toFixed(6)}°`
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

export default ArctanCalculator;
