import { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { useRegion } from "@/contexts/RegionContext";
import { 
  Sparkles, 
  RefreshCw, 
  TrendingUp, 
  Heart, 
  Calculator, 
  Beaker, 
  Settings, 
  Bitcoin, 
  ArrowRightLeft,
  Building,
  Briefcase,
  ChevronDown,
  BookOpen,
  BarChart3
} from "lucide-react";

interface AIInsightCardProps {
  calculatorName: string;
  category: string;
  inputs: Record<string, any>;
  results: Record<string, any> | null;
  autoTrigger?: boolean;
}

// Category-specific icons
const getCategoryIcon = (category: string) => {
  const icons: Record<string, React.ReactNode> = {
    finance: <TrendingUp className="h-5 w-5" />,
    business: <Briefcase className="h-5 w-5" />,
    'real-estate': <Building className="h-5 w-5" />,
    health: <Heart className="h-5 w-5" />,
    math: <Calculator className="h-5 w-5" />,
    science: <Beaker className="h-5 w-5" />,
    engineering: <Settings className="h-5 w-5" />,
    crypto: <Bitcoin className="h-5 w-5" />,
    conversion: <ArrowRightLeft className="h-5 w-5" />,
    tech: <Settings className="h-5 w-5" />,
  };
  return icons[category] || <Sparkles className="h-5 w-5" />;
};

// AI response cache (in-memory)
const insightCache = new Map<string, { interpretation: string; moduleName: string; moduleIcon: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 10;

// Rate limiting
let lastRequestTime = 0;
const RATE_LIMIT_MS = 5000; // 5 seconds between requests

export const AIInsightCard = ({ 
  calculatorName, 
  category, 
  inputs, 
  results,
  autoTrigger = true 
}: AIInsightCardProps) => {
  const { region, config } = useRegion();
  const [isLoading, setIsLoading] = useState(false);
  const [insight, setInsight] = useState<{
    interpretation: string;
    moduleName: string;
    moduleIcon: string;
  } | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isSimplified, setIsSimplified] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  // Create cache key
  const getCacheKey = useCallback(() => {
    return `${calculatorName}-${category}-${region}-${JSON.stringify(results)}`;
  }, [calculatorName, category, region, results]);

  // Typing animation effect
  useEffect(() => {
    if (!insight?.interpretation) return;
    
    const text = insight.interpretation;
    setIsTyping(true);
    setDisplayedText("");
    
    let index = 0;
    const typeChar = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        typingRef.current = setTimeout(typeChar, 15);
      } else {
        setIsTyping(false);
      }
    };
    
    typeChar();
    
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [insight?.interpretation]);

  const fetchInsight = useCallback(async (force: boolean = false) => {
    if (!results || Object.keys(results).length === 0) return;
    
    // Rate limiting check
    const now = Date.now();
    if (!force && now - lastRequestTime < RATE_LIMIT_MS) {
      console.log('Rate limited, skipping AI insight request');
      return;
    }
    
    // Check cache first
    const cacheKey = getCacheKey();
    const cached = insightCache.get(cacheKey);
    if (!force && cached && (now - cached.timestamp) < CACHE_TTL) {
      setInsight(cached);
      return;
    }
    
    setIsLoading(true);
    lastRequestTime = now;
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-interpret', {
        body: { 
          calculatorName,
          category: category.toLowerCase(),
          inputs,
          results,
          region,
          locale: config.locale,
          currency: config.currency,
          currencySymbol: config.currencySymbol,
          isSimplified
        }
      });

      if (error) {
        console.error('AI Insight error:', error);
        setInsight({
          interpretation: "Your calculation is complete! Check the results above.",
          moduleName: "AI Assistant",
          moduleIcon: "✨"
        });
      } else {
        setInsight(data);
        
        // Cache the result
        insightCache.set(cacheKey, { ...data, timestamp: now });
        
        // Limit cache size
        if (insightCache.size > MAX_CACHE_SIZE) {
          const firstKey = insightCache.keys().next().value;
          if (firstKey) insightCache.delete(firstKey);
        }
      }
    } catch (err) {
      console.error('Failed to fetch AI insight:', err);
      setInsight({
        interpretation: "Your calculation is complete! Check the results above.",
        moduleName: "AI Assistant",
        moduleIcon: "✨"
      });
    } finally {
      setIsLoading(false);
    }
  }, [calculatorName, category, inputs, results, region, config, isSimplified, getCacheKey]);

  // Auto-trigger when results change
  useEffect(() => {
    if (autoTrigger && results && Object.keys(results).length > 0 && !hasTriggered) {
      const timer = setTimeout(() => {
        fetchInsight();
        setHasTriggered(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [results, autoTrigger, hasTriggered, fetchInsight]);

  // Reset triggered state when inputs change significantly
  useEffect(() => {
    setHasTriggered(false);
    setInsight(null);
    setDisplayedText("");
  }, [JSON.stringify(inputs)]);

  // Refetch when mode changes
  useEffect(() => {
    if (hasTriggered && results) {
      fetchInsight(true);
    }
  }, [isSimplified]);

  const hasResults = results && Object.keys(results).length > 0;

  // Always show a placeholder row (even before first calculation)
  if (!hasResults) {
    return (
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground/60 py-2 px-3 rounded-lg border border-dashed border-muted-foreground/20">
        <Sparkles className="h-4 w-4" />
        <span>AI Insight will appear after you calculate</span>
      </div>
    );
  }

  // Show inline loading indicator immediately after calculation
  if (isLoading && !insight) {
    return (
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground animate-pulse py-2 px-3 rounded-lg bg-primary/5">
        <Sparkles className="h-4 w-4 text-primary animate-spin" />
        <span>AI Insight loading…</span>
      </div>
    );
  }

  const icon = getCategoryIcon(category.toLowerCase());
  const regionFlag = region === 'uk' ? '🇬🇧' : region === 'us' ? '🇺🇸' : '🌍';

  return (
    <Card className="mt-6 overflow-hidden border-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 dark:from-primary/10 dark:via-accent/10 dark:to-primary/15 animate-fade-in relative">
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 blur-sm -z-10" />
      <div className="absolute inset-[1px] rounded-xl bg-background/95 dark:bg-background/90 -z-10" />
      
      {/* Mobile collapsible on small screens */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 text-primary shadow-sm">
                {icon}
              </div>
              <div>
                <h4 className="font-semibold text-sm flex items-center gap-1.5">
                  <span>{insight?.moduleIcon || "🤖"}</span>
                  <span>{insight?.moduleName || "AI Insight"}</span>
                  <span className="text-xs">{regionFlag}</span>
                </h4>
                <p className="text-xs text-muted-foreground">Powered by AI • {config.locale}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {/* Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSimplified(!isSimplified)}
                className="h-7 px-2 text-xs gap-1 hidden sm:flex"
                title={isSimplified ? "Show detailed explanation" : "Show simplified explanation"}
              >
                {isSimplified ? <BookOpen className="h-3.5 w-3.5" /> : <BarChart3 className="h-3.5 w-3.5" />}
                <span className="hidden md:inline">{isSimplified ? "Detailed" : "Simplify"}</span>
              </Button>
              
              {/* Refresh Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setHasTriggered(false);
                  fetchInsight(true);
                }}
                disabled={isLoading}
                className="h-7 px-2"
                title="Re-explain"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
              
              {/* Mobile collapse toggle */}
              <CollapsibleTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent className="md:block">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-primary/10" />
                <Skeleton className="h-4 w-5/6 bg-primary/10" />
                <Skeleton className="h-4 w-4/6 bg-primary/10" />
              </div>
            ) : insight ? (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {displayedText}
                  {isTyping && <span className="animate-pulse">▋</span>}
                </p>
                
                {/* Mobile mode toggle */}
                <div className="flex items-center gap-2 sm:hidden pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSimplified(!isSimplified)}
                    className="h-8 text-xs flex-1"
                  >
                    {isSimplified ? <BookOpen className="h-3.5 w-3.5 mr-1.5" /> : <BarChart3 className="h-3.5 w-3.5 mr-1.5" />}
                    {isSimplified ? "More Detail" : "Simplify"}
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchInsight()}
                className="w-full bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Get AI Insight
              </Button>
            )}
          </CollapsibleContent>
        </div>
      </Collapsible>
    </Card>
  );
};
