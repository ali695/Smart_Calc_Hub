import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PressureConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("bar");
  const [toUnit, setToUnit] = useState("psi");
  const [result, setResult] = useState<number | null>(null);

  const conversionRates: Record<string, number> = {
    bar: 1,
    psi: 14.5038,
    kpa: 100,
    mpa: 0.1,
    atm: 0.986923,
    torr: 750.062,
    mmhg: 750.062,
    pascal: 100000
  };

  const unitNames: Record<string, string> = {
    bar: "Bar",
    psi: "PSI (Pounds per Square Inch)",
    kpa: "Kilopascal (kPa)",
    mpa: "Megapascal (MPa)",
    atm: "Atmosphere (atm)",
    torr: "Torr",
    mmhg: "mmHg (Millimeters of Mercury)",
    pascal: "Pascal (Pa)"
  };

  const calculate = () => {
    const inputValue = parseFloat(value);
    if (inputValue >= 0) {
      const inBar = inputValue / conversionRates[fromUnit];
      const converted = inBar * conversionRates[toUnit];
      setResult(converted);
    }
  };

  const faqs = [
    {
      question: "What is pressure and how is it measured?",
      answer: "Pressure is force applied per unit area. Common units include PSI (pounds per square inch), bar, pascal, and atmosphere. 1 bar ≈ 14.5 PSI ≈ 100 kPa."
    },
    {
      question: "What is the difference between PSI and bar?",
      answer: "PSI (pounds per square inch) is used mainly in the US, while bar is metric. 1 bar = 14.5038 PSI. Bar is commonly used for tire pressure and weather forecasting."
    },
    {
      question: "What is atmospheric pressure?",
      answer: "Atmospheric pressure at sea level is approximately 1 atm = 101.325 kPa = 1.01325 bar = 14.7 PSI = 760 mmHg. This is the reference for many pressure measurements."
    },
    {
      question: "When is each pressure unit used?",
      answer: "PSI: tire pressure (US), plumbing. Bar: tire pressure (Europe), hydraulics. Pascal/kPa: scientific, weather. mmHg/Torr: blood pressure, vacuum systems. Atmosphere: diving, altitude."
    }
  ];

  return (
    <CalculatorLayout
      title="Pressure Converter"
      description="Convert between bar, PSI, kPa, atm, and other pressure units"
      category="conversion"
      calculatorId="pressure-converter"
      howItWorks="This calculator converts pressure measurements between various units including bar, PSI, kilopascal, megapascal, atmosphere, torr, and mmHg. All conversions use standard international definitions based on the pascal (SI unit of pressure)."
      formula="Target Pressure = (Value / Conversion Rate of From Unit) × Conversion Rate of To Unit"
      faqs={faqs}
      seoTitle="Pressure Converter – Convert Bar, PSI, kPa, Atm | SmartCalc Hub"
      seoDescription="Free pressure converter for bar, PSI, kilopascal, atmosphere and more. Instant accurate conversions for engineering and science."
      keywords="pressure converter, bar to psi, psi to bar, kpa converter, pressure units"
      canonicalUrl="https://smartcalchub.com/conversion/pressure-converter"
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
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Convert Pressure
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Conversion Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {result.toFixed(6)} {unitNames[toUnit].split('(')[0].trim()}
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                {value} {unitNames[fromUnit].split('(')[0].trim()} = {result.toFixed(6)} {unitNames[toUnit].split('(')[0].trim()}
              </p>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PressureConverter;
