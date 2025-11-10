import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OhmsLawCalculator = () => {
  const [calculate, setCalculate] = useState("voltage");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [power, setPower] = useState("");
  const [result, setResult] = useState<string>("");

  const calculateValues = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const R = parseFloat(resistance);
    const P = parseFloat(power);

    let calculatedValue = "";

    switch (calculate) {
      case "voltage":
        if (I && R) {
          const calcV = I * R;
          calculatedValue = `Voltage (V) = ${calcV.toFixed(2)} V`;
          if (!power) setPower((calcV * I).toFixed(2));
        }
        break;
      case "current":
        if (V && R) {
          const calcI = V / R;
          calculatedValue = `Current (I) = ${calcI.toFixed(2)} A`;
          if (!power) setPower((V * calcI).toFixed(2));
        }
        break;
      case "resistance":
        if (V && I) {
          const calcR = V / I;
          calculatedValue = `Resistance (R) = ${calcR.toFixed(2)} Ω`;
          if (!power) setPower((V * I).toFixed(2));
        }
        break;
      case "power":
        if (V && I) {
          const calcP = V * I;
          calculatedValue = `Power (P) = ${calcP.toFixed(2)} W`;
        } else if (I && R) {
          const calcP = I * I * R;
          calculatedValue = `Power (P) = ${calcP.toFixed(2)} W`;
        } else if (V && R) {
          const calcP = (V * V) / R;
          calculatedValue = `Power (P) = ${calcP.toFixed(2)} W`;
        }
        break;
    }

    setResult(calculatedValue || "Please provide valid inputs");
  };

  const faqs = [
    {
      question: "What is Ohm's Law?",
      answer: "Ohm's Law states that voltage (V) equals current (I) times resistance (R): V = I × R. It's fundamental to understanding electrical circuits."
    },
    {
      question: "How do I calculate power?",
      answer: "Power (P) can be calculated using P = V × I, P = I² × R, or P = V² / R depending on which values you know."
    },
    {
      question: "What units are used?",
      answer: "Voltage in Volts (V), Current in Amperes (A), Resistance in Ohms (Ω), and Power in Watts (W)."
    }
  ];

  return (
    <CalculatorLayout
      title="Ohm's Law Calculator"
      description="Calculate voltage, current, resistance, and power using Ohm's Law."
      category="engineering"
      calculatorId="ohms-law"
      howItWorks="Enter any two values and select what you want to calculate. The calculator uses V=IR and P=VI formulas."
      formula="V = I × R, P = V × I"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="calculate">Calculate</Label>
          <Select value={calculate} onValueChange={setCalculate}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="voltage">Voltage (V)</SelectItem>
              <SelectItem value="current">Current (I)</SelectItem>
              <SelectItem value="resistance">Resistance (R)</SelectItem>
              <SelectItem value="power">Power (P)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {calculate !== "voltage" && (
          <div>
            <Label htmlFor="voltage">Voltage (V)</Label>
            <Input
              id="voltage"
              type="number"
              placeholder="Volts"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
            />
          </div>
        )}

        {calculate !== "current" && (
          <div>
            <Label htmlFor="current">Current (I)</Label>
            <Input
              id="current"
              type="number"
              placeholder="Amperes"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </div>
        )}

        {calculate !== "resistance" && (
          <div>
            <Label htmlFor="resistance">Resistance (R)</Label>
            <Input
              id="resistance"
              type="number"
              placeholder="Ohms"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
            />
          </div>
        )}

        <Button type="button" onClick={calculateValues} className="w-full" size="lg">
          Calculate
        </Button>

        {result && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold">{result}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default OhmsLawCalculator;
