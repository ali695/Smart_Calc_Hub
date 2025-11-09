import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const InvestmentReturnCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [years, setYears] = useState("");
  const [totalReturn, setTotalReturn] = useState<number | null>(null);
  const [annualReturn, setAnnualReturn] = useState<number | null>(null);
  const [totalGain, setTotalGain] = useState<number | null>(null);

  const calculateReturn = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const final = parseFloat(finalValue) || 0;
    const period = parseFloat(years) || 0;
    
    if (initial > 0 && final > 0 && period > 0) {
      const gain = final - initial;
      const totalReturnPct = ((final - initial) / initial) * 100;
      const annualReturnPct = (Math.pow(final / initial, 1 / period) - 1) * 100;
      
      setTotalGain(parseFloat(gain.toFixed(2)));
      setTotalReturn(parseFloat(totalReturnPct.toFixed(2)));
      setAnnualReturn(parseFloat(annualReturnPct.toFixed(2)));
    }
  };

  const faqs = [
    {
      question: "What is ROI (Return on Investment)?",
      answer: "ROI measures the profitability of an investment as a percentage. It's calculated by dividing the gain (or loss) by the initial investment cost. A positive ROI means profit, while negative indicates a loss."
    },
    {
      question: "What's the difference between total return and annual return?",
      answer: "Total return is the overall percentage gain or loss over the entire investment period. Annual return (CAGR - Compound Annual Growth Rate) is the average yearly return, accounting for compounding effects."
    },
    {
      question: "What's a good annual return rate?",
      answer: "Historical stock market averages are around 7-10% annually. However, returns vary greatly by asset class, risk level, and time period. Past performance doesn't guarantee future results."
    },
    {
      question: "Should I include dividends in my calculations?",
      answer: "Yes! For accurate returns, include reinvested dividends in your final value. Many long-term returns come from dividend reinvestment and compounding, not just price appreciation."
    }
  ];

  return (
    <CalculatorLayout
      title="Investment Return Calculator"
      description="Calculate ROI and annual returns on your investments"
      howItWorks="This investment return calculator helps you analyze your investment performance. Enter your initial investment amount, final value, and investment period in years. The calculator will show your total return percentage, annualized return (CAGR), and total gain in dollars. This is useful for evaluating past investments or comparing different investment opportunities."
      formula="Total Return = ((Final Value - Initial) / Initial) × 100 | Annual Return = ((Final / Initial)^(1/Years) - 1) × 100"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
            <Input
              id="initialInvestment"
              type="number"
              placeholder="10000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="finalValue">Final Value ($)</Label>
            <Input
              id="finalValue"
              type="number"
              placeholder="15000"
              value={finalValue}
              onChange={(e) => setFinalValue(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="years">Investment Period (years)</Label>
            <Input
              id="years"
              type="number"
              step="0.1"
              placeholder="5"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculateReturn} className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" size="lg">
          Calculate Return
        </Button>

        {totalReturn !== null && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 rounded-lg border border-primary text-center hover:scale-[1.02] transition-all duration-300">
              <p className="text-sm font-medium text-muted-foreground">Total Return</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {totalReturn > 0 ? "+" : ""}{totalReturn}%
              </p>
              <p className="text-lg mt-2">${totalGain?.toLocaleString()} {(totalGain ?? 0) >= 0 ? "gain" : "loss"}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Annual Return (CAGR)</p>
                <p className="text-2xl font-bold">{annualReturn}% per year</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Investment Period</p>
                <p className="text-2xl font-bold">{years} years</p>
              </div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Initial Investment:</span>
                <span className="font-semibold">${parseFloat(initialInvestment || "0").toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Final Value:</span>
                <span className="font-semibold">${parseFloat(finalValue || "0").toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default InvestmentReturnCalculator;
