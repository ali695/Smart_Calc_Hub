import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BitcoinConverter = () => {
  const [btc, setBtc] = useState("");
  const [usd, setUsd] = useState("");
  const [btcPrice, setBtcPrice] = useState("67000"); // Default BTC price
  const [result, setResult] = useState<{ type: string; value: string; sats?: number } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const btcToUsd = () => {
    const btcAmount = parseFloat(btc);
    const price = parseFloat(btcPrice);
    if (!btcAmount || !price || btcAmount < 0 || price <= 0) return;
    const usdValue = btcAmount * price;
    const sats = btcAmount * 100000000;
    setResult({ type: "USD Value", value: `$${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, sats });
    updateAIInsight({ btcAmount, btcPrice: price }, { usdValue, sats });
  };

  const usdToBtc = () => {
    const usdAmount = parseFloat(usd);
    const price = parseFloat(btcPrice);
    if (!usdAmount || !price || usdAmount < 0 || price <= 0) return;
    const btcValue = usdAmount / price;
    const sats = btcValue * 100000000;
    setResult({ type: "BTC Value", value: `₿${btcValue.toFixed(8)}`, sats });
    updateAIInsight({ usdAmount, btcPrice: price }, { btcValue, sats });
  };

  const faqs = [
    { question: "What are Satoshis?", answer: "A Satoshi is the smallest unit of Bitcoin, equal to 0.00000001 BTC. There are 100 million Satoshis in 1 Bitcoin." }
  ];

  return (
    <CalculatorLayout title="Bitcoin ↔ USD Converter" description="Convert between Bitcoin and US Dollars." category="finance" calculatorId="bitcoin-converter" howItWorks="Enter BTC or USD amount with the current Bitcoin price to convert." formula="USD = BTC × Price, BTC = USD / Price" faqs={faqs}>
      <div className="space-y-6">
        <div><Label>Bitcoin Price (USD)</Label><Input type="number" value={btcPrice} onChange={(e) => setBtcPrice(e.target.value)} placeholder="e.g., 67000" /></div>
        <Tabs defaultValue="btcToUsd" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="btcToUsd">BTC → USD</TabsTrigger>
            <TabsTrigger value="usdToBtc">USD → BTC</TabsTrigger>
          </TabsList>
          <TabsContent value="btcToUsd" className="space-y-4">
            <div><Label>Bitcoin (BTC)</Label><Input type="number" value={btc} onChange={(e) => setBtc(e.target.value)} placeholder="e.g., 0.5" step="0.00000001" /></div>
            <Button type="button" onClick={() => handleCalculation(btcToUsd)} className="w-full" disabled={isCalculating}>{isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Convert to USD"}</Button>
          </TabsContent>
          <TabsContent value="usdToBtc" className="space-y-4">
            <div><Label>US Dollars (USD)</Label><Input type="number" value={usd} onChange={(e) => setUsd(e.target.value)} placeholder="e.g., 10000" /></div>
            <Button type="button" onClick={() => handleCalculation(usdToBtc)} className="w-full" disabled={isCalculating}>{isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Convert to BTC"}</Button>
          </TabsContent>
        </Tabs>
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div><p className="text-sm text-muted-foreground">{result.type}</p><p className="text-3xl font-bold text-primary">{result.value}</p></div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.value, "Result")}><Copy className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Bitcoin Converter", inputs: [{ label: "BTC Price", value: `$${btcPrice}` }], results: [{ label: result.type, value: result.value }] })}><Printer className="h-4 w-4" /></Button>
                </div>
              </div>
              {result.sats && (
                <div className="p-3 bg-orange-500/10 rounded-lg"><p className="text-xs text-muted-foreground">Satoshis</p><p className="text-lg font-semibold text-orange-600">{result.sats.toLocaleString(undefined, { maximumFractionDigits: 0 })} sats</p></div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BitcoinConverter;
