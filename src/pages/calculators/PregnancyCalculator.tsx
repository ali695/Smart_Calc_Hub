import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer, Loader2 } from "lucide-react";

const PregnancyCalculator = () => {
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();
  const [lastPeriod, setLastPeriod] = useState("");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [weeksPregnant, setWeeksPregnant] = useState<number | null>(null);

  const calculate = () => {
    if (lastPeriod) {
      const lmp = new Date(lastPeriod);
      const due = new Date(lmp);
      due.setDate(due.getDate() + 280); // 40 weeks
      
      const today = new Date();
      const diffTime = today.getTime() - lmp.getTime();
      const weeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
      
      const dueDateStr = due.toLocaleDateString();
      setDueDate(dueDateStr);
      setWeeksPregnant(weeks);
      
      updateAIInsight(
        { lastMenstrualPeriod: lastPeriod },
        { 
          estimatedDueDate: dueDateStr, 
          weeksPregnant: weeks, 
          trimester: weeks < 13 ? 1 : weeks < 27 ? 2 : 3 
        }
      );
    }
  };

  const faqs = [
    {
      question: "How is the due date calculated?",
      answer: "The due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP). This is Naegele's rule, the standard method used by healthcare providers."
    },
    {
      question: "How accurate is the due date?",
      answer: "Only about 5% of babies are born on their exact due date. Most babies are born within 2 weeks before or after. Your healthcare provider may adjust the date based on ultrasound measurements."
    },
    {
      question: "What if I don't know my last period date?",
      answer: "If you're unsure of your LMP, an early ultrasound (ideally 8-13 weeks) can provide an accurate due date based on fetal measurements. Consult your healthcare provider."
    },
    {
      question: "When should I see a doctor?",
      answer: "Schedule your first prenatal visit around 8 weeks after your LMP. If you have any concerns, bleeding, or severe symptoms, contact your healthcare provider immediately."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Pregnancy Due Date Calculator",
          description: "Calculate your expected due date based on last menstrual period",
          url: "https://smartcalhub.online/calculator/pregnancy"
        }}
      />
      <CalculatorLayout
      title="Pregnancy Due Date Calculator"
      description="Calculate your expected due date based on last menstrual period"
      category="health"
      calculatorId="pregnancy"
      howItWorks="This calculator uses Naegele's rule to estimate your due date by adding 280 days (40 weeks) to the first day of your last menstrual period. It also shows how many weeks pregnant you currently are."
      formula="Due Date = Last Menstrual Period + 280 days (40 weeks)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>First Day of Last Menstrual Period</Label>
          <Input type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} />
        </div>

        <Button 
          onClick={() => handleCalculation(calculate)} 
          className="w-full" 
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Due Date"}
        </Button>

        {dueDate && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-sm font-medium text-muted-foreground">Estimated Due Date</p>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(dueDate, "Due Date")}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => printCalculation({
                  title: "Pregnancy Due Date Calculator",
                  inputs: [{ label: "Last Period Date", value: lastPeriod }],
                  results: [
                    { label: "Due Date", value: dueDate },
                    { label: "Weeks Pregnant", value: `${weeksPregnant} weeks` }
                  ]
                })}>
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary">{dueDate}</p>
            </div>
            
            <div className="p-6 bg-muted/50 rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground">You are approximately</p>
              <p className="text-2xl font-bold">{weeksPregnant} weeks pregnant</p>
              <p className="text-sm text-muted-foreground mt-2">Trimester {weeksPregnant! < 13 ? "1" : weeksPregnant! < 27 ? "2" : "3"}</p>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Note:</strong> This is an estimate. Always consult with your healthcare provider for accurate pregnancy dating and prenatal care.
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
    </>
  );
};

export default PregnancyCalculator;