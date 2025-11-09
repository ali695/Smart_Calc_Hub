import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IdealWeightCalculator = () => {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const h = parseFloat(height);
    if (h > 0) {
      const heightInInches = h / 2.54;
      const base = gender === "male" ? 50 : 45.5;
      const increment = gender === "male" ? 2.3 : 2.3;
      
      const robinson = base + (increment * Math.max(0, heightInInches - 60));
      const miller = base + (1.41 * Math.max(0, heightInInches - 60));
      const devine = base + (2.3 * Math.max(0, heightInInches - 60));
      const hamwi = gender === "male" 
        ? 48 + (2.7 * Math.max(0, heightInInches - 60))
        : 45.5 + (2.2 * Math.max(0, heightInInches - 60));
      
      const avg = (robinson + miller + devine + hamwi) / 4;
      const range = {
        min: avg - 5,
        max: avg + 5
      };
      
      setResults({
        robinson: Math.round(robinson),
        miller: Math.round(miller),
        devine: Math.round(devine),
        hamwi: Math.round(hamwi),
        average: Math.round(avg),
        range
      });
    }
  };

  const faqs = [
    {
      question: "How is ideal weight calculated?",
      answer: "Ideal weight is estimated using several formulas (Robinson, Miller, Devine, Hamwi) based on height and gender. Each formula has slightly different results, so we provide an average and range."
    },
    {
      question: "Is ideal weight the same as healthy weight?",
      answer: "Ideal weight is a general estimate. A healthy weight depends on many factors including muscle mass, bone density, age, and body composition. Consult healthcare professionals for personalized advice."
    },
    {
      question: "Why do the formulas give different results?",
      answer: "Different formulas were developed in different contexts and populations. That's why we show multiple results and an average to give you a realistic range rather than a single number."
    },
    {
      question: "Should I aim for the exact ideal weight?",
      answer: "The ideal weight range is a guideline, not a strict target. Focus on overall health, fitness, and how you feel rather than hitting a specific number."
    }
  ];

  return (
    <CalculatorLayout
      title="Ideal Weight Calculator"
      description="Calculate your ideal body weight using multiple formulas"
      howItWorks="This calculator uses four well-known formulas (Robinson, Miller, Devine, and Hamwi) to estimate your ideal body weight based on height and gender. It provides an average and healthy weight range."
      formula="Robinson: Male: 52kg + 1.9kg/inch over 5ft | Female: 49kg + 1.7kg/inch over 5ft (similar variations for other formulas)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" type="number" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={calculate} className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" size="lg">Calculate Ideal Weight</Button>

        {results && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 rounded-lg border border-primary text-center hover:scale-[1.02] transition-all duration-300">
              <p className="text-sm font-medium text-muted-foreground">Average Ideal Weight</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">{results.average} kg</p>
              <p className="text-sm text-muted-foreground mt-2">Healthy range: {Math.round(results.range.min)}-{Math.round(results.range.max)} kg</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">Robinson Formula</p>
                <p className="text-xl font-bold">{results.robinson} kg</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">Miller Formula</p>
                <p className="text-xl font-bold">{results.miller} kg</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">Devine Formula</p>
                <p className="text-xl font-bold">{results.devine} kg</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">Hamwi Formula</p>
                <p className="text-xl font-bold">{results.hamwi} kg</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default IdealWeightCalculator;