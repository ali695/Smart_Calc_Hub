import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WaistToHeightCalculator = () => {
  const [waist, setWaist] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("cm");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const waistValue = parseFloat(waist);
    const heightValue = parseFloat(height);

    if (waistValue > 0 && heightValue > 0) {
      const ratio = waistValue / heightValue;
      let category = "";
      let risk = "";

      if (ratio < 0.4) {
        category = "Underweight";
        risk = "May indicate insufficient body fat";
      } else if (ratio < 0.5) {
        category = "Healthy";
        risk = "Low health risk";
      } else if (ratio < 0.6) {
        category = "Overweight";
        risk = "Increased health risk";
      } else {
        category = "Obese";
        risk = "High health risk";
      }

      setResult({ ratio, category, risk });
    }
  };

  const faqs = [
    {
      question: "What is the waist-to-height ratio?",
      answer: "The waist-to-height ratio (WHtR) is a measure of body fat distribution calculated by dividing waist circumference by height. A ratio of 0.5 or less is generally considered healthy, following the 'keep your waist to less than half your height' rule."
    },
    {
      question: "Why is waist-to-height ratio important?",
      answer: "WHtR is a better predictor of health risks (cardiovascular disease, diabetes, mortality) than BMI alone because it specifically measures central obesity, which is more strongly linked to metabolic health issues."
    },
    {
      question: "How do I measure my waist correctly?",
      answer: "Measure around your natural waist (typically the narrowest part between ribs and hips) or at the level of your belly button. Breathe normally and measure after exhaling. Don't pull the tape too tight."
    },
    {
      question: "What is a healthy waist-to-height ratio?",
      answer: "A healthy WHtR is below 0.5 for both men and women. Ratios between 0.5-0.6 indicate increased risk, and above 0.6 suggests high risk for weight-related health problems."
    }
  ];

  return (
    <CalculatorLayout
      title="Waist-to-Height Ratio Calculator"
      description="Calculate your waist-to-height ratio to assess health risk from body fat distribution"
      category="health"
      calculatorId="waist-to-height"
      howItWorks="This calculator determines your waist-to-height ratio (WHtR), a simple but effective measure of health risk. A ratio above 0.5 may indicate increased risk for cardiovascular disease and metabolic disorders. The calculation is the same for all genders and ages."
      formula="Waist-to-Height Ratio = Waist Circumference / Height"
      faqs={faqs}
      seoTitle="Waist-to-Height Ratio Calculator – WHtR Health Assessment | SmartCalc Hub"
      seoDescription="Free waist-to-height ratio calculator. Assess your health risk from central obesity with instant WHtR results."
      keywords="waist to height ratio, WHtR calculator, waist height ratio, central obesity, health risk calculator"
      canonicalUrl="https://smartcalhub.online/calculator/waist-to-height"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Waist Circumference</Label>
            <Input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder="e.g., 80"
              min="0"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label>Height</Label>
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
            <Label>Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cm">Centimeters (cm)</SelectItem>
                <SelectItem value="inches">Inches (in)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate Ratio
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-border/50">
                <p className="text-sm font-medium text-muted-foreground">Waist-to-Height Ratio</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  {result.ratio.toFixed(3)}
                </p>
                <p className="text-lg font-semibold text-muted-foreground mt-2">{result.category}</p>
              </div>

              <div className="space-y-2 text-center">
                <p className="text-sm">
                  <span className="font-medium">Health Risk:</span> {result.risk}
                </p>
                <p className="text-xs text-muted-foreground">
                  Target: Keep ratio below 0.5 for optimal health
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground">
                <p className="text-center">
                  WHtR is a simple indicator. Consult healthcare professionals for comprehensive health assessment.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default WaistToHeightCalculator;
