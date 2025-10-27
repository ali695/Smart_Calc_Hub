import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const BasalTempCalculator = () => {
  const [temperature, setTemperature] = useState("");
  const [result, setResult] = useState<{
    category: string;
    phase: string;
  } | null>(null);

  const calculate = () => {
    const temp = parseFloat(temperature);
    if (!temp) return;

    let category = "";
    let phase = "";

    if (temp < 36.4) {
      category = "Below Normal Range";
      phase = "Follicular Phase (Pre-Ovulation)";
    } else if (temp >= 36.4 && temp < 36.7) {
      category = "Normal Follicular Range";
      phase = "Follicular Phase (Pre-Ovulation)";
    } else if (temp >= 36.7 && temp < 37.0) {
      category = "Ovulation Range";
      phase = "Possible Ovulation";
    } else if (temp >= 37.0) {
      category = "Luteal Phase Range";
      phase = "Luteal Phase (Post-Ovulation)";
    }

    setResult({ category, phase });
  };

  const faqs = [
    {
      question: "What is basal body temperature?",
      answer: "BBT is your body's lowest resting temperature, typically measured first thing in the morning before any activity."
    },
    {
      question: "How does BBT tracking help fertility?",
      answer: "BBT rises slightly (0.3-0.5°C) after ovulation due to progesterone. Tracking this can help identify your fertile window."
    },
    {
      question: "When should I measure BBT?",
      answer: "Measure BBT immediately upon waking, before getting out of bed or any physical activity, at the same time each day."
    }
  ];

  return (
    <CalculatorLayout
      title="Basal Body Temperature Tracker"
      description="Track your basal body temperature to identify ovulation patterns and optimize fertility awareness."
      howItWorks="Enter your morning basal body temperature (measured upon waking). The calculator indicates which phase of your cycle you're likely in."
      formula="Temperature ranges: Follicular (36.4-36.7°C), Ovulation (~36.7-37°C), Luteal (>37°C)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="temperature">Basal Temperature (°C)</Label>
            <Input
              id="temperature"
              type="number"
              step="0.1"
              placeholder="e.g., 36.5"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full" size="lg">
          Analyze Temperature
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Temperature Category</p>
                  <p className="text-2xl font-bold text-primary">{result.category}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Likely Cycle Phase</p>
                  <p className="text-xl font-semibold">{result.phase}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BasalTempCalculator;
