import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const AreaPerimeterCalculator = () => {
  const [shape, setShape] = useState("circle");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState<{
    area: number;
    perimeter: number;
  } | null>(null);

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    let area = 0;
    let perimeter = 0;

    switch (shape) {
      case "circle":
        area = Math.PI * v1 * v1;
        perimeter = 2 * Math.PI * v1;
        break;
      case "square":
        area = v1 * v1;
        perimeter = 4 * v1;
        break;
      case "rectangle":
        area = v1 * v2;
        perimeter = 2 * (v1 + v2);
        break;
      case "triangle":
        area = 0.5 * v1 * v2;
        perimeter = 0; // Cannot calculate without all sides
        break;
    }

    setResult({ area, perimeter });
  };

  const faqs = [
    {
      question: "What is the difference between area and perimeter?",
      answer: "Area measures the space inside a shape (square units), while perimeter measures the distance around a shape (linear units)."
    },
    {
      question: "Why is π used in circle calculations?",
      answer: "Pi (π ≈ 3.14159) is the ratio of a circle's circumference to its diameter, making it essential for all circle calculations."
    },
    {
      question: "How do I calculate triangle perimeter?",
      answer: "Triangle perimeter requires all three side lengths. This calculator uses base and height to find area only."
    }
  ];

  return (
    <CalculatorLayout
      title="Area & Perimeter Calculator"
      description="Calculate the area and perimeter of common shapes including circles, squares, rectangles, and triangles."
      category="math"
      calculatorId="area-perimeter"
      howItWorks="Select a shape and enter the required dimensions. The calculator computes both area and perimeter (or circumference for circles)."
      formula="Circle: A = πr², P = 2πr | Square: A = s², P = 4s | Rectangle: A = l×w, P = 2(l+w)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label>Shape</Label>
          <Select value={shape} onValueChange={setShape}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="circle">Circle</SelectItem>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="rectangle">Rectangle</SelectItem>
              <SelectItem value="triangle">Triangle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="value1">
              {shape === "circle" ? "Radius" : shape === "square" ? "Side Length" : shape === "rectangle" ? "Length" : "Base"}
            </Label>
            <Input
              id="value1"
              type="number"
              step="any"
              placeholder="e.g., 5"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
            />
          </div>

          {(shape === "rectangle" || shape === "triangle") && (
            <div>
              <Label htmlFor="value2">
                {shape === "rectangle" ? "Width" : "Height"}
              </Label>
              <Input
                id="value2"
                type="number"
                step="any"
                placeholder="e.g., 3"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
              />
            </div>
          )}
        </div>

        <Button onClick={calculate} className="w-full" size="lg">
          Calculate
        </Button>

        {result && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="text-3xl font-bold text-primary">
                    {result.area.toFixed(2)} units²
                  </p>
                </div>

                {result.perimeter > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {shape === "circle" ? "Circumference" : "Perimeter"}
                    </p>
                    <p className="text-xl font-semibold">
                      {result.perimeter.toFixed(2)} units
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default AreaPerimeterCalculator;
