import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const TimezoneConverter = () => {
  const [time, setTime] = useState("");
  const [fromZone, setFromZone] = useState("0");
  const [toZone, setToZone] = useState("-5");
  const [result, setResult] = useState("");
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const timezoneLabels: Record<string, string> = {
    "0": "UTC (GMT)",
    "-5": "EST (UTC-5)",
    "-8": "PST (UTC-8)",
    "1": "CET (UTC+1)",
    "5.5": "IST (UTC+5:30)",
    "8": "CST China (UTC+8)"
  };

  const calculate = () => {
    if (!time) return;
    const [hours, minutes] = time.split(":").map(Number);
    const fromOffset = parseInt(fromZone);
    const toOffset = parseInt(toZone);
    const diff = toOffset - fromOffset;
    let newHours = hours + diff;
    if (newHours < 0) newHours += 24;
    if (newHours >= 24) newHours -= 24;
    const convertedTime = `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setResult(convertedTime);
    
    updateAIInsight(
      { inputTime: time, fromTimezone: timezoneLabels[fromZone] || fromZone, toTimezone: timezoneLabels[toZone] || toZone },
      { convertedTime, hourDifference: diff }
    );
  };

  const faqs = [
    { question: "What is UTC?", answer: "UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks and time." },
    { question: "How do time zones work?", answer: "Time zones are regions that observe the same standard time, typically offset from UTC by whole hours." }
  ];

  return (
    <CalculatorLayout title="Time Zone Converter" description="Convert time between different time zones worldwide." category="conversion" calculatorId="timezone" howItWorks="Enter a time and select source and destination time zones." formula="New Time = Original Time + (Destination UTC Offset - Source UTC Offset)" faqs={faqs}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Time</Label><Input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
          <div><Label>From Timezone</Label><Select value={fromZone} onValueChange={setFromZone}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="0">UTC (GMT)</SelectItem><SelectItem value="-5">EST (UTC-5)</SelectItem><SelectItem value="-8">PST (UTC-8)</SelectItem><SelectItem value="1">CET (UTC+1)</SelectItem></SelectContent></Select></div>
          <div><Label>To Timezone</Label><Select value={toZone} onValueChange={setToZone}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="0">UTC (GMT)</SelectItem><SelectItem value="-5">EST (UTC-5)</SelectItem><SelectItem value="-8">PST (UTC-8)</SelectItem><SelectItem value="1">CET (UTC+1)</SelectItem></SelectContent></Select></div>
        </div>
        <Button 
          onClick={() => handleCalculation(calculate)} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" 
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            "Convert Time"
          )}
        </Button>
        
        {result && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10 border-primary hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">Converted Time</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">{result}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(result, "Time")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => printCalculation({
                      title: "Time Zone Converter",
                      inputs: [
                        { label: "Input Time", value: time },
                        { label: "From Timezone", value: fromZone },
                        { label: "To Timezone", value: toZone }
                      ],
                      results: [
                        { label: "Converted Time", value: result }
                      ],
                      formula: "New Time = Original Time + (Destination UTC Offset - Source UTC Offset)"
                    })}
                  >
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default TimezoneConverter;
