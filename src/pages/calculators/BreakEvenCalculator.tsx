import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { CalculatorChart } from "@/components/CalculatorChart";

const BreakEvenCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [result, setResult] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
  } | null>(null);
  const { updateAIInsight } = useCalculatorEnhancements();

  const calculate = () => {
    const fixed = parseFloat(fixedCosts);
    const variable = parseFloat(variableCost);
    const price = parseFloat(sellingPrice);

    if (!fixed || !variable || !price || price <= variable) return;

    const breakEvenUnits = fixed / (price - variable);
    const breakEvenRevenue = breakEvenUnits * price;

    setResult({ breakEvenUnits, breakEvenRevenue });
    
    updateAIInsight(
      { fixedCosts: fixed, variableCostPerUnit: variable, sellingPrice: price, contributionMargin: price - variable },
      { breakEvenUnits: Math.ceil(breakEvenUnits), breakEvenRevenue: breakEvenRevenue.toFixed(2), contributionMarginRatio: (((price - variable) / price) * 100).toFixed(1) + "%" }
    );
  };

  const faqs = [
    {
      question: "What is break-even point?",
      answer: "The break-even point is the level of sales at which total revenue equals total costs, resulting in neither profit nor loss."
    },
    {
      question: "Why is break-even analysis important?",
      answer: "It helps businesses determine the minimum sales needed to avoid losses and plan pricing strategies effectively."
    },
    {
      question: "What are fixed vs variable costs?",
      answer: "Fixed costs remain constant regardless of production (rent, salaries), while variable costs change with production volume (materials, packaging)."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Break-Even Calculator",
          description: "Calculate the break-even point for your business to understand when you'll start making profit",
          url: "https://smartcalhub.online/calculator/break-even",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
          }
        }}
      />
      <CalculatorLayout
      title="Break-Even Calculator"
      description="Calculate the break-even point for your business to understand when you'll start making profit."
      seoTitle="Break-Even Calculator - Business Profit Analysis | SmartCalc Hub"
      seoDescription="Free break-even calculator for businesses. Calculate break-even point, units needed, and revenue targets. Essential tool for pricing and financial planning."
      keywords="break even calculator, break even point, business calculator, profit calculator, contribution margin"
      canonicalUrl="https://smartcalhub.online/calculator/break-even"
      category="business"
      calculatorId="break-even"
      howItWorks="Enter your fixed costs, variable cost per unit, and selling price. The calculator shows how many units you need to sell to break even."
      formula="Break-Even Units = Fixed Costs / (Selling Price - Variable Cost)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fixedCosts">Fixed Costs ($)</Label>
            <Input
              id="fixedCosts"
              type="number"
              placeholder="e.g., 50000"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="variableCost">Variable Cost per Unit ($)</Label>
            <Input
              id="variableCost"
              type="number"
              placeholder="e.g., 20"
              value={variableCost}
              onChange={(e) => setVariableCost(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="sellingPrice">Selling Price per Unit ($)</Label>
            <Input
              id="sellingPrice"
              type="number"
              placeholder="e.g., 50"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
            />
          </div>
        </div>

        <Button type="button" onClick={calculate} className="w-full" size="lg">
          Calculate Break-Even
        </Button>

        {result && (
          <>
            <Card className="bg-primary/5 border-primary">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Break-Even Units</p>
                    <p className="text-3xl font-bold text-primary">
                      {Math.ceil(result.breakEvenUnits).toLocaleString()} units
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Break-Even Revenue</p>
                    <p className="text-xl font-semibold">
                      ${result.breakEvenRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <CalculatorChart
              chartType="line"
              data={Array.from({length: Math.ceil(result.breakEvenUnits) * 2}, (_, i) => ({
                name: i.toString(),
                value: parseFloat(sellingPrice) * i,
                value2: parseFloat(fixedCosts) + parseFloat(variableCost) * i
              }))}
              title="Break-Even Analysis"
            />
          </>
        )}
      </div>
    </CalculatorLayout>
    </>
  );
};

export default BreakEvenCalculator;
