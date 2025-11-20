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

const MolarityCalculator = () => {
  const [moles, setMoles] = useState("");
  const [volume, setVolume] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const m = parseFloat(moles);
    const v = parseFloat(volume);
    if (!isNaN(m) && !isNaN(v) && v > 0) {
      const molarity = m / v;
      setResult(molarity);
    }
  };

  const handlePrint = () => {
    if (result !== null) {
      printCalculation({
        title: "Molarity Calculation",
        inputs: [
          { label: "Moles of Solute", value: `${moles} mol` },
          { label: "Volume of Solution", value: `${volume} L` }
        ],
        results: [
          { label: "Molarity", value: `${result.toFixed(4)} M` }
        ],
        formula: "M = moles / volume (L)"
      });
    }
  };

  const faqs = [
    {
      question: "What is molarity?",
      answer: "Molarity (M) is the number of moles of solute per liter of solution. It's one of the most common concentration units in chemistry, expressed as mol/L or M."
    },
    {
      question: "How do I calculate molarity?",
      answer: "Divide the number of moles of solute by the volume of solution in liters: M = moles / volume (L). For example, 2 moles in 1 liter = 2 M."
    },
    {
      question: "What's the difference between molarity and molality?",
      answer: "Molarity uses volume of solution (liters), while molality uses mass of solvent (kilograms). Molarity changes with temperature; molality does not."
    },
    {
      question: "How do I dilute a solution to a specific molarity?",
      answer: "Use the dilution formula: M₁V₁ = M₂V₂, where M is molarity and V is volume. This helps calculate how much solvent to add for the desired concentration."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Molarity Calculator",
          description: "Calculate solution molarity and dilutions for chemistry applications",
          url: "https://smartcalchub.com/science/molarity-calculator",
          applicationCategory: "ScienceApplication"
        }}
      />
      <CalculatorLayout
      title="Molarity Calculator"
      description="Calculate solution molarity and dilutions for chemistry applications"
      category="science"
      calculatorId="molarity"
      howItWorks="This calculator determines the molar concentration of a solution. Enter the number of moles of solute and the volume of solution in liters to find the molarity. Molarity is essential for preparing solutions in chemistry labs and understanding reaction stoichiometry."
      formula="M = moles / volume (L)"
      faqs={faqs}
      seoTitle="Molarity Calculator – Solution Concentration | SmartCalc Hub"
      seoDescription="Free molarity calculator. Calculate molar concentration and solution dilutions for chemistry."
      keywords="molarity calculator, molar concentration, solution chemistry, dilution calculator"
      canonicalUrl="https://smartcalchub.com/science/molarity-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Moles of Solute (mol)</Label>
            <Input
              type="number"
              value={moles}
              onChange={(e) => setMoles(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 0.5"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>Volume of Solution (L)</Label>
            <Input
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 1.0"
              min="0.001"
              step="0.1"
            />
          </div>
        </div>

        <Button 
          onClick={() => handleCalculation(calculate)}
          disabled={isCalculating}
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          {isCalculating ? "Calculating..." : "Calculate Molarity"}
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Molarity Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {result.toFixed(4)} M
              </p>
              <div className="pt-4 border-t border-border/50 space-y-2">
                <p className="text-xs text-muted-foreground">
                  This means {parseFloat(moles)} moles in {parseFloat(volume)} L
                </p>
                <p className="text-xs text-muted-foreground">
                  Concentration: {(result * 1000).toFixed(2)} mmol/L
                </p>
              </div>

              <div className="flex gap-2 justify-center pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(result.toFixed(4), "Molarity")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Result
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
    </>
  );
};

export default MolarityCalculator;
