import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AIInsightResult {
  interpretation: string;
  moduleName: string;
  moduleIcon: string;
  error?: boolean;
}

interface UseAIInsightOptions {
  calculatorName: string;
  category: string;
}

export const useAIInsight = ({ calculatorName, category }: UseAIInsightOptions) => {
  const [insight, setInsight] = useState<AIInsightResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(async (
    inputs: Record<string, any>,
    results: Record<string, any>
  ) => {
    if (!results || Object.keys(results).length === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('ai-interpret', {
        body: {
          calculatorName,
          category: category.toLowerCase(),
          inputs,
          results
        }
      });

      if (invokeError) {
        console.error('AI Insight invoke error:', invokeError);
        setError('Failed to get AI insight');
        setInsight({
          interpretation: "Your calculation is complete! Check the results above.",
          moduleName: "AI Assistant",
          moduleIcon: "✨",
          error: true
        });
      } else {
        setInsight(data);
      }
    } catch (err) {
      console.error('AI Insight fetch error:', err);
      setError('An error occurred');
      setInsight({
        interpretation: "Your calculation is complete! Check the results above.",
        moduleName: "AI Assistant",
        moduleIcon: "✨",
        error: true
      });
    } finally {
      setIsLoading(false);
    }
  }, [calculatorName, category]);

  const resetInsight = useCallback(() => {
    setInsight(null);
    setError(null);
  }, []);

  return {
    insight,
    isLoading,
    error,
    fetchInsight,
    resetInsight
  };
};
