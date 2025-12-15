import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CachedInsight {
  insight_text: string;
  module_name: string;
  module_icon: string;
}

// Generate a hash from inputs for cache lookup
const hashInputs = (inputs: Record<string, any>, results: Record<string, any>): string => {
  const str = JSON.stringify({ inputs, results });
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

export const useAIInsightCache = () => {
  const getCachedInsight = useCallback(async (
    calculatorSlug: string,
    inputs: Record<string, any>,
    results: Record<string, any>,
    region: string
  ): Promise<CachedInsight | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const inputsHash = hashInputs(inputs, results);

    const { data, error } = await supabase
      .from('ai_insights_cache')
      .select('insight_text, module_name, module_icon')
      .eq('user_id', user.id)
      .eq('calculator_slug', calculatorSlug)
      .eq('inputs_hash', inputsHash)
      .eq('region', region)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (error) {
      console.error('Cache lookup error:', error);
      return null;
    }

    return data;
  }, []);

  const cacheInsight = useCallback(async (
    calculatorSlug: string,
    inputs: Record<string, any>,
    results: Record<string, any>,
    region: string,
    insight: CachedInsight
  ): Promise<void> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const inputsHash = hashInputs(inputs, results);

    const { error } = await supabase
      .from('ai_insights_cache')
      .upsert({
        user_id: user.id,
        calculator_slug: calculatorSlug,
        inputs_hash: inputsHash,
        region,
        insight_text: insight.insight_text,
        module_name: insight.module_name,
        module_icon: insight.module_icon,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }, {
        onConflict: 'user_id,calculator_slug,inputs_hash,region'
      });

    if (error) {
      console.error('Cache insert error:', error);
    }
  }, []);

  return { getCachedInsight, cacheInsight };
};
