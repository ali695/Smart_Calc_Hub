import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { isBrowser, safeLocalStorage } from "@/utils/ssrGuards";
export type Region = "uk" | "us" | "global";
export type Currency = "USD" | "GBP" | "EUR" | "CAD" | "INR" | "BTC";

interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: string;
  locale: string;
}

export const currencies: Record<Currency, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB" },
  EUR: { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE" },
  CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar", locale: "en-CA" },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
  BTC: { code: "BTC", symbol: "₿", name: "Bitcoin", locale: "en-US" },
};

// Categories that should show currency selector
export const currencyEnabledCategories = [
  "finance",
  "business",
  "crypto",
  "real-estate"
];

// Calculators that should show currency selector (slug-based)
export const currencyEnabledCalculators = [
  "loan", "mortgage", "compound-interest", "simple-interest", "emi",
  "investment-return", "retirement", "savings-goal", "budget-planner",
  "net-worth", "profit-margin", "break-even", "payback-period",
  "inflation", "currency-converter", "crypto-profit", "dca", 
  "mining-profit", "bitcoin-converter", "cap-rate", "house-flip",
  "property-tax", "rent-affordability", "buy-vs-rent", "refinance",
  "mortgage-recast", "car-loan", "credit-card-payoff", "debt-to-income",
  "us-income-tax", "uk-income-tax", "canada-income-tax", "india-income-tax",
  "australia-income-tax", "salary-after-tax", "paycheck", "401k", "roth-ira",
  "social-security", "national-insurance", "stamp-duty", "sales-tax", "tax",
  "ltv", "inventory-turnover", "conversion-rate", "customer-lifetime-value",
  "growth-rate"
];

interface RegionConfig {
  region: Region;
  currency: Currency;
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
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  getCurrencyConfig: () => CurrencyConfig;
  formatCurrency: (amount: number, customCurrency?: Currency) => string;
  formatDate: (date: Date) => string;
  formatNumber: (num: number, decimals?: number) => string;
  shouldShowCurrency: (category?: string, calculatorSlug?: string) => boolean;
}

const RegionContext = createContext<RegionContextType | null>(null);

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};

// Detect region from browser (SSR-safe)
const detectRegion = (): Region => {
  if (!isBrowser) return "global";
  
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
    if (isBrowser) {
      const stored = safeLocalStorage.getItem("smartcalc-region");
      if (stored && (stored === "uk" || stored === "us" || stored === "global")) {
        return stored as Region;
      }
    }
    return detectRegion();
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (isBrowser) {
      const stored = safeLocalStorage.getItem("smartcalc-currency");
      if (stored && stored in currencies) {
        return stored as Currency;
      }
    }
    return regionConfigs[region].currency;
  });

  const config = regionConfigs[region];

  const setRegion = useCallback((newRegion: Region) => {
    setRegionState(newRegion);
    safeLocalStorage.setItem("smartcalc-region", newRegion);
    // Auto-update currency to match region default
    const newCurrency = regionConfigs[newRegion].currency;
    setCurrencyState(newCurrency);
    safeLocalStorage.setItem("smartcalc-currency", newCurrency);
  }, []);

  const setCurrency = useCallback((newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    safeLocalStorage.setItem("smartcalc-currency", newCurrency);
  }, []);

  const getCurrencyConfig = useCallback((): CurrencyConfig => {
    return currencies[currency];
  }, [currency]);

  const formatCurrency = useCallback((amount: number, customCurrency?: Currency): string => {
    const curr = customCurrency || currency;
    const currConfig = currencies[curr];
    
    // Special handling for BTC
    if (curr === "BTC") {
      return `${currConfig.symbol}${amount.toFixed(8)}`;
    }
    
    return new Intl.NumberFormat(currConfig.locale, {
      style: "currency",
      currency: curr,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }, [currency]);

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

  const shouldShowCurrency = useCallback((category?: string, calculatorSlug?: string): boolean => {
    if (calculatorSlug && currencyEnabledCalculators.includes(calculatorSlug)) {
      return true;
    }
    if (category && currencyEnabledCategories.includes(category.toLowerCase())) {
      return true;
    }
    return false;
  }, []);

  return (
    <RegionContext.Provider value={{
      region,
      config,
      setRegion,
      currency,
      setCurrency,
      getCurrencyConfig,
      formatCurrency,
      formatDate,
      formatNumber,
      shouldShowCurrency
    }}>
      {children}
    </RegionContext.Provider>
  );
};

export { regionConfigs };
