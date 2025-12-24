import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { Copy, Loader2 } from "lucide-react";

const HashGeneratorCalculator = () => {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState("md5");
  const [result, setResult] = useState("");
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();

  const generateHash = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    
    let hashBuffer: ArrayBuffer;
    
    switch (algorithm) {
      case "sha1":
        hashBuffer = await crypto.subtle.digest("SHA-1", data);
        break;
      case "sha256":
        hashBuffer = await crypto.subtle.digest("SHA-256", data);
        break;
      case "sha384":
        hashBuffer = await crypto.subtle.digest("SHA-384", data);
        break;
      case "sha512":
        hashBuffer = await crypto.subtle.digest("SHA-512", data);
        break;
      default:
        // MD5 not natively supported, use a simple hash for demonstration
        setResult("MD5 requires additional library");
        return;
    }
    
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setResult(hashHex);
    updateAIInsight(
      { inputLength: input.length, algorithm },
      { hashLength: hashHex.length, hash: hashHex.substring(0, 16) + "..." }
    );
  };

  const faqs = [
    {
      question: "What is a hash function?",
      answer: "A hash function converts input data into a fixed-size string of characters, which is typically a digest that is unique to each unique input."
    },
    {
      question: "What's the difference between hash algorithms?",
      answer: "SHA-256 is more secure than SHA-1 and MD5. SHA-512 provides even stronger security but produces longer hashes."
    },
    {
      question: "Can hashes be reversed?",
      answer: "No, hash functions are one-way. You cannot reverse a hash to get the original input."
    }
  ];

  return (
    <CalculatorLayout
      title="Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, and other cryptographic hashes for text."
      category="tech"
      calculatorId="hash-generator"
      howItWorks="Enter your text and select a hash algorithm. Click generate to create a cryptographic hash of your input."
      formula="Uses Web Crypto API for SHA algorithms"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">Input Text</Label>
          <Textarea
            id="input"
            placeholder="Enter text to hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="algorithm">Hash Algorithm</Label>
          <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="md5">MD5</SelectItem>
              <SelectItem value="sha1">SHA-1</SelectItem>
              <SelectItem value="sha256">SHA-256</SelectItem>
              <SelectItem value="sha384">SHA-384</SelectItem>
              <SelectItem value="sha512">SHA-512</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="button"
          onClick={() => handleCalculation(generateHash)} 
          className="w-full" 
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Hash"
          )}
        </Button>

        {result && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-muted-foreground">Hash Result</p>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(result, "Hash")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="font-mono text-sm break-all bg-muted p-3 rounded">
                {result}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default HashGeneratorCalculator;
