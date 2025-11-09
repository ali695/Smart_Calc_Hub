import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PowerCalculator = () => {
  const [type, setType] = useState("electrical");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [force, setForce] = useState("");
  const [velocity, setVelocity] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (type === "electrical") {
      const V = parseFloat(voltage);
      const I = parseFloat(current);
      if (V && I) {
        setResult(V * I);
      }
    } else {
      const F = parseFloat(force);
      const v = parseFloat(velocity);
      if (F && v) {
        setResult(F * v);
      }
    }
  };

  const faqs = [
    {
      question: "What is electrical power?",
      answer: "Electrical power is the rate of energy transfer in an electrical circuit, calculated as P = V × I (voltage times current)."
    },
    {
      question: "What is mechanical power?",
      answer: "Mechanical power is the rate of doing work, calculated as P = F × v (force times velocity)."
    },
    {
      question: "What unit is power measured in?",
      answer: "Power is measured in Watts (W), where 1 Watt = 1 Joule/second."
    }
  ];

  return (
    <CalculatorLayout
      title="Power Calculator"
      description="Calculate electrical and mechanical power."
      category="engineering"
      calculatorId="power-calculator"
      howItWorks="Select power type and enter the required values to calculate power output."
      formula="Electrical: P = V × I, Mechanical: P = F × v"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="type">Power Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electrical">Electrical Power (P = V × I)</SelectItem>
              <SelectItem value="mechanical">Mechanical Power (P = F × v)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {type === "electrical" ? (
          <>
            <div>
              <Label htmlFor="voltage">Voltage (V)</Label>
              <Input
                id="voltage"
                type="number"
                placeholder="e.g., 220"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="current">Current (A)</Label>
              <Input
                id="current"
                type="number"
                placeholder="e.g., 5"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Label htmlFor="force">Force (N)</Label>
              <Input
                id="force"
                type="number"
                placeholder="e.g., 100"
                value={force}
                onChange={(e) => setForce(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="velocity">Velocity (m/s)</Label>
              <Input
                id="velocity"
                type="number"
                placeholder="e.g., 10"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
              />
            </div>
          </>
        )}

        <Button onClick={calculate} className="w-full" size="lg">
          Calculate Power
        </Button>

        {result !== null && (
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Power</p>
                <p className="text-3xl font-bold">{result.toFixed(2)} W</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PowerCalculator;
