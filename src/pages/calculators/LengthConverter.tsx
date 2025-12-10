import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const LengthConverter = () => {
  const { updateAIInsight } = useCalculatorEnhancements();
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("feet");
  const [result, setResult] = useState<number | null>(null);

  const conversions: { [key: string]: number } = {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    feet: 3.28084,
    inch: 39.3701,
  };

  const convert = (val: string) => {
    const numValue = parseFloat(val);
    if (!isNaN(numValue)) {
      const meters = numValue / conversions[fromUnit];
      const converted = meters * conversions[toUnit];
      const res = parseFloat(converted.toFixed(6));
      setResult(res);
      updateAIInsight({ value: numValue, fromUnit, toUnit }, { result: res, meters });
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
    { value: "meter", label: "Meters (m)" },
    { value: "kilometer", label: "Kilometers (km)" },
    { value: "centimeter", label: "Centimeters (cm)" },
    { value: "millimeter", label: "Millimeters (mm)" },
    { value: "mile", label: "Miles (mi)" },
    { value: "yard", label: "Yards (yd)" },
    { value: "feet", label: "Feet (ft)" },
    { value: "inch", label: "Inches (in)" },
  ];

  const faqs = [
    {
      question: "How do I convert between metric and imperial units?",
      answer: "Simply select your input unit (e.g., meters) and output unit (e.g., feet), then enter your value. The converter automatically handles the conversion using standard conversion factors."
    },
    {
      question: "What's the difference between meters and feet?",
      answer: "A meter is the base unit of length in the metric system, while a foot is used in the imperial system. 1 meter equals approximately 3.28 feet, or 1 foot equals about 0.3048 meters."
    },
    {
      question: "How accurate are these conversions?",
      answer: "Our conversions use standard, internationally recognized conversion factors and are accurate to 6 decimal places, which is sufficient for most practical purposes."
    },
    {
      question: "Can I convert between any units?",
      answer: "Yes! You can convert between any combination of the supported units: meters, kilometers, centimeters, millimeters, miles, yards, feet, and inches."
    }
  ];

  return (
    <CalculatorLayout
      title="Length Converter"
      description="Convert between meters, feet, inches, kilometers, miles, and more"
      category="conversion"
      calculatorId="length"
      howItWorks="The length converter allows you to easily convert between different units of length. Select your input unit and desired output unit, enter your value, and get instant results. The converter supports both metric units (meters, kilometers, centimeters, millimeters) and imperial units (miles, yards, feet, inches)."
      formula="All conversions are calculated through meters as the base unit. For example: feet to inches = feet → meters → inches"
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
          <div className="p-6 bg-primary/10 rounded-lg text-center animate-fade-in">
            <p className="text-sm font-medium text-muted-foreground">Result</p>
            <p className="text-4xl font-bold text-primary">{result}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {value} {units.find(u => u.value === fromUnit)?.label} = {result} {units.find(u => u.value === toUnit)?.label}
            </p>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default LengthConverter;
