import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NetWorthCalculator = () => {
  const [cash, setCash] = useState("");
  const [investments, setInvestments] = useState("");
  const [property, setProperty] = useState("");
  const [otherAssets, setOtherAssets] = useState("");
  const [mortgage, setMortgage] = useState("");
  const [loans, setLoans] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [otherDebt, setOtherDebt] = useState("");
  const [result, setResult] = useState<{ assets: number; liabilities: number; netWorth: number } | null>(null);

  const calculate = () => {
    const totalAssets = 
      (parseFloat(cash) || 0) +
      (parseFloat(investments) || 0) +
      (parseFloat(property) || 0) +
      (parseFloat(otherAssets) || 0);

    const totalLiabilities =
      (parseFloat(mortgage) || 0) +
      (parseFloat(loans) || 0) +
      (parseFloat(creditCard) || 0) +
      (parseFloat(otherDebt) || 0);

    const netWorth = totalAssets - totalLiabilities;

    setResult({ assets: totalAssets, liabilities: totalLiabilities, netWorth });
  };

  const faqs = [
    {
      question: "What is net worth?",
      answer: "Net worth is the total value of your assets minus your liabilities. It's a snapshot of your financial health, showing what you would have left if you sold everything and paid off all debts."
    },
    {
      question: "What counts as assets?",
      answer: "Assets include cash, bank accounts, investments (stocks, bonds, retirement accounts), real estate, vehicles, jewelry, and other valuable possessions you own."
    },
    {
      question: "What counts as liabilities?",
      answer: "Liabilities are all your debts: mortgages, car loans, student loans, credit card balances, personal loans, and any other money you owe."
    },
    {
      question: "What is a good net worth for my age?",
      answer: "A common guideline is that by age 30, aim for your net worth to equal your annual salary. By 40, aim for 3x salary. By 50, aim for 6x. However, this varies greatly based on individual circumstances."
    }
  ];

  return (
    <CalculatorLayout
      title="Net Worth Calculator"
      description="Calculate your total net worth by tracking assets and liabilities"
      category="finance"
      calculatorId="net-worth"
      howItWorks="This calculator determines your net worth by subtracting your total liabilities (debts) from your total assets (what you own). Enter all your assets and debts to get a complete picture of your financial position. Net worth is a key indicator of financial health and progress toward financial goals."
      formula="Net Worth = Total Assets − Total Liabilities"
      faqs={faqs}
      seoTitle="Net Worth Calculator – Calculate Your Financial Worth | SmartCalc Hub"
      seoDescription="Free net worth calculator to track your assets and liabilities. Calculate your total financial worth instantly."
      keywords="net worth calculator, financial calculator, assets and liabilities, wealth calculator"
      canonicalUrl="https://smartcalhub.online/calculator/net-worth"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold mb-3 text-green-900 dark:text-green-100">Assets (What You Own)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cash & Bank Accounts ($)</Label>
                <Input
                  type="number"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Investments & Retirement ($)</Label>
                <Input
                  type="number"
                  value={investments}
                  onChange={(e) => setInvestments(e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Real Estate Value ($)</Label>
                <Input
                  type="number"
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Other Assets ($)</Label>
                <Input
                  type="number"
                  value={otherAssets}
                  onChange={(e) => setOtherAssets(e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
            <h3 className="font-semibold mb-3 text-red-900 dark:text-red-100">Liabilities (What You Owe)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mortgage Balance ($)</Label>
                <Input
                  type="number"
                  value={mortgage}
                  onChange={(e) => setMortgage(e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Car & Student Loans ($)</Label>
                <Input
                  type="number"
                  value={loans}
                  onChange={(e) => setLoans(e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Credit Card Debt ($)</Label>
                <Input
                  type="number"
                  value={creditCard}
                  onChange={(e) => setCreditCard(e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Other Debt ($)</Label>
                <Input
                  type="number"
                  value={otherDebt}
                  onChange={(e) => setOtherDebt(e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate Net Worth
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Your Net Worth</p>
                <p className={`text-4xl font-bold bg-gradient-to-r ${result.netWorth >= 0 ? 'from-green-600 to-green-400' : 'from-red-600 to-red-400'} bg-clip-text text-transparent`}>
                  ${result.netWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="pt-4 border-t border-border/50 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Assets:</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ${result.assets.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Liabilities:</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    ${result.liabilities.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default NetWorthCalculator;
