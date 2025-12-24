import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer, Loader2 } from "lucide-react";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [ageData, setAgeData] = useState<any>(null);
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    if (birthDate) {
      const birth = new Date(birthDate);
      const today = new Date();
      
      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();
      
      if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const totalMonths = years * 12 + months;
      
      const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }
      const daysToNext = Math.floor((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      const data = {
        years,
        months,
        days,
        totalDays,
        totalWeeks,
        totalMonths,
        daysToNext
      };
      setAgeData(data);
      
      updateAIInsight(
        { birthDate, currentDate: today.toISOString().split('T')[0] },
        { 
          age: `${years} years, ${months} months, ${days} days`,
          totalDays,
          totalWeeks,
          totalMonths,
          daysToNextBirthday: daysToNext
        }
      );
    }
  };

  const faqs = [
    {
      question: "How is age calculated?",
      answer: "Age is calculated from your birth date to today's date, accounting for leap years and varying month lengths. It shows years, months, and days since birth."
    },
    {
      question: "Why does my age in days seem high?",
      answer: "Your total age in days includes all the days you've lived. For example, a 25-year-old has lived approximately 9,125 days (25 × 365.25)."
    },
    {
      question: "What is age in months used for?",
      answer: "Age in months is commonly used for babies and toddlers (up to 24 months) and for certain medical calculations where precision beyond years matters."
    },
    {
      question: "How accurate is this calculator?",
      answer: "This calculator is accurate to the day. It accounts for leap years and varying month lengths in all calculations."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Age Calculator",
          description: "Calculate your exact age in years, months, days, and more",
          url: "https://smartcalhub.online/calculator/age",
          applicationCategory: "UtilityApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
          }
        }}
      />
      <CalculatorLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, days, and more"
      seoTitle="Age Calculator - Calculate Your Exact Age | SmartCalc Hub"
      seoDescription="Free age calculator to find your exact age in years, months, and days. Calculate total days lived, weeks, and days until your next birthday."
      keywords="age calculator, birthday calculator, how old am I, age in days, age in months"
      canonicalUrl="https://smartcalhub.online/calculator/age"
      category="math"
      calculatorId="age"
      howItWorks="This calculator determines your precise age from your birth date to today. It shows your age in multiple formats: years/months/days, total days, total weeks, total months, and days until your next birthday."
      formula="Age = Today's Date - Birth Date (accounting for leap years and month lengths)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Birth Date</Label>
          <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
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
            "Calculate Age"
          )}
        </Button>

        {ageData && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-sm font-medium text-muted-foreground">Your Age</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(`${ageData.years} years, ${ageData.months} months, ${ageData.days} days`, "Age")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => printCalculation({
                    title: "Age Calculator Results",
                    inputs: [{ label: "Birth Date", value: birthDate }],
                    results: [
                      { label: "Age", value: `${ageData.years} years, ${ageData.months} months, ${ageData.days} days` },
                      { label: "Total Days", value: ageData.totalDays.toString() },
                      { label: "Days to Birthday", value: ageData.daysToNext.toString() }
                    ]
                  })}
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-4xl font-bold text-primary">
                {ageData.years} years, {ageData.months} months, {ageData.days} days
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Total Months</p>
                <p className="text-xl font-bold">{ageData.totalMonths}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Total Weeks</p>
                <p className="text-xl font-bold">{ageData.totalWeeks}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Total Days</p>
                <p className="text-xl font-bold">{ageData.totalDays}</p>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                🎂 Your next birthday is in <strong>{ageData.daysToNext} days</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
    </>
  );
};

export default AgeCalculator;