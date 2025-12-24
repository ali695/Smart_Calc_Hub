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

const BinaryDecimalCalculator = () => {
  const [binary, setBinary] = useState("");
  const [decimal, setDecimal] = useState("");
  const [result, setResult] = useState<{ type: string; value: string } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const binaryToDecimal = () => {
    if (!/^[01]+$/.test(binary)) return;
    const decimalResult = parseInt(binary, 2).toString();
    setResult({ type: "decimal", value: decimalResult });
    updateAIInsight({ binary, operation: "Binary to Decimal" }, { decimal: decimalResult });
  };

  const decimalToBinary = () => {
    const num = parseInt(decimal);
    if (isNaN(num) || num < 0) return;
    const binaryResult = num.toString(2);
    setResult({ type: "binary", value: binaryResult });
    updateAIInsight({ decimal: num, operation: "Decimal to Binary" }, { binary: binaryResult });
  };

  const faqs = [{ question: "What is binary?", answer: "Binary is a base-2 numeral system using only 0 and 1, fundamental to computing." }];

  return (
    <CalculatorLayout title="Binary ↔ Decimal Converter" description="Convert between binary and decimal numbers." category="conversion" calculatorId="binary-decimal" howItWorks="Enter a binary or decimal number to convert." formula="Binary uses powers of 2" faqs={faqs}>
      <Tabs defaultValue="toDecimal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="toDecimal">Binary → Decimal</TabsTrigger>
          <TabsTrigger value="toBinary">Decimal → Binary</TabsTrigger>
        </TabsList>
        <TabsContent value="toDecimal" className="space-y-4">
          <div><Label>Binary Number</Label><Input value={binary} onChange={(e) => setBinary(e.target.value)} placeholder="e.g., 1010" /></div>
          <Button type="button" onClick={() => handleCalculation(binaryToDecimal)} className="w-full" disabled={isCalculating}>{isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Convert to Decimal"}</Button>
        </TabsContent>
        <TabsContent value="toBinary" className="space-y-4">
          <div><Label>Decimal Number</Label><Input type="number" value={decimal} onChange={(e) => setDecimal(e.target.value)} placeholder="e.g., 10" /></div>
          <Button type="button" onClick={() => handleCalculation(decimalToBinary)} className="w-full" disabled={isCalculating}>{isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Convert to Binary"}</Button>
        </TabsContent>
      </Tabs>
      {result && (
        <Card className="bg-primary/5 border-primary mt-4">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div><p className="text-sm text-muted-foreground">Result ({result.type})</p><p className="text-3xl font-bold text-primary font-mono">{result.value}</p></div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.value, "Result")}><Copy className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Binary/Decimal Converter", inputs: [], results: [{ label: "Result", value: result.value }] })}><Printer className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </CalculatorLayout>
  );
};

export default BinaryDecimalCalculator;
