import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer } from "lucide-react";
import { CalculatorChart } from "@/components/CalculatorChart";

const LogarithmCalculator = () => {
  const [number, setNumber] = useState("");
  const [base, setBase] = useState("10");
  const [result, setResult] = useState<number | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const n = parseFloat(number);
    const b = parseFloat(base);
    if (n > 0 && b > 0 && b !== 1) {
      const logResult = Math.log(n) / Math.log(b);
      setResult(logResult);
      
      updateAIInsight(
        { number: n, base: b, logType: b === 10 ? "Common Log" : b === Math.E ? "Natural Log" : "Custom Base" },
        { logarithm: logResult.toFixed(6), verification: `${b}^${logResult.toFixed(6)} ≈ ${Math.pow(b, logResult).toFixed(6)}` }
      );
    }
  };

  const handlePrint = () => {
    if (result !== null) {
      printCalculation({
        title: "Logarithm Calculation",
        inputs: [
          { label: "Number (x)", value: number },
          { label: "Base (b)", value: base }
        ],
        results: [
          { label: "Logarithm Result", value: `log₍${base}₎(${number}) = ${result.toFixed(6)}` }
        ],
        formula: "log_b(x) = y means b^y = x"
      });
    }
  };

  const faqs = [
    {
      question: "What is a logarithm?",
      answer: "A logarithm is the inverse operation of exponentiation. If b^y = x, then log_b(x) = y. It answers the question: 'To what power must the base be raised to get this number?'"
    },
    {
      question: "What are common logarithms?",
      answer: "Common logarithm (log₁₀) uses base 10, and natural logarithm (ln) uses base e ≈ 2.71828. These are the most frequently used logarithms in mathematics and science."
    },
    {
      question: "Can you take the logarithm of a negative number?",
      answer: "In real numbers, you cannot take the logarithm of a negative number or zero. Logarithms are only defined for positive numbers."
    },
    {
      question: "What are logarithm properties?",
      answer: "Key properties: log(xy) = log(x) + log(y), log(x/y) = log(x) − log(y), and log(x^n) = n·log(x). These make logarithms useful for simplifying calculations."
    }
  ];

  return (
    <CalculatorLayout
      title="Logarithm Calculator"
      description="Calculate logarithms with any base for mathematical and scientific calculations"
      category="math"
      calculatorId="logarithm"
      howItWorks="This calculator computes logarithms with any positive base. Enter a number and base to find the logarithm. Common bases include 10 (common log), e ≈ 2.718 (natural log), and 2 (binary log)."
      formula="log_b(x) = y means b^y = x"
      faqs={faqs}
      seoTitle="Logarithm Calculator – Calculate Log with Any Base | SmartCalc Hub"
      seoDescription="Free logarithm calculator to compute log values with any base. Perfect for math, science, and engineering calculations."
      keywords="logarithm calculator, log calculator, natural log, common log, math calculator"
      canonicalUrl="https://smartcalhub.online/calculator/logarithm"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Number (x)</Label>
            <Input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 100"
              min="0.000001"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Base (b)</Label>
            <Input
              type="number"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 10"
              min="0.000001"
              step="any"
            />
            <p className="text-xs text-muted-foreground">Common: 10 (log), 2.71828 (ln), 2 (binary)</p>
          </div>
        </div>

        <Button 
          onClick={() => handleCalculation(calculate)}
          disabled={isCalculating}
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          {isCalculating ? "Calculating..." : "Calculate Logarithm"}
        </Button>

        {result !== null && (
          <>
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Logarithm Result</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  log<sub>{base}</sub>({number}) = {result.toFixed(6)}
                </p>
                <div className="pt-4 border-t border-border/50 mt-4">
                  <p className="text-xs text-muted-foreground">
                    Verification: {base}^{result.toFixed(6)} ≈ {Math.pow(parseFloat(base), result).toFixed(6)}
                  </p>
                </div>

                <div className="flex gap-2 justify-center pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(result.toFixed(6), "Logarithm")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Result
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                </div>
              </div>
            </Card>

            <CalculatorChart
              chartType="line"
              data={Array.from({length: 20}, (_, i) => {
                const x = (i + 1) * (parseFloat(number) / 10);
                return { name: x.toFixed(1), value: Math.log(x) / Math.log(parseFloat(base)) };
              })}
              title={`Logarithm Curve (base ${base})`}
            />
          </>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default LogarithmCalculator;
