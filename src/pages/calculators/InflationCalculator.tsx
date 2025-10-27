import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const InflationCalculator = () => {
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");
  const [inflationRate, setInflationRate] = useState("3");
  const [result, setResult] = useState<{
    futureValue: number;
    purchasingPowerLoss: number;
  } | null>(null);

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

        <Button onClick={calculate} className="w-full" size="lg">
          Calculate Impact
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Future Purchasing Power</p>
                  <p className="text-3xl font-bold text-primary">
                    ${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div>
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
