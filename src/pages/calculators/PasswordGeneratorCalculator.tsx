import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useCalculatorEnhancements } from "@/hooks/useCalculatorEnhancements";
import { Copy, Loader2, RefreshCw } from "lucide-react";

const PasswordGeneratorCalculator = () => {
  const [length, setLength] = useState("16");
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const { isCalculating, handleCalculation, copyToClipboard, updateAIInsight } = useCalculatorEnhancements();

  const generate = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (!chars) {
      setPassword("Please select at least one character type");
      return;
    }

    const len = parseInt(length) || 16;
    const array = new Uint32Array(len);

    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(array);
    } else if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
      // Fallback for environments where crypto is global
      (crypto as Crypto).getRandomValues(array);
    } else {
      // Last-resort fallback to Math.random (non-crypto secure)
      for (let i = 0; i < len; i++) {
        array[i] = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
      }
    }

    let result = "";
    for (let i = 0; i < len; i++) {
      result += chars.charAt(array[i] % chars.length);
    }
    setPassword(result);
    updateAIInsight(
      { length: len, options },
      { passwordGenerated: true, charPoolSize: chars.length, strength: len >= 16 ? "Strong" : len >= 12 ? "Good" : "Moderate" }
    );
  };

  const faqs = [
    {
      question: "What makes a password strong?",
      answer: "A strong password is at least 12 characters long, contains uppercase and lowercase letters, numbers, and symbols, and doesn't contain dictionary words or personal information."
    },
    {
      question: "How long should my password be?",
      answer: "We recommend at least 16 characters for strong security. Longer passwords are exponentially harder to crack."
    },
    {
      question: "Should I use symbols in my password?",
      answer: "Yes, including symbols significantly increases password strength by expanding the character pool attackers must try."
    }
  ];

  return (
    <CalculatorLayout
      title="Password Generator"
      description="Generate strong, secure random passwords"
      category="tech"
      howItWorks="Creates cryptographically random passwords using your selected character types. Longer passwords with more character types are exponentially more secure."
      formula="Password Strength = Length × Character Pool Size"
      faqs={faqs}
      seoTitle="Password Generator – Create Strong Secure Passwords | SmartCalc Hub"
      seoDescription="Free password generator. Create strong, random, secure passwords with custom length and character options."
      keywords="password generator, strong password, secure password, random password"
      canonicalUrl="https://smartcalhub.online/calculator/password-generator"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Password Length</Label>
            <Input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min="4"
              max="128"
            />
          </div>

          <div className="space-y-3">
            <Label>Character Types</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={options.uppercase}
                onCheckedChange={(checked) => setOptions({...options, uppercase: checked as boolean})}
              />
              <label htmlFor="uppercase" className="text-sm cursor-pointer">Uppercase (A-Z)</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={options.lowercase}
                onCheckedChange={(checked) => setOptions({...options, lowercase: checked as boolean})}
              />
              <label htmlFor="lowercase" className="text-sm cursor-pointer">Lowercase (a-z)</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={options.numbers}
                onCheckedChange={(checked) => setOptions({...options, numbers: checked as boolean})}
              />
              <label htmlFor="numbers" className="text-sm cursor-pointer">Numbers (0-9)</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={options.symbols}
                onCheckedChange={(checked) => setOptions({...options, symbols: checked as boolean})}
              />
              <label htmlFor="symbols" className="text-sm cursor-pointer">Symbols (!@#$%...)</label>
            </div>
          </div>

          <Button 
            onClick={() => handleCalculation(generate)} 
            className="w-full"
            disabled={isCalculating}
          >
            {isCalculating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Password
              </>
            )}
          </Button>
        </div>

        {password && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary-accent/10">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Generated Password</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="flex-1 p-3 bg-background rounded-md text-lg font-mono break-all">
                      {password}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(password, "Password")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  ⚠️ Store this password securely in a password manager. Never share it via email or messaging apps.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PasswordGeneratorCalculator;
