import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("moderate");
  const [climate, setClimate] = useState("moderate");
  const [waterIntake, setWaterIntake] = useState<number | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const w = parseFloat(weight);
    if (w > 0) {
      let base = w * 0.033; // Base: 33ml per kg
      
      if (activity === "high") base *= 1.2;
      else if (activity === "very-high") base *= 1.4;
      
      if (climate === "hot") base *= 1.15;
      
      setWaterIntake(parseFloat(base.toFixed(2)));
    }
  };

  const faqs = [
    {
      question: "How much water should I drink per day?",
      answer: "A general guideline is 30-35ml per kg of body weight. This varies based on activity level, climate, and individual needs. Listen to your body and drink when thirsty."
    },
    {
      question: "Does coffee or tea count towards water intake?",
      answer: "Yes, all fluids count, including coffee, tea, milk, and water-rich foods. While caffeine has a mild diuretic effect, it doesn't fully negate the hydration from these beverages."
    },
    {
      question: "How do I know if I'm drinking enough?",
      answer: "Check your urine color: pale yellow indicates good hydration. Also monitor for thirst, dry mouth, or fatigue. Athletes and people in hot climates need more water."
    },
    {
      question: "Can I drink too much water?",
      answer: "Yes, overhydration (hyponatremia) can occur but is rare. It's most common during endurance events. Spread intake throughout the day and don't force excessive amounts."
    }
  ];

  return (
    <CalculatorLayout
      title="Water Intake Calculator"
      description="Calculate your daily water intake needs"
      category="health"
      calculatorId="water"
      howItWorks="This calculator estimates your daily water needs based on your body weight, activity level, and climate. The base calculation uses 33ml per kg of body weight, adjusted for physical activity and environmental factors."
      formula="Water Intake (L) = Weight (kg) × 0.033 × Activity Multiplier × Climate Multiplier"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          
          <div className="space-y-2">
            <Label>Activity Level</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (Sedentary)</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High (Active)</SelectItem>
                <SelectItem value="very-high">Very High (Athlete)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Climate</Label>
            <Select value={climate} onValueChange={setClimate}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="hot">Hot/Humid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          type="button" 
          onClick={() => handleCalculation(calculate)} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" 
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate Water Intake"
          )}
        </Button>

        {waterIntake !== null && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 rounded-lg border border-primary text-center hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Daily Water Intake</p>
                  <p className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">{waterIntake}L</p>
                  <p className="text-lg mt-2">{Math.round(waterIntake * 1000)}ml or {Math.round(waterIntake * 33.814)}oz</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`${waterIntake}L`, "Water intake")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => printCalculation({
                      title: "Water Intake Calculator",
                      inputs: [
                        { label: "Weight", value: `${weight} kg` },
                        { label: "Activity Level", value: activity },
                        { label: "Climate", value: climate }
                      ],
                      results: [
                        { label: "Daily Water Intake", value: `${waterIntake}L (${Math.round(waterIntake * 1000)}ml)` },
                        { label: "Glasses per day", value: `${Math.round(waterIntake / 0.25)} glasses (250ml each)` }
                      ],
                      formula: "Water Intake (L) = Weight (kg) × 0.033 × Activity Multiplier × Climate Multiplier"
                    })}
                  >
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">💧 Approximately {Math.round(waterIntake / 0.25)} glasses (250ml each)</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default WaterIntakeCalculator;