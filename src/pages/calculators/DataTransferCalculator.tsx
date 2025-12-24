import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { Copy, Loader2 } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";

const DataTransferCalculator = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Mbps");
  const [toUnit, setToUnit] = useState("MBps");
  const [result, setResult] = useState<number | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();

  const units: { [key: string]: number } = {
    "bps": 1,
    "Kbps": 1000,
    "Mbps": 1000000,
    "Gbps": 1000000000,
    "Bps": 8,
    "KBps": 8000,
    "MBps": 8000000,
    "GBps": 8000000000
  };

  const calculate = () => {
    const val = parseFloat(value);
    if (val && fromUnit && toUnit) {
      const inBps = val * units[fromUnit];
      const resultVal = inBps / units[toUnit];
      setResult(resultVal);
      updateAIInsight(
        { value: val, fromUnit, toUnit },
        { result: resultVal.toFixed(6), conversionFactor: (units[fromUnit] / units[toUnit]).toFixed(6) }
      );
    }
  };

  const faqs = [
    {
      question: "What's the difference between Mbps and MBps?",
      answer: "Mbps (megabits per second) and MBps (megabytes per second) differ by a factor of 8. 1 MBps = 8 Mbps."
    },
    {
      question: "How do I convert Mbps to MB/s?",
      answer: "Divide Mbps by 8. For example, 100 Mbps = 100 / 8 = 12.5 MBps."
    },
    {
      question: "What is a good internet speed?",
      answer: "25 Mbps is suitable for streaming, 100 Mbps for multiple users, and 1 Gbps for heavy usage and large households."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Data Transfer Rate Calculator",
          description: "Convert between Mbps, MBps, Gbps and other data transfer rates",
          url: "https://smartcalhub.online/calculator/data-transfer"
        }}
      />
      <CalculatorLayout
        title="Data Transfer Rate Calculator"
        description="Convert between Mbps, MB/s, Gbps, and other data transfer rates."
        category="conversion"
        calculatorId="data-transfer-calculator"
        howItWorks="Enter a value and select the units to convert between different data transfer rates."
        formula="1 Byte = 8 bits, 1 MBps = 8 Mbps"
        faqs={faqs}
      >
        <div className="space-y-6">
          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              placeholder="e.g., 100"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from">From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger id="from">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bps">bits/second (bps)</SelectItem>
                  <SelectItem value="Kbps">Kilobits/sec (Kbps)</SelectItem>
                  <SelectItem value="Mbps">Megabits/sec (Mbps)</SelectItem>
                  <SelectItem value="Gbps">Gigabits/sec (Gbps)</SelectItem>
                  <SelectItem value="Bps">Bytes/second (Bps)</SelectItem>
                  <SelectItem value="KBps">Kilobytes/sec (KBps)</SelectItem>
                  <SelectItem value="MBps">Megabytes/sec (MBps)</SelectItem>
                  <SelectItem value="GBps">Gigabytes/sec (GBps)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="to">To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger id="to">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bps">bits/second (bps)</SelectItem>
                  <SelectItem value="Kbps">Kilobits/sec (Kbps)</SelectItem>
                  <SelectItem value="Mbps">Megabits/sec (Mbps)</SelectItem>
                  <SelectItem value="Gbps">Gigabits/sec (Gbps)</SelectItem>
                  <SelectItem value="Bps">Bytes/second (Bps)</SelectItem>
                  <SelectItem value="KBps">Kilobytes/sec (KBps)</SelectItem>
                  <SelectItem value="MBps">Megabytes/sec (MBps)</SelectItem>
                  <SelectItem value="GBps">Gigabytes/sec (GBps)</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                Converting...
              </>
            ) : (
              "Convert"
            )}
          </Button>

          {result !== null && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Result</p>
                    <p className="text-3xl font-bold">{result.toFixed(6)} {toUnit}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`${result.toFixed(6)} ${toUnit}`, "Result")}
                    className="ml-2"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
};

export default DataTransferCalculator;
