import { useState, useCallback, KeyboardEvent } from "react";
import { toast } from "@/hooks/use-toast";
import { triggerCalculatePulse } from "@/components/HeroSection";

export const useCalculatorEnhancements = () => {
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculation = useCallback(async (calculationFn: () => void | Promise<void>) => {
    setIsCalculating(true);
    try {
      await calculationFn();
      // Trigger hero gradient pulse effect on successful calculation
      triggerCalculatePulse();
    } catch (error) {
      console.error("Calculation error:", error);
      toast({
        title: "Calculation Error",
        description: "An error occurred during calculation. Please check your inputs.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  }, []);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, calculationFn: () => void) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleCalculation(calculationFn);
      }
    },
    [handleCalculation]
  );

  const copyToClipboard = useCallback(async (text: string, label: string = "Result") => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  }, []);

  return {
    isCalculating,
    handleCalculation,
    handleKeyPress,
    copyToClipboard,
  };
};
