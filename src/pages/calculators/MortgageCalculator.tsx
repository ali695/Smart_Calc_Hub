import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { safeParseFloat } from "@/lib/validation";
import { toast } from "sonner";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("300000");
  const [downPayment, setDownPayment] = useState("60000");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("6.5");
  const [propertyTax, setPropertyTax] = useState("3000");
  const [homeInsurance, setHomeInsurance] = useState("1200");
  const [pmi, setPmi] = useState("0");

  const calculateMortgage = () => {
    const priceValue = safeParseFloat(homePrice);
    const downValue = safeParseFloat(downPayment);
    const rateValue = safeParseFloat(interestRate);
    const termValue = safeParseFloat(loanTerm);
    const taxValue = safeParseFloat(propertyTax);
    const insuranceValue = safeParseFloat(homeInsurance);
    const pmiValue = safeParseFloat(pmi);

    if (priceValue === null || downValue === null || rateValue === null || termValue === null ||
        taxValue === null || insuranceValue === null || pmiValue === null) {
      toast.error("Please enter valid numbers for all fields");
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0, principalAndInterest: 0 };
    }

    if (priceValue <= 0 || termValue <= 0) {
      toast.error("Home price and loan term must be greater than 0");
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0, principalAndInterest: 0 };
    }

    const principal = priceValue - downValue;
    if (principal <= 0) {
      toast.error("Down payment cannot be greater than or equal to home price");
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0, principalAndInterest: 0 };
    }

    const rate = rateValue / 100 / 12;
    const months = termValue * 12;
    const tax = taxValue / 12;
    const insurance = insuranceValue / 12;

    const monthlyPrincipalInterest = principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const monthlyPayment = monthlyPrincipalInterest + tax + insurance + pmiValue;
    const totalPayment = (monthlyPrincipalInterest * months) + (tax * months) + (insurance * months) + (pmiValue * months);
    const totalInterest = (monthlyPrincipalInterest * months) - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      principalAndInterest: monthlyPrincipalInterest
    };
  };

  const result = calculateMortgage();

  const faqs = [
    {
      question: "What is included in my monthly mortgage payment?",
      answer: "Your monthly mortgage payment typically includes principal and interest (P&I), property taxes, homeowners insurance, and potentially private mortgage insurance (PMI) if your down payment is less than 20%."
    },
    {
      question: "What is PMI and when is it required?",
      answer: "PMI (Private Mortgage Insurance) is typically required when your down payment is less than 20% of the home's value. It protects the lender if you default on the loan and usually costs 0.5% to 1% of the loan amount annually."
    },
    {
      question: "How does the loan term affect my payment?",
      answer: "A longer loan term (like 30 years) results in lower monthly payments but higher total interest. A shorter term (like 15 years) means higher monthly payments but less interest paid over the life of the loan."
    },
    {
      question: "Should I make a larger down payment?",
      answer: "A larger down payment reduces your loan amount, monthly payments, and may help you avoid PMI. However, you should also consider keeping emergency funds and other financial goals when deciding on down payment size."
    }
  ];

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payment including principal, interest, taxes, and insurance"
      seoTitle="Mortgage Calculator - Calculate Home Loan Payments | SmartCalc Hub"
      seoDescription="Free mortgage calculator to estimate your monthly home loan payments including principal, interest, taxes, and insurance (PITI). Plan your home purchase with confidence."
      keywords="mortgage calculator, home loan calculator, mortgage payment, PITI calculator, home affordability calculator, monthly mortgage payment"
      canonicalUrl="https://smartcalchub.com/calculator/mortgage"
      category="finance"
      howItWorks="This calculator helps you estimate your monthly mortgage payment based on the home price, down payment, interest rate, and loan term. It includes additional costs like property taxes, homeowners insurance, and PMI to give you a complete picture of your monthly housing expense."
      formula="M = P[r(1+r)^n]/[(1+r)^n-1] + Taxes + Insurance + PMI, where P is principal, r is monthly interest rate, and n is number of months"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="homePrice">Home Price ($)</Label>
            <Input
              id="homePrice"
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              placeholder="300000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="downPayment">Down Payment ($)</Label>
            <Input
              id="downPayment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="60000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term (years)</Label>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="6.5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyTax">Annual Property Tax ($)</Label>
            <Input
              id="propertyTax"
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              placeholder="3000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="homeInsurance">Annual Home Insurance ($)</Label>
            <Input
              id="homeInsurance"
              type="number"
              value={homeInsurance}
              onChange={(e) => setHomeInsurance(e.target.value)}
              placeholder="1200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pmi">Monthly PMI ($)</Label>
            <Input
              id="pmi"
              type="number"
              value={pmi}
              onChange={(e) => setPmi(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-xl font-semibold mb-4">Monthly Payment Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Principal & Interest:</span>
              <span className="font-semibold">${result.principalAndInterest.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Property Tax:</span>
              <span className="font-semibold">${((parseFloat(propertyTax) || 0) / 12).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Home Insurance:</span>
              <span className="font-semibold">${((parseFloat(homeInsurance) || 0) / 12).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">PMI:</span>
              <span className="font-semibold">${(parseFloat(pmi) || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg pt-2">
              <span className="font-bold">Total Monthly Payment:</span>
              <span className="font-bold text-primary text-2xl">${result.monthlyPayment.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount Paid:</span>
              <span className="font-semibold">${result.totalPayment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Interest Paid:</span>
              <span className="font-semibold">${result.totalInterest.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Loan Amount:</span>
              <span className="font-semibold">${((parseFloat(homePrice) || 0) - (parseFloat(downPayment) || 0)).toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default MortgageCalculator;
