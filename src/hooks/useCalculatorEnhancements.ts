import { useState, useCallback, KeyboardEvent, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { triggerCalculatePulse } from "@/components/HeroSection";
import { useAIInsightContext } from "@/components/CalculatorLayout";

export const useCalculatorEnhancements = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const aiContext = useAIInsightContext();

  // Store pending AI insight updates that couldn't be applied due to context not being ready
  const pendingUpdate = useRef<{ inputs: Record<string, any>; results: Record<string, any> } | null>(null);

  // Bridge for calculators that call this hook outside of the AIInsightContext provider.
  // Calculator pages render <CalculatorLayout> inside the same component, so hooks run
  // before the Provider exists; we use a lightweight DOM event so CalculatorLayout can
  // still receive inputs/results.
  const emitAIInsightUpdate = useCallback(
    (inputs: Record<string, any>, results: Record<string, any>) => {
      if (typeof window === "undefined") return;
      const calculatorSlug = window.location?.pathname?.split("/").pop() || "";
      window.dispatchEvent(
        new CustomEvent("smartcalc:ai-insight", {
          detail: { calculatorSlug, inputs, results },
        })
      );
    },
    []
  );

  // Apply pending updates when context becomes available
  useEffect(() => {
    if (aiContext && pendingUpdate.current) {
      aiContext.setInputs(pendingUpdate.current.inputs);
      aiContext.setResults(pendingUpdate.current.results);
      pendingUpdate.current = null;
    }
  }, [aiContext]);

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
        if (options?.inputs && options?.results) {
          emitAIInsightUpdate(options.inputs, options.results);

          if (aiContext) {
            aiContext.setInputs(options.inputs);
            aiContext.setResults(options.results);
          } else {
            // Store for later when context becomes available
            pendingUpdate.current = { inputs: options.inputs, results: options.results };
          }
        }
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
    [aiContext, emitAIInsightUpdate]
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
  // Now handles the case where context isn't ready yet by storing for later,
  // and also emits an event so CalculatorLayout can always receive updates.
  const updateAIInsight = useCallback(
    (inputs: Record<string, any>, results: Record<string, any>) => {
      emitAIInsightUpdate(inputs, results);

      if (aiContext) {
        aiContext.setInputs(inputs);
        aiContext.setResults(results);
      } else {
        // Store for later when context becomes available
        pendingUpdate.current = { inputs, results };
      }
    },
    [aiContext, emitAIInsightUpdate]
  );

  return {
    isCalculating,
    handleCalculation,
    handleKeyPress,
    copyToClipboard,
    updateAIInsight,
  };
};
