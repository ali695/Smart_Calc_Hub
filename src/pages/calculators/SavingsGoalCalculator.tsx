import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SavingsGoalCalculator = () => {
  const [goalAmount, setGoalAmount] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthsNeeded, setMonthsNeeded] = useState<number | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [interestEarned, setInterestEarned] = useState<number | null>(null);

  const calculateSavingsGoal = () => {
    const goal = parseFloat(goalAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    
    if (goal > 0 && monthly > 0) {
      const remaining = goal - current;
      
      if (rate === 0) {
        const months = Math.ceil(remaining / monthly);
        setMonthsNeeded(months);
        setTotalContributions(parseFloat((monthly * months).toFixed(2)));
        setInterestEarned(0);
      } else {
        let months = 0;
        let balance = current;
        
        while (balance < goal && months < 1200) {
          balance += monthly;
          balance += balance * rate;
          months++;
        }
        
        const contributions = monthly * months;
        const interest = goal - current - contributions;
        
        setMonthsNeeded(months);
        setTotalContributions(parseFloat(contributions.toFixed(2)));
        setInterestEarned(parseFloat(Math.max(interest, 0).toFixed(2)));
      }
    }
  };

  const faqs = [
    {
      question: "How does compound interest help reach savings goals faster?",
      answer: "Compound interest means you earn interest on both your principal and previously earned interest. This creates exponential growth over time, helping you reach your savings goals faster than with simple interest or no interest at all."
    },
    {
      question: "What if I can't save every month consistently?",
      answer: "This calculator assumes consistent monthly contributions. If your contributions vary, your timeline will differ. Try to automate your savings to maintain consistency, even if you start with a smaller amount."
    },
    {
      question: "What's a realistic interest rate for savings?",
      answer: "High-yield savings accounts typically offer 1-5% annually, while investment accounts may average 7-10% long-term but with more risk and variability. Use conservative estimates for important goals."
    },
    {
      question: "Should I prioritize paying off debt or saving?",
      answer: "Generally, pay off high-interest debt first (credit cards, personal loans). Once high-interest debt is cleared, balance debt payments with savings, especially if your employer offers a 401(k) match."
    }
  ];

  return (
    <CalculatorLayout
      title="Savings Goal Calculator"
      description="Calculate how long it will take to reach your savings goal"
      howItWorks="This savings goal calculator helps you determine how many months you need to reach your financial target. Enter your goal amount, current savings, monthly contribution, and expected interest rate. The calculator will show how long it will take, total contributions needed, and interest earned along the way."
      formula="Future Value = Current Savings × (1 + r)^n + Monthly Payment × [((1 + r)^n - 1) / r], where r is monthly interest rate and n is number of months"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="goalAmount">Savings Goal ($)</Label>
            <Input
              id="goalAmount"
              type="number"
              placeholder="20000"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currentSavings">Current Savings ($)</Label>
            <Input
              id="currentSavings"
              type="number"
              placeholder="5000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              placeholder="500"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              placeholder="5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculateSavingsGoal} className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" size="lg">
          Calculate Timeline
        </Button>

        {monthsNeeded !== null && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 rounded-lg border border-primary text-center hover:scale-[1.02] transition-all duration-300">
              <p className="text-sm font-medium text-muted-foreground">Time to Reach Goal</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {Math.floor(monthsNeeded / 12)} years {monthsNeeded % 12} months
              </p>
              <p className="text-lg mt-2">({monthsNeeded} months total)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Goal Amount</p>
                <p className="text-2xl font-bold">${parseFloat(goalAmount || "0").toLocaleString()}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Total Contributions</p>
                <p className="text-2xl font-bold">${totalContributions?.toLocaleString()}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Interest Earned</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${interestEarned?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default SavingsGoalCalculator;
