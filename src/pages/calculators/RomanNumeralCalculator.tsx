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

const RomanNumeralCalculator = () => {
  const [decimal, setDecimal] = useState("");
  const [roman, setRoman] = useState("");
  const [result, setResult] = useState<{ type: string; value: string } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const decimalToRoman = (num: number): string => {
    const lookup: [number, string][] = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
      [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
    ];
    let result = "";
    for (const [value, numeral] of lookup) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  const romanToDecimal = (str: string): number => {
    const lookup: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      const current = lookup[str[i].toUpperCase()];
      const next = lookup[str[i + 1]?.toUpperCase()];
      if (next && current < next) result -= current;
      else result += current;
    }
    return result;
  };

  const convertToRoman = () => {
    const num = parseInt(decimal);
    if (!num || num <= 0 || num > 3999) return;
    setResult({ type: "Roman Numeral", value: decimalToRoman(num) });
  };

  const convertToDecimal = () => {
    if (!roman.trim()) return;
    const num = romanToDecimal(roman.trim());
    setResult({ type: "Decimal", value: num.toString() });
  };

  const faqs = [
    { question: "How do Roman numerals work?", answer: "Roman numerals use letters (I=1, V=5, X=10, L=50, C=100, D=500, M=1000). When a smaller value precedes a larger one, it's subtracted (IV=4)." }
  ];

  return (
    <CalculatorLayout title="Roman Numeral Converter" description="Convert between Roman numerals and decimal numbers." category="conversion" calculatorId="roman-numeral" howItWorks="Enter a decimal number (1-3999) or a Roman numeral to convert." formula="I=1, V=5, X=10, L=50, C=100, D=500, M=1000" faqs={faqs}>
      <Tabs defaultValue="toRoman" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="toRoman">Decimal → Roman</TabsTrigger>
          <TabsTrigger value="toDecimal">Roman → Decimal</TabsTrigger>
        </TabsList>
        <TabsContent value="toRoman" className="space-y-4">
          <div><Label>Decimal Number (1-3999)</Label><Input type="number" value={decimal} onChange={(e) => setDecimal(e.target.value)} placeholder="e.g., 2024" min="1" max="3999" /></div>
          <Button type="button" onClick={() => handleCalculation(convertToRoman)} className="w-full" disabled={isCalculating}>{isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Convert to Roman"}</Button>
        </TabsContent>
        <TabsContent value="toDecimal" className="space-y-4">
          <div><Label>Roman Numeral</Label><Input type="text" value={roman} onChange={(e) => setRoman(e.target.value.toUpperCase())} placeholder="e.g., MMXXIV" /></div>
          <Button type="button" onClick={() => handleCalculation(convertToDecimal)} className="w-full" disabled={isCalculating}>{isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Convert to Decimal"}</Button>
        </TabsContent>
      </Tabs>
      {result && (
        <Card className="bg-primary/5 border-primary mt-4">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div><p className="text-sm text-muted-foreground">{result.type}</p><p className="text-3xl font-bold text-primary">{result.value}</p></div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.value, "Result")}><Copy className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Roman Numeral Converter", inputs: [], results: [{ label: result.type, value: result.value }] })}><Printer className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </CalculatorLayout>
  );
};

export default RomanNumeralCalculator;
