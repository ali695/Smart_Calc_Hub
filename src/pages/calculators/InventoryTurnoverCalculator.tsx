import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";

const InventoryTurnoverCalculator = () => {
  const [costOfGoodsSold, setCostOfGoodsSold] = useState("");
  const [averageInventory, setAverageInventory] = useState("");
  const [result, setResult] = useState<{
    turnoverRatio: number;
    daysInventoryOutstanding: number;
  } | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const cogs = parseFloat(costOfGoodsSold);
    const avgInv = parseFloat(averageInventory);

    if (!isNaN(cogs) && !isNaN(avgInv) && avgInv > 0) {
      const turnoverRatio = cogs / avgInv;
      const daysInventoryOutstanding = 365 / turnoverRatio;

      setResult({
        turnoverRatio: parseFloat(turnoverRatio.toFixed(2)),
        daysInventoryOutstanding: parseFloat(daysInventoryOutstanding.toFixed(0))
      });
    }
  };

  const handlePrint = () => {
    if (result) {
      printCalculation({
        title: "Inventory Turnover Calculation",
        inputs: [
          { label: "Cost of Goods Sold (COGS)", value: `$${parseFloat(costOfGoodsSold).toLocaleString()}` },
          { label: "Average Inventory", value: `$${parseFloat(averageInventory).toLocaleString()}` }
        ],
        results: [
          { label: "Inventory Turnover Ratio", value: `${result.turnoverRatio}x` },
          { label: "Days Inventory Outstanding", value: `${result.daysInventoryOutstanding} days` }
        ],
        formula: "Inventory Turnover = COGS / Average Inventory | DIO = 365 / Turnover"
      });
    }
  };

  const getAssessment = (ratio: number) => {
    if (ratio < 2) return { text: "Low Turnover", color: "text-red-500", description: "Inventory moves slowly. Consider improving sales or reducing stock." };
    if (ratio < 4) return { text: "Moderate Turnover", color: "text-yellow-500", description: "Average inventory management. Room for optimization." };
    if (ratio < 8) return { text: "Good Turnover", color: "text-green-500", description: "Healthy inventory rotation. Efficient stock management." };
    return { text: "High Turnover", color: "text-blue-500", description: "Very efficient. Ensure adequate stock to avoid stockouts." };
  };

  const faqs = [
    {
      question: "What is inventory turnover?",
      answer: "Inventory turnover measures how many times a company sells and replaces its inventory during a period. Higher ratios indicate efficient inventory management and strong sales."
    },
    {
      question: "How do you calculate inventory turnover?",
      answer: "Divide Cost of Goods Sold (COGS) by Average Inventory. The result shows how many times inventory 'turns over' in a period (usually annually)."
    },
    {
      question: "What is Days Inventory Outstanding (DIO)?",
      answer: "DIO indicates how many days, on average, it takes to sell inventory. It's calculated as 365 divided by the inventory turnover ratio. Lower is generally better."
    },
    {
      question: "What is a good inventory turnover ratio?",
      answer: "It varies by industry. Generally, 4-6 times per year is good for most businesses. Grocery stores may have 15-20x, while jewelry stores may have 1-2x."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Inventory Turnover Calculator",
          description: "Calculate inventory turnover ratio and days inventory outstanding for stock efficiency",
          url: "https://smartcalchub.com/calculator/inventory-turnover",
          applicationCategory: "BusinessApplication"
        }}
      />
      <CalculatorLayout
        title="Inventory Turnover Calculator"
        description="Calculate inventory turnover ratio and days inventory outstanding"
        category="business"
        calculatorId="inventory-turnover"
        howItWorks="This calculator determines your inventory turnover ratio (how many times inventory is sold and replaced) and days inventory outstanding (average days to sell inventory). Enter your Cost of Goods Sold (COGS) and average inventory value to assess inventory efficiency."
        formula="Inventory Turnover = COGS / Average Inventory | Days Inventory Outstanding = 365 / Turnover"
        faqs={faqs}
        seoTitle="Inventory Turnover Calculator – Stock Efficiency | SmartCalc Hub"
        seoDescription="Free inventory turnover calculator. Calculate turnover ratio and days inventory outstanding."
        keywords="inventory turnover calculator, DIO, days inventory outstanding, stock efficiency, business metrics"
        canonicalUrl="https://smartcalhub.online/calculator/inventory-turnover"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Cost of Goods Sold (COGS) ($)</Label>
              <Input
                type="number"
                value={costOfGoodsSold}
                onChange={(e) => setCostOfGoodsSold(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
                placeholder="e.g., 500000"
                min="0"
                step="100"
              />
            </div>

            <div className="space-y-2">
              <Label>Average Inventory ($)</Label>
              <Input
                type="number"
                value={averageInventory}
                onChange={(e) => setAverageInventory(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
                placeholder="e.g., 100000"
                min="1"
                step="100"
              />
            </div>
          </div>

          <Button 
            onClick={() => handleCalculation(calculate)}
            disabled={isCalculating}
            className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            {isCalculating ? "Calculating..." : "Calculate Inventory Turnover"}
          </Button>

          {result !== null && (
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-border/50">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Inventory Analysis Results</p>
                  <div className={`text-lg font-semibold ${getAssessment(result.turnoverRatio).color}`}>
                    {getAssessment(result.turnoverRatio).text}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {getAssessment(result.turnoverRatio).description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Inventory Turnover Ratio</p>
                      <p className="text-3xl font-bold text-primary">{result.turnoverRatio}x</p>
                      <p className="text-xs text-muted-foreground mt-1">per year</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(result.turnoverRatio.toString(), "Turnover Ratio")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Days Inventory Outstanding (DIO)</p>
                      <p className="text-3xl font-bold text-primary">{result.daysInventoryOutstanding}</p>
                      <p className="text-xs text-muted-foreground mt-1">days to sell inventory</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(result.daysInventoryOutstanding.toString(), "DIO")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    className="w-full"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print Results
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
};

export default InventoryTurnoverCalculator;
