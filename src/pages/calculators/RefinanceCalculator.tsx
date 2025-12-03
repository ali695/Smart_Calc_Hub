import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const RefinanceCalculator = () => {
  const [currentBalance, setCurrentBalance] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [currentMonthsLeft, setCurrentMonthsLeft] = useState("");
  const [newRate, setNewRate] = useState("");
  const [newTerm, setNewTerm] = useState("");
  const [closingCosts, setClosingCosts] = useState("");
  const [result, setResult] = useState<{
    currentPayment: number;
    newPayment: number;
    monthlySavings: number;
    breakEvenMonths: number;
    totalSavings: number;
    totalInterestCurrent: number;
    totalInterestNew: number;
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const balance = parseFloat(currentBalance);
    const oldRate = parseFloat(currentRate) / 100 / 12;
    const oldMonths = parseInt(currentMonthsLeft);
    const nRate = parseFloat(newRate) / 100 / 12;
    const nMonths = parseInt(newTerm) * 12;
    const costs = parseFloat(closingCosts) || 0;

    if (!balance || !oldRate || !oldMonths || !nRate || !nMonths) return;

    const currentPayment = (balance * oldRate * Math.pow(1 + oldRate, oldMonths)) / (Math.pow(1 + oldRate, oldMonths) - 1);
    const newPayment = (balance * nRate * Math.pow(1 + nRate, nMonths)) / (Math.pow(1 + nRate, nMonths) - 1);
    const monthlySavings = currentPayment - newPayment;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(costs / monthlySavings) : 0;
    const totalInterestCurrent = (currentPayment * oldMonths) - balance;
    const totalInterestNew = (newPayment * nMonths) - balance;
    const totalSavings = totalInterestCurrent - totalInterestNew - costs;

    setResult({ currentPayment, newPayment, monthlySavings, breakEvenMonths, totalSavings, totalInterestCurrent, totalInterestNew });
  };

  const faqs = [
    {
      question: "When does refinancing make sense?",
      answer: "Refinancing makes sense when you can lower your rate by at least 0.5-1%, plan to stay in the home past the break-even point, or need to change your loan term."
    },
    {
      question: "What is the break-even point?",
      answer: "The break-even point is when your monthly savings equal the closing costs. After this, you start saving money with the new loan."
    },
  ];

  return (
    <CalculatorLayout
      title="Refinance Calculator"
      description="Compare your current mortgage to a refinanced loan and see if refinancing makes sense."
      category="finance"
      calculatorId="refinance"
      howItWorks="Enter your current loan details and potential new loan terms. The calculator shows monthly savings, break-even point, and total savings."
      formula="Break-Even = Closing Costs / Monthly Savings"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="balance">Current Balance ($)</Label>
            <Input id="balance" type="number" placeholder="e.g., 300000" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label htmlFor="currentRate">Current Rate (%)</Label>
            <Input id="currentRate" type="number" step="0.01" placeholder="e.g., 7.0" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label htmlFor="currentMonths">Months Remaining</Label>
            <Input id="currentMonths" type="number" placeholder="e.g., 300" value={currentMonthsLeft} onChange={(e) => setCurrentMonthsLeft(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label htmlFor="newRate">New Rate (%)</Label>
            <Input id="newRate" type="number" step="0.01" placeholder="e.g., 6.0" value={newRate} onChange={(e) => setNewRate(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label htmlFor="newTerm">New Term (Years)</Label>
            <Input id="newTerm" type="number" placeholder="e.g., 30" value={newTerm} onChange={(e) => setNewTerm(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label htmlFor="costs">Closing Costs ($)</Label>
            <Input id="costs" type="number" placeholder="e.g., 5000" value={closingCosts} onChange={(e) => setClosingCosts(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
        </div>

        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Compare Loans"}
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className={`text-3xl font-bold ${result.monthlySavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${Math.abs(result.monthlySavings).toFixed(2)}{result.monthlySavings < 0 ? ' (higher)' : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.monthlySavings.toFixed(2)}`, "Monthly Savings")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({
                      title: "Refinance Calculator",
                      inputs: [
                        { label: "Current Balance", value: `$${currentBalance}` },
                        { label: "Current Rate", value: `${currentRate}%` },
                        { label: "New Rate", value: `${newRate}%` },
                      ],
                      results: [
                        { label: "Current Payment", value: `$${result.currentPayment.toFixed(2)}` },
                        { label: "New Payment", value: `$${result.newPayment.toFixed(2)}` },
                        { label: "Break-Even", value: `${result.breakEvenMonths} months` },
                      ],
                    })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground">Current Payment</p><p className="text-xl font-semibold">${result.currentPayment.toFixed(2)}</p></div>
                  <div><p className="text-sm text-muted-foreground">New Payment</p><p className="text-xl font-semibold">${result.newPayment.toFixed(2)}</p></div>
                  <div><p className="text-sm text-muted-foreground">Break-Even Point</p><p className="text-xl font-semibold">{result.breakEvenMonths} months</p></div>
                  <div><p className="text-sm text-muted-foreground">Total Savings</p><p className={`text-xl font-semibold ${result.totalSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>${result.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default RefinanceCalculator;
