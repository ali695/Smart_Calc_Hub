import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer, Loader2 } from "lucide-react";

const ProfitMarginCalculator = () => {
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");
  const [result, setResult] = useState<{
    profit: number;
    margin: number;
    markup: number;
  } | null>(null);

  const calculate = () => {
    const rev = parseFloat(revenue);
    const cst = parseFloat(cost);

    if (!rev || !cst) return;

    const profit = rev - cst;
    const margin = (profit / rev) * 100;
    const markup = (profit / cst) * 100;

    setResult({ profit, margin, markup });
    updateAIInsight({ revenue: rev, cost: cst }, { profit, margin, markup });
  };

  const faqs = [
    {
      question: "What's the difference between profit margin and markup?",
      answer: "Profit margin is profit as a percentage of revenue. Markup is profit as a percentage of cost. A 50% markup equals a 33% profit margin."
    },
    {
      question: "What is a good profit margin?",
      answer: "It varies by industry. Retail typically has 5-10%, software 70-90%, restaurants 3-5%. Compare to industry benchmarks for context."
    },
    {
      question: "How do I increase profit margin?",
      answer: "Increase prices, reduce costs, improve efficiency, or add value to justify higher prices. Focus on high-margin products."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Profit Margin & Markup Calculator",
          description: "Calculate profit, profit margin, and markup percentage for business and pricing decisions",
          url: "https://smartcalhub.online/calculator/profit-margin"
        }}
      />
      <CalculatorLayout
      title="Profit Margin & Markup Calculator"
      description="Calculate profit, profit margin, and markup percentage for business and pricing decisions."
      howItWorks="Enter your revenue (selling price) and cost. The calculator shows your profit amount, profit margin percentage, and markup percentage."
      formula="Profit Margin = (Revenue - Cost) / Revenue × 100 | Markup = (Revenue - Cost) / Cost × 100"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="revenue">Revenue / Selling Price ($)</Label>
            <Input
              id="revenue"
              type="number"
              step="any"
              placeholder="e.g., 100"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="cost">Cost ($)</Label>
            <Input
              id="cost"
              type="number"
              step="any"
              placeholder="e.g., 60"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
        </div>

        <Button 
          onClick={() => handleCalculation(calculate)} 
          className="w-full" 
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate"}
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <p className="text-sm text-muted-foreground">Net Profit</p>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(`$${result.profit.toFixed(2)}`, "Profit")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => printCalculation({
                      title: "Profit Margin Calculator",
                      inputs: [
                        { label: "Revenue", value: `$${revenue}` },
                        { label: "Cost", value: `$${cost}` }
                      ],
                      results: [
                        { label: "Net Profit", value: `$${result.profit.toFixed(2)}` },
                        { label: "Profit Margin", value: `${result.margin.toFixed(2)}%` },
                        { label: "Markup", value: `${result.markup.toFixed(2)}%` }
                      ]
                    })}>
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-3xl font-bold text-primary">
                    ${result.profit.toFixed(2)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Profit Margin</p>
                    <p className="text-xl font-semibold text-green-600">
                      {result.margin.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Markup</p>
                    <p className="text-xl font-semibold text-blue-600">
                      {result.markup.toFixed(2)}%
                    </p>
                  </div>
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

export default ProfitMarginCalculator;
