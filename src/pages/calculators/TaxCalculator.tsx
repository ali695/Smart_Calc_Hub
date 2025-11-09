import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [deductions, setDeductions] = useState("");
  const [taxableIncome, setTaxableIncome] = useState<number | null>(null);
  const [taxAmount, setTaxAmount] = useState<number | null>(null);
  const [netIncome, setNetIncome] = useState<number | null>(null);

  const calculateTax = () => {
    const inc = parseFloat(income) || 0;
    const rate = parseFloat(taxRate) || 0;
    const ded = parseFloat(deductions) || 0;
    
    if (inc > 0 && rate >= 0) {
      const taxable = Math.max(inc - ded, 0);
      const tax = (taxable * rate) / 100;
      const net = inc - tax;
      
      setTaxableIncome(parseFloat(taxable.toFixed(2)));
      setTaxAmount(parseFloat(tax.toFixed(2)));
      setNetIncome(parseFloat(net.toFixed(2)));
    }
  };

  const faqs = [
    {
      question: "What is taxable income?",
      answer: "Taxable income is your gross income minus any deductions and exemptions. It's the amount on which your tax is calculated. Common deductions include retirement contributions, health insurance premiums, and business expenses."
    },
    {
      question: "How do tax deductions work?",
      answer: "Tax deductions reduce your taxable income. For example, if you earn $50,000 and have $10,000 in deductions, you only pay tax on $40,000. This is different from tax credits, which directly reduce the tax you owe."
    },
    {
      question: "What is a tax rate?",
      answer: "The tax rate is the percentage of your taxable income that you owe in taxes. Most countries use progressive tax systems where higher income levels are taxed at higher rates. This calculator uses a simplified flat rate for demonstration."
    },
    {
      question: "Is this calculator accurate for my country?",
      answer: "This is a simplified calculator for general estimation. Actual tax calculations vary by country and include multiple brackets, credits, and specific rules. Consult a tax professional or your country's tax authority for precise calculations."
    }
  ];

  return (
    <CalculatorLayout
      title="Tax Calculator"
      description="Calculate your income tax based on earnings and deductions"
      howItWorks="This tax calculator helps you estimate your income tax liability. Enter your gross income, applicable tax rate, and any deductions you qualify for. The calculator will show your taxable income (after deductions), the total tax amount, and your net income after tax. This is a simplified calculator; actual tax calculations may involve multiple brackets and additional factors."
      formula="Taxable Income = Gross Income - Deductions | Tax Amount = Taxable Income × (Tax Rate / 100) | Net Income = Gross Income - Tax Amount"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="income">Annual Income ($)</Label>
            <Input
              id="income"
              type="number"
              placeholder="50000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input
              id="taxRate"
              type="number"
              step="0.1"
              placeholder="25"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deductions">Deductions ($)</Label>
            <Input
              id="deductions"
              type="number"
              placeholder="10000"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculateTax} className="w-full bg-gradient-to-r from-primary to-primary-accent hover:shadow-glow transition-all duration-300" size="lg">
          Calculate Tax
        </Button>

        {taxAmount !== null && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 rounded-lg border border-primary text-center hover:scale-[1.02] transition-all duration-300">
              <p className="text-sm font-medium text-muted-foreground">Total Tax Amount</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">${taxAmount.toLocaleString()}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Gross Income</p>
                <p className="text-2xl font-bold">${parseFloat(income || "0").toLocaleString()}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Taxable Income</p>
                <p className="text-2xl font-bold">${taxableIncome?.toLocaleString()}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Net Income</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${netIncome?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default TaxCalculator;
