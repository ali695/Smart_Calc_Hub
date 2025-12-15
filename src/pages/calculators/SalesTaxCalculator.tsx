import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer, Loader2 } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SalesTaxCalculator = () => {
  const [amount, setAmount] = useState("");
  const [state, setState] = useState("");
  const [customRate, setCustomRate] = useState("");
  const [result, setResult] = useState<{
    salesTax: number;
    totalAmount: number;
    taxRate: number;
  } | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  // US State sales tax rates (2024)
  const stateTaxRates: Record<string, number> = {
    AL: 4.00, AK: 0.00, AZ: 5.60, AR: 6.50, CA: 7.25,
    CO: 2.90, CT: 6.35, DE: 0.00, FL: 6.00, GA: 4.00,
    HI: 4.00, ID: 6.00, IL: 6.25, IN: 7.00, IA: 6.00,
    KS: 6.50, KY: 6.00, LA: 4.45, ME: 5.50, MD: 6.00,
    MA: 6.25, MI: 6.00, MN: 6.875, MS: 7.00, MO: 4.225,
    MT: 0.00, NE: 5.50, NV: 6.85, NH: 0.00, NJ: 6.625,
    NM: 4.875, NY: 4.00, NC: 4.75, ND: 5.00, OH: 5.75,
    OK: 4.50, OR: 0.00, PA: 6.00, RI: 7.00, SC: 6.00,
    SD: 4.20, TN: 7.00, TX: 6.25, UT: 6.10, VT: 6.00,
    VA: 5.30, WA: 6.50, WV: 6.00, WI: 5.00, WY: 4.00,
    DC: 6.00
  };

  const calculate = () => {
    const amountVal = parseFloat(amount);
    if (!amountVal || amountVal <= 0) return;

    let taxRate = 0;
    if (customRate) {
      taxRate = parseFloat(customRate);
    } else if (state) {
      taxRate = stateTaxRates[state] || 0;
    }

    const salesTax = amountVal * (taxRate / 100);
    const totalAmount = amountVal + salesTax;

    const resultData = { salesTax, totalAmount, taxRate };
    setResult(resultData);

    updateAIInsight(
      { amount: amountVal, state, taxRate },
      { salesTax, totalAmount }
    );
  };

  const faqs = [
    {
      question: "Which states have no sales tax?",
      answer: "Five states have no state sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. However, Alaska allows local sales taxes."
    },
    {
      question: "What's the highest sales tax rate in the US?",
      answer: "California has the highest state sales tax at 7.25%. Combined with local taxes, some areas can reach over 10%."
    },
    {
      question: "Do I need to pay sales tax on online purchases?",
      answer: "Since the 2018 South Dakota v. Wayfair decision, most online retailers collect sales tax based on where the item is shipped, regardless of where they're located."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "US Sales Tax Calculator",
          description: "Calculate sales tax for any US state or custom rate",
          url: "https://smartcalchub.com/calculator/sales-tax"
        }}
      />
      <CalculatorLayout
        title="US Sales Tax Calculator"
        description="Calculate sales tax for purchases in any US state."
        category="finance"
        calculatorId="sales-tax-calculator"
        howItWorks="Enter the purchase amount and select a state or enter a custom tax rate."
        formula="Sales Tax = Amount × Tax Rate"
        faqs={faqs}
      >
        <div className="space-y-6" ref={printRef}>
          <div>
            <Label htmlFor="amount">Purchase Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              className="text-lg"
            />
          </div>

          <div>
            <Label>Select State</Label>
            <Select value={state} onValueChange={(val) => { setState(val); setCustomRate(""); }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a state" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {Object.entries(stateTaxRates).map(([code, rate]) => (
                  <SelectItem key={code} value={code}>
                    {code} - {rate}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="customRate">Or Enter Custom Rate (%)</Label>
            <Input
              id="customRate"
              type="number"
              placeholder="e.g., 8.5 (overrides state selection)"
              value={customRate}
              onChange={(e) => { setCustomRate(e.target.value); setState(""); }}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
            />
          </div>

          <Button
            type="button"
            onClick={() => handleCalculation(calculate)}
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
              "Calculate Tax"
            )}
          </Button>

          {result && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total with Tax</p>
                    <p className="text-3xl font-bold text-primary">
                      ${result.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`$${result.totalAmount.toFixed(2)}`, "Total")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handlePrint}>
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Sales Tax</p>
                    <p className="text-xl font-semibold">${result.salesTax.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tax Rate</p>
                    <p className="text-xl font-semibold">{result.taxRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
};

export default SalesTaxCalculator;
