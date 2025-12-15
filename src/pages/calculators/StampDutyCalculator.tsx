import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Printer, Loader2 } from "lucide-react";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Checkbox } from "@/components/ui/checkbox";

const StampDutyCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState("");
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [isAdditionalProperty, setIsAdditionalProperty] = useState(false);
  const [result, setResult] = useState<{
    stampDuty: number;
    effectiveRate: number;
    breakdown: { band: string; rate: string; tax: number }[];
  } | null>(null);

  const { isCalculating, handleCalculation, handleKeyPress, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const calculate = () => {
    const price = parseFloat(propertyPrice);
    if (!price || price <= 0) return;

    let stampDuty = 0;
    const breakdown: { band: string; rate: string; tax: number }[] = [];

    // SDLT rates for England and Northern Ireland (2024/25)
    if (isFirstTimeBuyer && price <= 625000) {
      // First-time buyer relief
      if (price <= 425000) {
        stampDuty = 0;
        breakdown.push({ band: "Up to £425,000", rate: "0%", tax: 0 });
      } else {
        const taxable = price - 425000;
        stampDuty = taxable * 0.05;
        breakdown.push({ band: "Up to £425,000", rate: "0%", tax: 0 });
        breakdown.push({ band: "£425,001 - £625,000", rate: "5%", tax: stampDuty });
      }
    } else {
      // Standard rates
      const bands = [
        { threshold: 250000, rate: 0 },
        { threshold: 925000, rate: 0.05 },
        { threshold: 1500000, rate: 0.10 },
        { threshold: Infinity, rate: 0.12 }
      ];

      let remaining = price;
      let previousThreshold = 0;

      for (const band of bands) {
        if (remaining <= 0) break;
        
        const taxableInBand = Math.min(remaining, band.threshold - previousThreshold);
        const taxInBand = taxableInBand * band.rate;
        
        if (taxableInBand > 0) {
          breakdown.push({
            band: `£${previousThreshold.toLocaleString()} - £${Math.min(band.threshold, price).toLocaleString()}`,
            rate: `${band.rate * 100}%`,
            tax: taxInBand
          });
        }
        
        stampDuty += taxInBand;
        remaining -= taxableInBand;
        previousThreshold = band.threshold;
      }
    }

    // Additional property surcharge (3%)
    if (isAdditionalProperty) {
      const surcharge = price * 0.03;
      stampDuty += surcharge;
      breakdown.push({ band: "Additional Property Surcharge", rate: "3%", tax: surcharge });
    }

    const effectiveRate = (stampDuty / price) * 100;
    const resultData = { stampDuty, effectiveRate, breakdown };
    setResult(resultData);

    updateAIInsight(
      { propertyPrice: price, isFirstTimeBuyer, isAdditionalProperty },
      { stampDuty, effectiveRate }
    );
  };

  const faqs = [
    {
      question: "What is Stamp Duty Land Tax (SDLT)?",
      answer: "SDLT is a tax paid when purchasing property or land in England and Northern Ireland above certain thresholds."
    },
    {
      question: "What relief is available for first-time buyers?",
      answer: "First-time buyers pay no SDLT on properties up to £425,000, and 5% on the portion from £425,001 to £625,000 (if the property costs £625,000 or less)."
    },
    {
      question: "What is the additional property surcharge?",
      answer: "If you're buying an additional residential property (like a second home or buy-to-let), you pay an extra 3% on top of standard rates."
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "UK Stamp Duty Calculator",
          description: "Calculate Stamp Duty Land Tax for property purchases in England and Northern Ireland",
          url: "https://smartcalchub.com/calculator/stamp-duty"
        }}
      />
      <CalculatorLayout
        title="UK Stamp Duty (SDLT) Calculator"
        description="Calculate Stamp Duty Land Tax for property purchases in England & Northern Ireland."
        category="finance"
        calculatorId="stamp-duty-calculator"
        howItWorks="Enter the property price and your buyer status to calculate SDLT."
        formula="Graduated tax bands from 0% to 12% based on property value"
        faqs={faqs}
      >
        <div className="space-y-6" ref={printRef}>
          <div>
            <Label htmlFor="price">Property Price (£)</Label>
            <Input
              id="price"
              type="number"
              placeholder="e.g., 350000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, calculate)}
              className="text-lg"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="firstTime"
                checked={isFirstTimeBuyer}
                onCheckedChange={(checked) => setIsFirstTimeBuyer(checked as boolean)}
              />
              <Label htmlFor="firstTime" className="cursor-pointer">First-time buyer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="additional"
                checked={isAdditionalProperty}
                onCheckedChange={(checked) => setIsAdditionalProperty(checked as boolean)}
              />
              <Label htmlFor="additional" className="cursor-pointer">Additional property (second home/buy-to-let)</Label>
            </div>
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
              "Calculate Stamp Duty"
            )}
          </Button>

          {result && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Stamp Duty</p>
                    <p className="text-3xl font-bold text-primary">
                      £{result.stampDuty.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`£${result.stampDuty.toFixed(2)}`, "Stamp Duty")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handlePrint}>
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Effective Rate</p>
                  <p className="text-xl font-semibold">{result.effectiveRate.toFixed(2)}%</p>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-sm font-medium mb-2">Tax Breakdown</p>
                  <div className="space-y-1 text-sm">
                    {result.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">{item.band} @ {item.rate}</span>
                        <span>£{item.tax.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
};

export default StampDutyCalculator;
