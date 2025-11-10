import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Base64Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const encode = () => {
    try {
      const encoded = btoa(input);
      setResult(encoded);
    } catch (error) {
      setResult("Error: Invalid input for encoding");
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setResult(decoded);
    } catch (error) {
      setResult("Error: Invalid Base64 string");
    }
  };

  const faqs = [
    {
      question: "What is Base64 encoding?",
      answer: "Base64 is a binary-to-text encoding scheme that represents binary data in ASCII format. It's commonly used to encode data for transmission over text-based protocols."
    },
    {
      question: "When should I use Base64?",
      answer: "Use Base64 for embedding images in HTML/CSS, encoding data in URLs, or transmitting binary data in JSON/XML."
    },
    {
      question: "Is Base64 encryption?",
      answer: "No, Base64 is encoding, not encryption. It can be easily decoded and provides no security."
    }
  ];

  return (
    <CalculatorLayout
      title="Base64 Encoder/Decoder"
      description="Encode text to Base64 or decode Base64 back to text."
      category="tech"
      calculatorId="base64-encoder"
      howItWorks="Enter your text and choose to encode or decode. Base64 encoding converts binary data to ASCII text format."
      formula="Uses browser's native btoa() and atob() functions"
      faqs={faqs}
    >
      <Tabs defaultValue="encode" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-4">
          <div>
            <Label htmlFor="encode-input">Text to Encode</Label>
            <Textarea
              id="encode-input"
              placeholder="Enter text to encode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
            />
          </div>

          <Button type="button" onClick={encode} className="w-full" size="lg">
            Encode to Base64
          </Button>
        </TabsContent>

        <TabsContent value="decode" className="space-y-4">
          <div>
            <Label htmlFor="decode-input">Base64 to Decode</Label>
            <Textarea
              id="decode-input"
              placeholder="Enter Base64 string to decode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
            />
          </div>

          <Button type="button" onClick={decode} className="w-full" size="lg">
            Decode from Base64
          </Button>
        </TabsContent>

        {result && (
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Result</p>
                <p className="font-mono text-sm break-all bg-muted p-3 rounded max-h-60 overflow-auto">
                  {result}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </Tabs>
    </CalculatorLayout>
  );
};

export default Base64Calculator;
