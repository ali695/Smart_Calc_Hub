import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Textarea } from "@/components/ui/textarea";

const JsonFormatterCalculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setResult(formatted);
      setError("");
    } catch (e) {
      setError("Invalid JSON: " + (e as Error).message);
      setResult("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setResult(minified);
      setError("");
    } catch (e) {
      setError("Invalid JSON: " + (e as Error).message);
      setResult("");
    }
  };

  const faqs = [
    {
      question: "What is JSON?",
      answer: "JSON (JavaScript Object Notation) is a lightweight data interchange format that's easy for humans to read and write and easy for machines to parse and generate."
    },
    {
      question: "Why format JSON?",
      answer: "Formatted JSON is easier to read and debug. It adds indentation and line breaks to make the structure clear."
    },
    {
      question: "What's JSON minification?",
      answer: "Minification removes all unnecessary whitespace from JSON, reducing file size for faster transmission."
    }
  ];

  return (
    <CalculatorLayout
      title="JSON Formatter"
      description="Format, validate, and beautify your JSON data."
      category="tech"
      calculatorId="json-formatter"
      howItWorks="Paste your JSON data and click format to beautify it or minify to compress it."
      formula="Uses native JSON.parse() and JSON.stringify()"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">JSON Input</Label>
          <Textarea
            id="input"
            placeholder='{"name": "John", "age": 30}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="font-mono"
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={formatJson} className="flex-1" size="lg">
            Format & Validate
          </Button>
          <Button onClick={minifyJson} variant="outline" className="flex-1" size="lg">
            Minify
          </Button>
        </div>

        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Formatted JSON</p>
                <pre className="font-mono text-sm bg-muted p-3 rounded max-h-96 overflow-auto">
                  {result}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default JsonFormatterCalculator;
