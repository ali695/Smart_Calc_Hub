import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const PrimeNumberCalculator = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    isPrime: boolean;
    factors: number[];
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const num = parseInt(number);
    if (!num || num < 2) {
      setResult({ isPrime: false, factors: [] });
      return;
    }

    let isPrime = true;
    const factors: number[] = [];

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }

    if (!isPrime) {
      factors.push(1, num);
      factors.sort((a, b) => a - b);
    }

    setResult({ isPrime, factors });
  };

  const faqs = [
    {
      question: "What is a prime number?",
      answer: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. For example: 2, 3, 5, 7, 11, 13..."
    },
    {
      question: "Is 1 a prime number?",
      answer: "No, 1 is not considered a prime number. By definition, a prime must have exactly two distinct divisors: 1 and itself."
    },
    {
      question: "What is the smallest prime number?",
      answer: "The smallest prime number is 2. It's also the only even prime number since all other even numbers are divisible by 2."
    }
  ];

  return (
    <CalculatorLayout
      title="Prime Number Checker"
      description="Check if a number is prime and see all its factors if it's composite."
      category="math"
      calculatorId="prime"
      howItWorks="Enter any positive integer. The calculator will determine if it's prime (only divisible by 1 and itself) or composite (has other factors)."
      formula="A number n is prime if it has no divisors from 2 to √n"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="number">Enter a Number</Label>
          <Input
            id="number"
            type="number"
            placeholder="e.g., 17"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, calculate)}
          />
        </div>

        <Button 
          type="button"
          onClick={() => handleCalculation(calculate)} 
          className="w-full" 
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Check if Prime"
          )}
        </Button>

        {result && (
          <Card className={`border-2 ${result.isPrime ? 'bg-green-50 border-green-500 dark:bg-green-950' : 'bg-orange-50 border-orange-500 dark:bg-orange-950'}`}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Result</p>
                    <p className={`text-3xl font-bold ${result.isPrime ? 'text-green-600' : 'text-orange-600'}`}>
                      {result.isPrime ? "✓ Prime Number" : "✗ Not Prime (Composite)"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(
                        result.isPrime 
                          ? `${number} is a prime number` 
                          : `${number} is composite. Factors: ${result.factors.join(", ")}`,
                        "Result"
                      )}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => printCalculation({
                        title: "Prime Number Checker",
                        inputs: [{ label: "Number", value: number }],
                        results: [
                          { 
                            label: "Result", 
                            value: result.isPrime ? "Prime Number ✓" : "Composite Number ✗" 
                          },
                          ...(!result.isPrime && result.factors.length > 0 
                            ? [{ label: "Factors", value: result.factors.join(", ") }] 
                            : [])
                        ],
                        formula: "A number n is prime if it has no divisors from 2 to √n"
                      })}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {!result.isPrime && result.factors.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground">All Factors</p>
                    <p className="text-lg font-semibold">
                      {result.factors.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PrimeNumberCalculator;
