import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { schemas, validateInput, safeParseFloat } from "@/lib/validation";
import { toast } from "sonner";
import { z } from "zod";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";

const PercentageCalculator = () => {
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  // What is X% of Y
  const [percent1, setPercent1] = useState("");
  const [number1, setNumber1] = useState("");
  const [result1, setResult1] = useState<number | null>(null);

  // X is what % of Y
  const [partOf, setPartOf] = useState("");
  const [totalOf, setTotalOf] = useState("");
  const [result2, setResult2] = useState<number | null>(null);

  // Percentage change
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [result3, setResult3] = useState<number | null>(null);

  const calculate1 = () => {
    const percentValue = safeParseFloat(percent1);
    const numberValue = safeParseFloat(number1);

    if (percentValue === null || numberValue === null) {
      toast.error("Please enter valid numbers");
      return;
    }

    try {
      const validatedData = validateInput(schemas.percentage, { percent: percentValue, number: numberValue });
      const result = (validatedData.percent / 100) * validatedData.number;
      setResult1(parseFloat(result.toFixed(2)));
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  const calculate2 = () => {
    const part = parseFloat(partOf);
    const total = parseFloat(totalOf);
    if (!isNaN(part) && !isNaN(total) && total !== 0) {
      setResult2(parseFloat(((part / total) * 100).toFixed(2)));
    }
  };

  const calculate3 = () => {
    const oldVal = parseFloat(oldValue);
    const newVal = parseFloat(newValue);
    if (!isNaN(oldVal) && !isNaN(newVal) && oldVal !== 0) {
      setResult3(parseFloat((((newVal - oldVal) / oldVal) * 100).toFixed(2)));
    }
  };

  const faqs = [
    {
      question: "How do I calculate a percentage of a number?",
      answer: "To find X% of Y, multiply Y by X and divide by 100. For example, 20% of 50 = (20 × 50) / 100 = 10."
    },
    {
      question: "How do I find what percentage one number is of another?",
      answer: "Divide the first number by the second number, then multiply by 100. For example, to find what percentage 15 is of 60: (15 / 60) × 100 = 25%."
    },
    {
      question: "How do I calculate percentage increase or decrease?",
      answer: "Subtract the old value from the new value, divide by the old value, then multiply by 100. A positive result is an increase, negative is a decrease."
    },
    {
      question: "What's the difference between percentage point and percent?",
      answer: "A percentage point is the absolute difference between two percentages. For example, if something goes from 20% to 30%, that's a 10 percentage point increase, but a 50% relative increase."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Percentage Calculator",
          description: "Calculate percentages, percentage change, and reverse percentages with ease",
          url: "https://smartcalchub.com/calculator/percentage",
          applicationCategory: "UtilityApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
          }
        }}
      />
      <CalculatorLayout
      title="Percentage Calculator"
      description="Calculate percentages, percentage increase/decrease, and percentage of a number"
      seoTitle="Percentage Calculator - Calculate Percentages Easily | SmartCalc Hub"
      seoDescription="Free percentage calculator for all your percentage calculations. Find percentages, percentage changes, and percentage of numbers instantly. Simple, fast, and accurate."
      keywords="percentage calculator, percent calculator, calculate percentage, percentage change, percentage increase, percentage decrease"
      canonicalUrl="https://smartcalchub.com/calculator/percentage"
      category="math"
      calculatorId="percentage"
      howItWorks="This percentage calculator offers three main functions: finding what a percentage of a number is, determining what percentage one number is of another, and calculating percentage change between two values. Simply select the type of calculation you need and enter your values for instant results."
      formula="Basic: (Percentage / 100) × Number | Reverse: (Part / Total) × 100 | Change: ((New - Old) / Old) × 100"
      faqs={faqs}
    >
      <Tabs defaultValue="tab1" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tab1">% of Number</TabsTrigger>
          <TabsTrigger value="tab2">Is What %</TabsTrigger>
          <TabsTrigger value="tab3">% Change</TabsTrigger>
        </TabsList>

        <TabsContent value="tab1" className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="percent1">Percentage (%)</Label>
              <Input
                id="percent1"
                type="number"
                placeholder="20"
                value={percent1}
                onChange={(e) => setPercent1(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number1">of Number</Label>
              <Input
                id="number1"
                type="number"
                placeholder="100"
                value={number1}
                onChange={(e) => setNumber1(e.target.value)}
              />
            </div>
          </div>
          <Button type="button" onClick={() => handleCalculation(calculate1)} className="w-full" size="lg" disabled={isCalculating}>
            {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate"}
          </Button>
          {result1 !== null && (
            <div className="p-6 bg-primary/10 rounded-lg text-center animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-sm font-medium text-muted-foreground">Result</p>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result1.toString(), "Result")}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => printCalculation({
                  title: "Percentage Calculator Result",
                  inputs: [{ label: "Percentage", value: `${percent1}%` }, { label: "Number", value: number1 }],
                  results: [{ label: "Result", value: result1.toString() }],
                  formula: "(Percentage / 100) × Number"
                })}>
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-4xl font-bold text-primary">{result1}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {percent1}% of {number1} is {result1}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="tab2" className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partOf">Number</Label>
              <Input
                id="partOf"
                type="number"
                placeholder="25"
                value={partOf}
                onChange={(e) => setPartOf(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalOf">is what % of</Label>
              <Input
                id="totalOf"
                type="number"
                placeholder="100"
                value={totalOf}
                onChange={(e) => setTotalOf(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={calculate2} className="w-full" size="lg">
            Calculate
          </Button>
          {result2 !== null && (
            <div className="p-6 bg-primary/10 rounded-lg text-center animate-fade-in">
              <p className="text-sm font-medium text-muted-foreground">Result</p>
              <p className="text-4xl font-bold text-primary">{result2}%</p>
              <p className="text-sm text-muted-foreground mt-2">
                {partOf} is {result2}% of {totalOf}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="tab3" className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="oldValue">Original Value</Label>
              <Input
                id="oldValue"
                type="number"
                placeholder="100"
                value={oldValue}
                onChange={(e) => setOldValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newValue">New Value</Label>
              <Input
                id="newValue"
                type="number"
                placeholder="150"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={calculate3} className="w-full" size="lg">
            Calculate
          </Button>
          {result3 !== null && (
            <div className="p-6 bg-primary/10 rounded-lg text-center animate-fade-in">
              <p className="text-sm font-medium text-muted-foreground">Percentage Change</p>
              <p className="text-4xl font-bold text-primary">
                {result3 > 0 ? "+" : ""}{result3}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {result3 > 0 ? "Increase" : result3 < 0 ? "Decrease" : "No change"} from {oldValue} to {newValue}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
    </>
  );
};

export default PercentageCalculator;
