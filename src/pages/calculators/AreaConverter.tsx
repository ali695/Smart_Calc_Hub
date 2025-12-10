import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const AreaConverter = () => {
  const { updateAIInsight } = useCalculatorEnhancements();
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("sqm");
  const [toUnit, setToUnit] = useState("sqft");
  const [result, setResult] = useState<number | null>(null);

  const conversionRates: Record<string, number> = {
    sqm: 1,
    sqft: 10.7639,
    sqyd: 1.19599,
    acre: 0.000247105,
    hectare: 0.0001,
    sqkm: 0.000001,
    sqmi: 3.861e-7,
    sqin: 1550.0031
  };

  const unitNames: Record<string, string> = {
    sqm: "Square Meters",
    sqft: "Square Feet",
    sqyd: "Square Yards",
    acre: "Acres",
    hectare: "Hectares",
    sqkm: "Square Kilometers",
    sqmi: "Square Miles",
    sqin: "Square Inches"
  };

  const calculate = () => {
    const inputValue = parseFloat(value);
    if (inputValue > 0) {
      const inSqMeters = inputValue / conversionRates[fromUnit];
      const converted = inSqMeters * conversionRates[toUnit];
      setResult(converted);
      updateAIInsight({ value: inputValue, fromUnit, toUnit }, { result: converted, inSqMeters });
    }
  };

  const faqs = [
    {
      question: "How do you convert square meters to square feet?",
      answer: "Multiply square meters by 10.7639 to get square feet. For example, 10 m² = 107.639 ft²."
    },
    {
      question: "What is the difference between area and perimeter?",
      answer: "Area measures the surface inside a shape (in square units), while perimeter measures the distance around it (in linear units)."
    },
    {
      question: "How many square meters in an acre?",
      answer: "One acre equals approximately 4,046.86 square meters or about 43,560 square feet."
    },
    {
      question: "How to convert hectares to acres?",
      answer: "Multiply hectares by 2.47105 to get acres. One hectare equals 2.47105 acres or 10,000 square meters."
    }
  ];

  return (
    <CalculatorLayout
      title="Area Converter"
      description="Convert between different area units instantly and accurately"
      category="conversion"
      calculatorId="area"
      howItWorks="This calculator converts area measurements between various units including square meters, square feet, acres, hectares, and more. All conversions are based on standard international definitions."
      formula="Target Unit = (Value × Conversion Rate of From Unit) / Conversion Rate of To Unit"
      faqs={faqs}
      seoTitle="Area Converter – Convert Square Meters, Feet, Acres | SmartCalc Hub"
      seoDescription="Free area converter for square meters, square feet, acres, hectares and more. Instant accurate conversions for land area calculations."
      keywords="area converter, square meter converter, acre converter, hectare converter, land area calculator"
      canonicalUrl="https://smartcalchub.com/conversion/area-converter"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>

          <div className="space-y-2">
            <Label>From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitNames).map(([key, name]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitNames).map(([key, name]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          type="button"
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Convert Area
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Conversion Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {result.toFixed(4)} {unitNames[toUnit]}
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                {value} {unitNames[fromUnit]} = {result.toFixed(4)} {unitNames[toUnit]}
              </p>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default AreaConverter;
