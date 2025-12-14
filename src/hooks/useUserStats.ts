import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface UserStats {
  totalCalculations: number;
  favoriteCount: number;
  mostUsedCalculator: string | null;
  mostUsedCategory: string | null;
  recentActivity: { date: string; count: number }[];
  accountCreated: string | null;
}

export const useUserStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    totalCalculations: 0,
    favoriteCount: 0,
    mostUsedCalculator: null,
    mostUsedCategory: null,
    recentActivity: [],
    accountCreated: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Fetch calculation history count
      const { count: historyCount } = await supabase
        .from("calculator_history")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      // Fetch favorites count
      const { count: favCount } = await supabase
        .from("favorites")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      // Fetch most used calculator
      const { data: historyData } = await supabase
        .from("calculator_history")
        .select("calculator_slug")
        .eq("user_id", user.id);

      let mostUsedCalculator: string | null = null;
      if (historyData && historyData.length > 0) {
        const calculatorCounts: Record<string, number> = {};
        historyData.forEach((h) => {
          calculatorCounts[h.calculator_slug] = (calculatorCounts[h.calculator_slug] || 0) + 1;
        });
        const sorted = Object.entries(calculatorCounts).sort(([, a], [, b]) => b - a);
        if (sorted.length > 0) {
          mostUsedCalculator = sorted[0][0];
        }
      }

      // Calculate recent activity (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data: recentData } = await supabase
        .from("calculator_history")
        .select("created_at")
        .eq("user_id", user.id)
        .gte("created_at", sevenDaysAgo.toISOString());

      const activityByDay: Record<string, number> = {};
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        activityByDay[dateStr] = 0;
      }

      if (recentData) {
        recentData.forEach((entry) => {
          const dateStr = new Date(entry.created_at!).toISOString().split("T")[0];
          if (activityByDay[dateStr] !== undefined) {
            activityByDay[dateStr]++;
          }
        });
      }

      const recentActivity = Object.entries(activityByDay).map(([date, count]) => ({
        date,
        count,
      }));

      setStats({
        totalCalculations: historyCount || 0,
        favoriteCount: favCount || 0,
        mostUsedCalculator,
        mostUsedCategory: null, // Can be enhanced later
        recentActivity,
        accountCreated: user.created_at || null,
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, refetch: fetchStats };
};
