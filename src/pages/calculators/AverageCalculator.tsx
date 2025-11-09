import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState("");
  const [mean, setMean] = useState<number | null>(null);
  const [median, setMedian] = useState<number | null>(null);
  const [mode, setMode] = useState<string | null>(null);

  const calculate = () => {
    const nums = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (nums.length > 0) {
      const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
      setMean(parseFloat(avg.toFixed(2)));
      
      const sorted = [...nums].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const med = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
      setMedian(parseFloat(med.toFixed(2)));
      
      const frequency: {[key: number]: number} = {};
      nums.forEach(n => frequency[n] = (frequency[n] || 0) + 1);
      const maxFreq = Math.max(...Object.values(frequency));
      const modes = Object.keys(frequency).filter(k => frequency[parseFloat(k)] === maxFreq);
      setMode(maxFreq > 1 ? modes.join(', ') : 'No mode');
    }
  };

  const faqs = [
    {
      question: "What's the difference between mean, median, and mode?",
      answer: "Mean is the arithmetic average. Median is the middle value when sorted. Mode is the most frequently occurring value. Each measure describes data differently."
    },
    {
      question: "When should I use median instead of mean?",
      answer: "Use median when data has outliers or is skewed. For example, median income is more representative than mean income because very high earners skew the average."
    },
    {
      question: "Can there be multiple modes?",
      answer: "Yes! If two or more values tie for highest frequency, they're all modes (bimodal, multimodal). If all values appear once, there's no mode."
    },
    {
      question: "How do I enter numbers?",
      answer: "Separate numbers with commas. For example: 5, 10, 15, 20, 25. Decimals are supported (e.g., 3.5, 7.2, 9.8)."
    }
  ];

  return (
    <CalculatorLayout
      title="Average Calculator"
      description="Calculate mean, median, and mode of a set of numbers"
      category="math"
      calculatorId="average"
      howItWorks="This calculator computes three types of averages: Mean (arithmetic average), Median (middle value), and Mode (most frequent value). Enter your numbers separated by commas to get all three measures instantly."
      formula="Mean = Sum ÷ Count | Median = Middle value(s) | Mode = Most frequent value(s)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Numbers (separated by commas)</Label>
          <Input
            placeholder="5, 10, 15, 20, 25"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
          />
        </div>

        <Button onClick={calculate} className="w-full" size="lg">Calculate Average</Button>

        {mean !== null && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-primary/10 rounded-lg text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Mean</p>
                <p className="text-3xl font-bold text-primary">{mean}</p>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Median</p>
                <p className="text-3xl font-bold">{median}</p>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Mode</p>
                <p className="text-2xl font-bold">{mode}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default AverageCalculator;