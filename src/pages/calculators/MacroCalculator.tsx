import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MacroCalculator = () => {
  const [calories, setCalories] = useState("");
  const [goal, setGoal] = useState("balanced");
  const [macros, setMacros] = useState<any>(null);

  const calculate = () => {
    const cal = parseFloat(calories);
    if (cal > 0) {
      let protein, carbs, fat;
      
      if (goal === "balanced") {
        protein = 0.30; carbs = 0.40; fat = 0.30;
      } else if (goal === "high-protein") {
        protein = 0.40; carbs = 0.30; fat = 0.30;
      } else if (goal === "low-carb") {
        protein = 0.40; carbs = 0.20; fat = 0.40;
      } else { // keto
        protein = 0.25; carbs = 0.05; fat = 0.70;
      }
      
      setMacros({
        protein: { grams: Math.round((cal * protein) / 4), percent: Math.round(protein * 100) },
        carbs: { grams: Math.round((cal * carbs) / 4), percent: Math.round(carbs * 100) },
        fat: { grams: Math.round((cal * fat) / 9), percent: Math.round(fat * 100) }
      });
    }
  };

  const faqs = [
    {
      question: "What are macronutrients?",
      answer: "Macronutrients (macros) are nutrients your body needs in large amounts: protein, carbohydrates, and fats. Each provides calories: protein and carbs have 4 cal/g, fat has 9 cal/g."
    },
    {
      question: "Which macro split is best?",
      answer: "It depends on your goals. Balanced (40/30/30) suits most people. High protein helps muscle building. Low-carb aids some with fat loss. Keto is very low carb, high fat."
    },
    {
      question: "How much protein do I need?",
      answer: "General guideline: 0.8-1g per pound of body weight for active individuals, more if building muscle (1-1.5g/lb). Protein supports muscle recovery and satiety."
    },
    {
      question: "Should I track macros or just calories?",
      answer: "Tracking macros provides more detail and can optimize body composition, but calorie tracking alone works for many people. Start with calories, add macro tracking if needed."
    }
  ];

  return (
    <CalculatorLayout
      title="Macro Nutrient Calculator"
      description="Calculate optimal protein, carbs, and fat distribution"
      howItWorks="This calculator splits your daily calorie target into optimal amounts of protein, carbohydrates, and fats based on your goal. Different macro ratios support different fitness and health objectives."
      formula="Protein/Carbs: calories × percentage ÷ 4 | Fat: calories × percentage ÷ 9"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Daily Calories</Label>
            <Input type="number" placeholder="2000" value={calories} onChange={(e) => setCalories(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="balanced">Balanced (40/30/30)</SelectItem>
                <SelectItem value="high-protein">High Protein (40/30/30)</SelectItem>
                <SelectItem value="low-carb">Low Carb (40/20/40)</SelectItem>
                <SelectItem value="keto">Keto (25/5/70)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={calculate} className="w-full" size="lg">Calculate Macros</Button>

        {macros && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-6 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800 text-center">
                <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-2">Protein</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{macros.protein.grams}g</p>
                <p className="text-xs text-muted-foreground mt-1">{macros.protein.percent}%</p>
              </div>
              
              <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Carbs</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{macros.carbs.grams}g</p>
                <p className="text-xs text-muted-foreground mt-1">{macros.carbs.percent}%</p>
              </div>
              
              <div className="p-6 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800 text-center">
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2">Fat</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{macros.fat.grams}g</p>
                <p className="text-xs text-muted-foreground mt-1">{macros.fat.percent}%</p>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm"><strong>Daily target:</strong> {calories} calories</p>
              <p className="text-xs text-muted-foreground mt-1">Protein & Carbs: 4 cal/g | Fat: 9 cal/g</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default MacroCalculator;