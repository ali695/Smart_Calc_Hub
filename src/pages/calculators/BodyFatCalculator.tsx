import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const BodyFatCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const { updateAIInsight, handleCalculation } = useCalculatorEnhancements();

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hi = parseFloat(hip);
    
    if (gender === "male" && h > 0 && n > 0 && wa > 0) {
      const bf = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
      const bfResult = parseFloat(bf.toFixed(1));
      setBodyFat(bfResult);
      const cat = determineCategory(bf, "male");
      updateAIInsight(
        { gender, height: h, weight: w, neck: n, waist: wa },
        { bodyFatPercentage: bfResult, category: cat, leanMass: w * (1 - bf / 100), fatMass: w * (bf / 100) }
      );
    } else if (gender === "female" && h > 0 && n > 0 && wa > 0 && hi > 0) {
      const bf = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - n) + 0.22100 * Math.log10(h)) - 450;
      const bfResult = parseFloat(bf.toFixed(1));
      setBodyFat(bfResult);
      const cat = determineCategory(bf, "female");
      updateAIInsight(
        { gender, height: h, weight: w, neck: n, waist: wa, hip: hi },
        { bodyFatPercentage: bfResult, category: cat, leanMass: w * (1 - bf / 100), fatMass: w * (bf / 100) }
      );
    }
  };

  const determineCategory = (bf: number, gen: string): string => {
    let cat = "";
    if (gen === "male") {
      if (bf < 6) cat = "Essential Fat";
      else if (bf < 14) cat = "Athletes";
      else if (bf < 18) cat = "Fitness";
      else if (bf < 25) cat = "Average";
      else cat = "Obese";
    } else {
      if (bf < 14) cat = "Essential Fat";
      else if (bf < 21) cat = "Athletes";
      else if (bf < 25) cat = "Fitness";
      else if (bf < 32) cat = "Average";
      else cat = "Obese";
    }
    setCategory(cat);
    return cat;
  };

  const faqs = [
    {
      question: "How accurate is body fat percentage measurement?",
      answer: "This calculator uses the U.S. Navy method, which is reasonably accurate but not as precise as DEXA scans or hydrostatic weighing. It provides a good estimate for tracking progress."
    },
    {
      question: "What's a healthy body fat percentage?",
      answer: "For men: 6-24%, For women: 14-31%. Athletes typically have lower percentages. Essential fat is needed for basic functions, so going too low can be unhealthy."
    },
    {
      question: "How do I measure these body parts accurately?",
      answer: "Use a cloth tape measure. Neck: just below larynx. Waist (men): at navel. Waist (women): at narrowest point. Hip (women): at widest point. Measure in cm without compressing skin."
    },
    {
      question: "How can I reduce body fat?",
      answer: "Combine a calorie deficit with strength training and cardio. Aim for slow, steady fat loss (0.5-1% per month). Extreme calorie restriction can lead to muscle loss."
    }
  ];

  return (
    <CalculatorLayout
      title="Body Fat Calculator"
      description="Calculate your body fat percentage using U.S. Navy method"
      category="health"
      calculatorId="body-fat"
      howItWorks="This calculator uses the U.S. Navy body fat formula which requires body measurements. For men: height, neck, and waist. For women: height, neck, waist, and hip measurements are needed."
      formula="Uses logarithmic formulas based on body circumferences relative to height (U.S. Navy method)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Age</Label>
            <Input type="number" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Height (cm)</Label>
            <Input type="number" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input type="number" placeholder="75" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Neck (cm)</Label>
            <Input type="number" placeholder="37" value={neck} onChange={(e) => setNeck(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Waist (cm)</Label>
            <Input type="number" placeholder="85" value={waist} onChange={(e) => setWaist(e.target.value)} />
          </div>
          
          {gender === "female" && (
            <div className="space-y-2 md:col-span-2">
              <Label>Hip (cm)</Label>
              <Input type="number" placeholder="95" value={hip} onChange={(e) => setHip(e.target.value)} />
            </div>
          )}
        </div>

        <Button type="button" onClick={calculate} className="w-full" size="lg">Calculate Body Fat</Button>

        {bodyFat !== null && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground">Body Fat Percentage</p>
              <p className="text-5xl font-bold text-primary">{bodyFat}%</p>
              <p className="text-lg font-semibold mt-2">{category}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BodyFatCalculator;