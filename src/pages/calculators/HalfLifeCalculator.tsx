import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer } from "lucide-react";

const HalfLifeCalculator = () => {
  const [initialAmount, setInitialAmount] = useState("");
  const [halfLife, setHalfLife] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<{ remaining: number; decayed: number; percentage: number } | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const n0 = parseFloat(initialAmount);
    const t_half = parseFloat(halfLife);
    const t = parseFloat(time);
    
    if (!isNaN(n0) && !isNaN(t_half) && !isNaN(t) && t_half > 0 && n0 > 0) {
      const remaining = n0 * Math.pow(0.5, t / t_half);
      const decayed = n0 - remaining;
      const percentage = (remaining / n0) * 100;
      setResult({ remaining, decayed, percentage });
      updateAIInsight({ initialAmount: n0, halfLife: t_half, time: t }, { remaining, decayed, percentage });
    }
  };

  const handlePrint = () => {
    if (result !== null) {
      printCalculation({
        title: "Half-Life Decay Calculation",
        inputs: [
          { label: "Initial Amount", value: `${initialAmount}` },
          { label: "Half-Life", value: `${halfLife} units` },
          { label: "Time Elapsed", value: `${time} units` }
        ],
        results: [
          { label: "Remaining Amount", value: `${result.remaining.toFixed(4)}` },
          { label: "Decayed Amount", value: `${result.decayed.toFixed(4)}` },
          { label: "Percentage Remaining", value: `${result.percentage.toFixed(2)}%` }
        ],
        formula: "N(t) = N₀ × (1/2)^(t/t½)"
      });
    }
  };

  const faqs = [
    {
      question: "What is half-life?",
      answer: "Half-life is the time required for half of a radioactive substance to decay. After one half-life, 50% remains; after two half-lives, 25% remains, and so on."
    },
    {
      question: "How do you calculate radioactive decay?",
      answer: "Use the formula N(t) = N₀ × (1/2)^(t/t½), where N₀ is initial amount, t is time elapsed, and t½ is the half-life period. This gives the remaining amount at time t."
    },
    {
      question: "What are common half-life examples?",
      answer: "Carbon-14 has a half-life of 5,730 years (used in dating), Uranium-238 is 4.5 billion years, and Iodine-131 is 8 days (used in medicine)."
    },
    {
      question: "Why is half-life important?",
      answer: "Half-life is crucial in radiocarbon dating, nuclear medicine, radiation safety, and understanding environmental contamination. It helps predict how long radioactive materials remain hazardous."
    }
  ];

  return (
    <CalculatorLayout
      title="Half-Life Calculator"
      description="Calculate radioactive decay and half-life for nuclear physics and chemistry"
      category="science"
      calculatorId="half-life"
      howItWorks="This calculator determines radioactive decay using the half-life formula. Enter the initial amount, half-life period, and time elapsed to find the remaining amount, decayed amount, and percentage remaining. Essential for nuclear physics, geology, and medicine."
      formula="N(t) = N₀ × (1/2)^(t/t½)"
      faqs={faqs}
      seoTitle="Half-Life Calculator – Radioactive Decay | SmartCalc Hub"
      seoDescription="Free half-life calculator. Calculate radioactive decay time and remaining substance for nuclear physics."
      keywords="half-life calculator, radioactive decay, nuclear physics, exponential decay"
      canonicalUrl="https://smartcalchub.com/science/half-life"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Initial Amount (N₀)</Label>
            <Input
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 100"
              min="0"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Half-Life (t½)</Label>
            <Input
              type="number"
              value={halfLife}
              onChange={(e) => setHalfLife(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 5730 years"
              min="0.001"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Time Elapsed (t)</Label>
            <Input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 11460"
              min="0"
              step="any"
            />
          </div>
        </div>

        <Button 
          onClick={() => handleCalculation(calculate)}
          disabled={isCalculating}
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          {isCalculating ? "Calculating..." : "Calculate Decay"}
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Radioactive Decay Results</p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                    {result.remaining.toFixed(4)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Decayed</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                    {result.decayed.toFixed(4)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">% Remaining</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                    {result.percentage.toFixed(2)}%
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  After {time} time units, {result.percentage.toFixed(2)}% of the original substance remains
                </p>
              </div>

              <div className="flex gap-2 justify-center pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(`Remaining: ${result.remaining.toFixed(4)}, Percentage: ${result.percentage.toFixed(2)}%`, "Decay Results")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Results
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default HalfLifeCalculator;
