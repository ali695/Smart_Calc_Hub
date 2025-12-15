import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CalculatorChart } from "@/components/CalculatorChart";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const CryptoProfitCalculator = () => {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [investment, setInvestment] = useState("");
  const [result, setResult] = useState<{ profit: number; roi: number; coins: number; finalValue: number } | null>(null);
  const { printCalculation } = usePrintCalculator();

  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();

  const calculate = () => {
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const inv = parseFloat(investment);
    if (!buy || !sell || !inv) return;
    const coins = inv / buy;
    const finalValue = coins * sell;
    const profit = finalValue - inv;
    const roi = ((finalValue - inv) / inv) * 100;
    const nextResult = { profit, roi, coins, finalValue };
    setResult(nextResult);

    // Ensure CalculatorLayout receives AI inputs/results via context (needed for AIInsightCard)
    updateAIInsight(
      { buyPrice: buy, sellPrice: sell, investment: inv },
      nextResult
    );
  };

  const faqs = [
    { question: "How is crypto profit calculated?", answer: "Profit = (Sell Price - Buy Price) × Number of Coins. ROI = (Profit / Investment) × 100." },
    { question: "What is ROI in crypto trading?", answer: "ROI (Return on Investment) measures the percentage gain or loss relative to your initial investment. A 50% ROI means you earned 50% of your original investment as profit." },
    { question: "Should I use stop-loss orders?", answer: "Yes, stop-loss orders help limit potential losses by automatically selling when the price drops to a specified level. They're essential for risk management." },
    { question: "How do taxes work on crypto profits?", answer: "Cryptocurrency profits are typically subject to capital gains tax. Short-term gains (held less than a year) are usually taxed at higher rates than long-term gains." }
  ];

  return (
    <CalculatorLayout 
      title="Crypto Profit Calculator" 
      description="Calculate your cryptocurrency investment profit and ROI." 
      seoTitle="Crypto Profit Calculator - Calculate Investment Returns | SmartCalc Hub"
      seoDescription="Free cryptocurrency profit calculator to compute your investment returns, ROI, and profit/loss. Essential tool for crypto traders and investors."
      keywords="crypto profit calculator, cryptocurrency calculator, bitcoin profit, ROI calculator, crypto investment, trading calculator"
      canonicalUrl="https://smartcalchub.com/calculator/crypto-profit"
      category="crypto" 
      calculatorId="crypto-profit" 
      howItWorks="Enter your buy price, sell price, and initial investment amount. The calculator determines your profit/loss, ROI percentage, number of coins purchased, and final portfolio value." 
      formula="Profit = (Coins × Sell Price) - Investment | ROI = (Profit / Investment) × 100" 
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><Label>Buy Price ($)</Label><Input type="number" step="any" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} placeholder="e.g., 30000" /></div>
          <div><Label>Sell Price ($)</Label><Input type="number" step="any" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} placeholder="e.g., 45000" /></div>
          <div><Label>Investment ($)</Label><Input type="number" step="any" value={investment} onChange={(e) => setInvestment(e.target.value)} placeholder="e.g., 1000" /></div>
        </div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Profit"}</Button>
        {result && (
          <>
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div><p className="text-sm text-muted-foreground">Profit/Loss</p><p className={`text-3xl font-bold ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>${result.profit.toFixed(2)}</p></div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.profit.toFixed(2)}`, "Profit")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Crypto Profit", inputs: [{ label: "Buy", value: `$${buyPrice}` }, { label: "Sell", value: `$${sellPrice}` }], results: [{ label: "Profit", value: `$${result.profit.toFixed(2)}` }, { label: "ROI", value: `${result.roi.toFixed(2)}%` }] })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div><p className="text-sm text-muted-foreground">ROI</p><p className={`text-xl font-semibold ${result.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>{result.roi.toFixed(2)}%</p></div>
                  <div><p className="text-sm text-muted-foreground">Coins</p><p className="text-xl font-semibold">{result.coins.toFixed(6)}</p></div>
                  <div><p className="text-sm text-muted-foreground">Final Value</p><p className="text-xl font-semibold">${result.finalValue.toFixed(2)}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Breakdown Chart */}
          <CalculatorChart
            title="Investment Analysis"
            data={[
              { name: "Initial Investment", value: parseFloat(investment) || 0 },
              { name: "Final Value", value: result.finalValue },
              { name: result.profit >= 0 ? "Profit" : "Loss", value: Math.abs(result.profit) }
            ]}
            chartType="bar"
            category="crypto"
            valueFormatter={(v) => `$${v.toFixed(2)}`}
          />
          </>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CryptoProfitCalculator;
