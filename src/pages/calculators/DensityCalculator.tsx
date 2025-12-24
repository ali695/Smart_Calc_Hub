import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer } from "lucide-react";

const DensityCalculator = () => {
  const [mass, setMass] = useState("");
  const [volume, setVolume] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const m = parseFloat(mass);
    const v = parseFloat(volume);
    if (!isNaN(m) && !isNaN(v) && v > 0) {
      const density = m / v;
      setResult(density);
      updateAIInsight({ mass: m, volume: v }, { density, kgPerM3: density * 1000 });
    }
  };

  const handlePrint = () => {
    if (result !== null) {
      printCalculation({
        title: "Density Calculation",
        inputs: [
          { label: "Mass", value: `${mass} g` },
          { label: "Volume", value: `${volume} cm³` }
        ],
        results: [
          { label: "Density", value: `${result.toFixed(4)} g/cm³` }
        ],
        formula: "ρ = mass / volume"
      });
    }
  };

  const faqs = [
    {
      question: "What is density?",
      answer: "Density (ρ) is the mass per unit volume of a substance, typically expressed as g/cm³ or kg/m³. It describes how tightly matter is packed together in a material."
    },
    {
      question: "How do you calculate density?",
      answer: "Divide the mass by the volume: ρ = m/V. For example, if an object has a mass of 50g and volume of 25cm³, its density is 2 g/cm³."
    },
    {
      question: "What are common densities?",
      answer: "Water: 1 g/cm³, Ice: 0.92 g/cm³, Aluminum: 2.7 g/cm³, Iron: 7.87 g/cm³, Lead: 11.34 g/cm³, Gold: 19.3 g/cm³. These values help identify materials."
    },
    {
      question: "Why does density matter?",
      answer: "Density determines whether objects float or sink, helps identify unknown substances, is crucial in engineering design, and explains why hot air balloons rise and submarines dive."
    }
  ];

  return (
    <CalculatorLayout
      title="Density Calculator"
      description="Calculate density from mass and volume for physics and chemistry applications"
      category="science"
      calculatorId="density"
      howItWorks="This calculator determines the density of a substance using the fundamental formula ρ = m/V. Enter the mass (in grams) and volume (in cm³) to find the density. Density is essential in material science, quality control, and identifying substances."
      formula="ρ = mass / volume"
      faqs={faqs}
      seoTitle="Density Calculator – Mass, Volume, Density | SmartCalc Hub"
      seoDescription="Free density calculator. Calculate density using mass and volume (ρ = m/V) for science."
      keywords="density calculator, mass volume density, physics calculator, material density"
      canonicalUrl="https://smartcalhub.online/science/density-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Mass (g)</Label>
            <Input
              type="number"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 50"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>Volume (cm³)</Label>
            <Input
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 25"
              min="0.001"
              step="0.01"
            />
          </div>
        </div>

        <Button 
          onClick={() => handleCalculation(calculate)}
          disabled={isCalculating}
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          {isCalculating ? "Calculating..." : "Calculate Density"}
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Density Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {result.toFixed(4)} g/cm³
              </p>
              <div className="pt-4 border-t border-border/50 space-y-2">
                <p className="text-xs text-muted-foreground">
                  Also: {(result * 1000).toFixed(2)} kg/m³
                </p>
                <p className="text-xs text-muted-foreground">
                  Relative to water: {result.toFixed(2)}x (water = 1 g/cm³)
                </p>
              </div>

              <div className="flex gap-2 justify-center pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(result.toFixed(4), "Density")}
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
  );
};

export default DensityCalculator;
