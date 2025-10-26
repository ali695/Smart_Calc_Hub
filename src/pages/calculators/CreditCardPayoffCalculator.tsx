import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreditCardPayoffCalculator = () => {
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [monthsToPayoff, setMonthsToPayoff] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPaid, setTotalPaid] = useState<number | null>(null);

  const calculatePayoff = () => {
    const bal = parseFloat(balance) || 0;
    const rate = (parseFloat(apr) || 0) / 100 / 12;
    const payment = parseFloat(monthlyPayment) || 0;
    
    if (bal > 0 && payment > 0) {
      if (payment <= bal * rate) {
        alert("Monthly payment must be greater than monthly interest to pay off the debt!");
        return;
      }
      
      let currentBalance = bal;
      let months = 0;
      let totalInterestPaid = 0;
      
      while (currentBalance > 0 && months < 600) {
        const interestCharge = currentBalance * rate;
        totalInterestPaid += interestCharge;
        currentBalance += interestCharge;
        
        const actualPayment = Math.min(payment, currentBalance);
        currentBalance -= actualPayment;
        months++;
      }
      
      setMonthsToPayoff(months);
      setTotalInterest(parseFloat(totalInterestPaid.toFixed(2)));
      setTotalPaid(parseFloat((bal + totalInterestPaid).toFixed(2)));
    }
  };

  const faqs = [
    {
      question: "Why does credit card debt take so long to pay off?",
      answer: "Credit cards typically have high interest rates (15-25% APR or more). When you make only minimum payments, most of your payment goes toward interest rather than reducing the principal balance, extending the payoff period significantly."
    },
    {
      question: "Should I pay more than the minimum payment?",
      answer: "Absolutely! Paying more than the minimum dramatically reduces the time to pay off your debt and the total interest paid. Even small additional amounts can make a big difference over time."
    },
    {
      question: "What's the best strategy to pay off multiple credit cards?",
      answer: "Two popular methods: Avalanche (pay highest interest rate first) saves the most money, or Snowball (pay smallest balance first) provides psychological wins. Either way, pay minimums on all cards while putting extra toward your target card."
    },
    {
      question: "Should I consider a balance transfer?",
      answer: "Balance transfer cards with 0% introductory APR can help you pay off debt faster since your payments go entirely to principal. However, watch for transfer fees (usually 3-5%) and make sure you can pay off the balance before the intro period ends."
    }
  ];

  return (
    <CalculatorLayout
      title="Credit Card Payoff Calculator"
      description="Calculate how long it will take to pay off your credit card debt"
      howItWorks="This credit card payoff calculator shows how long it will take to eliminate your credit card debt based on your current balance, APR (Annual Percentage Rate), and monthly payment. It also calculates the total interest you'll pay over the life of the debt. Use this to see how increasing your monthly payment can save you money and help you become debt-free faster."
      formula="Interest per month = Balance × (APR / 12) | Months to payoff depends on payment amount exceeding monthly interest charges"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="balance">Credit Card Balance ($)</Label>
            <Input
              id="balance"
              type="number"
              placeholder="5000"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apr">APR (%)</Label>
            <Input
              id="apr"
              type="number"
              step="0.01"
              placeholder="18.99"
              value={apr}
              onChange={(e) => setApr(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="monthlyPayment">Monthly Payment ($)</Label>
            <Input
              id="monthlyPayment"
              type="number"
              placeholder="200"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculatePayoff} className="w-full" size="lg">
          Calculate Payoff
        </Button>

        {monthsToPayoff !== null && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground">Time to Pay Off</p>
              <p className="text-4xl font-bold text-primary">
                {Math.floor(monthsToPayoff / 12)} years {monthsToPayoff % 12} months
              </p>
              <p className="text-lg mt-2">({monthsToPayoff} months total)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Original Balance</p>
                <p className="text-2xl font-bold">${parseFloat(balance || "0").toLocaleString()}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Total Interest</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">${totalInterest?.toLocaleString()}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Total Amount Paid</p>
                <p className="text-2xl font-bold">${totalPaid?.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Money-Saving Tip</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Increasing your monthly payment by just $50 could save you hundreds in interest and months of payments!
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CreditCardPayoffCalculator;
