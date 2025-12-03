import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const DaysCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{ days: number; weeks: number; months: number } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    setResult({ days, weeks, months });
  };

  const faqs = [{ question: "How are days between dates calculated?", answer: "Days are calculated by finding the difference in milliseconds and dividing by milliseconds per day." }];

  return (
    <CalculatorLayout title="Days Calculator" description="Calculate the number of days between two dates." category="conversion" calculatorId="days-calculator" howItWorks="Select start and end dates to find the difference." formula="Days = |End Date - Start Date|" faqs={faqs}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Start Date</Label><Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
          <div><Label>End Date</Label><Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
        </div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Days"}</Button>
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div><p className="text-sm text-muted-foreground">Days Between</p><p className="text-3xl font-bold text-primary">{result.days} days</p></div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.days.toString(), "Days")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Days Calculator", inputs: [{ label: "Start", value: startDate }, { label: "End", value: endDate }], results: [{ label: "Days", value: result.days.toString() }] })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground">Weeks</p><p className="text-xl font-semibold">{result.weeks}</p></div>
                  <div><p className="text-sm text-muted-foreground">Months (approx)</p><p className="text-xl font-semibold">{result.months}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default DaysCalculator;
