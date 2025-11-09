import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { safeParseFloat } from "@/lib/validation";
import { toast } from "sonner";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("200");
  const [interestRate, setInterestRate] = useState("7");
  const [years, setYears] = useState("10");
  const [compoundFrequency, setCompoundFrequency] = useState("12");

  const calculateCompoundInterest = () => {
    const pValue = safeParseFloat(principal);
    const pmtValue = safeParseFloat(monthlyContribution);
    const rValue = safeParseFloat(interestRate);
    const tValue = safeParseFloat(years);
    const nValue = safeParseFloat(compoundFrequency);

    if (pValue === null || pmtValue === null || rValue === null || tValue === null || nValue === null) {
      toast.error("Please enter valid numbers for all fields");
      return { futureValue: 0, totalContributions: 0, totalInterest: 0 };
    }

    if (pValue <= 0 || tValue <= 0) {
      toast.error("Principal and time period must be greater than 0");
      return { futureValue: 0, totalContributions: 0, totalInterest: 0 };
    }

    const p = pValue;
    const pmt = pmtValue;
    const r = rValue / 100;
    const t = tValue;
    const n = nValue;

    // Future value of initial principal
    const fvPrincipal = p * Math.pow(1 + r / n, n * t);
    
    // Future value of monthly contributions (annuity)
    const monthlyRate = r / 12;
    const months = t * 12;
    let fvContributions = 0;
    
    if (pmt > 0 && monthlyRate > 0) {
      fvContributions = pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else if (pmt > 0) {
      fvContributions = pmt * months;
    }

    const futureValue = fvPrincipal + fvContributions;
    const totalContributions = p + (pmt * months);
    const totalInterest = futureValue - totalContributions;

    return {
      futureValue,
      totalContributions,
      totalInterest
    };
  };

  const result = calculateCompoundInterest();

  const faqs = [
    {
      question: "What is compound interest?",
      answer: "Compound interest is interest calculated on the initial principal and on the accumulated interest from previous periods. It's 'interest on interest' and makes your money grow faster than simple interest."
    },
    {
      question: "How does compounding frequency affect my returns?",
      answer: "More frequent compounding (daily vs. annually) results in higher returns. This is because interest is calculated and added to the principal more often, creating a snowball effect. However, the difference becomes less significant at lower interest rates."
    },
    {
      question: "Should I make regular contributions?",
      answer: "Yes! Regular contributions can significantly boost your investment growth through dollar-cost averaging and the power of compound interest. Even small monthly contributions can add up substantially over time."
    },
    {
      question: "What's a realistic interest rate for investments?",
      answer: "Historical stock market returns average around 7-10% annually, while savings accounts and bonds offer lower but more stable returns (1-5%). Your actual returns will vary based on your investment strategy and market conditions."
    }
  ];

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate how your investments grow over time with compound interest"
      seoTitle="Compound Interest Calculator - Investment Growth Calculator | SmartCalc Hub"
      seoDescription="Free compound interest calculator to see how your investments grow over time. Calculate returns with different compounding frequencies. Perfect for retirement planning and savings goals."
      keywords="compound interest calculator, investment calculator, compound interest, savings calculator, investment growth, retirement calculator"
      canonicalUrl="https://smartcalchub.com/calculator/compound-interest"
      howItWorks="This calculator shows how your initial investment and regular contributions grow over time through the power of compound interest. The compounding frequency determines how often interest is calculated and added back to your principal, affecting your total returns."
      formula="FV = P(1 + r/n)^(nt) + PMT × [(1 + r/n)^(nt) - 1] / (r/n), where P is principal, r is annual rate, n is compound frequency, t is time in years, and PMT is periodic payment"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="principal">Initial Investment ($)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="10000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="7"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Investment Period (years)</Label>
            <Input
              id="years"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compoundFrequency">Compound Frequency</Label>
            <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Annually</SelectItem>
                <SelectItem value="4">Quarterly</SelectItem>
                <SelectItem value="12">Monthly</SelectItem>
                <SelectItem value="365">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
          <h3 className="text-xl font-semibold mb-4">Investment Growth Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg pb-3 border-b">
              <span className="font-bold">Future Value:</span>
              <span className="font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent text-2xl">${result.futureValue.toFixed(2)}</span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Initial Investment:</span>
                <span className="font-semibold">${parseFloat(principal || "0").toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Contributions:</span>
                <span className="font-semibold">${((parseFloat(monthlyContribution) || 0) * (parseFloat(years) || 0) * 12).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-muted-foreground">Total Principal:</span>
                <span className="font-semibold">${result.totalContributions.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-semibold">Total Interest Earned:</span>
                <span className="font-bold text-green-600 dark:text-green-400">${result.totalInterest.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-background rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Return on Investment</div>
                  <div className="text-lg font-bold">
                    {result.totalContributions > 0 
                      ? ((result.totalInterest / result.totalContributions) * 100).toFixed(1)
                      : 0}%
                  </div>
                </div>
                <div className="p-3 bg-background rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Effective Rate</div>
                  <div className="text-lg font-bold">
                    {parseFloat(years) > 0 && result.totalContributions > 0
                      ? (((result.futureValue - result.totalContributions) / result.totalContributions / parseFloat(years)) * 100).toFixed(2)
                      : 0}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default CompoundInterestCalculator;
