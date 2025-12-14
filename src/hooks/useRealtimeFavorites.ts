import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Favorite {
  id: number;
  calculator_slug: string;
  created_at: string;
}

export const useRealtimeFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return [];
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setIsLoading(false);
    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    setFavorites(data as Favorite[]);
    return data as Favorite[];
  }, [user]);

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    fetchFavorites();

    const channel = supabase
      .channel('favorites-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'favorites',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setFavorites(prev => [payload.new as Favorite, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setFavorites(prev => prev.filter(f => f.id !== (payload.old as Favorite).id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchFavorites]);

  const toggleFavorite = useCallback(async (calculatorSlug: string) => {
    if (!user) {
      toast({ 
        title: "Sign in required", 
        description: "Please sign in to save favorites", 
        variant: "destructive" 
      });
      return false;
    }

    const existing = favorites.find(f => f.calculator_slug === calculatorSlug);

    if (existing) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', existing.id);

      if (error) {
        toast({ title: "Error", description: "Failed to remove favorite", variant: "destructive" });
        return false;
      }
      toast({ title: "Removed", description: "Calculator removed from favorites" });
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, calculator_slug: calculatorSlug });

      if (error) {
        toast({ title: "Error", description: "Failed to add favorite", variant: "destructive" });
        return false;
      }
      toast({ title: "Added", description: "Calculator added to favorites" });
    }
    return true;
  }, [user, favorites]);

  const isFavorite = useCallback((calculatorSlug: string) => {
    return favorites.some(f => f.calculator_slug === calculatorSlug);
  }, [favorites]);

  return { favorites, isLoading, fetchFavorites, toggleFavorite, isFavorite };
};
