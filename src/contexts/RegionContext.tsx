import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export type Region = "uk" | "us" | "global";

interface RegionConfig {
  region: Region;
  currency: string;
  currencySymbol: string;
  locale: string;
  language: string;
  units: "metric" | "imperial";
  dateFormat: string;
  taxTerms: {
    takeHome: string;
    retirement: string;
    socialContributions: string;
  };
}

const regionConfigs: Record<Region, RegionConfig> = {
  uk: {
    region: "uk",
    currency: "GBP",
    currencySymbol: "£",
    locale: "en-GB",
    language: "en-GB",
    units: "metric",
    dateFormat: "DD/MM/YYYY",
    taxTerms: {
      takeHome: "Take-home pay",
      retirement: "Pension",
      socialContributions: "National Insurance"
    }
  },
  us: {
    region: "us",
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    language: "en-US",
    units: "imperial",
    dateFormat: "MM/DD/YYYY",
    taxTerms: {
      takeHome: "Net income",
      retirement: "401(k)/IRA",
      socialContributions: "FICA"
    }
  },
  global: {
    region: "global",
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    language: "en",
    units: "metric",
    dateFormat: "YYYY-MM-DD",
    taxTerms: {
      takeHome: "Net income",
      retirement: "Retirement savings",
      socialContributions: "Social contributions"
    }
  }
};

interface RegionContextType {
  region: Region;
  config: RegionConfig;
  setRegion: (region: Region) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
  formatNumber: (num: number, decimals?: number) => string;
}

const RegionContext = createContext<RegionContextType | null>(null);

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};

// Detect region from browser
const detectRegion = (): Region => {
  if (typeof window === "undefined") return "global";
  
  const language = navigator.language?.toLowerCase() || "";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone?.toLowerCase() || "";
  
  // UK detection
  if (language.includes("en-gb") || timezone.includes("london") || timezone.includes("europe/london")) {
    return "uk";
  }
  
  // US detection
  if (language.includes("en-us") || timezone.includes("america")) {
    return "us";
  }
  
  return "global";
};

interface RegionProviderProps {
  children: ReactNode;
}

export const RegionProvider = ({ children }: RegionProviderProps) => {
  const [region, setRegionState] = useState<Region>(() => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("smartcalc-region");
      if (stored && (stored === "uk" || stored === "us" || stored === "global")) {
        return stored as Region;
      }
    }
    return detectRegion();
  });

  const config = regionConfigs[region];

  const setRegion = useCallback((newRegion: Region) => {
    setRegionState(newRegion);
    localStorage.setItem("smartcalc-region", newRegion);
  }, []);

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }, [config.locale, config.currency]);

  const formatDate = useCallback((date: Date): string => {
    return new Intl.DateTimeFormat(config.locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date);
  }, [config.locale]);

  const formatNumber = useCallback((num: number, decimals: number = 2): string => {
    return new Intl.NumberFormat(config.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  }, [config.locale]);

  return (
    <RegionContext.Provider value={{
      region,
      config,
      setRegion,
      formatCurrency,
      formatDate,
      formatNumber
    }}>
      {children}
    </RegionContext.Provider>
  );
};

export { regionConfigs };
