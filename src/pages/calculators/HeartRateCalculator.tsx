import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";

const HeartRateCalculator = () => {
  const [age, setAge] = useState("");
  const [restingHR, setRestingHR] = useState("");
  const [zones, setZones] = useState<any>(null);
  const { updateAIInsight, handleCalculation } = useCalculatorEnhancements();

  const calculate = () => {
    const a = parseFloat(age);
    const rhr = parseFloat(restingHR) || 70;
    
    if (a > 0) {
      const maxHR = 220 - a;
      const hrReserve = maxHR - rhr;
      
      const zonesResult = {
        max: maxHR,
        resting: rhr,
        warmup: {
          min: Math.round(maxHR * 0.50),
          max: Math.round(maxHR * 0.60)
        },
        fatBurn: {
          min: Math.round(maxHR * 0.60),
          max: Math.round(maxHR * 0.70)
        },
        cardio: {
          min: Math.round(maxHR * 0.70),
          max: Math.round(maxHR * 0.80)
        },
        peak: {
          min: Math.round(maxHR * 0.80),
          max: Math.round(maxHR * 0.90)
        }
      };
      setZones(zonesResult);
      
      updateAIInsight(
        { age: a, restingHeartRate: rhr },
        { 
          maxHeartRate: maxHR, 
          heartRateReserve: hrReserve,
          fatBurnZone: `${zonesResult.fatBurn.min}-${zonesResult.fatBurn.max} bpm`,
          cardioZone: `${zonesResult.cardio.min}-${zonesResult.cardio.max} bpm`,
          peakZone: `${zonesResult.peak.min}-${zonesResult.peak.max} bpm`
        }
      );
    }
  };

  const faqs = [
    {
      question: "What are heart rate training zones?",
      answer: "Training zones are ranges of heart rates that correspond to different exercise intensities and fitness benefits. Each zone trains your cardiovascular system differently."
    },
    {
      question: "How do I measure my resting heart rate?",
      answer: "Measure first thing in the morning before getting out of bed. Count your pulse for 60 seconds. A normal resting heart rate is 60-100 bpm; athletes often have lower rates (40-60 bpm)."
    },
    {
      question: "Which zone should I train in?",
      answer: "It depends on your goals: Fat Burn (60-70%) for endurance, Cardio (70-80%) for aerobic fitness, Peak (80-90%) for performance. Beginners should focus on lower zones."
    },
    {
      question: "Is 220 minus age accurate?",
      answer: "It's a simple estimate. Individual max heart rates can vary by ±10-15 bpm. For more accuracy, consider a supervised max HR test or use a fitness tracker."
    }
  ];

  return (
    <CalculatorLayout
      title="Heart Rate Zone Calculator"
      description="Calculate your target heart rate zones for different workout intensities"
      howItWorks="This calculator estimates your maximum heart rate using the 220-age formula, then calculates training zones as percentages of max HR. Each zone targets different fitness goals and intensities."
      formula="Max HR = 220 - Age | Zone % = Max HR × (percentage range)"
      faqs={faqs}
      category="health"
      calculatorId="heart-rate"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Age</Label>
            <Input type="number" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Resting Heart Rate (optional)</Label>
            <Input type="number" placeholder="70" value={restingHR} onChange={(e) => setRestingHR(e.target.value)} />
          </div>
        </div>

        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" size="lg">Calculate Zones</Button>

        {zones && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 rounded-lg border border-primary text-center hover:scale-[1.02] transition-all duration-300">
              <p className="text-sm font-medium text-muted-foreground">Maximum Heart Rate</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">{zones.max} bpm</p>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Warm Up (50-60%)</p>
                    <p className="text-sm text-muted-foreground">Easy pace, preparation</p>
                  </div>
                  <p className="text-lg font-bold">{zones.warmup.min}-{zones.warmup.max} bpm</p>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Fat Burn (60-70%)</p>
                    <p className="text-sm text-muted-foreground">Steady state, endurance</p>
                  </div>
                  <p className="text-lg font-bold">{zones.fatBurn.min}-{zones.fatBurn.max} bpm</p>
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Cardio (70-80%)</p>
                    <p className="text-sm text-muted-foreground">Aerobic fitness</p>
                  </div>
                  <p className="text-lg font-bold">{zones.cardio.min}-{zones.cardio.max} bpm</p>
                </div>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Peak (80-90%)</p>
                    <p className="text-sm text-muted-foreground">High intensity, performance</p>
                  </div>
                  <p className="text-lg font-bold">{zones.peak.min}-{zones.peak.max} bpm</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default HeartRateCalculator;