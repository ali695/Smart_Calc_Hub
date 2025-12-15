import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const ExponentCalculator = () => {
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const e = parseFloat(exponent);
    if (!isNaN(b) && !isNaN(e)) {
      const power = Math.pow(b, e);
      setResult(power);
      updateAIInsight(
        { base: b, exponent: e },
        { result: power, scientific: power.toExponential(6), standard: power.toLocaleString('en-US', { maximumFractionDigits: 10 }) }
      );
    }
  };

  const faqs = [
    {
      question: "What is an exponent?",
      answer: "An exponent indicates how many times a number (the base) is multiplied by itself. For example, 2³ = 2 × 2 × 2 = 8, where 2 is the base and 3 is the exponent."
    },
    {
      question: "What does a negative exponent mean?",
      answer: "A negative exponent means division or reciprocal. For example, 2⁻³ = 1/(2³) = 1/8 = 0.125. It's the reciprocal of the positive exponent."
    },
    {
      question: "What is a fractional exponent?",
      answer: "A fractional exponent represents a root. For example, x^(1/2) is the square root of x, and x^(1/3) is the cube root. x^(2/3) means cube root of x squared."
    },
    {
      question: "What are exponent rules?",
      answer: "Key rules: x^a × x^b = x^(a+b), x^a / x^b = x^(a-b), (x^a)^b = x^(ab), x^0 = 1 (for x ≠ 0), and x^1 = x."
    }
  ];

  return (
    <CalculatorLayout
      title="Exponent Calculator"
      description="Calculate powers and exponents for any base and exponent values"
      category="math"
      calculatorId="exponent"
      howItWorks="This calculator computes the result of raising a base number to any power (exponent). It supports positive, negative, and fractional exponents. The result shows base^exponent."
      formula="base^exponent = base × base × ... (exponent times)"
      faqs={faqs}
      seoTitle="Exponent Calculator – Calculate Powers Online | SmartCalc Hub"
      seoDescription="Free exponent calculator to compute base raised to any power. Supports positive, negative, and fractional exponents."
      keywords="exponent calculator, power calculator, exponential calculator, math calculator"
      canonicalUrl="https://smartcalchub.com/math/exponent-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Base</Label>
            <Input
              type="number"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 2"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Exponent</Label>
            <Input
              type="number"
              value={exponent}
              onChange={(e) => setExponent(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 3"
              step="any"
            />
          </div>
        </div>

        <Button 
          type="button"
          onClick={() => handleCalculation(calculate)} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Power"}
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">Exponent Result</p>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.toString(), "Result")}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => printCalculation({
                  title: "Exponent Calculator Result",
                  inputs: [{ label: "Base", value: base }, { label: "Exponent", value: exponent }],
                  results: [{ label: "Result", value: result.toString() }],
                  formula: "base^exponent"
                })}>
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {base}<sup>{exponent}</sup> = {result.toExponential(6)}
              </p>
              <div className="pt-4 border-t border-border/50 mt-4">
                <p className="text-xs text-muted-foreground">
                  Standard notation: {result.toLocaleString('en-US', { maximumFractionDigits: 10 })}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default ExponentCalculator;
