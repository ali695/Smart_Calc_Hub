import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const MortgageRecastCalculator = () => {
  const [currentBalance, setCurrentBalance] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [remainingMonths, setRemainingMonths] = useState("");
  const [lumpSum, setLumpSum] = useState("");
  const [result, setResult] = useState<{
    currentPayment: number;
    newPayment: number;
    monthlySavings: number;
    newBalance: number;
    totalSavings: number;
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const balance = parseFloat(currentBalance);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseInt(remainingMonths);
    const lump = parseFloat(lumpSum);

    if (!balance || !rate || !months || !lump) return;

    const currentPayment = (balance * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const newBalance = balance - lump;
    const newPayment = (newBalance * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const monthlySavings = currentPayment - newPayment;
    const totalSavings = monthlySavings * months;

    setResult({ currentPayment, newPayment, monthlySavings, newBalance, totalSavings });
  };

  const faqs = [
    {
      question: "What is a mortgage recast?",
      answer: "A mortgage recast is when you make a lump sum payment toward your principal and the lender recalculates your monthly payment based on the new lower balance, keeping the same interest rate and remaining term."
    },
    {
      question: "How is recasting different from refinancing?",
      answer: "Recasting keeps your existing loan terms and rate, just lowers the payment. Refinancing creates a new loan, potentially with different terms, rate, and requires closing costs."
    },
  ];

  return (
    <CalculatorLayout
      title="Mortgage Recast Calculator"
      description="Calculate your new mortgage payment after making a lump sum principal payment."
      category="finance"
      calculatorId="mortgage-recast"
      howItWorks="Enter your current loan balance, rate, remaining months, and the lump sum you plan to pay. See your new lower monthly payment."
      formula="New Payment = (New Balance × Monthly Rate × (1 + Rate)^n) / ((1 + Rate)^n - 1)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="balance">Current Balance ($)</Label>
            <Input id="balance" type="number" placeholder="e.g., 250000" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label htmlFor="rate">Interest Rate (%)</Label>
            <Input id="rate" type="number" step="0.01" placeholder="e.g., 6.5" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label htmlFor="months">Remaining Months</Label>
            <Input id="months" type="number" placeholder="e.g., 300" value={remainingMonths} onChange={(e) => setRemainingMonths(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label htmlFor="lump">Lump Sum Payment ($)</Label>
            <Input id="lump" type="number" placeholder="e.g., 50000" value={lumpSum} onChange={(e) => setLumpSum(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
        </div>

        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Recast"}
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Monthly Payment</p>
                    <p className="text-3xl font-bold text-green-600">${result.newPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.newPayment.toFixed(2)}`, "New Payment")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({
                      title: "Mortgage Recast Calculator",
                      inputs: [
                        { label: "Current Balance", value: `$${currentBalance}` },
                        { label: "Interest Rate", value: `${interestRate}%` },
                        { label: "Lump Sum", value: `$${lumpSum}` },
                      ],
                      results: [
                        { label: "Current Payment", value: `$${result.currentPayment.toFixed(2)}` },
                        { label: "New Payment", value: `$${result.newPayment.toFixed(2)}` },
                        { label: "Monthly Savings", value: `$${result.monthlySavings.toFixed(2)}` },
                      ],
                    })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground">Current Payment</p><p className="text-xl font-semibold">${result.currentPayment.toFixed(2)}</p></div>
                  <div><p className="text-sm text-muted-foreground">Monthly Savings</p><p className="text-xl font-semibold text-green-600">${result.monthlySavings.toFixed(2)}</p></div>
                  <div><p className="text-sm text-muted-foreground">New Balance</p><p className="text-xl font-semibold">${result.newBalance.toLocaleString()}</p></div>
                  <div><p className="text-sm text-muted-foreground">Total Savings</p><p className="text-xl font-semibold text-green-600">${result.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default MortgageRecastCalculator;
