import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BMRCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [bmr, setBMR] = useState<number | null>(null);
  const [dailyCalories, setDailyCalories] = useState<number | null>(null);

  const calculateBMR = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    
    if (w > 0 && h > 0 && a > 0) {
      let bmrValue;
      if (gender === "male") {
        bmrValue = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmrValue = 10 * w + 6.25 * h - 5 * a - 161;
      }
      
      const activity = parseFloat(activityLevel);
      const calories = bmrValue * activity;
      
      setBMR(parseFloat(bmrValue.toFixed(0)));
      setDailyCalories(parseFloat(calories.toFixed(0)));
    }
  };

  const faqs = [
    {
      question: "What is BMR?",
      answer: "BMR (Basal Metabolic Rate) is the number of calories your body needs to perform basic life-sustaining functions while at rest. This includes breathing, circulation, cell production, and nutrient processing."
    },
    {
      question: "How is BMR different from TDEE?",
      answer: "BMR is your resting metabolic rate, while TDEE (Total Daily Energy Expenditure) includes your BMR plus calories burned through activity. TDEE = BMR × Activity Level multiplier."
    },
    {
      question: "What factors affect BMR?",
      answer: "BMR is influenced by age, gender, weight, height, muscle mass, and genetics. Men typically have higher BMR than women, and BMR decreases with age. More muscle mass means higher BMR."
    },
    {
      question: "How can I use my BMR?",
      answer: "Knowing your BMR helps you determine your daily calorie needs for weight loss, maintenance, or gain. To lose weight, consume fewer calories than your TDEE. To maintain, match your TDEE. To gain, consume more."
    }
  ];

  return (
    <CalculatorLayout
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate and daily calorie needs"
      category="health"
      calculatorId="bmr"
      howItWorks="The BMR calculator uses the Mifflin-St Jeor equation, which is considered one of the most accurate formulas for calculating basal metabolic rate. It takes into account your age, gender, weight, and height. The calculator then multiplies your BMR by your activity level to determine your Total Daily Energy Expenditure (TDEE)."
      formula="Men: BMR = 10W + 6.25H - 5A + 5 | Women: BMR = 10W + 6.25H - 5A - 161 (W=weight in kg, H=height in cm, A=age)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age (years)</Label>
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
              <SelectTrigger id="gender">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger id="activity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.2">Sedentary (little or no exercise)</SelectItem>
                <SelectItem value="1.375">Lightly active (1-3 days/week)</SelectItem>
                <SelectItem value="1.55">Moderately active (3-5 days/week)</SelectItem>
                <SelectItem value="1.725">Very active (6-7 days/week)</SelectItem>
                <SelectItem value="1.9">Extremely active (athlete)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="button" onClick={calculateBMR} className="w-full" size="lg">
          Calculate BMR
        </Button>

        {bmr !== null && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground">Your BMR</p>
              <p className="text-4xl font-bold text-primary">{bmr} calories/day</p>
            </div>
            
            <div className="p-6 bg-muted/50 rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground">Daily Calorie Needs (TDEE)</p>
              <p className="text-3xl font-bold">{dailyCalories} calories/day</p>
              <p className="text-sm text-muted-foreground mt-2">
                Based on your activity level
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Weight Loss</p>
                <p className="font-bold">{dailyCalories ? dailyCalories - 500 : 0}</p>
                <p className="text-xs text-muted-foreground">cal/day</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Maintain</p>
                <p className="font-bold">{dailyCalories}</p>
                <p className="text-xs text-muted-foreground">cal/day</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Weight Gain</p>
                <p className="font-bold">{dailyCalories ? dailyCalories + 500 : 0}</p>
                <p className="text-xs text-muted-foreground">cal/day</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BMRCalculator;
