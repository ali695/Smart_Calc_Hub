import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { schemas, validateInput, safeParseFloat } from "@/lib/validation";
import { toast } from "sonner";
import { z } from "zod";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { Copy, Loader2 } from "lucide-react";
import { CalculatorChart } from "@/components/CalculatorChart";

const CalorieCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");
  const [calories, setCalories] = useState<number | null>(null);
  const [goalCalories, setGoalCalories] = useState<number | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();

  const calculate = () => {
    const weightValue = safeParseFloat(weight);
    const heightValue = safeParseFloat(height);
    const ageValue = safeParseFloat(age);

    if (weightValue === null || heightValue === null || ageValue === null) {
      toast.error("Please enter valid numbers for all fields");
      return;
    }

    try {
      const validatedData = validateInput(schemas.calorie, { age: ageValue, weight: weightValue, height: heightValue });
      const w = validatedData.weight;
      const h = validatedData.height;
      const a = validatedData.age;
      
      let bmr;
      if (gender === "male") {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }
      
      const tdee = bmr * parseFloat(activity);
      let goalCal = tdee;
      
      if (goal === "lose") goalCal = tdee - 500;
      else if (goal === "gain") goalCal = tdee + 500;
      
      const maintenanceCal = Math.round(tdee);
      const targetCal = Math.round(goalCal);
      
      setCalories(maintenanceCal);
      setGoalCalories(targetCal);

      // Update AI insight
      const activityLabels: Record<string, string> = {
        "1.2": "Sedentary",
        "1.375": "Light Exercise",
        "1.55": "Moderate Exercise",
        "1.725": "Very Active",
        "1.9": "Extremely Active"
      };

      updateAIInsight(
        { 
          age: a, 
          gender, 
          height: h, 
          weight: w, 
          activityLevel: activityLabels[activity],
          goal
        },
        { 
          bmr: Math.round(bmr),
          maintenanceCalories: maintenanceCal,
          targetCalories: targetCal,
          goalType: goal === "lose" ? "Weight Loss" : goal === "gain" ? "Weight Gain" : "Maintenance"
        }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  const faqs = [
    {
      question: "How many calories should I eat per day?",
      answer: "This depends on your age, gender, height, weight, and activity level. Use this calculator to find your Total Daily Energy Expenditure (TDEE) for maintenance, then adjust based on your goals."
    },
    {
      question: "How do I lose weight safely?",
      answer: "Create a calorie deficit of 500 calories per day to lose about 1 pound per week. This is considered safe and sustainable. Avoid extreme calorie restriction."
    },
    {
      question: "What if I want to gain muscle?",
      answer: "To gain muscle, eat in a slight calorie surplus (300-500 calories above maintenance) and ensure adequate protein intake (0.8-1g per pound of body weight)."
    },
    {
      question: "Should I eat the same calories every day?",
      answer: "Your daily calorie needs can vary based on activity. Some people prefer calorie cycling, eating more on workout days and less on rest days."
    }
  ];

  return (
    <CalculatorLayout
      title="Calorie Calculator"
      description="Calculate your daily calorie needs for weight loss, maintenance, or gain"
      seoTitle="Calorie Calculator - Daily Calorie Needs & TDEE | SmartCalc Hub"
      seoDescription="Free calorie calculator to determine your daily calorie needs. Calculate TDEE, BMR, and calories for weight loss or muscle gain. Personalized nutrition guidance."
      keywords="calorie calculator, tdee calculator, daily calorie needs, bmr calculator, weight loss calories, calorie deficit"
      canonicalUrl="https://smartcalhub.online/calculator/calorie"
      category="health"
      calculatorId="calorie"
      howItWorks="This calculator estimates your daily calorie needs using the Mifflin-St Jeor equation to calculate BMR, then multiplies by your activity level to get Total Daily Energy Expenditure (TDEE). Based on your goal, it recommends calorie targets."
      formula="BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + s (s=+5 for male, -161 for female) | TDEE = BMR × Activity Level"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="30"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
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
          
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" type="number" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1.2">Sedentary</SelectItem>
                <SelectItem value="1.375">Light Exercise</SelectItem>
                <SelectItem value="1.55">Moderate Exercise</SelectItem>
                <SelectItem value="1.725">Very Active</SelectItem>
                <SelectItem value="1.9">Extremely Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Gain Weight</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          type="button" 
          onClick={() => handleCalculation(calculate)} 
          className="w-full" 
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate Calories"
          )}
        </Button>

        {calories !== null && (
          <>
            <div className="space-y-4 animate-fade-in">
              <div className="p-6 bg-primary/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Maintenance Calories</p>
                    <p className="text-4xl font-bold text-primary">{calories} cal/day</p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`${calories} calories/day`, "Maintenance Calories")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Recommended for Your Goal</p>
                    <p className="text-3xl font-bold">{goalCalories} cal/day</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {goal === "lose" && "To lose ~1 lb/week"}
                      {goal === "maintain" && "To maintain current weight"}
                      {goal === "gain" && "To gain ~1 lb/week"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`${goalCalories} calories/day`, "Target Calories")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <CalculatorChart
              chartType="bar"
              data={[
                { name: "Maintenance", value: calories },
                { name: "Your Goal", value: goalCalories || calories }
              ]}
              title="Daily Calorie Targets"
            />
          </>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CalorieCalculator;
