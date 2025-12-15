import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, Calculator, HelpCircle, BookOpen, RefreshCw, Trash2, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
  confidence?: number;
  helpful?: boolean | null;
}

const QUICK_REPLIES = [
  { label: "Explain result", icon: HelpCircle, message: "Can you explain my last calculation result in simple terms?" },
  { label: "Show formula", icon: BookOpen, message: "What formula was used in this calculation and how does it work?" },
  { label: "Find calculator", icon: Calculator, message: "Help me find the right calculator for my specific needs" },
  { label: "New calculation", icon: RefreshCw, message: "I want to start a new calculation" },
];

const STORAGE_KEY = "smartcalc_chat_history_v2";
const MAX_STORED_MESSAGES = 100;
const CONTEXT_WINDOW = 10; // Send last 10 messages for context

const DEFAULT_MESSAGE: Message = {
  role: "assistant",
  content: "Hello! I'm your SmartCalc AI Assistant. I can help explain calculations, find the right calculator, answer financial/health/math questions, and provide personalized insights. What can I help you with?",
  timestamp: Date.now(),
  confidence: 100,
};

// Load messages from localStorage
const loadStoredMessages = (): Message[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error loading chat history:", error);
  }
  return [DEFAULT_MESSAGE];
};

// Save messages to localStorage
const saveMessages = (messages: Message[]) => {
  try {
    const toStore = messages.slice(-MAX_STORED_MESSAGES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (error) {
    console.error("Error saving chat history:", error);
  }
};

// Extract calculator name from path
const getCalculatorFromPath = (path: string): string | null => {
  if (path.includes("/calculator/")) {
    return path.split("/calculator/")[1]?.replace(/-/g, " ") || null;
  }
  return null;
};

// Get page context for AI
const getPageContext = (path: string): string => {
  const calculator = getCalculatorFromPath(path);
  if (calculator) {
    return `User is currently on the ${calculator} calculator page. They may have just performed a calculation and might want help understanding the results or the formula used.`;
  }
  if (path.includes("/blog/")) {
    const blogSlug = path.split("/blog/")[1]?.replace(/-/g, " ");
    return `User is reading a blog article about ${blogSlug || "calculators and tools"}.`;
  }
  if (path === "/" || path === "") {
    return "User is on the SmartCalc Hub homepage, browsing available calculators.";
  }
  if (path.includes("/categories")) {
    return "User is browsing calculator categories.";
  }
  if (path.includes("/dashboard")) {
    return "User is viewing their personal dashboard with calculation history and favorites.";
  }
  return "User is browsing SmartCalc Hub.";
};

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => loadStoredMessages());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 1 || messages[0]?.content !== DEFAULT_MESSAGE.content) {
      saveMessages(messages);
    }
  }, [messages]);

  // Clear chat history
  const clearHistory = useCallback(() => {
    setMessages([{ ...DEFAULT_MESSAGE, timestamp: Date.now() }]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Rate message helpfulness
  const rateMessage = useCallback((index: number, helpful: boolean) => {
    setMessages(prev => prev.map((msg, i) => 
      i === index ? { ...msg, helpful } : msg
    ));
  }, []);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const contextMessage = getPageContext(location.pathname);
      const calculatorName = getCalculatorFromPath(location.pathname);
      
      // Build conversation history (last N messages for context)
      const recentMessages = messages.slice(-CONTEXT_WINDOW);
      
      const systemPrompt = `You are SmartCalc Hub's AI Assistant - a knowledgeable, friendly expert in finance, health, math, engineering, and conversions.

CONTEXT: ${contextMessage}
${calculatorName ? `CURRENT CALCULATOR: ${calculatorName}` : ''}

CAPABILITIES:
- Explain calculation results in simple, understandable terms
- Guide users to the right calculator for their needs
- Answer questions about formulas, concepts, and best practices
- Provide financial advice context (not professional financial advice)
- Help with health metrics interpretation (not medical advice)
- Solve math problems step by step

GUIDELINES:
- Be concise but thorough (2-4 sentences for simple questions, more for complex ones)
- Use examples when helpful
- If asked about calculations on the current page, assume user has just used that calculator
- For financial/health topics, always include appropriate disclaimers
- Be encouraging and helpful

AVAILABLE CALCULATORS: BMI, Loan, Mortgage, Compound Interest, Tax (US/UK/Canada/India/Australia), Retirement, TDEE, Macro, Crypto Profit, Currency Converter, and 90+ more across Finance, Health, Math, Conversion, Engineering, Business, and Science categories.`;

      const { data, error } = await supabase.functions.invoke('deepseek-chat', {
        body: {
          messages: [
            { role: "system", content: systemPrompt },
            ...recentMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: "user", content: textToSend }
          ]
        }
      });

      setIsTyping(false);

      if (error) {
        throw error;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message || "I apologize, but I couldn't process that request. Please try again.",
        timestamp: Date.now(),
        confidence: 95,
        helpful: null
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling AI:', error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm having trouble connecting right now. SmartCalc Hub has 100+ calculators for Finance, Health, Math, Conversions, and more. What would you like to calculate?",
          timestamp: Date.now(),
          confidence: 0
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (message: string) => {
    handleSend(message);
  };

  const currentCalculator = getCalculatorFromPath(location.pathname);

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-glow hover:shadow-neon-hover transition-all duration-300 hover:scale-110 bg-gradient-to-r from-primary to-primary-glow"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full h-full md:w-[420px] md:h-[580px] md:max-h-[85vh] shadow-2xl animate-scale-in flex flex-col md:rounded-xl rounded-none border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground md:rounded-t-xl px-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">SmartCalc AI</CardTitle>
                <p className="text-xs text-primary-foreground/80">
                  {currentCalculator ? `Helping with ${currentCalculator}` : "Your calculation assistant"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 1 && (
                <Badge variant="secondary" className="text-[10px] h-5 bg-white/20 text-white border-0">
                  {messages.length} msgs
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={clearHistory}
                className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                title="Clear chat history"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-background">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 pb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div className="max-w-[85%]">
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-muted/80 text-foreground border border-border/50"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                      </div>
                      
                      {/* Helpfulness rating for assistant messages */}
                      {message.role === "assistant" && index > 0 && message.helpful === null && (
                        <div className="flex items-center gap-1 mt-1.5 ml-2">
                          <span className="text-[10px] text-muted-foreground">Helpful?</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => rateMessage(index, true)}
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => rateMessage(index, false)}
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {message.helpful !== null && message.helpful !== undefined && (
                        <p className="text-[10px] text-muted-foreground ml-2 mt-1">
                          {message.helpful ? "Thanks for the feedback! 👍" : "We'll try to improve 🙏"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-muted/80 border border-border/50 rounded-2xl px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Quick Reply Chips */}
            <div className="px-3 pb-2 flex flex-wrap gap-1.5 border-t border-border/30 pt-2 bg-muted/30">
              {QUICK_REPLIES.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-7 text-[11px] gap-1 hover:bg-primary/10 border-border/50"
                  onClick={() => handleQuickReply(reply.message)}
                  disabled={isLoading}
                >
                  <reply.icon className="h-3 w-3" />
                  {reply.label}
                </Button>
              ))}
            </div>

            <div className="p-3 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about calculations, formulas, or find a calculator..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1 bg-background border-border/50 focus:border-primary transition-colors text-sm"
                  disabled={isLoading}
                />
                <Button 
                  onClick={() => handleSend()} 
                  size="icon" 
                  disabled={isLoading || !input.trim()}
                  className="shadow-md hover:shadow-lg transition-all bg-primary"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
