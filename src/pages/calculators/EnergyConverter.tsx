import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const EnergyConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("joules");
  const [toUnit, setToUnit] = useState("calories");
  const [result, setResult] = useState<number | null>(null);
  const { updateAIInsight } = useCalculatorEnhancements();

  const conversionRates: { [key: string]: number } = {
    joules: 1,
    kilojoules: 1000,
    calories: 4.184,
    kilocalories: 4184,
    "watt-hours": 3600,
    "kilowatt-hours": 3600000,
    electronvolts: 1.602176634e-19,
    btu: 1055.06,
    "foot-pounds": 1.35582,
  };

  const calculate = () => {
    const inputValue = parseFloat(value);
    if (!isNaN(inputValue)) {
      const valueInJoules = inputValue * conversionRates[fromUnit];
      const convertedValue = valueInJoules / conversionRates[toUnit];
      setResult(convertedValue);
      updateAIInsight(
        { value: inputValue, fromUnit, toUnit },
        { result: convertedValue, valueInJoules }
      );
    }
  };

  const faqs = [
    {
      question: "What is energy and how is it measured?",
      answer: "Energy is the capacity to do work or produce heat. It's measured in various units depending on the context: joules (J) in physics, calories (cal) in nutrition, watt-hours (Wh) in electricity, and BTU in heating/cooling systems."
    },
    {
      question: "What's the difference between calories and kilocalories?",
      answer: "1 kilocalorie (kcal) = 1,000 calories (cal). Food labels showing 'Calories' actually mean kilocalories. So a food with '200 Calories' contains 200 kcal or 200,000 cal."
    },
    {
      question: "How do joules relate to calories?",
      answer: "1 calorie equals approximately 4.184 joules. Joules are the SI unit of energy used in physics and engineering, while calories are commonly used for food energy and in chemistry."
    },
    {
      question: "What is a kilowatt-hour (kWh)?",
      answer: "A kilowatt-hour is the energy consumed by a 1,000-watt (1 kW) appliance running for one hour. It equals 3.6 million joules and is the standard unit for electrical energy on utility bills."
    }
  ];

  return (
    <CalculatorLayout
      title="Energy Converter"
      description="Convert between joules, calories, watt-hours, BTU and other energy units"
      category="conversion"
      calculatorId="energy-converter"
      howItWorks="This converter transforms energy values between different units using standard conversion factors. Common in physics, nutrition, and engineering, these conversions help compare energy across different contexts."
      formula="Energy conversions use fixed ratios: 1 cal = 4.184 J, 1 kWh = 3.6 MJ"
      faqs={faqs}
      seoTitle="Energy Converter – Joules, Calories, kWh Conversion | SmartCalc Hub"
      seoDescription="Free energy unit converter. Convert between joules, calories, kilocalories, watt-hours, BTU, and more instantly."
      keywords="energy converter, joules to calories, kWh converter, BTU conversion, energy unit calculator"
      canonicalUrl="https://smartcalchub.com/conversion/energy-converter"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g., 100"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="joules">Joules (J)</SelectItem>
                <SelectItem value="kilojoules">Kilojoules (kJ)</SelectItem>
                <SelectItem value="calories">Calories (cal)</SelectItem>
                <SelectItem value="kilocalories">Kilocalories (kcal)</SelectItem>
                <SelectItem value="watt-hours">Watt-hours (Wh)</SelectItem>
                <SelectItem value="kilowatt-hours">Kilowatt-hours (kWh)</SelectItem>
                <SelectItem value="electronvolts">Electronvolts (eV)</SelectItem>
                <SelectItem value="btu">BTU</SelectItem>
                <SelectItem value="foot-pounds">Foot-pounds (ft·lb)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="joules">Joules (J)</SelectItem>
                <SelectItem value="kilojoules">Kilojoules (kJ)</SelectItem>
                <SelectItem value="calories">Calories (cal)</SelectItem>
                <SelectItem value="kilocalories">Kilocalories (kcal)</SelectItem>
                <SelectItem value="watt-hours">Watt-hours (Wh)</SelectItem>
                <SelectItem value="kilowatt-hours">Kilowatt-hours (kWh)</SelectItem>
                <SelectItem value="electronvolts">Electronvolts (eV)</SelectItem>
                <SelectItem value="btu">BTU</SelectItem>
                <SelectItem value="foot-pounds">Foot-pounds (ft·lb)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Convert Energy
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Conversion Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {result < 0.001 || result > 1000000 ? result.toExponential(4) : result.toFixed(4)}
              </p>
              <p className="text-sm text-muted-foreground">
                {toUnit.charAt(0).toUpperCase() + toUnit.slice(1).replace("-", " ")}
              </p>
              <div className="pt-4 border-t border-border/50 mt-4">
                <p className="text-xs text-muted-foreground">
                  {value} {fromUnit} = {result < 0.001 || result > 1000000 ? result.toExponential(4) : result.toFixed(4)} {toUnit}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default EnergyConverter;
