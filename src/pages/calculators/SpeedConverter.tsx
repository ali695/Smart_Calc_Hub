import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const SpeedConverter = () => {
  const { updateAIInsight } = useCalculatorEnhancements();
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kmh");
  const [toUnit, setToUnit] = useState("mph");
  const [result, setResult] = useState<number | null>(null);

  const conversionRates: Record<string, number> = {
    kmh: 1,
    mph: 0.621371,
    ms: 0.277778,
    fps: 0.911344,
    knot: 0.539957,
    mach: 0.000817992
  };

  const unitNames: Record<string, string> = {
    kmh: "Kilometers per Hour (km/h)",
    mph: "Miles per Hour (mph)",
    ms: "Meters per Second (m/s)",
    fps: "Feet per Second (ft/s)",
    knot: "Knots",
    mach: "Mach"
  };

  const calculate = () => {
    const inputValue = parseFloat(value);
    if (inputValue >= 0) {
      const inKmh = inputValue / conversionRates[fromUnit];
      const converted = inKmh * conversionRates[toUnit];
      setResult(converted);
      updateAIInsight({ value: inputValue, fromUnit, toUnit }, { result: converted, inKmh });
    }
  };

  const faqs = [
    {
      question: "How do you convert km/h to mph?",
      answer: "Multiply kilometers per hour by 0.621371 to get miles per hour. For example, 100 km/h ≈ 62.14 mph."
    },
    {
      question: "What is the difference between speed and velocity?",
      answer: "Speed is a scalar quantity (magnitude only), while velocity is a vector (magnitude and direction). This calculator measures speed."
    },
    {
      question: "What is Mach speed?",
      answer: "Mach is the ratio of an object's speed to the speed of sound. Mach 1 ≈ 1,235 km/h or 767 mph at sea level. It varies with temperature and altitude."
    },
    {
      question: "How many meters per second in 1 km/h?",
      answer: "1 km/h equals approximately 0.2778 meters per second. To convert, divide km/h by 3.6."
    }
  ];

  return (
    <CalculatorLayout
      title="Speed Converter"
      description="Convert between different speed units including km/h, mph, m/s, and more"
      category="conversion"
      calculatorId="speed"
      howItWorks="This calculator converts speed measurements between various units including kilometers per hour, miles per hour, meters per second, feet per second, knots, and Mach. All conversions use standard international definitions."
      formula="Target Speed = (Value × Conversion Rate of From Unit) / Conversion Rate of To Unit"
      faqs={faqs}
      seoTitle="Speed Converter – Convert km/h, mph, m/s, Knots | SmartCalc Hub"
      seoDescription="Free speed converter for kilometers per hour, miles per hour, meters per second, knots and Mach. Instant accurate conversions."
      keywords="speed converter, km/h to mph, mph to km/h, velocity converter, mach converter"
      canonicalUrl="https://smartcalhub.online/conversion/speed-converter"
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
              min="0"
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
          Convert Speed
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Conversion Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {result.toFixed(4)} {unitNames[toUnit].split('(')[1]?.replace(')', '') || unitNames[toUnit]}
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                {value} {unitNames[fromUnit].split('(')[1]?.replace(')', '') || unitNames[fromUnit]} = {result.toFixed(4)} {unitNames[toUnit].split('(')[1]?.replace(')', '') || unitNames[toUnit]}
              </p>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default SpeedConverter;
