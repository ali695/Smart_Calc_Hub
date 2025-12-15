import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useRegion, Region } from "@/contexts/RegionContext";

const regions: { value: Region; label: string; flag: string }[] = [
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "global", label: "Global", flag: "🌍" },
];

export const RegionToggle = () => {
  const { region, setRegion } = useRegion();
  
  const currentRegion = regions.find(r => r.value === region) || regions[2];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-2 text-xs">
          <span className="text-base">{currentRegion.flag}</span>
          <Globe className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {regions.map((r) => (
          <DropdownMenuItem
            key={r.value}
            onClick={() => setRegion(r.value)}
            className={`gap-2 ${region === r.value ? "bg-primary/10" : ""}`}
          >
            <span className="text-lg">{r.flag}</span>
            <span className="text-sm">{r.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
