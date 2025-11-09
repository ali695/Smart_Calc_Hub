import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AIRecommendationProps {
  calculatorType: string;
  result: any;
  category: string;
}

export const AIRecommendation = ({ calculatorType, result, category }: AIRecommendationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recommendation, setRecommendation] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const generateRecommendation = () => {
    setLoading(true);
    // Placeholder for AI integration - can be connected to Lovable AI later
    setTimeout(() => {
      const recommendations: Record<string, string> = {
        health: `Based on your ${calculatorType} result, consider tracking your progress over time. Try our related calculators like TDEE Calculator and Macro Calculator to get a complete health picture.`,
        finance: `Your ${calculatorType} calculation shows important financial insights. Consider using our Investment Return Calculator and Savings Goal Calculator to optimize your financial planning.`,
        math: `Understanding ${calculatorType} is essential for many applications. Explore related calculators like our Percentage Calculator and Ratio Calculator to strengthen your mathematical skills.`,
        conversion: `Unit conversions are crucial for accuracy. Bookmark this ${calculatorType} and check out our other conversion tools for comprehensive unit management.`,
      };
      
      setRecommendation(recommendations[category] || `Great job using the ${calculatorType}! Explore more calculators to enhance your calculations.`);
      setLoading(false);
    }, 1000);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
      <Card className="glass-card overflow-hidden bg-gradient-to-br from-primary/5 via-primary-accent/5 to-transparent border-primary/20">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full p-4 hover:bg-primary/10 dark:hover:bg-primary/5 transition-all justify-between"
            onClick={() => {
              if (!isOpen && !recommendation) {
                generateRecommendation();
              }
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-glow animate-pulse" />
              <span className="font-semibold dark:text-foreground">Need AI Recommendations?</span>
            </div>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="px-4 pb-4">
          <div className="pt-2 space-y-3">
            {loading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-glow border-t-transparent"></div>
                <span className="text-sm animate-pulse">Analyzing your results...</span>
              </div>
            ) : recommendation ? (
              <div className="space-y-3 page-fade">
                <p className="text-sm leading-relaxed dark:text-card-foreground/90 text-foreground/90">
                  {recommendation}
                </p>
                <div className="pt-2 border-t border-border/30 dark:border-border">
                  <p className="text-xs text-muted-foreground italic">
                    💡 Tip: Save this calculator to your bookmarks for quick access
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
