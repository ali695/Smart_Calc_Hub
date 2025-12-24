import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const CarLoanCalculator = () => {
  const [carPrice, setCarPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [tradeInValue, setTradeInValue] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalLoanAmount, setTotalLoanAmount] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const { updateAIInsight } = useCalculatorEnhancements();

  const calculateCarLoan = () => {
    const price = parseFloat(carPrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const tradeIn = parseFloat(tradeInValue) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const months = parseFloat(loanTerm) || 0;
    
    if (price > 0 && months > 0) {
      const loanAmount = price - down - tradeIn;
      
      if (loanAmount <= 0) {
        setMonthlyPayment(0);
        setTotalLoanAmount(0);
        setTotalInterest(0);
        setTotalCost(price);
        return;
      }
      
      let monthly;
      if (rate === 0) {
        monthly = loanAmount / months;
      } else {
        monthly = (loanAmount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      }
      
      const total = monthly * months;
      const interest = total - loanAmount;
      
      const finalMonthly = parseFloat(monthly.toFixed(2));
      const finalLoanAmount = parseFloat(loanAmount.toFixed(2));
      const finalInterest = parseFloat(interest.toFixed(2));
      const finalTotalCost = parseFloat((total + down + tradeIn).toFixed(2));
      
      setMonthlyPayment(finalMonthly);
      setTotalLoanAmount(finalLoanAmount);
      setTotalInterest(finalInterest);
      setTotalCost(finalTotalCost);
      
      // Update AI insight with calculation data
      updateAIInsight(
        { 
          carPrice: price, 
          downPayment: down, 
          tradeInValue: tradeIn, 
          interestRate: parseFloat(interestRate), 
          loanTermMonths: months 
        },
        { 
          monthlyPayment: finalMonthly,
          loanAmount: finalLoanAmount,
          totalInterest: finalInterest,
          totalCost: finalTotalCost,
          loanTermYears: (months / 12).toFixed(1)
        }
      );
    }
  };

  const faqs = [
    {
      question: "How much should I put down on a car?",
      answer: "Financial experts typically recommend putting down at least 20% on a new car and 10% on a used car. A larger down payment reduces your loan amount, monthly payments, and total interest paid. It also helps prevent being 'underwater' on your loan."
    },
    {
      question: "What's a good interest rate for a car loan?",
      answer: "Car loan rates vary based on credit score, loan term, and whether the car is new or used. As of 2024, good rates range from 3-6% for new cars with excellent credit. Used cars typically have slightly higher rates. Shop around with multiple lenders."
    },
    {
      question: "Should I trade in my old car or sell it privately?",
      answer: "Selling privately usually gets you more money, but trading in is more convenient. Get quotes from multiple dealers and compare with private sale estimates. Consider the time and effort versus potential extra profit."
    },
    {
      question: "What loan term should I choose?",
      answer: "Shorter terms (36-48 months) mean higher monthly payments but less total interest. Longer terms (60-72 months) have lower monthly payments but cost more overall. Avoid terms longer than the car's warranty period if possible."
    }
  ];

  return (
    <CalculatorLayout
      title="Car Loan Calculator"
      description="Calculate monthly payments and total cost for your auto loan"
      howItWorks="This car loan calculator helps you estimate your monthly car payment and total loan cost. Enter the car price, down payment, trade-in value (if any), interest rate, and loan term. The calculator shows your monthly payment, total loan amount, total interest paid, and overall cost of the vehicle including your down payment and trade-in."
      formula="Monthly Payment = [Loan Amount × r × (1 + r)^n] / [(1 + r)^n - 1], where Loan Amount = Car Price - Down Payment - Trade-in, r = monthly interest rate, n = number of months"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="carPrice">Car Price ($)</Label>
            <Input
              id="carPrice"
              type="number"
              placeholder="30000"
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="downPayment">Down Payment ($)</Label>
            <Input
              id="downPayment"
              type="number"
              placeholder="6000"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tradeInValue">Trade-In Value ($)</Label>
            <Input
              id="tradeInValue"
              type="number"
              placeholder="5000"
              value={tradeInValue}
              onChange={(e) => setTradeInValue(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.01"
              placeholder="5.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="loanTerm">Loan Term (months)</Label>
            <Input
              id="loanTerm"
              type="number"
              placeholder="60"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
            />
          </div>
        </div>

        <Button type="button" onClick={calculateCarLoan} className="w-full" size="lg">
          Calculate Car Loan
        </Button>

        {monthlyPayment !== null && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground">Monthly Payment</p>
              <p className="text-4xl font-bold text-primary">${monthlyPayment.toLocaleString()}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground mb-1">Loan Amount</p>
                <p className="text-lg font-bold">${totalLoanAmount?.toLocaleString()}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground mb-1">Total Interest</p>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">${totalInterest?.toLocaleString()}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground mb-1">Down + Trade-In</p>
                <p className="text-lg font-bold">${((parseFloat(downPayment) || 0) + (parseFloat(tradeInValue) || 0)).toLocaleString()}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground mb-1">Total Cost</p>
                <p className="text-lg font-bold">${totalCost?.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Car Price:</span>
                <span className="font-semibold">${parseFloat(carPrice || "0").toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Loan Term:</span>
                <span className="font-semibold">{loanTerm} months ({(parseFloat(loanTerm) / 12).toFixed(1)} years)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Interest Rate:</span>
                <span className="font-semibold">{interestRate}% APR</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CarLoanCalculator;
