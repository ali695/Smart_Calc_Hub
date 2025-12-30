import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { MessageCircle, X, Send, Loader2, Calculator, HelpCircle, BookOpen, RefreshCw, Trash2, Sparkles, ThumbsUp, ThumbsDown, Image, Brain, DollarSign, Heart, Beaker, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
  confidence?: number;
  helpful?: boolean | null;
  imageUrl?: string;
}

type ChatMode = "math" | "finance" | "health" | "general";

const MODES: { id: ChatMode; label: string; icon: typeof Brain; description: string }[] = [
  { id: "math", label: "Math & Science", icon: Brain, description: "Equations, formulas, step-by-step solutions" },
  { id: "finance", label: "Finance & Business", icon: DollarSign, description: "Investment, budgeting, tax advice" },
  { id: "health", label: "Health & Lifestyle", icon: Heart, description: "BMI, calories, fitness guidance" },
  { id: "general", label: "General Knowledge", icon: Beaker, description: "All-purpose assistant" },
];

const QUICK_REPLIES = [
  { label: "Explain result", icon: HelpCircle, message: "Can you explain my last calculation result step-by-step?" },
  { label: "Show formula", icon: BookOpen, message: "What formula was used and can you show me the math?" },
  { label: "Find calculator", icon: Calculator, message: "Help me find the right calculator for my specific needs" },
  { label: "New calculation", icon: RefreshCw, message: "I want to start a new calculation" },
];

const STORAGE_KEY = "smartcalc_chat_v3";
const MAX_STORED_MESSAGES = 50;
const CONTEXT_WINDOW = 10;

const DEFAULT_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! I'm **SmartCalc AI**. How can I help you today?",
  timestamp: Date.now(),
  confidence: 100,
};

const loadStoredMessages = (): { messages: Message[]; mode: ChatMode } => {
  // SSR guard - return defaults during server render
  if (typeof window === 'undefined') {
    return { messages: [DEFAULT_MESSAGE], mode: "general" };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        messages: Array.isArray(parsed.messages) && parsed.messages.length > 0 ? parsed.messages : [DEFAULT_MESSAGE],
        mode: parsed.mode || "general"
      };
    }
  } catch (error) {
    console.error("Error loading chat history:", error);
  }
  return { messages: [DEFAULT_MESSAGE], mode: "general" };
};

