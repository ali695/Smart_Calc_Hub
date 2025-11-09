import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TDEECalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("sedentary");
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (w > 0 && h > 0 && a > 0) {
      let bmr: number;
      if (gender === "male") {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }
      const tdee = bmr * activityMultipliers[activity];
      setResult({ bmr, tdee });
    }
  };

  const faqs = [
    {
      question: "What is TDEE?",
      answer: "TDEE (Total Daily Energy Expenditure) is the total number of calories you burn per day, including all physical activities. It's calculated by multiplying your BMR by an activity factor."
    },
    {
      question: "How is TDEE different from BMR?",
      answer: "BMR is your basal metabolic rate - calories burned at rest. TDEE includes BMR plus calories burned through daily activities and exercise."
    },
    {
      question: "How accurate is TDEE calculation?",
      answer: "TDEE calculations provide a good estimate but individual metabolism varies. Use it as a starting point and adjust based on your actual weight changes over time."
    },
    {
      question: "How do I use TDEE for weight loss?",
      answer: "For weight loss, consume 300-500 calories below your TDEE. For weight gain, consume 300-500 calories above it. Always consult a healthcare professional before major dietary changes."
    }
  ];

  return (
    <CalculatorLayout
      title="TDEE Calculator"
      description="Calculate your Total Daily Energy Expenditure for weight management"
      category="health"
      howItWorks="This calculator estimates your TDEE using the Mifflin-St Jeor equation for BMR, then multiplies it by your activity level. TDEE represents the total calories you burn daily, helping you plan your diet for weight loss, maintenance, or gain."
      formula="TDEE = BMR × Activity Factor | BMR = 10×weight(kg) + 6.25×height(cm) − 5×age + 5 (male) or −161 (female)"
      faqs={faqs}
      seoTitle="TDEE Calculator – Calculate Total Daily Energy Expenditure | SmartCalc Hub"
      seoDescription="Free TDEE calculator to determine your daily calorie needs based on activity level. Perfect for weight loss, gain, or maintenance planning."
      keywords="tdee calculator, total daily energy expenditure, calorie needs calculator, maintenance calories"
      canonicalUrl="https://smartcalchub.com/health/tdee-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 70"
            />
          </div>

          <div className="space-y-2">
            <Label>Height (cm)</Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 175"
            />
          </div>

          <div className="space-y-2">
            <Label>Age (years)</Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 30"
            />
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Activity Level</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                <SelectItem value="veryActive">Very Active (intense exercise daily)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={calculate} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Calculate TDEE
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Daily Energy Expenditure</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                  {Math.round(result.tdee)} cal/day
                </p>
              </div>
              <div className="pt-4 border-t border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">BMR (Resting):</span>
                  <span className="font-semibold">{Math.round(result.bmr)} cal/day</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Weight Loss</p>
                    <p className="font-bold text-sm">{Math.round(result.tdee - 500)} cal</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Maintain</p>
                    <p className="font-bold text-sm">{Math.round(result.tdee)} cal</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Weight Gain</p>
                    <p className="font-bold text-sm">{Math.round(result.tdee + 500)} cal</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default TDEECalculator;
