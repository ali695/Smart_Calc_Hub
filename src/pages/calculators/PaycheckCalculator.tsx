import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PaycheckCalculator = () => {
  const [salary, setSalary] = useState("");
  const [payFrequency, setPayFrequency] = useState("biweekly");
  const [filingStatus, setFilingStatus] = useState("single");
  const [result, setResult] = useState<{
    grossPay: number;
    federalTax: number;
    socialSecurity: number;
    medicare: number;
    totalDeductions: number;
    netPay: number;
  } | null>(null);
  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const annualSalary = parseFloat(salary);
    if (!annualSalary || annualSalary <= 0) return;

    const payPeriods = payFrequency === "weekly" ? 52 : payFrequency === "biweekly" ? 26 : payFrequency === "semimonthly" ? 24 : 12;
    const grossPay = annualSalary / payPeriods;

    // Simplified federal tax calculation (2024)
    const standardDeduction = filingStatus === "single" ? 14600 : 29200;
    const taxableAnnual = Math.max(0, annualSalary - standardDeduction);
    
    let annualFederalTax = 0;
    if (filingStatus === "single") {
      if (taxableAnnual <= 11600) annualFederalTax = taxableAnnual * 0.10;
      else if (taxableAnnual <= 47150) annualFederalTax = 1160 + (taxableAnnual - 11600) * 0.12;
      else if (taxableAnnual <= 100525) annualFederalTax = 5426 + (taxableAnnual - 47150) * 0.22;
      else annualFederalTax = 17168.5 + (taxableAnnual - 100525) * 0.24;
    } else {
      if (taxableAnnual <= 23200) annualFederalTax = taxableAnnual * 0.10;
      else if (taxableAnnual <= 94300) annualFederalTax = 2320 + (taxableAnnual - 23200) * 0.12;
      else annualFederalTax = 10852 + (taxableAnnual - 94300) * 0.22;
    }
    
    const federalTax = annualFederalTax / payPeriods;
    const socialSecurity = Math.min(grossPay * 0.062, (168600 / payPeriods) * 0.062);
    const medicare = grossPay * 0.0145;
    const totalDeductions = federalTax + socialSecurity + medicare;
    const netPay = grossPay - totalDeductions;

    setResult({ grossPay, federalTax, socialSecurity, medicare, totalDeductions, netPay });
  };

  const faqs = [
    {
      question: "What deductions are taken from a US paycheck?",
      answer: "Common deductions include federal income tax, Social Security (6.2%), Medicare (1.45%), state tax, and any voluntary deductions like 401(k) contributions."
    },
    {
      question: "What is the Social Security wage base for 2024?",
      answer: "The Social Security wage base for 2024 is $168,600. Earnings above this amount are not subject to Social Security tax."
    },
  ];

  return (
    <CalculatorLayout
      title="Paycheck Calculator (US)"
      description="Calculate your take-home pay after federal taxes, Social Security, and Medicare."
      category="finance"
      calculatorId="paycheck"
      howItWorks="Enter your annual salary and pay frequency. The calculator estimates federal tax, FICA taxes, and your net pay per paycheck."
      formula="Net Pay = Gross Pay - Federal Tax - Social Security (6.2%) - Medicare (1.45%)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="salary">Annual Salary ($)</Label>
            <Input id="salary" type="number" placeholder="e.g., 75000" value={salary} onChange={(e) => setSalary(e.target.value)} onKeyPress={(e) => handleKeyPress(e, calculate)} />
          </div>
          <div>
            <Label>Pay Frequency</Label>
            <Select value={payFrequency} onValueChange={setPayFrequency}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly (52)</SelectItem>
                <SelectItem value="biweekly">Bi-weekly (26)</SelectItem>
                <SelectItem value="semimonthly">Semi-monthly (24)</SelectItem>
                <SelectItem value="monthly">Monthly (12)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Filing Status</Label>
            <Select value={filingStatus} onValueChange={setFilingStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="button" onClick={() => handleCalculation(calculate)} className="w-full" size="lg" disabled={isCalculating}>
          {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating...</> : "Calculate Paycheck"}
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Net Pay (Per Paycheck)</p>
                    <p className="text-3xl font-bold text-green-600">${result.netPay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(`$${result.netPay.toFixed(2)}`, "Net Pay")}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => printCalculation({
                      title: "Paycheck Calculator",
                      inputs: [{ label: "Annual Salary", value: `$${salary}` }, { label: "Pay Frequency", value: payFrequency }],
                      results: [
                        { label: "Gross Pay", value: `$${result.grossPay.toFixed(2)}` },
                        { label: "Federal Tax", value: `$${result.federalTax.toFixed(2)}` },
                        { label: "Social Security", value: `$${result.socialSecurity.toFixed(2)}` },
                        { label: "Medicare", value: `$${result.medicare.toFixed(2)}` },
                        { label: "Net Pay", value: `$${result.netPay.toFixed(2)}` },
                      ],
                    })}><Printer className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><p className="text-sm text-muted-foreground">Gross Pay</p><p className="text-lg font-semibold">${result.grossPay.toFixed(2)}</p></div>
                  <div><p className="text-sm text-muted-foreground">Federal Tax</p><p className="text-lg font-semibold">${result.federalTax.toFixed(2)}</p></div>
                  <div><p className="text-sm text-muted-foreground">Social Security</p><p className="text-lg font-semibold">${result.socialSecurity.toFixed(2)}</p></div>
                  <div><p className="text-sm text-muted-foreground">Medicare</p><p className="text-lg font-semibold">${result.medicare.toFixed(2)}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PaycheckCalculator;
