import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const MiningProfitCalculator = () => {
  const [hashRate, setHashRate] = useState("");
  const [powerConsumption, setPowerConsumption] = useState("");
  const [electricityCost, setElectricityCost] = useState("0.10");
  const [blockReward, setBlockReward] = useState("6.25");
  const [btcPrice, setBtcPrice] = useState("67000");
  const [networkDifficulty, setNetworkDifficulty] = useState("75"); // in trillions
  const [result, setResult] = useState<{ dailyRevenue: number; dailyCost: number; dailyProfit: number; monthlyProfit: number; breakEvenDays: number } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const hr = parseFloat(hashRate); // TH/s
    const power = parseFloat(powerConsumption); // Watts
    const elecCost = parseFloat(electricityCost); // $/kWh
    const reward = parseFloat(blockReward); // BTC
    const price = parseFloat(btcPrice); // $
    const difficulty = parseFloat(networkDifficulty) * 1e12; // Convert to actual

    if (!hr || !power || !elecCost || !reward || !price || hr <= 0 || power <= 0) return;

    // Simplified Bitcoin mining calculation
    const hashRateInH = hr * 1e12; // Convert TH/s to H/s
    const secondsPerDay = 86400;
    const btcPerDay = (hashRateInH * reward * secondsPerDay) / (difficulty * Math.pow(2, 32));
    
    const dailyRevenue = btcPerDay * price;
    const dailyCost = (power / 1000) * 24 * elecCost;
    const dailyProfit = dailyRevenue - dailyCost;
    const monthlyProfit = dailyProfit * 30;
    const breakEvenDays = dailyProfit > 0 ? 0 : Infinity; // Simplified

    setResult({ dailyRevenue, dailyCost, dailyProfit, monthlyProfit, breakEvenDays });
    updateAIInsight(
      { hashRate: hr, powerConsumption: power, electricityCost: elecCost, btcPrice: price },
      { dailyRevenue, dailyCost, dailyProfit, monthlyProfit }
    );
  };

  const faqs = [
    { question: "Is crypto mining profitable?", answer: "Profitability depends on electricity costs, hardware efficiency, cryptocurrency price, and network difficulty. Low electricity costs and efficient hardware are key to profitable mining." }
  ];

  return (
    <CalculatorLayout title="Mining Profit Calculator" description="Calculate cryptocurrency mining profitability." category="finance" calculatorId="mining-profit" howItWorks="Enter your hash rate, power consumption, and electricity cost to calculate mining profit." formula="Daily Profit = (BTC Mined × Price) - (Power × Hours × Electricity Cost)" faqs={faqs}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Hash Rate (TH/s)</Label><Input type="number" value={hashRate} onChange={(e) => setHashRate(e.target.value)} placeholder="e.g., 100" /></div>
          <div><Label>Power Consumption (W)</Label><Input type="number" value={powerConsumption} onChange={(e) => setPowerConsumption(e.target.value)} placeholder="e.g., 3000" /></div>
          <div><Label>Electricity Cost ($/kWh)</Label><Input type="number" value={electricityCost} onChange={(e) => setElectricityCost(e.target.value)} placeholder="0.10" step="0.01" /></div>
          <div><Label>BTC Price ($)</Label><Input type="number" value={btcPrice} onChange={(e) => setBtcPrice(e.target.value)} placeholder="67000" /></div>
        </div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Mining Profit"}</Button>
        {result && (
          <Card className={`border ${result.dailyProfit >= 0 ? 'bg-green-500/5 border-green-500' : 'bg-red-500/5 border-red-500'}`}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div><p className="text-sm text-muted-foreground">Daily Profit</p><p className={`text-3xl font-bold ${result.dailyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>${result.dailyProfit.toFixed(2)}</p></div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.dailyProfit.toFixed(2)}`, "Daily Profit")}><Copy className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Mining Profit", inputs: [{ label: "Hash Rate", value: `${hashRate} TH/s` }], results: [{ label: "Daily Profit", value: `$${result.dailyProfit.toFixed(2)}` }] })}><Printer className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg"><p className="text-xs text-muted-foreground">Daily Revenue</p><p className="text-lg font-semibold text-blue-600">${result.dailyRevenue.toFixed(2)}</p></div>
                <div className="text-center p-3 bg-red-500/10 rounded-lg"><p className="text-xs text-muted-foreground">Daily Cost</p><p className="text-lg font-semibold text-red-600">${result.dailyCost.toFixed(2)}</p></div>
                <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-xs text-muted-foreground">Monthly Profit</p><p className="text-lg font-semibold text-primary">${result.monthlyProfit.toFixed(0)}</p></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default MiningProfitCalculator;
