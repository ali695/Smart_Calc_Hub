import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";
import { CalculatorChart } from "@/components/CalculatorChart";

const CapRateCalculator = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [result, setResult] = useState<{ capRate: number; noi: number; assessment: string } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const value = parseFloat(propertyValue);
    const income = parseFloat(annualIncome);
    const exp = parseFloat(expenses) || 0;

    if (!value || !income || value <= 0 || income <= 0) return;

    const noi = income - exp;
    const capRate = (noi / value) * 100;

    let assessment = "Average";
    if (capRate >= 8) assessment = "Excellent (High Return)";
    else if (capRate >= 6) assessment = "Good";
    else if (capRate < 4) assessment = "Low Return";

    setResult({ capRate, noi, assessment });

    // Update AI insight
    updateAIInsight(
      { 
        propertyValue: value, 
        annualIncome: income, 
        operatingExpenses: exp,
        expenseRatio: ((exp / income) * 100).toFixed(1) + "%"
      },
      { 
        capRate: capRate.toFixed(2) + "%",
        netOperatingIncome: noi,
        assessment,
        cashOnCashReturn: ((noi / (value * 0.25)) * 100).toFixed(2) + "% (assuming 25% down)"
      }
    );
  };

  const faqs = [
    { 
      question: "What is a good cap rate?", 
      answer: "Cap rates of 5-10% are common. Higher cap rates indicate higher returns but often come with more risk. Location, property type, and market conditions affect what's considered good." 
    },
    {
      question: "How do I calculate cap rate?",
      answer: "Cap rate is calculated by dividing the Net Operating Income (NOI) by the property value, then multiplying by 100 to get a percentage."
    },
    {
      question: "What is Net Operating Income (NOI)?",
      answer: "NOI is the annual rental income minus operating expenses (maintenance, taxes, insurance, management fees). It doesn't include mortgage payments."
    },
    {
      question: "Why is cap rate important?",
      answer: "Cap rate helps investors compare different properties and assess potential returns. It's a quick way to evaluate if a property is priced fairly relative to its income."
    }
  ];

  return (
    <CalculatorLayout 
      title="Cap Rate Calculator" 
      description="Calculate capitalization rate for real estate investments to evaluate property returns." 
      seoTitle="Cap Rate Calculator - Real Estate Investment Analysis | SmartCalc Hub"
      seoDescription="Free cap rate calculator for real estate investors. Calculate capitalization rate to evaluate property investments and compare potential returns."
      keywords="cap rate calculator, capitalization rate, real estate investment, NOI calculator, property investment analysis"
      canonicalUrl="https://smartcalhub.online/calculator/cap-rate"
      category="real-estate" 
      calculatorId="cap-rate" 
      howItWorks="Enter property value, annual rental income, and operating expenses to calculate the capitalization rate. Cap rate helps you evaluate the potential return on a real estate investment." 
      formula="Cap Rate = (Net Operating Income / Property Value) × 100" 
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="propertyValue">Property Value ($)</Label>
            <Input 
              id="propertyValue"
              type="number" 
              value={propertyValue} 
              onChange={(e) => setPropertyValue(e.target.value)} 
              placeholder="e.g., 500000" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annualIncome">Annual Rental Income ($)</Label>
            <Input 
              id="annualIncome"
              type="number" 
              value={annualIncome} 
              onChange={(e) => setAnnualIncome(e.target.value)} 
              placeholder="e.g., 48000" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expenses">Annual Operating Expenses ($)</Label>
            <Input 
              id="expenses"
              type="number" 
              value={expenses} 
              onChange={(e) => setExpenses(e.target.value)} 
              placeholder="e.g., 12000" 
            />
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
              Calculating...
            </>
          ) : (
            "Calculate Cap Rate"
          )}
        </Button>
        
        {result && (
          <>
            <Card className="bg-primary/5 border-primary">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cap Rate</p>
                    <p className="text-3xl font-bold text-primary">{result.capRate.toFixed(2)}%</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.assessment}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => copyToClipboard(`${result.capRate.toFixed(2)}%`, "Cap Rate")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => printCalculation({ 
                        title: "Cap Rate Calculator", 
                        inputs: [
                          { label: "Property Value", value: `$${propertyValue}` },
                          { label: "Annual Income", value: `$${annualIncome}` },
                          { label: "Operating Expenses", value: `$${expenses}` }
                        ], 
                        results: [
                          { label: "Cap Rate", value: `${result.capRate.toFixed(2)}%` },
                          { label: "NOI", value: `$${result.noi.toLocaleString()}` },
                          { label: "Assessment", value: result.assessment }
                        ] 
                      })}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">Net Operating Income (NOI)</p>
                  <p className="text-lg font-semibold text-primary">${result.noi.toLocaleString()}/year</p>
                </div>
              </CardContent>
            </Card>

            <CalculatorChart
              chartType="pie"
              data={[
                { name: "NOI", value: result.noi },
                { name: "Expenses", value: parseFloat(expenses) || 0 }
              ]}
              title="Income Breakdown"
            />
          </>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CapRateCalculator;
