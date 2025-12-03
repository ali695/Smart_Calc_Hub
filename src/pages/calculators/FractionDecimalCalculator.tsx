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

const FractionDecimalCalculator = () => {
  const [numerator, setNumerator] = useState("");
  const [denominator, setDenominator] = useState("");
  const [decimal, setDecimal] = useState("");
  const [result, setResult] = useState<{ type: string; value: string } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const fractionToDecimal = () => {
    const num = parseFloat(numerator);
    const den = parseFloat(denominator);
    if (!den || den === 0) return;
    setResult({ type: "decimal", value: (num / den).toString() });
  };

  const decimalToFraction = () => {
    const dec = parseFloat(decimal);
    if (isNaN(dec)) return;
    const precision = decimal.split('.')[1]?.length || 0;
    const denominator = Math.pow(10, precision);
    const numerator = Math.round(dec * denominator);
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(numerator, denominator);
    setResult({ type: "fraction", value: `${numerator / divisor}/${denominator / divisor}` });
  };

  const faqs = [{ question: "How to convert fraction to decimal?", answer: "Divide the numerator by the denominator." }];

  return (
    <CalculatorLayout title="Fraction ↔ Decimal Converter" description="Convert between fractions and decimals instantly." category="math" calculatorId="fraction-decimal" howItWorks="Enter a fraction or decimal to convert." formula="Decimal = Numerator ÷ Denominator" faqs={faqs}>
      <Tabs defaultValue="toDecimal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="toDecimal">Fraction → Decimal</TabsTrigger>
          <TabsTrigger value="toFraction">Decimal → Fraction</TabsTrigger>
        </TabsList>
        <TabsContent value="toDecimal" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Numerator</Label><Input type="number" value={numerator} onChange={(e) => setNumerator(e.target.value)} placeholder="e.g., 3" /></div>
            <div><Label>Denominator</Label><Input type="number" value={denominator} onChange={(e) => setDenominator(e.target.value)} placeholder="e.g., 4" /></div>
          </div>
          <Button type="button" onClick={() => handleCalculation(fractionToDecimal)} className="w-full" disabled={isCalculating}>{isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Convert to Decimal"}</Button>
        </TabsContent>
        <TabsContent value="toFraction" className="space-y-4">
          <div><Label>Decimal</Label><Input type="number" step="any" value={decimal} onChange={(e) => setDecimal(e.target.value)} placeholder="e.g., 0.75" /></div>
          <Button type="button" onClick={() => handleCalculation(decimalToFraction)} className="w-full" disabled={isCalculating}>{isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Convert to Fraction"}</Button>
        </TabsContent>
      </Tabs>
      {result && (
        <Card className="bg-primary/5 border-primary mt-4">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div><p className="text-sm text-muted-foreground">Result ({result.type})</p><p className="text-3xl font-bold text-primary">{result.value}</p></div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.value, "Result")}><Copy className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Fraction/Decimal Converter", inputs: [], results: [{ label: "Result", value: result.value }] })}><Printer className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </CalculatorLayout>
  );
};

export default FractionDecimalCalculator;
