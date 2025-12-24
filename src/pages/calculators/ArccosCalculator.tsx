import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ArccosCalculator = () => {
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
    const radians = Math.acos(v);
    const result = outputUnit === "degrees" ? (radians * 180) / Math.PI : radians;
    setResult(result);
  };

  const faqs = [
    {
      question: "What is arccosine (arccos)?",
      answer: "Arccosine (arccos or cos⁻¹) is the inverse function of cosine. It returns the angle whose cosine is the given value. The output is an angle in the range [0°, 180°] or [0, π] radians."
    },
    {
      question: "What values can I input for arccos?",
      answer: "The input value must be between -1 and 1 (inclusive), as these are the only possible values for the cosine function. Values outside this range are undefined for arccos."
    },
    {
      question: "How is arccos related to arcsin?",
      answer: "For any value x in [-1, 1], arccos(x) + arcsin(x) = 90° (or π/2 radians). They are complementary inverse trigonometric functions."
    },
    {
      question: "What are common arccos values?",
      answer: "arccos(1) = 0°, arccos(√3/2) ≈ 30°, arccos(√2/2) ≈ 45°, arccos(0.5) = 60°, arccos(0) = 90°, arccos(-1) = 180°."
    }
  ];

  return (
    <CalculatorLayout
      title="Arccosine Calculator (cos⁻¹)"
      description="Calculate inverse cosine values to find angles from cosine ratios"
      category="math"
      calculatorId="arccos"
      howItWorks="This calculator computes the arccosine (inverse cosine) of a value, returning the angle whose cosine equals the input. The input must be between -1 and 1. Results can be displayed in degrees or radians."
      formula="arccos(x) = cos⁻¹(x), where -1 ≤ x ≤ 1"
      faqs={faqs}
      seoTitle="Arccosine Calculator – Calculate cos⁻¹(x) Online | SmartCalc Hub"
      seoDescription="Free inverse cosine (arccos) calculator. Convert cosine ratios to angles in degrees or radians instantly."
      keywords="arccos calculator, inverse cosine, cos^-1, arccosine, trigonometry calculator"
      canonicalUrl="https://smartcalhub.online/math/arccos-calculator"
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
          Calculate arccos
        </Button>

        {result !== null && !error && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Arccosine Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                arccos({value}) = {result.toFixed(6)}{outputUnit === "degrees" ? "°" : " rad"}
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

export default ArccosCalculator;
