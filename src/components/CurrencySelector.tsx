import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DollarSign } from "lucide-react";
import { useRegion, currencies, Currency } from "@/contexts/RegionContext";

const currencyList: { value: Currency; label: string; symbol: string; flag: string }[] = [
  { value: "USD", label: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { value: "GBP", label: "British Pound", symbol: "£", flag: "🇬🇧" },
  { value: "EUR", label: "Euro", symbol: "€", flag: "🇪🇺" },
  { value: "CAD", label: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { value: "INR", label: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { value: "BTC", label: "Bitcoin", symbol: "₿", flag: "₿" },
];

interface CurrencySelectorProps {
  showOnlyFor?: string; // calculator slug
  category?: string;
}

export const CurrencySelector = ({ showOnlyFor, category }: CurrencySelectorProps) => {
  const { currency, setCurrency, shouldShowCurrency } = useRegion();
  
  // Check if currency selector should be shown
  if (!shouldShowCurrency(category, showOnlyFor)) {
    return null;
  }
  
  const currentCurrency = currencyList.find(c => c.value === currency) || currencyList[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 px-2.5 text-xs border-border/50">
          <span className="text-base">{currentCurrency.flag}</span>
          <span className="font-medium">{currentCurrency.symbol}</span>
          <DollarSign className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {currencyList.map((c) => (
          <DropdownMenuItem
            key={c.value}
            onClick={() => setCurrency(c.value)}
            className={`gap-2 ${currency === c.value ? "bg-primary/10" : ""}`}
          >
            <span className="text-lg">{c.flag}</span>
            <span className="text-sm flex-1">{c.label}</span>
            <span className="text-xs text-muted-foreground">{c.symbol}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
