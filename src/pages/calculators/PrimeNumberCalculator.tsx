import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { SchemaMarkup } from "@/components/SchemaMarkup";

const PrimeNumberCalculator = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    isPrime: boolean;
    factors: number[];
  } | null>(null);

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
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Prime Number Checker",
          description: "Check if a number is prime and see all its factors if it's composite",
          url: "https://smartcalchub.com/calculator/prime",
          applicationCategory: "UtilityApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
          }
        }}
      />
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
          />
        </div>

        <Button onClick={calculate} className="w-full" size="lg">
          Check if Prime
        </Button>

        {result && (
          <Card className={`border-2 ${result.isPrime ? 'bg-green-50 border-green-500 dark:bg-green-950' : 'bg-orange-50 border-orange-500 dark:bg-orange-950'}`}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className={`text-3xl font-bold ${result.isPrime ? 'text-green-600' : 'text-orange-600'}`}>
                    {result.isPrime ? "✓ Prime Number" : "✗ Not Prime (Composite)"}
                  </p>
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
    </>
  );
};

export default PrimeNumberCalculator;
