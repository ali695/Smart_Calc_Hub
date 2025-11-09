import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BodySurfaceAreaCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [formula, setFormula] = useState("dubois");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (w > 0 && h > 0) {
      let bsa = 0;
      
      switch (formula) {
        case "dubois":
          // Du Bois formula: BSA = 0.007184 × W^0.425 × H^0.725
          bsa = 0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725);
          break;
        case "mosteller":
          // Mosteller formula: BSA = sqrt((H × W) / 3600)
          bsa = Math.sqrt((h * w) / 3600);
          break;
        case "haycock":
          // Haycock formula: BSA = 0.024265 × W^0.5378 × H^0.3964
          bsa = 0.024265 * Math.pow(w, 0.5378) * Math.pow(h, 0.3964);
          break;
      }

      setResult(bsa);
    }
  };

  const faqs = [
    {
      question: "What is body surface area (BSA)?",
      answer: "Body surface area is the total surface area of the human body measured in square meters (m²). It's used in medicine to calculate drug dosages, determine cardiac output, and assess metabolic rates more accurately than weight alone."
    },
    {
      question: "Why is BSA important in medicine?",
      answer: "BSA is crucial for calculating appropriate medication dosages, especially for chemotherapy and critical care drugs. It provides a more accurate measure than weight alone because many physiological functions correlate better with body surface area."
    },
    {
      question: "Which BSA formula is most accurate?",
      answer: "The Du Bois formula is the most widely used and accepted. The Mosteller formula is simpler and easier to calculate. The Haycock formula is often preferred for children. All are clinically acceptable."
    },
    {
      question: "What is a normal BSA for adults?",
      answer: "Average BSA for adult men is approximately 1.9 m² and for adult women about 1.6 m². However, normal ranges vary significantly based on height, weight, age, and ethnicity."
    }
  ];

  return (
    <CalculatorLayout
      title="Body Surface Area Calculator"
      description="Calculate BSA using Du Bois, Mosteller, or Haycock formulas for medical dosing"
      category="health"
      calculatorId="body-surface-area"
      howItWorks="This calculator computes body surface area (BSA) in square meters using validated medical formulas. BSA is essential for calculating medication dosages and assessing metabolic functions. Choose between Du Bois (most common), Mosteller (simplest), or Haycock (pediatric) formulas."
      formula="Du Bois: BSA = 0.007184 × Weight^0.425 × Height^0.725"
      faqs={faqs}
      seoTitle="Body Surface Area Calculator – BSA for Medical Dosing | SmartCalc Hub"
      seoDescription="Free BSA calculator using Du Bois, Mosteller, and Haycock formulas. Calculate body surface area for accurate medication dosing."
      keywords="body surface area calculator, BSA calculator, Du Bois formula, medical dosage calculator"
      canonicalUrl="https://smartcalchub.com/health/body-surface-area-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 70"
              min="0"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label>Height (cm)</Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 170"
              min="0"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label>Formula</Label>
            <Select value={formula} onValueChange={setFormula}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dubois">Du Bois (Standard)</SelectItem>
                <SelectItem value="mosteller">Mosteller (Simple)</SelectItem>
                <SelectItem value="haycock">Haycock (Pediatric)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate BSA
        </Button>

        {result !== null && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-border/50">
                <p className="text-sm font-medium text-muted-foreground">Body Surface Area</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  {result.toFixed(3)} m²
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {formula === "dubois" ? "Du Bois Formula" : formula === "mosteller" ? "Mosteller Formula" : "Haycock Formula"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Weight</p>
                  <p className="font-semibold">{weight} kg</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Height</p>
                  <p className="font-semibold">{height} cm</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground">
                <p className="text-center">
                  BSA is used for medical calculations. Always consult healthcare professionals for medication dosing.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BodySurfaceAreaCalculator;
