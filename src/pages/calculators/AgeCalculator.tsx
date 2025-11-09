import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [ageData, setAgeData] = useState<any>(null);

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
      
      setAgeData({
        years,
        months,
        days,
        totalDays,
        totalWeeks,
        totalMonths,
        daysToNext
      });
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
    <CalculatorLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, days, and more"
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

        <Button onClick={calculate} className="w-full" size="lg">Calculate Age</Button>

        {ageData && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground">Your Age</p>
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
  );
};

export default AgeCalculator;