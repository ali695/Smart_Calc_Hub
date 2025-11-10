import { useCallback, useEffect, useState } from "react";

export interface RecentCalculator {
  name: string;
  url: string;
  category: string;
  icon?: string;
}

const STORAGE_KEY = "recentCalculators";
const MAX_RECENT = 5;

export const useRecentCalculators = () => {
  const [recentCalculators, setRecentCalculators] = useState<RecentCalculator[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentCalculators(JSON.parse(stored));
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Failed to parse recent calculators:", error);
        }
        // Clear corrupted data silently in production
        localStorage.removeItem(STORAGE_KEY);
        setRecentCalculators([]);
      }
    }
  }, []);

  const addRecentCalculator = useCallback((calculator: RecentCalculator) => {
    setRecentCalculators((prev) => {
      // Check if this calculator is already the most recent
      if (prev.length > 0 && prev[0].url === calculator.url) {
        return prev; // Don't update if it's already the most recent
      }
      
      const filtered = prev.filter((c) => c.url !== calculator.url);
      const updated = [calculator, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    recentCalculators,
    addRecentCalculator,
  };
};
