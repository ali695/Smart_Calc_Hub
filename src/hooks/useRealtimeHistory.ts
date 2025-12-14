import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface HistoryEntry {
  id: number;
  calculator_slug: string;
  input_data: Record<string, any>;
  result_data: Record<string, any>;
  created_at: string;
}

export const useRealtimeHistory = (calculatorSlug?: string) => {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!user) {
      setHistory([]);
      return [];
    }

    setIsLoading(true);
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
  }, [user, calculatorSlug]);

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    fetchHistory();

    const filterString = calculatorSlug 
      ? `user_id=eq.${user.id},calculator_slug=eq.${calculatorSlug}`
      : `user_id=eq.${user.id}`;

    const channel = supabase
      .channel('history-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'calculator_history',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newEntry = payload.new as HistoryEntry;
            if (!calculatorSlug || newEntry.calculator_slug === calculatorSlug) {
              setHistory(prev => [newEntry, ...prev.slice(0, 49)]);
            }
          } else if (payload.eventType === 'DELETE') {
            setHistory(prev => prev.filter(h => h.id !== (payload.old as HistoryEntry).id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, calculatorSlug, fetchHistory]);

  const saveHistory = useCallback(async (
    slug: string,
    inputData: Record<string, any>,
    resultData: Record<string, any>
  ) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('calculator_history')
      .insert({
        user_id: user.id,
        calculator_slug: slug,
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
  }, [user]);

  const deleteHistory = useCallback(async (id: number) => {
    const { error } = await supabase
      .from('calculator_history')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete history entry", variant: "destructive" });
      return false;
    }
    return true;
  }, []);

  return { history, isLoading, saveHistory, fetchHistory, deleteHistory };
};
