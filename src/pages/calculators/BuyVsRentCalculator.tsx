import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const BuyVsRentCalculator = () => {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("20");
  const [interestRate, setInterestRate] = useState("6.5");
  const [propertyTax, setPropertyTax] = useState("1.2");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [years, setYears] = useState("30");
  const [result, setResult] = useState<{ buyTotal: number; rentTotal: number; recommendation: string; savings: number } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const price = parseFloat(homePrice);
    const dp = parseFloat(downPayment) / 100;
    const rate = parseFloat(interestRate) / 100 / 12;
    const tax = parseFloat(propertyTax) / 100;
    const rent = parseFloat(monthlyRent);
    const n = parseFloat(years) * 12;

    if (!price || !rent || price <= 0 || rent <= 0) return;

    const loanAmount = price * (1 - dp);
    const mortgage = loanAmount * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    const monthlyTax = (price * tax) / 12;
    const insurance = (price * 0.005) / 12;
    const totalMonthlyBuy = mortgage + monthlyTax + insurance;
    const buyTotal = totalMonthlyBuy * n + (price * dp);

    const rentTotal = rent * n * 1.03; // 3% annual rent increase

    const recommendation = buyTotal < rentTotal ? "Buying" : "Renting";
    const savings = Math.abs(buyTotal - rentTotal);

    setResult({ buyTotal, rentTotal, recommendation, savings });
  };

  const faqs = [
    { question: "Should I buy or rent?", answer: "This depends on home prices, rent costs, interest rates, how long you plan to stay, and local market conditions. Generally, buying is better for long-term stays." }
  ];

  return (
    <CalculatorLayout title="Buy vs Rent Calculator" description="Compare the costs of buying vs renting a home." category="finance" calculatorId="buy-vs-rent" howItWorks="Enter home price, rent, and other details to compare costs over time." formula="Total Cost of Buying = Down Payment + (Monthly Mortgage + Taxes + Insurance) × Months" faqs={faqs}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Home Price ($)</Label><Input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} placeholder="e.g., 400000" /></div>
          <div><Label>Down Payment (%)</Label><Input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="20" /></div>
          <div><Label>Interest Rate (%)</Label><Input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="6.5" step="0.1" /></div>
          <div><Label>Property Tax (%/year)</Label><Input type="number" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} placeholder="1.2" step="0.1" /></div>
          <div><Label>Monthly Rent ($)</Label><Input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} placeholder="e.g., 2000" /></div>
          <div><Label>Time Period (years)</Label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="30" /></div>
        </div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Compare Buy vs Rent"}</Button>
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div><p className="text-sm text-muted-foreground">Recommendation</p><p className="text-2xl font-bold text-primary">{result.recommendation} is better</p><p className="text-sm text-muted-foreground">Save ${result.savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.recommendation, "Recommendation")}><Copy className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Buy vs Rent", inputs: [{ label: "Home Price", value: `$${homePrice}` }], results: [{ label: "Recommendation", value: result.recommendation }] })}><Printer className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg"><p className="text-xs text-muted-foreground">Total Cost of Buying</p><p className="text-lg font-semibold text-blue-600">${result.buyTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg"><p className="text-xs text-muted-foreground">Total Cost of Renting</p><p className="text-lg font-semibold text-green-600">${result.rentTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BuyVsRentCalculator;
