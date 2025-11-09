import { useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your calculator assistant. Ask me anything about our calculators, or tell me what you need to calculate!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response with contextual FAQ/calculator suggestions
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // BMI queries
    if (lowerQuery.includes("bmi") || lowerQuery.includes("body mass")) {
      return "To calculate your BMI (Body Mass Index), use our BMI Calculator at /calculator/bmi. Simply enter your height and weight to get instant results with category classification.";
    }

    // Loan/Finance queries
    if (lowerQuery.includes("loan") || lowerQuery.includes("emi") || lowerQuery.includes("mortgage")) {
      return "For loan calculations, we have several tools:\n\n• Loan Calculator - Calculate monthly payments and interest\n• EMI Calculator - Find your equated monthly installment\n• Mortgage Calculator - Home loan with taxes\n\nWhich one would you like to use?";
    }

    // Weight loss/health queries
    if (lowerQuery.includes("weight loss") || lowerQuery.includes("calories")) {
      return "For weight management, I recommend:\n\n1. BMR Calculator - Find your basal metabolic rate\n2. Calorie Calculator - Daily calorie needs\n3. Macro Calculator - Protein, carbs, fat distribution\n\nStart with BMR to understand your baseline calorie needs!";
    }

    // Math queries
    if (lowerQuery.includes("percentage") || lowerQuery.includes("percent")) {
      return "Our Percentage Calculator can help you with:\n• Finding percentages\n• Percentage change/increase/decrease\n• What percent of a number\n\nVisit /calculator/percentage to get started!";
    }

    // Conversion queries
    if (lowerQuery.includes("convert") || lowerQuery.includes("conversion")) {
      return "We have converters for:\n• Length (meters, feet, inches)\n• Weight (kg, lbs, ounces)\n• Temperature (Celsius, Fahrenheit, Kelvin)\n• Currency\n• Area, Speed, Pressure & more!\n\nWhat do you need to convert?";
    }

    // General help
    return "I can help you find the right calculator! We have 90+ tools for:\n\n📊 Finance - Loans, investments, savings\n❤️ Health - BMI, calories, fitness\n🔢 Math - Percentages, fractions, algebra\n🔄 Conversions - Units of measurement\n\nWhat would you like to calculate today?";
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-glow hover:shadow-neon-hover transition-all duration-300 hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] shadow-2xl animate-scale-in flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-t-lg">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Calculator Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about calculators…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
