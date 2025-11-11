import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { schemas, validateInput, safeParseFloat } from "@/lib/validation";
import { toast } from "sonner";
import { z } from "zod";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculateBMI = () => {
    const heightValue = safeParseFloat(height);
    const weightValue = safeParseFloat(weight);

    if (heightValue === null || weightValue === null) {
      toast.error("Please enter valid numbers for height and weight");
      return;
    }

    try {
      const validatedData = validateInput(schemas.bmi, { height: heightValue, weight: weightValue });
      const h = validatedData.height / 100;
      const w = validatedData.weight;
      const bmiValue = w / (h * h);
      setBMI(parseFloat(bmiValue.toFixed(1)));
      
      if (bmiValue < 18.5) setCategory("Underweight");
      else if (bmiValue < 25) setCategory("Normal weight");
      else if (bmiValue < 30) setCategory("Overweight");
      else setCategory("Obese");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  const handlePrint = () => {
    if (bmi === null) return;
    
    printCalculation({
      title: "BMI Calculator Results",
      inputs: [
        { label: "Height", value: `${height} cm` },
        { label: "Weight", value: `${weight} kg` }
      ],
      results: [
        { label: "Body Mass Index (BMI)", value: bmi.toFixed(1) },
        { label: "Category", value: category }
      ],
      formula: "BMI = weight (kg) / [height (m)]²"
    });
  };

  const faqs = [
    {
      question: "What is BMI?",
      answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight that applies to adult men and women. It's a screening tool that can indicate whether a person is underweight, normal weight, overweight, or obese."
    },
    {
      question: "Is BMI accurate for everyone?",
      answer: "BMI is a useful general indicator but has limitations. It doesn't account for muscle mass, bone density, overall body composition, and age/gender differences. Athletes or very muscular individuals may have a high BMI without being overweight."
    },
    {
      question: "What is a healthy BMI range?",
      answer: "A BMI between 18.5 and 24.9 is generally considered healthy for most adults. Below 18.5 is underweight, 25-29.9 is overweight, and 30 or above is considered obese."
    },
    {
      question: "Should I use BMI to track my health?",
      answer: "BMI is one tool among many. It's best used in conjunction with other health measures like waist circumference, body composition analysis, and overall fitness level. Consult a healthcare provider for personalized health assessment."
    }
  ];

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index and check if you're in a healthy weight range"
      category="health"
      calculatorId="bmi"
      howItWorks="The BMI calculator uses your height and weight to calculate your Body Mass Index. Simply enter your height in centimeters and weight in kilograms, and the calculator will instantly determine your BMI and category. BMI is calculated by dividing your weight in kilograms by the square of your height in meters."
      formula="BMI = weight (kg) / [height (m)]²"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, calculateBMI)}
          />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, calculateBMI)}
          />
          </div>
        </div>

        <Button 
          type="button" 
          onClick={() => handleCalculation(calculateBMI)} 
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
            "Calculate BMI"
          )}
        </Button>

        {bmi !== null && (
          <div className="mt-6 p-6 bg-primary/10 rounded-lg space-y-4 animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Your BMI</p>
                <p className="text-5xl font-bold text-primary">{bmi}</p>
                <p className="text-lg font-semibold mt-2">{category}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`${bmi} - ${category}`, "BMI")}
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrint}
                  title="Print results"
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>BMI Categories:</p>
              <p>Underweight: &lt; 18.5</p>
              <p>Normal: 18.5 - 24.9</p>
              <p>Overweight: 25 - 29.9</p>
              <p>Obese: ≥ 30</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BMICalculator;
