import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const StepsCalculator = () => {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<{
    steps: number;
    distance: number;
    calories: number;
  } | null>(null);
  const { updateAIInsight, handleCalculation } = useCalculatorEnhancements();

  const calculate = () => {
    const wt = parseFloat(weight);
    if (!wt) return;

    let baseSteps = 7500;

    // Adjust for activity level
    if (activityLevel === "sedentary") baseSteps = 5000;
    else if (activityLevel === "light") baseSteps = 6500;
    else if (activityLevel === "moderate") baseSteps = 8000;
    else if (activityLevel === "active") baseSteps = 10000;
    else if (activityLevel === "very-active") baseSteps = 12500;

    // Adjust for goal
    if (goal === "lose") baseSteps += 2000;
    else if (goal === "gain") baseSteps -= 1000;

    const distance = (baseSteps * 0.762) / 1000; // km (average stride)
    const calories = baseSteps * 0.04; // rough estimate

    const resultData = { steps: baseSteps, distance, calories };
    setResult(resultData);
    
    updateAIInsight(
      { weight: wt, activityLevel, healthGoal: goal },
      { 
        dailyStepGoal: baseSteps, 
        estimatedDistance: distance.toFixed(1) + " km", 
        caloriesBurned: Math.round(calories) 
      }
    );
  };

  const faqs = [
    {
      question: "How many steps should I walk per day?",
      answer: "The common goal is 10,000 steps per day, but 7,000-8,000 steps can provide significant health benefits for most people."
    },
    {
      question: "How far is 10,000 steps?",
      answer: "10,000 steps is approximately 8 kilometers or 5 miles, depending on your stride length."
    },
    {
      question: "Can walking help with weight loss?",
      answer: "Yes! Walking 10,000 steps daily can burn 300-500 calories, contributing to weight loss when combined with a healthy diet."
    }
  ];

  return (
    <CalculatorLayout
      title="Daily Step Goal Calculator"
      description="Calculate your personalized daily step goal based on your fitness level and health objectives."
      howItWorks="Enter your weight, select your activity level and health goal. The calculator suggests your daily step target along with estimated distance and calories burned."
      formula="Steps goal is based on activity level, weight, and fitness goals"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="e.g., 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div>
            <Label>Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Lightly Active</SelectItem>
                <SelectItem value="moderate">Moderately Active</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="very-active">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Health Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="gain">Gain Muscle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" size="lg">
          Calculate Step Goal
        </Button>

        {result && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Step Goal</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                    {result.steps.toLocaleString()} steps
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="text-xl font-semibold">{result.distance.toFixed(1)} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Calories Burned</p>
                    <p className="text-xl font-semibold">{result.calories.toFixed(0)} cal</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default StepsCalculator;
