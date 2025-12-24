import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const BudgetPlannerCalculator = () => {
  const { updateAIInsight } = useCalculatorEnhancements();
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [housing, setHousing] = useState("");
  const [transportation, setTransportation] = useState("");
  const [food, setFood] = useState("");
  const [utilities, setUtilities] = useState("");
  const [other, setOther] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const housingCost = parseFloat(housing) || 0;
    const transportCost = parseFloat(transportation) || 0;
    const foodCost = parseFloat(food) || 0;
    const utilitiesCost = parseFloat(utilities) || 0;
    const otherCost = parseFloat(other) || 0;

    const totalExpenses = housingCost + transportCost + foodCost + utilitiesCost + otherCost;
    const remaining = income - totalExpenses;
    const savingsRate = income > 0 ? ((remaining / income) * 100) : 0;

    const resultData = {
      income,
      totalExpenses,
      remaining,
      savingsRate,
      housingPercent: income > 0 ? ((housingCost / income) * 100) : 0,
      transportPercent: income > 0 ? ((transportCost / income) * 100) : 0,
      foodPercent: income > 0 ? ((foodCost / income) * 100) : 0,
    };
    setResult(resultData);
    updateAIInsight(
      { monthlyIncome: income, housing: housingCost, transportation: transportCost, food: foodCost, utilities: utilitiesCost, other: otherCost },
      { totalExpenses, remaining, savingsRate: savingsRate.toFixed(1) + "%", housingPercent: resultData.housingPercent.toFixed(1) + "%" }
    );
  };

  const faqs = [
    {
      question: "What is the 50/30/20 budget rule?",
      answer: "The 50/30/20 rule suggests allocating 50% of income to needs (housing, utilities, food), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment."
    },
    {
      question: "How much should I spend on housing?",
      answer: "Financial experts typically recommend keeping housing costs below 30% of your gross monthly income to maintain financial stability and allow room for other expenses and savings."
    },
    {
      question: "What percentage should I save each month?",
      answer: "Most financial advisors recommend saving at least 20% of your income. However, if you have high-interest debt, focus on paying that down first before maximizing savings."
    },
    {
      question: "How do I reduce monthly expenses?",
      answer: "Track all spending for a month, identify non-essential expenses, negotiate bills (insurance, phone), reduce dining out, use coupons, and consider refinancing high-interest debt."
    }
  ];

  return (
    <CalculatorLayout
      title="Budget Planner Calculator"
      description="Plan your monthly budget and track expenses vs income with financial insights"
      category="finance"
      calculatorId="budget-planner"
      howItWorks="This budget planner helps you track monthly income and expenses across different categories. It calculates your remaining balance, savings rate, and shows what percentage of your income goes to each expense category."
      formula="Remaining = Income - Total Expenses | Savings Rate = (Remaining / Income) × 100%"
      faqs={faqs}
      seoTitle="Budget Planner Calculator – Monthly Budget Planning Tool | SmartCalc Hub"
      seoDescription="Free budget planner calculator. Track income, expenses, and savings rate to manage your finances better."
      keywords="budget calculator, budget planner, monthly budget, expense tracker, savings calculator"
      canonicalUrl="https://smartcalhub.online/finance/budget-planner-calculator"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Monthly Income ($)</Label>
            <Input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              placeholder="e.g., 5000"
              min="0"
              step="any"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Housing ($)</Label>
              <Input
                type="number"
                value={housing}
                onChange={(e) => setHousing(e.target.value)}
                placeholder="Rent/Mortgage"
                min="0"
                step="any"
              />
            </div>

            <div className="space-y-2">
              <Label>Transportation ($)</Label>
              <Input
                type="number"
                value={transportation}
                onChange={(e) => setTransportation(e.target.value)}
                placeholder="Car/Transit"
                min="0"
                step="any"
              />
            </div>

            <div className="space-y-2">
              <Label>Food ($)</Label>
              <Input
                type="number"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                placeholder="Groceries/Dining"
                min="0"
                step="any"
              />
            </div>

            <div className="space-y-2">
              <Label>Utilities ($)</Label>
              <Input
                type="number"
                value={utilities}
                onChange={(e) => setUtilities(e.target.value)}
                placeholder="Electric/Water/Internet"
                min="0"
                step="any"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Other Expenses ($)</Label>
              <Input
                type="number"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                placeholder="Entertainment/Insurance"
                min="0"
                step="any"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate Budget
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-border/50">
                <p className="text-sm font-medium text-muted-foreground">Budget Summary</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  ${result.remaining.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {result.remaining >= 0 ? "Remaining/Savings" : "Budget Deficit"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Income</p>
                  <p className="font-semibold">${result.income.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Expenses</p>
                  <p className="font-semibold">${result.totalExpenses.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Savings Rate</p>
                  <p className="font-semibold">{result.savingsRate.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Housing %</p>
                  <p className="font-semibold">{result.housingPercent.toFixed(1)}%</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center">
                  {result.savingsRate >= 20 
                    ? "✓ Great job! You're saving 20%+ of your income." 
                    : result.savingsRate >= 10
                    ? "Good start. Try to reach 20% savings rate."
                    : "Consider reducing expenses to increase savings."}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BudgetPlannerCalculator;
