import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const MenstrualCalculator = () => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<{
    nextPeriod: string;
    ovulation: string;
    fertileWindow: string;
  } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    if (!lastPeriod) return;

    const lastDate = new Date(lastPeriod);
    const cycle = parseInt(cycleLength);

    const nextPeriodDate = new Date(lastDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycle);

    const ovulationDate = new Date(lastDate);
    ovulationDate.setDate(ovulationDate.getDate() + cycle - 14);

    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    setResult({
      nextPeriod: nextPeriodDate.toLocaleDateString(),
      ovulation: ovulationDate.toLocaleDateString(),
      fertileWindow: `${fertileStart.toLocaleDateString()} - ${fertileEnd.toLocaleDateString()}`
    });
  };

  const faqs = [
    {
      question: "What is a normal menstrual cycle length?",
      answer: "A normal cycle ranges from 21 to 35 days, with 28 days being average. The cycle is counted from the first day of one period to the first day of the next."
    },
    {
      question: "When is the fertile window?",
      answer: "The fertile window is typically 5 days before ovulation and 1 day after. Ovulation usually occurs around day 14 of a 28-day cycle."
    },
    {
      question: "How accurate is this calculator?",
      answer: "This calculator provides estimates based on average cycle lengths. Individual cycles can vary, so track your cycle over several months for better accuracy."
    }
  ];

  return (
    <CalculatorLayout
      title="Menstrual Cycle Calculator"
      description="Track and predict your menstrual cycle, ovulation date, and fertile window for family planning."
      category="health"
      calculatorId="menstrual-calculator"
      howItWorks="Enter the first day of your last period and your average cycle length. The calculator predicts your next period, ovulation date, and fertile window."
      formula="Ovulation Day ≈ (Cycle Length - 14); Fertile Window = Ovulation ± 5-6 days"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="lastPeriod">First Day of Last Period</Label>
            <Input
              id="lastPeriod"
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
            <Input
              id="cycleLength"
              type="number"
              placeholder="e.g., 28"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
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
            "Calculate Cycle"
          )}
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Next Period Expected</p>
                    <p className="text-2xl font-bold text-primary">{result.nextPeriod}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(
                        `Next Period: ${result.nextPeriod}\nOvulation: ${result.ovulation}\nFertile Window: ${result.fertileWindow}`,
                        "Cycle Information"
                      )}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => printCalculation({
                        title: "Menstrual Cycle Calculator",
                        inputs: [
                          { label: "Last Period Date", value: lastPeriod },
                          { label: "Cycle Length", value: `${cycleLength} days` }
                        ],
                        results: [
                          { label: "Next Period Expected", value: result.nextPeriod },
                          { label: "Estimated Ovulation", value: result.ovulation },
                          { label: "Fertile Window", value: result.fertileWindow }
                        ],
                        formula: "Ovulation Day ≈ (Cycle Length - 14)"
                      })}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Estimated Ovulation</p>
                  <p className="text-xl font-semibold">{result.ovulation}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Fertile Window</p>
                  <p className="text-lg">{result.fertileWindow}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default MenstrualCalculator;
