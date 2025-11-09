import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PhCalculator = () => {
  const [calculateFor, setCalculateFor] = useState("ph");
  const [hConcentration, setHConcentration] = useState("");
  const [ohConcentration, setOhConcentration] = useState("");
  const [ph, setPh] = useState("");
  const [poh, setPoh] = useState("");
  const [result, setResult] = useState<{
    ph: number;
    poh: number;
    hConcentration: string;
    ohConcentration: string;
    type: string;
  } | null>(null);

  const calculate = () => {
    let calcPh = 0;
    let calcPoh = 0;

    if (calculateFor === "ph" && hConcentration) {
      calcPh = -Math.log10(parseFloat(hConcentration));
      calcPoh = 14 - calcPh;
    } else if (calculateFor === "poh" && ohConcentration) {
      calcPoh = -Math.log10(parseFloat(ohConcentration));
      calcPh = 14 - calcPoh;
    } else if (calculateFor === "fromPh" && ph) {
      calcPh = parseFloat(ph);
      calcPoh = 14 - calcPh;
    } else if (calculateFor === "fromPoh" && poh) {
      calcPoh = parseFloat(poh);
      calcPh = 14 - calcPoh;
    } else {
      return;
    }

    const hConc = Math.pow(10, -calcPh);
    const ohConc = Math.pow(10, -calcPoh);
    
    let type = "Neutral";
    if (calcPh < 7) type = "Acidic";
    else if (calcPh > 7) type = "Basic";

    setResult({
      ph: calcPh,
      poh: calcPoh,
      hConcentration: hConc.toExponential(2),
      ohConcentration: ohConc.toExponential(2),
      type
    });
  };

  const faqs = [
    {
      question: "What is pH?",
      answer: "pH is a measure of hydrogen ion concentration in a solution. It ranges from 0-14, with 7 being neutral, below 7 acidic, and above 7 basic."
    },
    {
      question: "What is the relationship between pH and pOH?",
      answer: "pH + pOH = 14 at 25°C. This relationship helps you calculate one if you know the other."
    },
    {
      question: "Why use negative logarithm?",
      answer: "The negative logarithm converts very small hydrogen ion concentrations into manageable numbers on the pH scale."
    }
  ];

  return (
    <CalculatorLayout
      title="pH Calculator"
      description="Calculate pH, pOH, and hydrogen ion concentration for chemistry solutions."
      category="science"
      calculatorId="ph-calculator"
      howItWorks="Enter any known value to calculate pH, pOH, H+ concentration, and OH- concentration."
      formula="pH = -log[H+], pH + pOH = 14"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="calculateFor">Calculate From</Label>
          <Select value={calculateFor} onValueChange={setCalculateFor}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ph">[H+] Concentration</SelectItem>
              <SelectItem value="poh">[OH-] Concentration</SelectItem>
              <SelectItem value="fromPh">pH Value</SelectItem>
              <SelectItem value="fromPoh">pOH Value</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {calculateFor === "ph" && (
          <div>
            <Label htmlFor="hConcentration">[H+] Concentration (M)</Label>
            <Input
              id="hConcentration"
              type="number"
              step="any"
              placeholder="e.g., 0.001"
              value={hConcentration}
              onChange={(e) => setHConcentration(e.target.value)}
            />
          </div>
        )}

        {calculateFor === "poh" && (
          <div>
            <Label htmlFor="ohConcentration">[OH-] Concentration (M)</Label>
            <Input
              id="ohConcentration"
              type="number"
              step="any"
              placeholder="e.g., 0.001"
              value={ohConcentration}
              onChange={(e) => setOhConcentration(e.target.value)}
            />
          </div>
        )}

        {calculateFor === "fromPh" && (
          <div>
            <Label htmlFor="ph">pH Value</Label>
            <Input
              id="ph"
              type="number"
              step="0.01"
              placeholder="e.g., 7.0"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
            />
          </div>
        )}

        {calculateFor === "fromPoh" && (
          <div>
            <Label htmlFor="poh">pOH Value</Label>
            <Input
              id="poh"
              type="number"
              step="0.01"
              placeholder="e.g., 7.0"
              value={poh}
              onChange={(e) => setPoh(e.target.value)}
            />
          </div>
        )}

        <Button onClick={calculate} className="w-full" size="lg">
          Calculate
        </Button>

        {result && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">pH</p>
                  <p className="text-2xl font-bold">{result.ph.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">pOH</p>
                  <p className="text-2xl font-bold">{result.poh.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">[H+] Concentration</p>
                  <p className="text-lg font-semibold">{result.hConcentration} M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">[OH-] Concentration</p>
                  <p className="text-lg font-semibold">{result.ohConcentration} M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Solution Type</p>
                  <p className="text-lg font-semibold">{result.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PhCalculator;