const saveMessages = (messages: Message[], mode: ChatMode) => {
  // SSR guard
  if (typeof window === 'undefined') return;
  
  try {
    const toStore = { messages: messages.slice(-MAX_STORED_MESSAGES), mode };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (error) {
    console.error("Error saving chat history:", error);
  }
};

const getCalculatorFromPath = (path: string): string | null => {
  if (path.includes("/calculator/")) {
    return path.split("/calculator/")[1]?.replace(/-/g, " ") || null;
  }
  return null;
};

const getPageContext = (path: string): string => {
  const calculator = getCalculatorFromPath(path);
  if (calculator) {
    return `User is on the ${calculator} calculator page. They may need help understanding results or the formula.`;
  }
  if (path.includes("/blog/")) {
    const blogSlug = path.split("/blog/")[1]?.replace(/-/g, " ");
    return `User is reading about ${blogSlug || "calculators"}.`;
  }
  if (path === "/" || path === "") return "User is on the homepage.";
  if (path.includes("/categories")) return "User is browsing calculator categories.";
  if (path.includes("/dashboard")) return "User is viewing their dashboard.";
  return "User is browsing SmartCalc Hub.";
};

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => loadStoredMessages().messages);
  const [mode, setMode] = useState<ChatMode>(() => loadStoredMessages().mode);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [streamedContent, setStreamedContent] = useState("");
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (messages.length > 1 || messages[0]?.content !== DEFAULT_MESSAGE.content) {
      saveMessages(messages, mode);
    }
  }, [messages, mode]);

  const clearHistory = useCallback(() => {
    setMessages([{ ...DEFAULT_MESSAGE, timestamp: Date.now() }]);
    setMode("general");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, streamedContent]);

  const rateMessage = useCallback((index: number, helpful: boolean) => {
    setMessages(prev => prev.map((msg, i) => 
      i === index ? { ...msg, helpful } : msg
    ));
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() && !uploadedImage) return;
    if (isLoading && !messageText) return; // Only block if no explicit message

    const userMessage: Message = { 
      role: "user", 
      content: textToSend || "Please analyze this image",
      timestamp: Date.now(),
      imageUrl: uploadedImage || undefined
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setUploadedImage(null);
    setIsLoading(true);
    setIsTyping(true);
    setStreamedContent("");

    try {
      const contextMessage = getPageContext(location.pathname);
      const calculatorName = getCalculatorFromPath(location.pathname);
      const recentMessages = messages.slice(-CONTEXT_WINDOW);
      
      const modeConfig = MODES.find(m => m.id === mode);
      const modeContext = modeConfig ? `Current mode: ${modeConfig.label} - ${modeConfig.description}` : "";

      const { data, error } = await supabase.functions.invoke('deepseek-chat', {
        body: {
          messages: [
            ...recentMessages.map(msg => ({
              role: msg.role,
              content: msg.imageUrl ? [
                { type: "text", text: msg.content },
                { type: "image_url", image_url: { url: msg.imageUrl } }
              ] : msg.content
            })),
            { 
              role: "user", 
              content: uploadedImage ? [
                { type: "text", text: textToSend || "Please analyze this image and explain what you see." },
                { type: "image_url", image_url: { url: uploadedImage } }
              ] : textToSend 
            }
          ],
          context: contextMessage,
          calculator: calculatorName,
          mode: mode,
          modeContext: modeContext,
          hasImage: !!uploadedImage
        }
      });

      setIsTyping(false);

      if (error) throw error;

      const assistantContent = data.message || "I apologize, but I couldn't process that request.";
      
      // Simulate typing effect
      let displayContent = "";
      for (let i = 0; i < assistantContent.length; i++) {
        displayContent += assistantContent[i];
        setStreamedContent(displayContent);
        await new Promise(r => setTimeout(r, 8));
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: assistantContent,
        timestamp: Date.now(),
        confidence: 95,
        helpful: null
      };

      setMessages(prev => [...prev, assistantMessage]);
      setStreamedContent("");
    } catch (error) {
      console.error('Error calling AI:', error);
      setIsTyping(false);
      setStreamedContent("");
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm having trouble connecting. SmartCalc Hub has **100+ calculators** for Finance, Health, Math, and more. What would you like to calculate?",
          timestamp: Date.now(),
          confidence: 0
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentCalculator = getCalculatorFromPath(location.pathname);
  const currentModeConfig = useMemo(() => MODES.find(m => m.id === mode), [mode]);

  return (
    <>
      {/* Floating toggle button - always visible when chat is closed */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-primary"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window - responsive design */}
      {isOpen && (
        <Card className="fixed z-50 shadow-2xl animate-scale-in flex flex-col border-0 
          bottom-6 right-6 w-[380px] h-[550px] max-h-[80vh] rounded-xl
          max-md:bottom-0 max-md:right-0 max-md:left-0 max-md:w-full max-md:h-[70vh] max-md:rounded-t-xl max-md:rounded-b-none">
          
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-primary text-primary-foreground rounded-t-xl max-md:rounded-t-xl px-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">SmartCalc AI</CardTitle>
                <p className="text-xs text-primary-foreground/80">
                  {currentCalculator ? `Helping with ${currentCalculator}` : currentModeConfig?.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 1 && (
                <Badge variant="secondary" className="text-[10px] h-5 bg-white/20 text-white border-0">
                  {messages.length}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={clearHistory}
                className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                title="Clear chat"
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
            {/* Mode Selector */}
            <div className="px-3 py-2 border-b bg-muted/30">
              <button
                onClick={() => setShowModeSelector(!showModeSelector)}
                className="flex items-center justify-between w-full text-sm"
              >
                <div className="flex items-center gap-2">
                  {currentModeConfig && <currentModeConfig.icon className="h-4 w-4 text-primary" />}
                  <span className="font-medium">{currentModeConfig?.label}</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${showModeSelector ? 'rotate-180' : ''}`} />
              </button>
              
              {showModeSelector && (
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => { setMode(m.id); setShowModeSelector(false); }}
                      className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all ${
                        mode === m.id 
                          ? 'bg-primary/20 border border-primary/50' 
                          : 'bg-muted/50 hover:bg-muted border border-transparent'
                      }`}
                    >
                      <m.icon className={`h-4 w-4 ${mode === m.id ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-xs font-medium">{m.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 pb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div className="max-w-[85%]">
                      {message.imageUrl && (
                        <img 
                          src={message.imageUrl} 
                          alt="Uploaded" 
                          className="max-w-full h-auto rounded-lg mb-2 max-h-40 object-contain"
                        />
                      )}
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-muted/80 text-foreground border border-border/50"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkMath]}
                              rehypePlugins={[rehypeKatex]}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                        )}
                      </div>
                      
                      {message.role === "assistant" && index > 0 && message.helpful === null && (
                        <div className="flex items-center gap-1 mt-1.5 ml-2">
                          <span className="text-[10px] text-muted-foreground">Helpful?</span>
                          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => rateMessage(index, true)}>
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => rateMessage(index, false)}>
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {message.helpful !== null && message.helpful !== undefined && (
                        <p className="text-[10px] text-muted-foreground ml-2 mt-1">
                          {message.helpful ? "Thanks! 👍" : "We'll improve 🙏"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Streaming content */}
                {streamedContent && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="max-w-[85%] bg-muted/80 border border-border/50 rounded-2xl px-4 py-3">
                      <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                          {streamedContent}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
                
                {isTyping && !streamedContent && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-muted/80 border border-border/50 rounded-2xl px-4 py-3 flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-primary/80 rounded-full animate-[typing-bounce_1.4s_ease-in-out_infinite]" />
                        <span className="w-2 h-2 bg-primary/80 rounded-full animate-[typing-bounce_1.4s_ease-in-out_0.2s_infinite]" />
                        <span className="w-2 h-2 bg-primary/80 rounded-full animate-[typing-bounce_1.4s_ease-in-out_0.4s_infinite]" />
                      </div>
                      <span className="text-xs text-muted-foreground">Thinking...</span>
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
                  onClick={() => handleSend(reply.message)}
                  disabled={isLoading}
                >
                  <reply.icon className="h-3 w-3" />
                  {reply.label}
                </Button>
              ))}
            </div>

            {/* Image Preview */}
            {uploadedImage && (
              <div className="px-3 pb-2 flex items-center gap-2 bg-muted/30">
                <img src={uploadedImage} alt="Preview" className="h-12 w-12 object-cover rounded-lg" />
                <Button variant="ghost" size="sm" onClick={() => setUploadedImage(null)} className="text-xs">
                  Remove
                </Button>
              </div>
            )}

            <div className="p-3 border-t bg-background">
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="shrink-0"
                  title="Upload image"
                >
                  <Image className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Ask about calculations, formulas..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1 bg-background border-border/50 focus:border-primary transition-colors text-sm"
                />
                <Button 
                  onClick={() => handleSend()} 
                  size="icon" 
                  disabled={!input.trim() && !uploadedImage}
                  className="shadow-md hover:shadow-lg transition-all bg-primary"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};