import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [result, setResult] = useState<{ oneRM: number; percentages: { percent: number; weight: number }[] } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);
    if (!w || !r || r < 1 || r > 30) return;
    
    // Brzycki Formula
    const oneRM = w * (36 / (37 - r));
    const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60].map(p => ({ 
      percent: p, 
      weight: oneRM * (p / 100) 
    }));
    
    const newResult = { oneRM, percentages };
    setResult(newResult);
    
    // Update AI insight with inputs and results
    updateAIInsight(
      { weight: w, reps: r, unit: "lbs/kg" },
      { 
        oneRepMax: oneRM.toFixed(1),
        trainingZones: percentages.slice(0, 4).map(p => `${p.percent}%: ${p.weight.toFixed(1)}`).join(", ")
      }
    );
  };

  const faqs = [
    { 
      question: "What is 1RM?", 
      answer: "One-Rep Max (1RM) is the maximum weight you can lift for one repetition of an exercise. It's a key metric for strength training programming and tracking progress." 
    },
    {
      question: "How accurate is the Brzycki formula?",
      answer: "The Brzycki formula is most accurate for rep ranges between 1-10. For higher reps (10-30), accuracy decreases slightly. It's best used as an estimate rather than an exact measurement."
    },
    {
      question: "How do I use my 1RM for training?",
      answer: "Use percentages of your 1RM to program workouts: 85-100% for strength, 67-85% for hypertrophy, and 50-67% for endurance. The percentage table helps you calculate working weights."
    },
    {
      question: "How often should I test my 1RM?",
      answer: "Test your actual 1RM every 8-12 weeks. Between tests, use calculated estimates from your working sets to track progress without the fatigue of maximal attempts."
    }
  ];

  return (
    <CalculatorLayout 
      title="One-Rep Max (1RM) Calculator" 
      description="Calculate your one-rep max based on weight and reps performed using the Brzycki formula." 
      category="health" 
      calculatorId="one-rep-max" 
      howItWorks="Enter the weight you lifted and the number of reps you completed. The calculator uses the Brzycki formula to estimate your one-rep max and provides a percentage breakdown for programming your workouts." 
      formula="1RM = Weight × (36 / (37 - Reps)) [Brzycki Formula]" 
      faqs={faqs}
      seoTitle="One-Rep Max (1RM) Calculator | Strength Training Tool"
      seoDescription="Calculate your one-rep max instantly with our free 1RM calculator. Get personalized training percentages for strength, hypertrophy, and endurance workouts."
      keywords="1RM calculator, one rep max, strength training, Brzycki formula, weightlifting calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight">Weight Lifted</Label>
            <Input 
              id="weight"
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
              placeholder="e.g., 100" 
            />
          </div>
          <div>
            <Label htmlFor="reps">Reps Performed (1-30)</Label>
            <Input 
              id="reps"
              type="number" 
              value={reps} 
              onChange={(e) => setReps(e.target.value)} 
              placeholder="e.g., 8" 
              min="1" 
              max="30" 
            />
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
            "Calculate 1RM"
          )}
        </Button>
        
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated 1RM</p>
                    <p className="text-3xl font-bold text-primary">{result.oneRM.toFixed(1)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => copyToClipboard(result.oneRM.toFixed(1), "1RM")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => printCalculation({ 
                        title: "1RM Calculator", 
                        inputs: [
                          { label: "Weight", value: weight }, 
                          { label: "Reps", value: reps }
                        ], 
                        results: [{ label: "1RM", value: result.oneRM.toFixed(1) }] 
                      })}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">Training Percentages</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {result.percentages.map(p => (
                      <div key={p.percent} className="bg-muted/50 p-2 rounded text-center">
                        <span className="text-muted-foreground">{p.percent}%</span>
                        <p className="font-semibold">{p.weight.toFixed(1)}</p>
                      </div>
                    ))}
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

export default OneRepMaxCalculator;
