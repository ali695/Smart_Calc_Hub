import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const VolumeCalculator = () => {
  const [shape, setShape] = useState("cube");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    let volume = 0;

    switch (shape) {
      case "cube":
        volume = v1 * v1 * v1;
        break;
      case "sphere":
        volume = (4/3) * Math.PI * v1 * v1 * v1;
        break;
      case "cylinder":
        volume = Math.PI * v1 * v1 * v2;
        break;
      case "cone":
        volume = (1/3) * Math.PI * v1 * v1 * v2;
        break;
    }

    setResult(volume);
  };

  const faqs = [
    {
      question: "What is volume?",
      answer: "Volume measures the amount of three-dimensional space occupied by an object, expressed in cubic units (e.g., cm³, m³)."
    },
    {
      question: "How do I convert between volume units?",
      answer: "1 m³ = 1,000,000 cm³ = 1,000 liters. Use these conversion factors to switch between units."
    },
    {
      question: "What's the difference between cylinder and cone volume?",
      answer: "A cone's volume is exactly 1/3 of a cylinder with the same base radius and height."
    }
  ];

  return (
    <CalculatorLayout
      title="Volume Calculator"
      description="Calculate the volume of 3D shapes including cubes, spheres, cylinders, and cones."
      howItWorks="Select a 3D shape and enter the required dimensions (side length, radius, height). The calculator computes the volume."
      formula="Cube: V = s³ | Sphere: V = (4/3)πr³ | Cylinder: V = πr²h | Cone: V = (1/3)πr²h"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label>3D Shape</Label>
          <Select value={shape} onValueChange={setShape}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cube">Cube</SelectItem>
              <SelectItem value="sphere">Sphere</SelectItem>
              <SelectItem value="cylinder">Cylinder</SelectItem>
              <SelectItem value="cone">Cone</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="value1">
              {shape === "cube" ? "Side Length" : "Radius"}
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

          {(shape === "cylinder" || shape === "cone") && (
            <div>
              <Label htmlFor="value2">Height</Label>
              <Input
                id="value2"
                type="number"
                step="any"
                placeholder="e.g., 10"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
              />
            </div>
          )}
        </div>

        <Button onClick={calculate} className="w-full" size="lg">
          Calculate Volume
        </Button>

        {result !== null && (
          <Card className="bg-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Volume</p>
                <p className="text-3xl font-bold text-primary">
                  {result.toFixed(2)} units³
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default VolumeCalculator;
