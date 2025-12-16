import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const ProteinCalculator = () => {
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("maintain");
  const [activity, setActivity] = useState("moderate");
  const [protein, setProtein] = useState<number | null>(null);
  const { updateAIInsight, handleCalculation } = useCalculatorEnhancements();

  const calculate = () => {
    const w = parseFloat(weight);
    if (w > 0) {
      let multiplier = 0.8;
      
      if (goal === "lose") multiplier = 1.2;
      else if (goal === "gain") multiplier = 1.6;
      else if (goal === "athlete") multiplier = 2.0;
      
      if (activity === "very-active") multiplier += 0.2;
      
      const dailyProtein = w * multiplier;
      const proteinResult = Math.round(dailyProtein);
      setProtein(proteinResult);
      
      updateAIInsight(
        { weight: w, fitnessGoal: goal, activityLevel: activity },
        { 
          dailyProteinGrams: proteinResult, 
          proteinPerMeal3: Math.round(proteinResult / 3),
          proteinPerMeal4: Math.round(proteinResult / 4),
          gramsPerKg: multiplier
        }
      );
    }
  };

  const faqs = [
    {
      question: "How much protein do I need per day?",
      answer: "General recommendation is 0.8g per kg of body weight for sedentary adults. Active individuals need 1.2-2.0g/kg. Athletes and those building muscle may need up to 2.2g/kg."
    },
    {
      question: "Can I eat too much protein?",
      answer: "Excessive protein (>2.5g/kg long-term) may strain kidneys in susceptible individuals. For healthy people, high protein intake is generally safe but unnecessary beyond 2.2g/kg."
    },
    {
      question: "What are good protein sources?",
      answer: "Animal sources: chicken, fish, eggs, dairy. Plant sources: legumes, tofu, tempeh, quinoa, nuts. Aim for variety and complete amino acid profiles."
    },
    {
      question: "When should I eat protein?",
      answer: "Distribute protein throughout the day for optimal muscle protein synthesis. Aim for 20-40g per meal, especially after workouts for recovery."
    }
  ];

  return (
    <CalculatorLayout
      title="Daily Protein Calculator"
      description="Calculate your daily protein requirements based on goals"
      howItWorks="This calculator estimates your protein needs based on body weight, fitness goals, and activity level. Requirements vary: maintenance needs less, muscle building needs more."
      formula="Protein (g) = Body Weight (kg) × Multiplier (based on goal and activity)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="gain">Build Muscle</SelectItem>
                <SelectItem value="athlete">Athlete/Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Activity Level</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="very-active">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg">Calculate Protein</Button>

        {protein !== null && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground">Daily Protein Requirement</p>
              <p className="text-5xl font-bold text-primary">{protein}g</p>
              <p className="text-sm text-muted-foreground mt-2">per day</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Per Meal (3 meals)</p>
                <p className="text-2xl font-bold">{Math.round(protein / 3)}g</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Per Meal (4 meals)</p>
                <p className="text-2xl font-bold">{Math.round(protein / 4)}g</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default ProteinCalculator;