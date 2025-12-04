import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const DCACalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [frequency, setFrequency] = useState("12"); // times per year
  const [years, setYears] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("8");
  const [result, setResult] = useState<{ totalInvested: number; futureValue: number; gains: number; avgCost: number } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const amount = parseFloat(investmentAmount);
    const freq = parseFloat(frequency);
    const yrs = parseFloat(years);
    const rate = parseFloat(expectedReturn) / 100;

    if (!amount || !freq || !yrs || amount <= 0 || yrs <= 0) return;

    const periods = freq * yrs;
    const periodicRate = rate / freq;
    const totalInvested = amount * periods;
    
    // Future value of series of payments
    const futureValue = amount * ((Math.pow(1 + periodicRate, periods) - 1) / periodicRate);
    const gains = futureValue - totalInvested;
    const avgCost = totalInvested / periods; // Per investment period

    setResult({ totalInvested, futureValue, gains, avgCost });
  };

  const faqs = [
    { question: "What is DCA (Dollar Cost Averaging)?", answer: "DCA is an investment strategy where you invest a fixed amount regularly, regardless of price. This reduces the impact of volatility and removes the need to time the market." }
  ];

  return (
    <CalculatorLayout title="DCA Calculator" description="Calculate returns using Dollar Cost Averaging strategy." category="finance" calculatorId="dca" howItWorks="Enter your regular investment amount, frequency, and time period to see projected returns." formula="Future Value = PMT × ((1 + r)^n - 1) / r" faqs={faqs}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Investment Amount ($)</Label><Input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} placeholder="e.g., 500" /></div>
          <div><Label>Investments per Year</Label><Input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="e.g., 12 (monthly)" /></div>
          <div><Label>Investment Period (years)</Label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 10" /></div>
          <div><Label>Expected Annual Return (%)</Label><Input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} placeholder="8" step="0.5" /></div>
        </div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate DCA Returns"}</Button>
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div><p className="text-sm text-muted-foreground">Future Value</p><p className="text-3xl font-bold text-primary">${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.futureValue.toFixed(0)}`, "Future Value")}><Copy className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "DCA Calculator", inputs: [{ label: "Investment", value: `$${investmentAmount}` }], results: [{ label: "Future Value", value: `$${result.futureValue.toFixed(0)}` }] })}><Printer className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg"><p className="text-xs text-muted-foreground">Total Invested</p><p className="text-lg font-semibold text-blue-600">${result.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg"><p className="text-xs text-muted-foreground">Total Gains</p><p className="text-lg font-semibold text-green-600">${result.gains.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-xs text-muted-foreground">Gain %</p><p className="text-lg font-semibold text-primary">{((result.gains / result.totalInvested) * 100).toFixed(1)}%</p></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default DCACalculator;
