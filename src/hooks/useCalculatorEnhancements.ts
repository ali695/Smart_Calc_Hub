import { useState, useCallback, KeyboardEvent } from "react";
import { toast } from "@/hooks/use-toast";
import { triggerCalculatePulse } from "@/components/HeroSection";
import { useAIInsightContext } from "@/components/CalculatorLayout";

export const useCalculatorEnhancements = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const aiContext = useAIInsightContext();

  const handleCalculation = useCallback(
    async (
      calculationFn: () => void | Promise<void>,
      options?: {
        inputs?: Record<string, any>;
        results?: Record<string, any>;
      }
    ) => {
      setIsCalculating(true);

      try {
        await calculationFn();

        // Trigger hero gradient pulse effect on successful calculation
        triggerCalculatePulse();

        // If inputs/results are explicitly passed, use them.
        if (aiContext && options?.inputs) aiContext.setInputs(options.inputs);
        if (aiContext && options?.results) aiContext.setResults(options.results);
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
    },
    [aiContext]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, calculationFn: () => void | Promise<void>) => {
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

  // Helper to update AI insight context directly.
  // Key fix: calculators should be able to call this even if the button handler
  // isn't passing options into handleCalculation.
  const updateAIInsight = useCallback(
    (inputs: Record<string, any>, results: Record<string, any>) => {
      if (!aiContext) return;
      aiContext.setInputs(inputs);
      aiContext.setResults(results);
    },
    [aiContext]
  );

  return {
    isCalculating,
    handleCalculation,
    handleKeyPress,
    copyToClipboard,
    updateAIInsight,
  };
};
