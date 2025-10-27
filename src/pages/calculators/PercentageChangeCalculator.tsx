import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const PercentageChangeCalculator = () => {
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [result, setResult] = useState<{
    percentChange: number;
    change: number;
    type: string;
  } | null>(null);

  const calculate = () => {
    const old = parseFloat(oldValue);
    const newVal = parseFloat(newValue);

    if (!old || !newVal) return;

    const change = newVal - old;
    const percentChange = (change / old) * 100;
    const type = percentChange > 0 ? "Increase" : percentChange < 0 ? "Decrease" : "No Change";

    setResult({ percentChange, change, type });
  };

  const faqs = [
    {
      question: "How is percentage change calculated?",
      answer: "Percentage change = ((New Value - Old Value) / Old Value) × 100. A positive result is an increase, negative is a decrease."
    },
    {
      question: "What's the difference between percentage change and percentage point?",
      answer: "Percentage change is relative (e.g., 10% to 20% is a 100% increase), while percentage points are absolute (same example is a 10 point increase)."
    },
    {
      question: "When is percentage change useful?",
      answer: "It's useful for comparing growth rates, price changes, investment returns, and any data that changes over time."
    }
  ];

  return (
    <CalculatorLayout
      title="Percentage Change Calculator"
      description="Calculate the percentage increase or decrease between two values quickly and accurately."
      howItWorks="Enter the original (old) value and the new value. The calculator shows the percentage change, whether it's an increase or decrease."
      formula="Percentage Change = ((New Value - Old Value) / Old Value) × 100"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="oldValue">Original Value</Label>
            <Input
              id="oldValue"
              type="number"
              step="any"
              placeholder="e.g., 100"
              value={oldValue}
              onChange={(e) => setOldValue(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="newValue">New Value</Label>
            <Input
              id="newValue"
              type="number"
              step="any"
              placeholder="e.g., 150"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full" size="lg">
          Calculate Change
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Percentage {result.type}</p>
                  <p className={`text-3xl font-bold ${result.percentChange > 0 ? 'text-green-600' : result.percentChange < 0 ? 'text-red-600' : 'text-primary'}`}>
                    {Math.abs(result.percentChange).toFixed(2)}%
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Absolute Change</p>
                  <p className="text-xl font-semibold">
                    {result.change > 0 ? '+' : ''}{result.change.toFixed(2)}
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

export default PercentageChangeCalculator;
