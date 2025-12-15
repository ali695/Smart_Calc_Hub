import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalculatorChart, generateBreakdownData } from "@/components/CalculatorChart";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";

const CalorieDeficitCalculator = () => {
  const [tdee, setTdee] = useState("");
  const [targetLoss, setTargetLoss] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [result, setResult] = useState<{ dailyCalories: number; dailyDeficit: number; weeklyDeficit: number } | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const tdeeVal = parseFloat(tdee);
    const lossKg = parseFloat(targetLoss);
    const weeks = parseFloat(timeframe);

    if (tdeeVal > 0 && lossKg > 0 && weeks > 0) {
      // 1 kg fat ≈ 7700 calories
      const totalDeficitNeeded = lossKg * 7700;
      const dailyDeficit = totalDeficitNeeded / (weeks * 7);
      const dailyCalories = tdeeVal - dailyDeficit;
      const weeklyDeficit = dailyDeficit * 7;

      const safeCalories = Math.max(dailyCalories, 1200);
      const safeDeficit = Math.min(dailyDeficit, 1000);

      setResult({
        dailyCalories: safeCalories,
        dailyDeficit: safeDeficit,
        weeklyDeficit
      });

      // Generate chart data
      setChartData(generateBreakdownData({
        "Daily Intake": safeCalories,
        "Daily Deficit": safeDeficit
      }));

      // Update AI insight
      updateAIInsight(
        {
          tdee: tdeeVal,
          targetWeightLoss: lossKg,
          timeframeWeeks: weeks
        },
        {
          dailyCalorieTarget: Math.round(safeCalories),
          dailyDeficit: Math.round(safeDeficit),
          weeklyDeficit: Math.round(weeklyDeficit),
          weeklyWeightLoss: (lossKg / weeks).toFixed(2),
          isSafe: safeDeficit <= 1000 && safeCalories >= 1200
        }
      );
    }
  };

  const faqs = [
    {
      question: "What is a calorie deficit?",
      answer: "A calorie deficit occurs when you consume fewer calories than your body burns (TDEE). This forces your body to use stored fat for energy, resulting in weight loss. A deficit of 500-1000 calories per day typically results in 0.5-1 kg weight loss per week."
    },
    {
      question: "What is a safe calorie deficit?",
      answer: "A safe deficit is typically 500-1000 calories per day, resulting in 0.5-1 kg loss per week. Deficits larger than 1000 calories may cause muscle loss, nutrient deficiencies, and metabolic slowdown."
    },
    {
      question: "What is the minimum calorie intake?",
      answer: "Women should not go below 1200 calories per day, and men should not go below 1500 calories per day. Going below these levels can lead to nutritional deficiencies and health problems."
    },
    {
      question: "How many calories in 1 kg of body fat?",
      answer: "One kilogram of body fat contains approximately 7,700 calories. To lose 1 kg, you need to create a total deficit of 7,700 calories through diet, exercise, or both."
    }
  ];

  return (
    <CalculatorLayout
      title="Calorie Deficit Calculator"
      description="Calculate daily calorie intake needed to reach your weight loss goals"
      category="health"
      calculatorId="calorie-deficit"
      howItWorks="This calculator determines how many calories you should eat daily to achieve your weight loss goal. It uses your TDEE, target weight loss, and timeframe to calculate a safe and sustainable calorie deficit. The calculator ensures you don't go below minimum safe calorie levels."
      formula="Daily Calories = TDEE − (Target Loss × 7700) / (Weeks × 7)"
      faqs={faqs}
      seoTitle="Calorie Deficit Calculator – Weight Loss Calories | SmartCalc Hub"
      seoDescription="Free calorie deficit calculator to determine daily calorie intake for weight loss. Safe and sustainable deficit planning."
      keywords="calorie deficit calculator, weight loss calculator, calorie intake, daily calories, diet calculator"
      canonicalUrl="https://smartcalchub.com/health/calorie-deficit-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Your TDEE (calories/day)</Label>
            <Input
              type="number"
              value={tdee}
              onChange={(e) => setTdee(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 2000"
              min="1200"
            />
            <p className="text-xs text-muted-foreground">Total Daily Energy Expenditure</p>
          </div>

          <div className="space-y-2">
            <Label>Target Weight Loss (kg)</Label>
            <Input
              type="number"
              value={targetLoss}
              onChange={(e) => setTargetLoss(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 5"
              min="0.1"
              step="0.1"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Timeframe (weeks)</Label>
            <Input
              type="number"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              placeholder="e.g., 10"
              min="1"
            />
          </div>
        </div>

        <Button 
          onClick={() => handleCalculation(calculate)} 
          disabled={isCalculating}
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300"
          size="lg"
          type="button"
        >
          {isCalculating ? "Calculating..." : "Calculate Deficit"}
        </Button>

        {result && (
          <>
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
              <div className="space-y-4">
                <div 
                  className="text-center cursor-pointer"
                  onClick={() => copyToClipboard(`${Math.round(result.dailyCalories)} calories`, "Daily Calorie Target")}
                >
                  <p className="text-sm font-medium text-muted-foreground mb-2">Daily Calorie Target</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                    {Math.round(result.dailyCalories)} calories
                  </p>
                </div>
                <div className="pt-4 border-t border-border/50 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Your TDEE:</span>
                    <span className="font-semibold">{tdee} cal/day</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily Deficit:</span>
                    <span className="font-semibold text-orange-600 dark:text-orange-400">−{Math.round(result.dailyDeficit)} cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Weekly Deficit:</span>
                    <span className="font-semibold">−{Math.round(result.weeklyDeficit)} cal</span>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-xs text-center text-muted-foreground">
                      Expected weight loss: ~{(parseFloat(targetLoss) / parseFloat(timeframe)).toFixed(2)} kg/week
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {chartData.length > 0 && (
              <CalculatorChart
                data={chartData}
                chartType="bar"
                title="Daily Calorie Breakdown"
                category="health"
                valueFormatter={(v) => `${v.toLocaleString()} cal`}
              />
            )}
          </>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CalorieDeficitCalculator;