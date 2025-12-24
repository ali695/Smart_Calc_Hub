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

const StressStrainCalculator = () => {
  const [force, setForce] = useState("");
  const [area, setArea] = useState("");
  const [originalLength, setOriginalLength] = useState("");
  const [changeInLength, setChangeInLength] = useState("");
  const [result, setResult] = useState<{
    stress: number;
    strain: number;
    youngsModulus: number;
  } | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const f = parseFloat(force);
    const a = parseFloat(area);
    const l0 = parseFloat(originalLength);
    const dl = parseFloat(changeInLength);

    if (!isNaN(f) && !isNaN(a) && !isNaN(l0) && !isNaN(dl) && a > 0 && l0 > 0) {
      const stress = f / a;
      const strain = dl / l0;
      const youngsModulus = strain !== 0 ? stress / strain : 0;

      setResult({
        stress: parseFloat(stress.toFixed(2)),
        strain: parseFloat(strain.toFixed(6)),
        youngsModulus: parseFloat(youngsModulus.toFixed(2))
      });
    }
  };

  const handlePrint = () => {
    if (result) {
      printCalculation({
        title: "Stress-Strain Calculation",
        inputs: [
          { label: "Force", value: `${force} N` },
          { label: "Cross-sectional Area", value: `${area} m²` },
          { label: "Original Length", value: `${originalLength} m` },
          { label: "Change in Length", value: `${changeInLength} m` }
        ],
        results: [
          { label: "Stress (σ)", value: `${result.stress.toLocaleString()} Pa` },
          { label: "Strain (ε)", value: result.strain.toFixed(6) },
          { label: "Young's Modulus (E)", value: `${result.youngsModulus.toLocaleString()} Pa` }
        ],
        formula: "Stress (σ) = F/A | Strain (ε) = ΔL/L₀ | Young's Modulus (E) = σ/ε"
      });
    }
  };

  const faqs = [
    {
      question: "What is stress in materials?",
      answer: "Stress is the internal force per unit area within a material. It's calculated as Force/Area and measured in Pascals (Pa) or N/m²."
    },
    {
      question: "What is strain?",
      answer: "Strain is the deformation of a material relative to its original length. It's dimensionless and calculated as change in length divided by original length."
    },
    {
      question: "What is Young's modulus?",
      answer: "Young's modulus (E) is a measure of a material's stiffness. It's the ratio of stress to strain and indicates how much a material will deform under load."
    },
    {
      question: "How do you calculate Young's modulus?",
      answer: "Young's modulus = Stress / Strain = (F/A) / (ΔL/L₀). Higher values indicate stiffer materials that resist deformation."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Stress-Strain Calculator",
          description: "Calculate stress, strain, and Young's modulus for material mechanics analysis",
          url: "https://smartcalhub.online/calculator/stress-strain",
          applicationCategory: "EngineeringApplication"
        }}
      />
      <CalculatorLayout
        title="Stress-Strain Calculator"
        description="Calculate stress, strain, and Young's modulus for material mechanics"
        category="engineering"
        calculatorId="stress-strain"
        howItWorks="This calculator determines stress (force per unit area), strain (relative deformation), and Young's modulus (material stiffness) for engineering materials. Enter force, cross-sectional area, original length, and change in length to analyze material behavior under load."
        formula="Stress (σ) = F/A | Strain (ε) = ΔL/L₀ | Young's Modulus (E) = σ/ε"
        faqs={faqs}
        seoTitle="Stress-Strain Calculator – Material Mechanics | SmartCalc Hub"
        seoDescription="Free stress-strain calculator. Calculate stress, strain, and Young's modulus for materials."
        keywords="stress strain calculator, Young's modulus, material mechanics, engineering calculator"
        canonicalUrl="https://smartcalhub.online/calculator/stress-strain"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Force (N)</Label>
              <Input
                type="number"
                value={force}
                onChange={(e) => setForce(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
                placeholder="e.g., 1000"
                min="0"
                step="1"
              />
            </div>

            <div className="space-y-2">
              <Label>Cross-sectional Area (m²)</Label>
              <Input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
                placeholder="e.g., 0.001"
                min="0.000001"
                step="0.000001"
              />
            </div>

            <div className="space-y-2">
              <Label>Original Length (m)</Label>
              <Input
                type="number"
                value={originalLength}
                onChange={(e) => setOriginalLength(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
                placeholder="e.g., 1.0"
                min="0.001"
                step="0.001"
              />
            </div>

            <div className="space-y-2">
              <Label>Change in Length (m)</Label>
              <Input
                type="number"
                value={changeInLength}
                onChange={(e) => setChangeInLength(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, calculate)}
                placeholder="e.g., 0.001"
                step="0.0001"
              />
            </div>
          </div>

          <Button 
            onClick={() => handleCalculation(calculate)}
            disabled={isCalculating}
            className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            {isCalculating ? "Calculating..." : "Calculate Stress & Strain"}
          </Button>

          {result !== null && (
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-border/50">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Stress Analysis Results</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Stress (σ)</p>
                      <p className="text-2xl font-bold text-primary">{result.stress.toLocaleString()} Pa</p>
                      <p className="text-xs text-muted-foreground mt-1">{(result.stress / 1e6).toFixed(2)} MPa</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(result.stress.toString(), "Stress")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Strain (ε)</p>
                      <p className="text-2xl font-bold text-primary">{result.strain.toFixed(6)}</p>
                      <p className="text-xs text-muted-foreground mt-1">{(result.strain * 100).toFixed(4)}% deformation</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(result.strain.toFixed(6), "Strain")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Young's Modulus (E)</p>
                      <p className="text-2xl font-bold text-primary">{result.youngsModulus.toLocaleString()} Pa</p>
                      <p className="text-xs text-muted-foreground mt-1">{(result.youngsModulus / 1e9).toFixed(2)} GPa</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(result.youngsModulus.toString(), "Young's Modulus")}
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

export default StressStrainCalculator;
