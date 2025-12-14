import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2, Calculator, HelpCircle, BookOpen, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_REPLIES = [
  { label: "Explain result", icon: HelpCircle, message: "Can you explain my last calculation result?" },
  { label: "Show formula", icon: BookOpen, message: "What formula was used in this calculation?" },
  { label: "Find calculator", icon: Calculator, message: "Help me find the right calculator for my needs" },
  { label: "New calculation", icon: RefreshCw, message: "I want to start a new calculation" },
];

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your SmartCalc assistant. I can help explain calculations, find the right calculator, or answer questions. What do you need?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Get current page context
  const getCurrentContext = () => {
    const path = location.pathname;
    if (path.includes("/calculators/")) {
      const calculatorName = path.split("/calculators/")[1]?.replace(/-/g, " ");
      return `User is currently on the ${calculatorName} calculator page.`;
    }
    if (path.includes("/blog/")) {
      return "User is currently reading a blog article.";
    }
    return "User is browsing SmartCalc Hub.";
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const contextMessage = getCurrentContext();
      const response = await fetch(
        'https://lbcpqynztwwvatcviatc.supabase.co/functions/v1/deepseek-chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: `You are SmartCalc Hub's helpful assistant. ${contextMessage} Help users with calculator questions, explain results, and guide them to the right tools. Be concise and friendly.` },
              ...messages.map(msg => ({
                role: msg.role,
                content: msg.content
              })),
              { role: "user", content: textToSend }
            ]
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message }
      ]);
    } catch (error) {
      console.error('Error calling AI:', error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm having trouble connecting right now. We have 90+ calculators for Finance, Health, Math, and Conversions. What would you like to calculate?" 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (message: string) => {
    handleSend(message);
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
        <Card className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full h-full md:w-96 md:h-[520px] md:max-h-[80vh] shadow-2xl animate-scale-in flex flex-col md:rounded-lg rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground md:rounded-t-lg">
            <CardTitle className="text-base md:text-lg font-semibold flex items-center gap-2">
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
              SmartCalc Assistant
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

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 pb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted/80 text-foreground border border-border/50"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-muted/80 border border-border/50 rounded-2xl px-4 py-3 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Quick Reply Chips */}
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {QUICK_REPLIES.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1 hover:bg-primary/10"
                  onClick={() => handleQuickReply(reply.message)}
                  disabled={isLoading}
                >
                  <reply.icon className="h-3 w-3" />
                  {reply.label}
                </Button>
              ))}
            </div>

            <div className="p-4 border-t bg-background/95 backdrop-blur-sm">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about calculators..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1 bg-background border-border/50 focus:border-primary transition-colors"
                  disabled={isLoading}
                />
                <Button 
                  onClick={() => handleSend()} 
                  size="icon" 
                  disabled={isLoading || !input.trim()}
                  className="shadow-md hover:shadow-lg transition-all"
                >
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
