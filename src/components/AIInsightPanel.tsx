import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
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
  Briefcase
} from "lucide-react";

interface AIInsightPanelProps {
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
  };
  return icons[category] || <Sparkles className="h-5 w-5" />;
};

// Category-specific gradient classes
const getCategoryGradient = (category: string) => {
  const gradients: Record<string, string> = {
    finance: "from-emerald-500/10 to-green-500/5 dark:from-emerald-600/20 dark:to-green-600/10",
    business: "from-blue-500/10 to-indigo-500/5 dark:from-blue-600/20 dark:to-indigo-600/10",
    'real-estate': "from-orange-500/10 to-amber-500/5 dark:from-orange-600/20 dark:to-amber-600/10",
    health: "from-rose-500/10 to-pink-500/5 dark:from-rose-600/20 dark:to-pink-600/10",
    math: "from-cyan-500/10 to-teal-500/5 dark:from-cyan-600/20 dark:to-teal-600/10",
    science: "from-blue-500/10 to-sky-500/5 dark:from-blue-600/20 dark:to-sky-600/10",
    engineering: "from-slate-500/10 to-blue-500/5 dark:from-slate-600/20 dark:to-blue-600/10",
    crypto: "from-amber-500/10 to-yellow-500/5 dark:from-amber-600/20 dark:to-yellow-600/10",
    conversion: "from-purple-500/10 to-violet-500/5 dark:from-purple-600/20 dark:to-violet-600/10",
  };
  return gradients[category] || "from-primary/10 to-primary/5";
};

export const AIInsightPanel = ({ 
  calculatorName, 
  category, 
  inputs, 
  results,
  autoTrigger = true 
}: AIInsightPanelProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [insight, setInsight] = useState<{
    interpretation: string;
    moduleName: string;
    moduleIcon: string;
  } | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  const fetchInsight = useCallback(async () => {
    if (!results || Object.keys(results).length === 0) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-interpret', {
        body: { 
          calculatorName,
          category: category.toLowerCase(),
          inputs,
          results
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
  }, [calculatorName, category, inputs, results]);

  // Auto-trigger when results change
  useEffect(() => {
    if (autoTrigger && results && Object.keys(results).length > 0 && !hasTriggered) {
      // Small delay to ensure results are rendered first
      const timer = setTimeout(() => {
        fetchInsight();
        setHasTriggered(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [results, autoTrigger, hasTriggered, fetchInsight]);

  // Reset triggered state when inputs change significantly
  useEffect(() => {
    setHasTriggered(false);
    setInsight(null);
  }, [JSON.stringify(inputs)]);

  if (!results || Object.keys(results).length === 0) {
    return null;
  }

  const gradientClass = getCategoryGradient(category.toLowerCase());
  const icon = getCategoryIcon(category.toLowerCase());

  return (
    <Card className={`mt-4 overflow-hidden bg-gradient-to-br ${gradientClass} border-primary/20 animate-fade-in`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
            <div>
              <h4 className="font-semibold text-sm flex items-center gap-1.5">
                {insight?.moduleIcon && <span>{insight.moduleIcon}</span>}
                {insight?.moduleName || "AI Insight"}
              </h4>
              <p className="text-xs text-muted-foreground">Powered by AI</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setHasTriggered(false);
              fetchInsight();
            }}
            disabled={isLoading}
            className="h-8 px-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : insight ? (
          <div className="space-y-2">
            <p className="text-sm leading-relaxed text-foreground/90">
              {insight.interpretation}
            </p>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={fetchInsight}
            className="w-full"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Get AI Insight
          </Button>
        )}
      </div>
    </Card>
  );
};
