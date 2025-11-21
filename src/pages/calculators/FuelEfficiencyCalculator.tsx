import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { Copy, Loader2 } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";

const FuelEfficiencyCalculator = () => {
  const [mpg, setMpg] = useState("");
  const [lPer100km, setLPer100km] = useState("");
  const [conversionType, setConversionType] = useState<"mpg-to-l" | "l-to-mpg">("mpg-to-l");
  const [result, setResult] = useState<number | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();

  const calculate = () => {
    if (conversionType === "mpg-to-l") {
      const mpgVal = parseFloat(mpg);
      if (mpgVal && mpgVal > 0) {
        setResult(235.214 / mpgVal);
      }
    } else {
      const lVal = parseFloat(lPer100km);
      if (lVal && lVal > 0) {
        setResult(235.214 / lVal);
      }
    }
  };

  const faqs = [
    {
      question: "How do I convert MPG to L/100km?",
      answer: "Divide 235.214 by the MPG value. For example, 30 MPG = 235.214 / 30 = 7.84 L/100km."
    },
    {
      question: "How do I convert L/100km to MPG?",
      answer: "Divide 235.214 by the L/100km value. For example, 8 L/100km = 235.214 / 8 = 29.4 MPG."
    },
    {
      question: "Which is better: higher MPG or lower L/100km?",
      answer: "Both indicate better fuel efficiency - higher MPG means more miles per gallon, while lower L/100km means less fuel consumed per 100 kilometers."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Fuel Efficiency Converter",
          description: "Convert between MPG and L/100km fuel efficiency measurements",
          url: "https://smartcalchub.com/calculator/fuel"
        }}
      />
      <CalculatorLayout
        title="Fuel Efficiency Converter"
        description="Convert between MPG and L/100km fuel efficiency measurements."
        category="conversion"
        calculatorId="fuel-efficiency-calculator"
        howItWorks="Enter a value in either MPG or L/100km and select the conversion direction."
        formula="L/100km = 235.214 / MPG"
        faqs={faqs}
      >
        <div className="space-y-6">
          <div>
            <Label>Conversion Type</Label>
            <div className="flex gap-4 mt-2">
              <Button
                type="button"
                variant={conversionType === "mpg-to-l" ? "default" : "outline"}
                onClick={() => setConversionType("mpg-to-l")}
              >
                MPG to L/100km
              </Button>
              <Button
                type="button"
                variant={conversionType === "l-to-mpg" ? "default" : "outline"}
                onClick={() => setConversionType("l-to-mpg")}
              >
                L/100km to MPG
              </Button>
            </div>
          </div>

          {conversionType === "mpg-to-l" ? (
            <div>
              <Label htmlFor="mpg">Miles Per Gallon (MPG)</Label>
              <Input
                id="mpg"
                type="number"
                placeholder="e.g., 30"
                value={mpg}
                onChange={(e) => setMpg(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="lper100km">Liters per 100km</Label>
              <Input
                id="lper100km"
                type="number"
                placeholder="e.g., 8"
                value={lPer100km}
                onChange={(e) => setLPer100km(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
              />
            </div>
          )}

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
                    <p className="text-3xl font-bold">
                      {result.toFixed(2)} {conversionType === "mpg-to-l" ? "L/100km" : "MPG"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`${result.toFixed(2)}`, "Result")}
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

export default FuelEfficiencyCalculator;
