import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { schemas, validateInput, safeParseFloat } from "@/lib/validation";
import { toast } from "sonner";
import { z } from "zod";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";
import { CalculatorChart } from "@/components/CalculatorChart";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculateLoan = () => {
    const principalValue = safeParseFloat(principal);
    const rateValue = safeParseFloat(rate);
    const yearsValue = safeParseFloat(years);

    if (principalValue === null || rateValue === null || yearsValue === null) {
      toast.error("Please enter valid numbers for all fields");
      return;
    }

    try {
      const validatedData = validateInput(schemas.loan, { principal: principalValue, interestRate: rateValue, years: yearsValue });
      const p = validatedData.principal;
      const r = validatedData.interestRate / 100 / 12;
      const n = validatedData.years * 12;

      let monthly;
      if (r === 0) {
        monthly = p / n;
      } else {
        monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
      
      const total = monthly * n;
      const interest = total - p;

      setMonthlyPayment(parseFloat(monthly.toFixed(2)));
      setTotalPayment(parseFloat(total.toFixed(2)));
      setTotalInterest(parseFloat(interest.toFixed(2)));

      // Update AI insight
      updateAIInsight(
        { loanAmount: p, interestRate: rateValue, loanTerm: yearsValue },
        { 
          monthlyPayment: monthly.toFixed(2),
          totalPayment: total.toFixed(2),
          totalInterest: interest.toFixed(2),
          interestToLoanRatio: ((interest / p) * 100).toFixed(1) + "%"
        }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  const faqs = [
    {
      question: "What is a loan calculator used for?",
      answer: "A loan calculator helps you estimate your monthly loan payments, total payment amount, and total interest paid over the life of the loan. It's useful for planning mortgages, auto loans, personal loans, and other types of financing."
    },
    {
      question: "How is the monthly payment calculated?",
      answer: "The monthly payment is calculated using the loan amount (principal), annual interest rate, and loan term. The formula accounts for the principal repayment and interest charges, ensuring the loan is fully paid off by the end of the term."
    },
    {
      question: "What's the difference between interest rate and APR?",
      answer: "The interest rate is the cost of borrowing the principal amount. APR (Annual Percentage Rate) includes the interest rate plus additional fees and costs. This calculator uses the basic interest rate."
    },
    {
      question: "Can I pay off my loan early?",
      answer: "Many loans allow early repayment, but some may have prepayment penalties. Check your loan agreement for specific terms. Paying off early can save you money on interest charges."
    }
  ];

  return (
    <CalculatorLayout
      title="Loan Calculator"
      description="Calculate monthly payments, total interest, and amortization for any loan"
      seoTitle="Loan Calculator - Calculate Monthly Payments & Interest | SmartCalc Hub"
      seoDescription="Free loan calculator to calculate monthly payments, total interest, and loan amortization. Plan your finances with accurate loan estimates. Works for personal loans, auto loans, and more."
      keywords="loan calculator, monthly payment calculator, loan payment, interest calculator, amortization calculator, personal loan calculator"
      canonicalUrl="https://smartcalchub.com/calculator/loan"
      category="finance"
      calculatorId="loan"
      howItWorks="The loan calculator determines your monthly payment based on the loan amount (principal), annual interest rate, and loan term in years. It uses the standard amortization formula to calculate fixed monthly payments that will fully repay the loan by the end of the term. The calculator also shows you the total amount you'll pay and how much of that is interest."
      formula="M = P × [r(1 + r)^n] / [(1 + r)^n - 1], where M = monthly payment, P = principal, r = monthly interest rate, n = number of payments"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="principal">Loan Amount ($)</Label>
            <Input
              id="principal"
              type="number"
              placeholder="10000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculateLoan)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rate">Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              placeholder="5.5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculateLoan)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="years">Loan Term (years)</Label>
            <Input
              id="years"
              type="number"
              placeholder="5"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculateLoan)}
            />
          </div>
        </div>

        <Button 
          type="button"
          onClick={() => handleCalculation(calculateLoan)} 
          className="w-full" 
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate Loan"
          )}
        </Button>

        {monthlyPayment !== null && (
          <>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="text-3xl font-bold">${monthlyPayment.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(`$${monthlyPayment.toLocaleString()}`, "Monthly Payment")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => printCalculation({
                          title: "Loan Calculator",
                          inputs: [
                            { label: "Loan Amount", value: `$${principal}` },
                            { label: "Interest Rate", value: `${rate}%` },
                            { label: "Loan Term", value: `${years} years` }
                          ],
                          results: [
                            { label: "Monthly Payment", value: `$${monthlyPayment.toLocaleString()}` },
                            { label: "Total Payment", value: `$${totalPayment?.toLocaleString()}` },
                            { label: "Total Interest", value: `$${totalInterest?.toLocaleString()}` }
                          ],
                          formula: "M = P × [r(1 + r)^n] / [(1 + r)^n - 1]"
                        })}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Payment</p>
                      <p className="text-xl font-semibold">${totalPayment?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-xl font-semibold">${totalInterest?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <CalculatorChart
              chartType="pie"
              data={[
                { name: "Principal", value: safeParseFloat(principal) || 0 },
                { name: "Interest", value: totalInterest || 0 }
              ]}
              title="Loan Breakdown"
            />
          </>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default LoanCalculator;
