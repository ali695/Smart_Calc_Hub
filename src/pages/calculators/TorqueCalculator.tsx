import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const TorqueCalculator = () => {
  const [force, setForce] = useState("");
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const F = parseFloat(force);
    const d = parseFloat(distance);
    if (F && d) {
      setResult(F * d);
    }
  };

  const faqs = [
    {
      question: "What is torque?",
      answer: "Torque is a measure of the rotational force applied to an object. It's calculated by multiplying force by the distance from the pivot point."
    },
    {
      question: "What units are used?",
      answer: "Torque is measured in Newton-meters (Nm), force in Newtons (N), and distance in meters (m)."
    },
    {
      question: "How is torque different from force?",
      answer: "Force causes linear motion, while torque causes rotational motion around an axis."
    }
  ];

  return (
    <CalculatorLayout
      title="Torque Calculator"
      description="Calculate torque from force and lever arm distance."
      category="engineering"
      calculatorId="torque-calculator"
      howItWorks="Enter the force applied and the distance from the pivot point to calculate torque."
      formula="τ = F × d"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="force">Force (N)</Label>
          <Input
            id="force"
            type="number"
            placeholder="e.g., 50"
            value={force}
            onChange={(e) => setForce(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="distance">Distance (m)</Label>
          <Input
            id="distance"
            type="number"
            placeholder="e.g., 2"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <Button type="button" onClick={calculate} className="w-full" size="lg">
          Calculate Torque
        </Button>

        {result !== null && (
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Torque</p>
                <p className="text-3xl font-bold">{result.toFixed(2)} Nm</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default TorqueCalculator;
