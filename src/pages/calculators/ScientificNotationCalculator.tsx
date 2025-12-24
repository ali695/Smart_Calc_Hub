import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ScientificNotationCalculator = () => {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState("toScientific");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return;

    if (mode === "toScientific") {
      const exponent = Math.floor(Math.log10(Math.abs(v)));
      const coefficient = v / Math.pow(10, exponent);
      setResult(`${coefficient.toFixed(4)} × 10^${exponent}`);
    } else {
      setResult(v.toString());
    }
  };

  const faqs = [
    {
      question: "What is scientific notation?",
      answer: "Scientific notation is a way of expressing very large or very small numbers in the form a × 10^n, where 1 ≤ |a| < 10 and n is an integer. For example, 3,000,000 = 3 × 10^6."
    },
    {
      question: "Why use scientific notation?",
      answer: "Scientific notation makes it easier to work with extremely large numbers (like astronomical distances) or very small numbers (like atomic sizes) by representing them compactly and making calculations simpler."
    },
    {
      question: "How do you read scientific notation?",
      answer: "The number a × 10^n means 'a times 10 raised to the power n'. Positive n moves the decimal right, negative n moves it left. For example, 4.5 × 10^3 = 4,500."
    },
    {
      question: "What are some examples of scientific notation?",
      answer: "Speed of light: 3 × 10^8 m/s, Earth's mass: 5.97 × 10^24 kg, Electron mass: 9.11 × 10^-31 kg, Planck's constant: 6.626 × 10^-34 J·s."
    }
  ];

  return (
    <CalculatorLayout
      title="Scientific Notation Calculator"
      description="Convert numbers to and from scientific notation (exponential form)"
      category="math"
      calculatorId="scientific-notation"
      howItWorks="This calculator converts numbers between standard decimal form and scientific notation. Scientific notation expresses numbers as a coefficient multiplied by a power of 10, making it ideal for very large or small values."
      formula="Scientific Notation: a × 10^n, where 1 ≤ |a| < 10"
      faqs={faqs}
      seoTitle="Scientific Notation Calculator – Convert to Exponential Form | SmartCalc Hub"
      seoDescription="Free scientific notation calculator. Convert numbers to and from exponential notation instantly."
      keywords="scientific notation calculator, exponential notation, standard form converter, E notation"
      canonicalUrl="https://smartcalhub.online/math/scientific-notation-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Number</Label>
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g., 3000000 or 3e6"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Conversion Mode</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toScientific">To Scientific Notation</SelectItem>
                <SelectItem value="toDecimal">To Decimal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Convert
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Result</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {result}
              </p>
              <div className="pt-4 border-t border-border/50 mt-4">
                <p className="text-xs text-muted-foreground">
                  Original: {value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mode === "toScientific" ? "Standard to Scientific" : "Scientific to Standard"}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default ScientificNotationCalculator;
