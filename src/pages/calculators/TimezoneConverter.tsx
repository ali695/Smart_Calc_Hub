import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const TimezoneConverter = () => {
  const [time, setTime] = useState("");
  const [fromZone, setFromZone] = useState("0");
  const [toZone, setToZone] = useState("-5");
  const [result, setResult] = useState("");

  const calculate = () => {
    if (!time) return;
    const [hours, minutes] = time.split(":").map(Number);
    const fromOffset = parseInt(fromZone);
    const toOffset = parseInt(toZone);
    const diff = toOffset - fromOffset;
    let newHours = hours + diff;
    if (newHours < 0) newHours += 24;
    if (newHours >= 24) newHours -= 24;
    setResult(`${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  };

  const faqs = [
    { question: "What is UTC?", answer: "UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks and time." },
    { question: "How do time zones work?", answer: "Time zones are regions that observe the same standard time, typically offset from UTC by whole hours." }
  ];

  return (
    <CalculatorLayout title="Time Zone Converter" description="Convert time between different time zones worldwide." howItWorks="Enter a time and select source and destination time zones." formula="New Time = Original Time + (Destination UTC Offset - Source UTC Offset)" faqs={faqs}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Time</Label><Input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
          <div><Label>From Timezone</Label><Select value={fromZone} onValueChange={setFromZone}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="0">UTC (GMT)</SelectItem><SelectItem value="-5">EST (UTC-5)</SelectItem><SelectItem value="-8">PST (UTC-8)</SelectItem><SelectItem value="1">CET (UTC+1)</SelectItem></SelectContent></Select></div>
          <div><Label>To Timezone</Label><Select value={toZone} onValueChange={setToZone}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="0">UTC (GMT)</SelectItem><SelectItem value="-5">EST (UTC-5)</SelectItem><SelectItem value="-8">PST (UTC-8)</SelectItem><SelectItem value="1">CET (UTC+1)</SelectItem></SelectContent></Select></div>
        </div>
        <Button onClick={calculate} className="w-full" size="lg">Convert</Button>
        {result && <Card className="bg-primary/5 border-primary"><CardContent className="pt-6"><p className="text-3xl font-bold text-primary">{result}</p></CardContent></Card>}
      </div>
    </CalculatorLayout>
  );
};

export default TimezoneConverter;
