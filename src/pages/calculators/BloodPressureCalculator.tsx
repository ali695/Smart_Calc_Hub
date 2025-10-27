import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const BloodPressureCalculator = () => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [result, setResult] = useState<{
    category: string;
    recommendation: string;
  } | null>(null);

  const calculate = () => {
    const sys = parseFloat(systolic);
    const dia = parseFloat(diastolic);

    if (!sys || !dia) return;

    let category = "";
    let recommendation = "";

    if (sys < 120 && dia < 80) {
      category = "Normal";
      recommendation = "Maintain a healthy lifestyle with regular exercise and balanced diet.";
    } else if (sys < 130 && dia < 80) {
      category = "Elevated";
      recommendation = "Adopt heart-healthy habits to prevent progression to hypertension.";
    } else if (sys < 140 || dia < 90) {
      category = "High Blood Pressure (Stage 1)";
      recommendation = "Consult your doctor. Lifestyle changes and possibly medication may be needed.";
    } else if (sys < 180 || dia < 120) {
      category = "High Blood Pressure (Stage 2)";
      recommendation = "Seek medical attention. Medication and lifestyle changes are likely required.";
    } else {
      category = "Hypertensive Crisis";
      recommendation = "Seek emergency medical care immediately!";
    }

    setResult({ category, recommendation });
  };

  const faqs = [
    {
      question: "What is normal blood pressure?",
      answer: "Normal blood pressure is less than 120/80 mmHg. The first number (systolic) measures pressure when your heart beats, and the second (diastolic) measures pressure between beats."
    },
    {
      question: "What causes high blood pressure?",
      answer: "Factors include genetics, poor diet, lack of exercise, obesity, stress, smoking, and excessive alcohol consumption."
    },
    {
      question: "How can I lower my blood pressure?",
      answer: "Exercise regularly, eat a healthy diet low in sodium, maintain a healthy weight, limit alcohol, quit smoking, and manage stress."
    }
  ];

  return (
    <CalculatorLayout
      title="Blood Pressure Checker"
      description="Check if your blood pressure reading is within a healthy range and get personalized recommendations."
      howItWorks="Enter your systolic (top number) and diastolic (bottom number) blood pressure readings. The calculator will categorize your blood pressure and provide health recommendations."
      formula="Blood pressure is measured as systolic/diastolic in mmHg"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="systolic">Systolic (Top Number)</Label>
            <Input
              id="systolic"
              type="number"
              placeholder="e.g., 120"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="diastolic">Diastolic (Bottom Number)</Label>
            <Input
              id="diastolic"
              type="number"
              placeholder="e.g., 80"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full" size="lg">
          Check Blood Pressure
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="text-3xl font-bold text-primary">{result.category}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Recommendation</p>
                  <p className="text-base">{result.recommendation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BloodPressureCalculator;
