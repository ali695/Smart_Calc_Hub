import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface HistoryEntry {
  id: number;
  calculator_slug: string;
  input_data: Record<string, any>;
  result_data: Record<string, any>;
  created_at: string;
}

export const useCalculatorHistory = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const saveHistory = useCallback(async (
    calculatorSlug: string,
    inputData: Record<string, any>,
    resultData: Record<string, any>
  ) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('calculator_history')
      .insert({
        user_id: user.id,
        calculator_slug: calculatorSlug,
        input_data: inputData,
        result_data: resultData
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving history:', error);
      return null;
    }
    return data;
  }, []);

  const fetchHistory = useCallback(async (calculatorSlug?: string) => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsLoading(false);
      return [];
    }

    let query = supabase
      .from('calculator_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (calculatorSlug) {
      query = query.eq('calculator_slug', calculatorSlug);
    }

    const { data, error } = await query;
    setIsLoading(false);

    if (error) {
      console.error('Error fetching history:', error);
      return [];
    }

    setHistory(data as HistoryEntry[]);
    return data as HistoryEntry[];
  }, []);

  const deleteHistory = useCallback(async (id: number) => {
    const { error } = await supabase
      .from('calculator_history')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete history entry", variant: "destructive" });
      return false;
    }
    
    setHistory(prev => prev.filter(h => h.id !== id));
    return true;
  }, []);

  return { history, isLoading, saveHistory, fetchHistory, deleteHistory };
};
