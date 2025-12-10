import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer } from "lucide-react";

const KineticEnergyCalculator = () => {
  const [mass, setMass] = useState("");
  const [velocity, setVelocity] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const m = parseFloat(mass);
    const v = parseFloat(velocity);
    if (!isNaN(m) && !isNaN(v) && m > 0) {
      const ke = 0.5 * m * v * v;
      setResult(ke);
      updateAIInsight({ mass: m, velocity: v }, { kineticEnergy: ke, kilojoules: ke / 1000 });
    }
  };

  const handlePrint = () => {
    if (result !== null) {
      printCalculation({
        title: "Kinetic Energy Calculation",
        inputs: [
          { label: "Mass", value: `${mass} kg` },
          { label: "Velocity", value: `${velocity} m/s` }
        ],
        results: [
          { label: "Kinetic Energy", value: `${result.toFixed(2)} J` }
        ],
        formula: "KE = ½mv²"
      });
    }
  };

  const faqs = [
    {
      question: "What is kinetic energy?",
      answer: "Kinetic energy is the energy an object possesses due to its motion. It depends on the object's mass and velocity, calculated as KE = ½mv², where m is mass and v is velocity."
    },
    {
      question: "What are the units of kinetic energy?",
      answer: "Kinetic energy is measured in joules (J) in the SI system. 1 joule equals 1 kg·m²/s². Other units include calories, BTUs, and electron volts (eV) for atomic particles."
    },
    {
      question: "How does velocity affect kinetic energy?",
      answer: "Kinetic energy increases with the square of velocity. Doubling velocity quadruples kinetic energy. This is why high-speed collisions are much more destructive than low-speed ones."
    },
    {
      question: "What are real-world examples?",
      answer: "A moving car has kinetic energy (used in braking), a flying bullet, flowing water (hydroelectric power), wind (wind turbines), and even molecules in a gas (temperature)."
    }
  ];

  return (
    <CalculatorLayout
      title="Kinetic Energy Calculator"
      description="Calculate kinetic energy from mass and velocity for physics applications"
      category="science"
      calculatorId="kinetic-energy"
      howItWorks="This calculator determines the kinetic energy of a moving object using the formula KE = ½mv². Enter the mass (in kilograms) and velocity (in m/s) to find the kinetic energy in joules. Essential for physics, engineering, and understanding motion."
      formula="KE = ½mv²"
      faqs={faqs}
      seoTitle="Kinetic Energy Calculator – KE = ½mv² | SmartCalc Hub"
      seoDescription="Free kinetic energy calculator. Calculate KE using mass and velocity (KE = ½mv²) for physics."
      keywords="kinetic energy calculator, KE calculator, physics energy, motion energy"
      canonicalUrl="https://smartcalchub.com/science/kinetic-energy"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Mass (kg)</Label>
            <Input
              type="number"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 10"
              min="0"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label>Velocity (m/s)</Label>
            <Input
              type="number"
              value={velocity}
              onChange={(e) => setVelocity(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 5"
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
          {isCalculating ? "Calculating..." : "Calculate Kinetic Energy"}
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="text-center space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Kinetic Energy Result</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                {result.toFixed(2)} J
              </p>
              <div className="pt-4 border-t border-border/50 space-y-2">
                <p className="text-xs text-muted-foreground">
                  Also: {(result / 1000).toFixed(4)} kJ (kilojoules)
                </p>
                <p className="text-xs text-muted-foreground">
                  Mass: {mass} kg at {velocity} m/s
                </p>
              </div>

              <div className="flex gap-2 justify-center pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(result.toFixed(2), "Kinetic Energy (J)")}
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

export default KineticEnergyCalculator;
