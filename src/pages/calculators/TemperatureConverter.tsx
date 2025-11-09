import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TemperatureConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("celsius");
  const [result, setResult] = useState<any>(null);

  const convert = (val: string, from: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      let celsius = num;
      
      if (from === "fahrenheit") celsius = (num - 32) * 5/9;
      else if (from === "kelvin") celsius = num - 273.15;
      
      setResult({
        celsius: parseFloat(celsius.toFixed(2)),
        fahrenheit: parseFloat((celsius * 9/5 + 32).toFixed(2)),
        kelvin: parseFloat((celsius + 273.15).toFixed(2))
      });
    } else {
      setResult(null);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    convert(newValue, fromUnit);
  };

  const handleUnitChange = (unit: string) => {
    setFromUnit(unit);
    if (value) convert(value, unit);
  };

  const faqs = [
    {
      question: "How do I convert Celsius to Fahrenheit?",
      answer: "Multiply by 9/5 (or 1.8) and add 32. For example: 20°C = (20 × 9/5) + 32 = 68°F."
    },
    {
      question: "What is Kelvin used for?",
      answer: "Kelvin is the SI unit for temperature used in science. It starts at absolute zero (-273.15°C), the coldest possible temperature where molecular motion stops."
    },
    {
      question: "Why are there different temperature scales?",
      answer: "Fahrenheit was developed for weather (0°F is very cold, 100°F is very hot). Celsius is based on water (0°C freezing, 100°C boiling). Kelvin is for scientific calculations."
    },
    {
      question: "What's a comfortable room temperature?",
      answer: "Generally 20-22°C (68-72°F) is comfortable for most people, though preferences vary. Sleeping temperature is often cooler, around 16-19°C (60-67°F)."
    }
  ];

  return (
    <CalculatorLayout
      title="Temperature Converter"
      description="Convert between Celsius, Fahrenheit, and Kelvin"
      category="conversion"
      calculatorId="temperature"
      howItWorks="This converter transforms temperatures between Celsius, Fahrenheit, and Kelvin scales. Enter a value in any unit to see instant conversions to all other units."
      formula="°F = (°C × 9/5) + 32 | K = °C + 273.15 | °C = (°F - 32) × 5/9"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Temperature Value</Label>
            <Input
              type="number"
              placeholder="25"
              value={value}
              onChange={handleValueChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label>From Unit</Label>
            <Select value={fromUnit} onValueChange={handleUnitChange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                <SelectItem value="kelvin">Kelvin (K)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {result && value && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Celsius</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.celsius}°C</p>
              </div>
              
              <div className="p-6 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800 text-center">
                <p className="text-sm font-medium text-orange-900 dark:text-orange-100 mb-2">Fahrenheit</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{result.fahrenheit}°F</p>
              </div>
              
              <div className="p-6 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800 text-center">
                <p className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">Kelvin</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{result.kelvin}K</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default TemperatureConverter;