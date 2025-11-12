import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const InflationCalculator = () => {
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");
  const [inflationRate, setInflationRate] = useState("3");
  const [result, setResult] = useState<{
    futureValue: number;
    purchasingPowerLoss: number;
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const amt = parseFloat(amount);
    const yrs = parseFloat(years);
    const rate = parseFloat(inflationRate) / 100;

    if (!amt || !yrs || !rate) return;

    const futureValue = amt / Math.pow(1 + rate, yrs);
    const loss = amt - futureValue;

    setResult({
      futureValue,
      purchasingPowerLoss: loss
    });
  };

  const faqs = [
    {
      question: "What is inflation?",
      answer: "Inflation is the rate at which the general level of prices for goods and services rises, reducing purchasing power over time."
    },
    {
      question: "What is the average inflation rate?",
      answer: "Historically, the U.S. inflation rate averages around 3% per year, though it varies significantly based on economic conditions."
    },
    {
      question: "How does inflation affect savings?",
      answer: "Inflation erodes the purchasing power of money over time. Money sitting in a low-interest account loses value relative to rising prices."
    }
  ];

  return (
    <CalculatorLayout
      title="Inflation Calculator"
      description="Calculate how inflation affects the purchasing power of your money over time."
      howItWorks="Enter an amount of money, the number of years, and the expected annual inflation rate. The calculator shows what that money will be worth in the future."
      formula="Future Value = Present Value / (1 + inflation rate)^years"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amount">Current Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 10000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="years">Number of Years</Label>
            <Input
              id="years"
              type="number"
              placeholder="e.g., 10"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="inflationRate">Annual Inflation Rate (%)</Label>
            <Input
              id="inflationRate"
              type="number"
              step="0.1"
              placeholder="e.g., 3"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
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
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate Impact"
          )}
        </Button>

        {result && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Future Purchasing Power</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                      ${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`$${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, "Future Value")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => printCalculation({
                        title: "Inflation Calculator",
                        inputs: [
                          { label: "Current Amount", value: `$${amount}` },
                          { label: "Years", value: years },
                          { label: "Inflation Rate", value: `${inflationRate}%` }
                        ],
                        results: [
                          { label: "Future Value", value: `$${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
                          { label: "Purchasing Power Lost", value: `$${result.purchasingPowerLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })}` }
                        ]
                      })}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Purchasing Power Lost</p>
                  <p className="text-xl font-semibold text-red-600">
                    ${result.purchasingPowerLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default InflationCalculator;
