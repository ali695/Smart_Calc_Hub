import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const ArcsinCalculator = () => {
  const { updateAIInsight } = useCalculatorEnhancements();
  const [value, setValue] = useState("");
  const [outputUnit, setOutputUnit] = useState("degrees");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const v = parseFloat(value);
    if (isNaN(v)) {
      setError("Please enter a valid number");
      return;
    }
    if (v < -1 || v > 1) {
      setError("Value must be between -1 and 1");
      return;
    }
    setError("");
    const radians = Math.asin(v);
    const res = outputUnit === "degrees" ? (radians * 180) / Math.PI : radians;
    setResult(res);
    updateAIInsight(
      { value: v, outputUnit },
      { result: res.toFixed(6), radians: radians.toFixed(6), degrees: ((radians * 180) / Math.PI).toFixed(6) }
    );
  };

  const faqs = [
    {
      question: "What is arcsine (arcsin)?",
      answer: "Arcsine (arcsin or sin⁻¹) is the inverse function of sine. It returns the angle whose sine is the given value. The output is an angle in the range [-90°, 90°] or [-π/2, π/2] radians."
    },
    {
      question: "What values can I input for arcsin?",
      answer: "The input value must be between -1 and 1 (inclusive), as these are the only possible values for the sine function. Values outside this range are undefined for arcsin."
    },
    {
      question: "How is arcsin different from sin?",
      answer: "While sin(angle) gives you a ratio, arcsin(ratio) gives you the angle. They are inverse operations: arcsin(sin(θ)) = θ for angles in the valid range."
    },
    {
      question: "What are common arcsin values?",
      answer: "arcsin(0) = 0°, arcsin(0.5) = 30°, arcsin(√2/2) ≈ 45°, arcsin(√3/2) ≈ 60°, arcsin(1) = 90°."
    }
  ];

  return (
    <CalculatorLayout
      title="Arcsine Calculator (sin⁻¹)"
      description="Calculate inverse sine values to find angles from sine ratios"
      category="math"
      calculatorId="arcsin"
      howItWorks="This calculator computes the arcsine (inverse sine) of a value, returning the angle whose sine equals the input. The input must be between -1 and 1. Results can be displayed in degrees or radians."
      formula="arcsin(x) = sin⁻¹(x), where -1 ≤ x ≤ 1"
      faqs={faqs}
      seoTitle="Arcsine Calculator – Calculate sin⁻¹(x) Online | SmartCalc Hub"
      seoDescription="Free inverse sine (arcsin) calculator. Convert sine ratios to angles in degrees or radians instantly."
      keywords="arcsin calculator, inverse sine, sin^-1, arcsine, trigonometry calculator"
      canonicalUrl="https://smartcalhub.online/math/arcsin-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Value (between -1 and 1)</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g., 0.5"
              step="any"
              min="-1"
              max="1"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
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
          Calculate arcsin
        </Button>

        {result !== null && !error && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Arcsine Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                arcsin({value}) = {result.toFixed(6)}{outputUnit === "degrees" ? "°" : " rad"}
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

export default ArcsinCalculator;
