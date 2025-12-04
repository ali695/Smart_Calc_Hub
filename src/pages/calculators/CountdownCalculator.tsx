import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const CountdownCalculator = () => {
  const [targetDate, setTargetDate] = useState("");
  const [result, setResult] = useState<{ days: number; hours: number; minutes: number; seconds: number; total: string } | null>(null);
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    if (!targetDate) return;
    const target = new Date(targetDate);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    
    if (diff <= 0) {
      setResult({ days: 0, hours: 0, minutes: 0, seconds: 0, total: "Event has passed!" });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setResult({ days, hours, minutes, seconds, total: `${days}d ${hours}h ${minutes}m ${seconds}s` });
  };

  useEffect(() => {
    if (result && result.days >= 0) {
      const interval = setInterval(calculate, 1000);
      return () => clearInterval(interval);
    }
  }, [targetDate, result]);

  const faqs = [
    { question: "How does the countdown calculator work?", answer: "Enter a future date and time to see the remaining time in days, hours, minutes, and seconds. The countdown updates in real-time." }
  ];

  return (
    <CalculatorLayout title="Countdown Calculator" description="Calculate time remaining until a specific date and time." category="conversion" calculatorId="countdown" howItWorks="Enter a target date and time to see the countdown." formula="Time Remaining = Target Date - Current Date" faqs={faqs}>
      <div className="space-y-6">
        <div><Label>Target Date & Time</Label><Input type="datetime-local" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} /></div>
        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>{isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Start Countdown"}</Button>
        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div><p className="text-sm text-muted-foreground">Time Remaining</p><p className="text-2xl font-bold text-primary">{result.total}</p></div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.total, "Countdown")}><Copy className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" onClick={() => printCalculation({ title: "Countdown", inputs: [{ label: "Target", value: targetDate }], results: [{ label: "Remaining", value: result.total }] })}><Printer className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-2xl font-bold text-primary">{result.days}</p><p className="text-xs text-muted-foreground">Days</p></div>
                <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-2xl font-bold text-primary">{result.hours}</p><p className="text-xs text-muted-foreground">Hours</p></div>
                <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-2xl font-bold text-primary">{result.minutes}</p><p className="text-xs text-muted-foreground">Minutes</p></div>
                <div className="text-center p-3 bg-primary/10 rounded-lg"><p className="text-2xl font-bold text-primary">{result.seconds}</p><p className="text-xs text-muted-foreground">Seconds</p></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default CountdownCalculator;
