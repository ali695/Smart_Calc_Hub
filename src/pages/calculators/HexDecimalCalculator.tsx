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

const HexDecimalCalculator = () => {
  const [hex, setHex] = useState("");
  const [decimal, setDecimal] = useState("");
  const [result, setResult] = useState<{ type: string; value: string } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const hexToDecimal = () => {
    if (!/^[0-9A-Fa-f]+$/.test(hex)) return;
    const decimalResult = parseInt(hex, 16).toString();
    setResult({ type: "decimal", value: decimalResult });
    updateAIInsight({ hex, operation: "Hex to Decimal" }, { decimal: decimalResult });
  };

  const decimalToHex = () => {
    const num = parseInt(decimal);
    if (isNaN(num) || num < 0) return;
    const hexResult = num.toString(16).toUpperCase();
    setResult({ type: "hexadecimal", value: hexResult });
    updateAIInsight({ decimal: num, operation: "Decimal to Hex" }, { hex: hexResult });
  };

  const faqs = [{ question: "What is hexadecimal?", answer: "Hexadecimal is a base-16 numeral system using 0-9 and A-F, commonly used in computing for colors and memory addresses." }];

  return (
    <CalculatorLayout title="Hex ↔ Decimal Converter" description="Convert between hexadecimal and decimal numbers." category="conversion" calculatorId="hex-decimal" howItWorks="Enter a hex or decimal number to convert." formula="Hex uses powers of 16" faqs={faqs}>
      <Tabs defaultValue="toDecimal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="toDecimal">Hex → Decimal</TabsTrigger>
          <TabsTrigger value="toHex">Decimal → Hex</TabsTrigger>
        </TabsList>
        <TabsContent value="toDecimal" className="space-y-4">
          <div><Label>Hexadecimal</Label><Input value={hex} onChange={(e) => setHex(e.target.value)} placeholder="e.g., FF" /></div>
          <Button type="button" onClick={() => handleCalculation(hexToDecimal)} className="w-full" disabled={isCalculating}>{isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Convert to Decimal"}</Button>
        </TabsContent>
        <TabsContent value="toHex" className="space-y-4">
          <div><Label>Decimal Number</Label><Input type="number" value={decimal} onChange={(e) => setDecimal(e.target.value)} placeholder="e.g., 255" /></div>
          <Button type="button" onClick={() => handleCalculation(decimalToHex)} className="w-full" disabled={isCalculating}>{isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Convert to Hex"}</Button>
        </TabsContent>
      </Tabs>
      {result && (
        <Card className="bg-primary/5 border-primary mt-4">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div><p className="text-sm text-muted-foreground">Result ({result.type})</p><p className="text-3xl font-bold text-primary font-mono">{result.value}</p></div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.value, "Result")}><Copy className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Hex/Decimal Converter", inputs: [], results: [{ label: "Result", value: result.value }] })}><Printer className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </CalculatorLayout>
  );
};

export default HexDecimalCalculator;
