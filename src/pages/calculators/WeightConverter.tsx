import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const WeightConverter = () => {
  const { updateAIInsight } = useCalculatorEnhancements();
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kilogram");
  const [toUnit, setToUnit] = useState("pound");
  const [result, setResult] = useState<number | null>(null);

  const conversions: { [key: string]: number } = {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.001,
    stone: 0.157473,
  };

  const convert = (val: string) => {
    const numValue = parseFloat(val);
    if (!isNaN(numValue)) {
      const kilograms = numValue / conversions[fromUnit];
      const converted = kilograms * conversions[toUnit];
      const res = parseFloat(converted.toFixed(6));
      setResult(res);
      updateAIInsight({ value: numValue, fromUnit, toUnit }, { result: res, kilograms });
    } else {
      setResult(null);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    convert(newValue);
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    if (value) convert(value);
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    if (value) convert(value);
  };

  const units = [
    { value: "kilogram", label: "Kilograms (kg)" },
    { value: "gram", label: "Grams (g)" },
    { value: "milligram", label: "Milligrams (mg)" },
    { value: "pound", label: "Pounds (lb)" },
    { value: "ounce", label: "Ounces (oz)" },
    { value: "ton", label: "Metric Tons (t)" },
    { value: "stone", label: "Stones (st)" },
  ];

  const faqs = [
    {
      question: "How do I convert between metric and imperial weight units?",
      answer: "Simply select your input unit (e.g., kilograms) and output unit (e.g., pounds), then enter your value. The converter automatically handles the conversion using standard conversion factors."
    },
    {
      question: "What's the difference between kilograms and pounds?",
      answer: "A kilogram is the base unit of mass in the metric system, while a pound is used in the imperial system. 1 kilogram equals approximately 2.20462 pounds, or 1 pound equals about 0.453592 kilograms."
    },
    {
      question: "How accurate are these conversions?",
      answer: "Our conversions use standard, internationally recognized conversion factors and are accurate to 6 decimal places, which is sufficient for most practical purposes including cooking, fitness, and shipping."
    },
    {
      question: "Can I convert between any units?",
      answer: "Yes! You can convert between any combination of the supported units: kilograms, grams, milligrams, pounds, ounces, metric tons, and stones."
    }
  ];

  return (
    <CalculatorLayout
      title="Weight Converter"
      description="Convert between kilograms, pounds, ounces, and more"
      category="conversion"
      calculatorId="weight"
      howItWorks="The weight converter allows you to easily convert between different units of weight and mass. Select your input unit and desired output unit, enter your value, and get instant results. The converter supports both metric units (kilograms, grams, milligrams, tons) and imperial units (pounds, ounces, stones)."
      formula="All conversions are calculated through kilograms as the base unit. For example: pounds to ounces = pounds → kilograms → ounces"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="number"
            placeholder="Enter value"
            value={value}
            onChange={handleValueChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fromUnit">From</Label>
            <Select value={fromUnit} onValueChange={handleFromUnitChange}>
              <SelectTrigger id="fromUnit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="toUnit">To</Label>
            <Select value={toUnit} onValueChange={handleToUnitChange}>
              <SelectTrigger id="toUnit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {result !== null && value && (
          <div className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 rounded-lg border border-primary text-center hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <p className="text-sm font-medium text-muted-foreground">Result</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">{result}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {value} {units.find(u => u.value === fromUnit)?.label} = {result} {units.find(u => u.value === toUnit)?.label}
            </p>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default WeightConverter;
