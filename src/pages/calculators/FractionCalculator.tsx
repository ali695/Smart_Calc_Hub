import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer, Loader2 } from "lucide-react";

const FractionCalculator = () => {
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();
  const [num1, setNum1] = useState("");
  const [den1, setDen1] = useState("");
  const [num2, setNum2] = useState("");
  const [den2, setDen2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<any>(null);

  const gcd = (a: number, b: number): number => a === 0 ? b : gcd(b % a, a);

  const simplify = (num: number, den: number) => {
    const divisor = gcd(Math.abs(num), Math.abs(den));
    return { num: num / divisor, den: den / divisor };
  };

  const calculate = () => {
    const n1 = parseFloat(num1);
    const d1 = parseFloat(den1);
    const n2 = parseFloat(num2);
    const d2 = parseFloat(den2);
    
    if (d1 !== 0 && d2 !== 0) {
      let resNum, resDen;
      
      switch (operation) {
        case "add":
          resNum = n1 * d2 + n2 * d1;
          resDen = d1 * d2;
          break;
        case "subtract":
          resNum = n1 * d2 - n2 * d1;
          resDen = d1 * d2;
          break;
        case "multiply":
          resNum = n1 * n2;
          resDen = d1 * d2;
          break;
        case "divide":
          resNum = n1 * d2;
          resDen = d1 * n2;
          break;
        default:
          resNum = 0;
          resDen = 1;
      }
      
      const simplified = simplify(resNum, resDen);
      setResult({
        fraction: `${simplified.num}/${simplified.den}`,
        decimal: (simplified.num / simplified.den).toFixed(4)
      });
    }
  };

  const faqs = [
    {
      question: "How do I add fractions?",
      answer: "Find a common denominator (often by multiplying denominators), adjust numerators accordingly, then add. Example: 1/2 + 1/3 = 3/6 + 2/6 = 5/6."
    },
    {
      question: "How do I multiply fractions?",
      answer: "Multiply numerators together and denominators together. Then simplify. Example: 2/3 × 3/4 = 6/12 = 1/2."
    },
    {
      question: "How do I divide fractions?",
      answer: "Flip (invert) the second fraction and multiply. Example: 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2."
    },
    {
      question: "What does simplified mean?",
      answer: "A simplified fraction has no common factors between numerator and denominator except 1. It's the fraction in its lowest terms."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Fraction Calculator",
          description: "Add, subtract, multiply, and divide fractions",
          url: "https://smartcalchub.com/math/fraction-calculator"
        }}
      />
      <CalculatorLayout
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions"
      howItWorks="This calculator performs operations on two fractions and automatically simplifies the result. Enter numerators and denominators for both fractions, choose your operation, and get instant results in both fraction and decimal form."
      formula="Add: a/b + c/d = (ad+bc)/bd | Multiply: a/b × c/d = ac/bd | Divide: a/b ÷ c/d = ad/bc"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <Label>Numerator 1</Label>
            <Input type="number" placeholder="1" value={num1} onChange={(e) => setNum1(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Denominator 1</Label>
            <Input type="number" placeholder="2" value={den1} onChange={(e) => setDen1(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Numerator 2</Label>
            <Input type="number" placeholder="1" value={num2} onChange={(e) => setNum2(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Denominator 2</Label>
            <Input type="number" placeholder="3" value={den2} onChange={(e) => setDen2(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Operation</Label>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="add">Add (+)</SelectItem>
              <SelectItem value="subtract">Subtract (-)</SelectItem>
              <SelectItem value="multiply">Multiply (×)</SelectItem>
              <SelectItem value="divide">Divide (÷)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="button" 
          onClick={() => handleCalculation(calculate)} 
          className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" 
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate"}
        </Button>

        {result && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 rounded-lg border border-primary text-center hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-sm font-medium text-muted-foreground">Result (Simplified)</p>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.fraction, "Result")}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => printCalculation({
                  title: "Fraction Calculator",
                  inputs: [
                    { label: "Fraction 1", value: `${num1}/${den1}` },
                    { label: "Operation", value: operation },
                    { label: "Fraction 2", value: `${num2}/${den2}` }
                  ],
                  results: [
                    { label: "Result", value: result.fraction },
                    { label: "Decimal", value: result.decimal }
                  ]
                })}>
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">{result.fraction}</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">As Decimal</p>
              <p className="text-2xl font-bold">{result.decimal}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
    </>
  );
};

export default FractionCalculator;