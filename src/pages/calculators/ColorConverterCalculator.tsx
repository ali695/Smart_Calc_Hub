import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { usePrintCalculator } from "@/hooks/usePrintCalculator";
import { Copy, Loader2, Printer } from "lucide-react";

const ColorConverterCalculator = () => {
  const [hex, setHex] = useState("#FF5733");
  const [rgb, setRgb] = useState({ r: 255, g: 87, b: 51 });
  const [hsl, setHsl] = useState({ h: 9, s: 100, l: 60 });
  const { isCalculating, handleCalculation, copyToClipboard } = useCalculatorEnhancements();
  const { printCalculation } = usePrintCalculator();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join('').toUpperCase();
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const convertFromHex = () => {
    const rgbResult = hexToRgb(hex);
    if (rgbResult) {
      setRgb(rgbResult);
      setHsl(rgbToHsl(rgbResult.r, rgbResult.g, rgbResult.b));
    }
  };

  const faqs = [
    {
      question: "What is HEX color format?",
      answer: "HEX is a 6-digit hexadecimal code representing RGB colors. Format: #RRGGBB where each pair represents Red, Green, and Blue values from 00-FF."
    },
    {
      question: "What is the difference between RGB and HSL?",
      answer: "RGB uses Red, Green, Blue values (0-255). HSL uses Hue (0-360°), Saturation (0-100%), and Lightness (0-100%), which is more intuitive for humans."
    },
    {
      question: "How do I use color codes in CSS?",
      answer: "Use HEX like color: #FF5733, RGB like color: rgb(255, 87, 51), or HSL like color: hsl(9, 100%, 60%)."
    }
  ];

  return (
    <CalculatorLayout
      title="Color Converter"
      description="Convert colors between HEX, RGB, and HSL formats"
      category="tech"
      howItWorks="Enter a HEX color code to see its RGB and HSL equivalents. The converter uses standard color space algorithms for accurate conversions."
      formula="RGB to HEX: #RRGGBB | RGB to HSL: Hue, Saturation, Lightness transformation"
      faqs={faqs}
      seoTitle="Color Converter – HEX, RGB, HSL Conversion | SmartCalc Hub"
      seoDescription="Free color converter. Convert between HEX, RGB, and HSL color formats instantly with live preview."
      keywords="color converter, hex to rgb, rgb to hsl, color code, css colors"
      canonicalUrl="https://smartcalchub.com/calculator/color-converter"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>HEX Color</Label>
            <Input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#FF5733"
            />
          </div>

          <Button 
            onClick={() => handleCalculation(convertFromHex)} 
            className="w-full"
            disabled={isCalculating}
          >
            {isCalculating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              "Convert Color"
            )}
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10">
          <CardContent className="pt-6 space-y-4">
            <div 
              className="w-full h-32 rounded-lg border-2 border-border"
              style={{ backgroundColor: hex }}
            />
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">HEX</p>
                  <p className="text-xl font-bold">{hex}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(hex, "HEX code")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">RGB</p>
                  <p className="text-xl font-bold">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB code")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">HSL</p>
                  <p className="text-xl font-bold">hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL code")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => printCalculation({
                  title: "Color Converter",
                  inputs: [{ label: "HEX", value: hex }],
                  results: [
                    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
                    { label: "HSL", value: `hsl(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)` }
                  ]
                })}
              >
                <Printer className="mr-2 h-4 w-4" />
                Print Color Codes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default ColorConverterCalculator;
