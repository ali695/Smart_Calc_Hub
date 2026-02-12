import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";


type EventType = 'page_view' | 'calculation' | 'favorite' | 'share' | 'export' | 'ai_insight';

export const useAnalytics = () => {
  const logEvent = useCallback(async (
    eventType: EventType,
    calculatorSlug?: string,
    metadata?: Record<string, any>
  ) => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('analytics_logs').insert({
      user_id: user?.id || null,
      calculator_slug: calculatorSlug || null,
      event_type: eventType,
      metadata: metadata || null,
    });

    if (error) {
      console.error('Analytics log error:', error);
    }
  }, []);

  const logPageView = useCallback((calculatorSlug: string) => {
    logEvent('page_view', calculatorSlug);
  }, [logEvent]);

  const logCalculation = useCallback((calculatorSlug: string, inputData?: Record<string, any>) => {
    logEvent('calculation', calculatorSlug, { input_summary: inputData });
  }, [logEvent]);

  return { logEvent, logPageView, logCalculation };
};
