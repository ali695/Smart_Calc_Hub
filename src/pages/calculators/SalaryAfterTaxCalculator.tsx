import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SalaryAfterTaxCalculator = () => {
  const [salary, setSalary] = useState("");
  const [taxRate, setTaxRate] = useState("22");
  const [period, setPeriod] = useState("yearly");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const grossSalary = parseFloat(salary) || 0;
    const rate = parseFloat(taxRate) / 100;

    const taxAmount = grossSalary * rate;
    const netSalary = grossSalary - taxAmount;

    const monthly = period === "yearly" ? netSalary / 12 : netSalary;
    const yearly = period === "yearly" ? netSalary : netSalary * 12;

    setResult({
      gross: grossSalary,
      taxAmount,
      net: netSalary,
      monthly,
      yearly,
      effectiveRate: rate * 100,
    });
  };

  const faqs = [
    {
      question: "What is take-home pay?",
      answer: "Take-home pay (net salary) is the amount you receive after all deductions including federal, state, and local taxes, Social Security, Medicare, and any other withholdings like retirement contributions or health insurance."
    },
    {
      question: "How do I calculate my after-tax salary?",
      answer: "Subtract your total tax percentage from your gross salary: Net Salary = Gross Salary × (1 - Tax Rate). For example, $60,000 with 22% tax: $60,000 × 0.78 = $46,800."
    },
    {
      question: "What is the average tax rate in the US?",
      answer: "The effective federal tax rate varies by income bracket, typically ranging from 10-37%. When including state taxes, Social Security, and Medicare, total effective rates often range from 15-35%."
    },
    {
      question: "Do I pay the same tax rate on all my income?",
      answer: "No, the US uses a progressive tax system. Different portions of your income are taxed at different rates (tax brackets). Only the income within each bracket is taxed at that bracket's rate."
    }
  ];

  return (
    <CalculatorLayout
      title="Salary After Tax Calculator"
      description="Calculate your take-home pay after federal and state tax deductions"
      category="finance"
      calculatorId="salary-after-tax"
      howItWorks="This calculator estimates your net salary (take-home pay) after tax deductions. Enter your gross salary and estimated tax rate to see your monthly and yearly income after taxes. Note: This is a simplified calculator. Actual taxes depend on many factors including deductions, credits, and filing status."
      formula="Net Salary = Gross Salary × (1 - Tax Rate)"
      faqs={faqs}
      seoTitle="Salary After Tax Calculator – Calculate Take-Home Pay | SmartCalc Hub"
      seoDescription="Free salary after tax calculator. Calculate your net income and take-home pay after federal and state tax deductions."
      keywords="salary calculator, take home pay, after tax salary, net income calculator, paycheck calculator"
      canonicalUrl="https://smartcalhub.online/finance/salary-after-tax-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Gross Salary ($)</Label>
            <Input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g., 60000"
              min="0"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Period</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Estimated Tax Rate (%)</Label>
            <Input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              placeholder="e.g., 22"
              min="0"
              max="100"
              step="0.1"
            />
            <p className="text-xs text-muted-foreground">
              Include federal, state, and FICA taxes (typical range: 15-35%)
            </p>
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate Take-Home Pay
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-border/50">
                <p className="text-sm font-medium text-muted-foreground">Net {period === "yearly" ? "Yearly" : "Monthly"} Salary</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  ${result.net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-muted-foreground">After {result.effectiveRate}% tax</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Gross Salary</p>
                  <p className="font-semibold">${result.gross.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tax Deducted</p>
                  <p className="font-semibold">${result.taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Monthly Take-Home</p>
                  <p className="font-semibold">${result.monthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Yearly Take-Home</p>
                  <p className="font-semibold">${result.yearly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center">
                  This is an estimate. Actual take-home pay varies based on deductions, credits, and local taxes.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default SalaryAfterTaxCalculator;
