import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const HouseFlipCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [rehabCost, setRehabCost] = useState("");
  const [holdingCosts, setHoldingCosts] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [closingCosts, setClosingCosts] = useState("6");
  const [result, setResult] = useState<{ totalCost: number; profit: number; roi: number; profitMargin: number } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const purchase = parseFloat(purchasePrice);
    const rehab = parseFloat(rehabCost);
    const holding = parseFloat(holdingCosts) || 0;
    const arv = parseFloat(sellingPrice);
    const closing = parseFloat(closingCosts) / 100;

    if (!purchase || !rehab || !arv || purchase <= 0 || arv <= 0) return;

    const closingFees = arv * closing;
    const totalCost = purchase + rehab + holding + closingFees;
    const profit = arv - totalCost;
    const roi = (profit / (purchase + rehab)) * 100;
    const profitMargin = (profit / arv) * 100;

    setResult({ totalCost, profit, roi, profitMargin });
  };

  const faqs = [
    { question: "What is the 70% rule in house flipping?", answer: "The 70% rule suggests paying no more than 70% of ARV (After Repair Value) minus repair costs. This leaves room for profit and unexpected expenses." }
  ];

  return (
    <CalculatorLayout title="House Flip Profit Calculator" description="Calculate potential profit from flipping a house." category="finance" calculatorId="house-flip" howItWorks="Enter purchase price, rehab costs, and expected selling price to calculate profit." formula="Profit = Selling Price - (Purchase + Rehab + Holding + Closing Costs)" faqs={faqs}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Purchase Price ($)</Label><Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="e.g., 200000" /></div>
          <div><Label>Rehab/Repair Costs ($)</Label><Input type="number" value={rehabCost} onChange={(e) => setRehabCost(e.target.value)} placeholder="e.g., 50000" /></div>
          <div><Label>Holding Costs ($)</Label><Input type="number" value={holdingCosts} onChange={(e) => setHoldingCosts(e.target.value)} placeholder="e.g., 5000" /></div>
          <div><Label>After Repair Value ($)</Label><Input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="e.g., 350000" /></div>
        </div>
        <div><Label>Closing Costs (%)</Label><Input type="number" value={closingCosts} onChange={(e) => setClosingCosts(e.target.value)} placeholder="6" step="0.5" /></div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Flip Profit"}</Button>
        {result && (
          <Card className={`border ${result.profit >= 0 ? 'bg-green-500/5 border-green-500' : 'bg-red-500/5 border-red-500'}`}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div><p className="text-sm text-muted-foreground">Estimated Profit</p><p className={`text-3xl font-bold ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>${result.profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.profit.toFixed(0)}`, "Profit")}><Copy className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "House Flip Profit", inputs: [{ label: "Purchase", value: `$${purchasePrice}` }], results: [{ label: "Profit", value: `$${result.profit.toFixed(0)}` }] })}><Printer className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-xs text-muted-foreground">Total Investment</p><p className="text-lg font-semibold text-primary">${result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-xs text-muted-foreground">ROI</p><p className="text-lg font-semibold text-primary">{result.roi.toFixed(1)}%</p></div>
                <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-xs text-muted-foreground">Profit Margin</p><p className="text-lg font-semibold text-primary">{result.profitMargin.toFixed(1)}%</p></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default HouseFlipCalculator;
