import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Favorite {
  id: number;
  calculator_slug: string;
  created_at: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsLoading(false);
      return [];
    }

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
  }, []);

  const toggleFavorite = useCallback(async (calculatorSlug: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to save favorites", variant: "destructive" });
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
      setFavorites(prev => prev.filter(f => f.id !== existing.id));
      toast({ title: "Removed", description: "Calculator removed from favorites" });
    } else {
      const { data, error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, calculator_slug: calculatorSlug })
        .select()
        .single();

      if (error) {
        toast({ title: "Error", description: "Failed to add favorite", variant: "destructive" });
        return false;
      }
      setFavorites(prev => [data as Favorite, ...prev]);
      toast({ title: "Added", description: "Calculator added to favorites" });
    }
    return true;
  }, [favorites]);

  const isFavorite = useCallback((calculatorSlug: string) => {
    return favorites.some(f => f.calculator_slug === calculatorSlug);
  }, [favorites]);

  return { favorites, isLoading, fetchFavorites, toggleFavorite, isFavorite };
};
