import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ForceCalculator = () => {
  const [calculateFor, setCalculateFor] = useState("force");
  const [force, setForce] = useState("");
  const [mass, setMass] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [result, setResult] = useState<{value: number; unit: string} | null>(null);

  const calculate = () => {
    const F = parseFloat(force);
    const m = parseFloat(mass);
    const a = parseFloat(acceleration);

    switch (calculateFor) {
      case "force":
        if (m && a) {
          setResult({ value: m * a, unit: "N" });
        }
        break;
      case "mass":
        if (F && a) {
          setResult({ value: F / a, unit: "kg" });
        }
        break;
      case "acceleration":
        if (F && m) {
          setResult({ value: F / m, unit: "m/s²" });
        }
        break;
    }
  };

  const faqs = [
    {
      question: "What is Newton's Second Law?",
      answer: "Newton's Second Law states that Force = Mass × Acceleration (F = ma). It describes how the motion of an object changes when it is subjected to a force."
    },
    {
      question: "What units are used?",
      answer: "Force in Newtons (N), Mass in kilograms (kg), and Acceleration in meters per second squared (m/s²)."
    },
    {
      question: "What is 1 Newton?",
      answer: "One Newton is the force required to accelerate a mass of 1 kg at a rate of 1 m/s². It's approximately the weight of a small apple."
    }
  ];

  return (
    <CalculatorLayout
      title="Force Calculator"
      description="Calculate force, mass, or acceleration using Newton's Second Law (F=ma)."
      category="engineering"
      calculatorId="force-calculator"
      howItWorks="Enter any two values to calculate the third using F = m × a."
      formula="F = m × a"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="calculateFor">Calculate</Label>
          <Select value={calculateFor} onValueChange={setCalculateFor}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="force">Force (F)</SelectItem>
              <SelectItem value="mass">Mass (m)</SelectItem>
              <SelectItem value="acceleration">Acceleration (a)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {calculateFor !== "force" && (
          <div>
            <Label htmlFor="force">Force (N)</Label>
            <Input
              id="force"
              type="number"
              placeholder="Newtons"
              value={force}
              onChange={(e) => setForce(e.target.value)}
            />
          </div>
        )}

        {calculateFor !== "mass" && (
          <div>
            <Label htmlFor="mass">Mass (kg)</Label>
            <Input
              id="mass"
              type="number"
              placeholder="Kilograms"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
            />
          </div>
        )}

        {calculateFor !== "acceleration" && (
          <div>
            <Label htmlFor="acceleration">Acceleration (m/s²)</Label>
            <Input
              id="acceleration"
              type="number"
              placeholder="m/s²"
              value={acceleration}
              onChange={(e) => setAcceleration(e.target.value)}
            />
          </div>
        )}

        <Button onClick={calculate} className="w-full" size="lg">
          Calculate
        </Button>

        {result && (
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-3xl font-bold">
                  {result.value.toFixed(2)} {result.unit}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default ForceCalculator;
