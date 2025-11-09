import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const SleepCalculator = () => {
  const [wakeTime, setWakeTime] = useState("");
  const [sleepCycles, setSleepCycles] = useState("5");
  const [result, setResult] = useState<string[]>([]);

  const calculate = () => {
    const [hours, minutes] = wakeTime.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return;

    const wakeMinutes = hours * 60 + minutes;
    const cycleLength = 90; // minutes per sleep cycle
    const fallAsleepTime = 15; // minutes to fall asleep

    const bedtimes: string[] = [];
    for (let cycles = 4; cycles <= 6; cycles++) {
      const sleepMinutes = wakeMinutes - (cycles * cycleLength) - fallAsleepTime;
      let bedHours = Math.floor(sleepMinutes / 60);
      let bedMins = sleepMinutes % 60;

      if (bedHours < 0) bedHours += 24;
      if (bedMins < 0) {
        bedMins += 60;
        bedHours -= 1;
      }

      const period = bedHours >= 12 ? "PM" : "AM";
      const displayHours = bedHours > 12 ? bedHours - 12 : bedHours === 0 ? 12 : bedHours;
      
      bedtimes.push(`${displayHours}:${bedMins.toString().padStart(2, '0')} ${period} (${cycles} cycles)`);
    }

    setResult(bedtimes);
  };

  const faqs = [
    {
      question: "How long is a sleep cycle?",
      answer: "A typical sleep cycle lasts about 90 minutes and includes both light and deep sleep stages, plus REM sleep."
    },
    {
      question: "How many sleep cycles do I need?",
      answer: "Most adults need 5-6 complete sleep cycles (7.5-9 hours) per night for optimal health and cognitive function."
    },
    {
      question: "Why wake up between cycles?",
      answer: "Waking up between sleep cycles, rather than during deep sleep, helps you feel more refreshed and less groggy."
    }
  ];

  return (
    <CalculatorLayout
      title="Ideal Sleep Calculator"
      description="Find your optimal bedtime to wake up refreshed between sleep cycles instead of during deep sleep."
      howItWorks="Enter your desired wake-up time. The calculator suggests bedtimes that align with complete sleep cycles (90 minutes each) so you wake up feeling refreshed."
      formula="Bedtime = Wake Time - (Sleep Cycles × 90 min) - 15 min"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="wakeTime">Wake-Up Time</Label>
            <Input
              id="wakeTime"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" size="lg">
          Calculate Bedtimes
        </Button>

        {result.length > 0 && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Recommended Bedtimes</p>
                {result.map((time, idx) => (
                  <div key={idx} className="text-lg font-semibold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                    {time}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default SleepCalculator;
