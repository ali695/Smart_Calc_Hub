import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getCalculatorsByCategory } from "@/data/calculators";
import { ArrowRight } from "lucide-react";

interface RelatedCalculatorsProps {
  category: string;
  currentCalculatorId?: string;
  maxItems?: number;
}

export const RelatedCalculators = ({ 
  category, 
  currentCalculatorId, 
  maxItems = 4 
}: RelatedCalculatorsProps) => {
  // Get calculators from the same category
  const categoryCalculators = getCalculatorsByCategory(category);
  
  // Filter out the current calculator and limit the results
  const relatedCalculators = categoryCalculators
    .filter(calc => calc.id !== currentCalculatorId)
    .slice(0, maxItems);

  // Don't render if no related calculators
  if (relatedCalculators.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Related Calculators</h2>
        <p className="text-muted-foreground">
          Explore more tools in the {category.charAt(0).toUpperCase() + category.slice(1)} category
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedCalculators.map((calculator) => {
          const Icon = calculator.icon;
          
          return (
            <Link 
              key={calculator.id} 
              to={calculator.path}
              className="group"
            >
              <Card className="p-6 h-full hover:scale-[1.02] hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-background to-muted/30 border-l-4 border-l-primary/50 hover:border-l-primary">
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                    {calculator.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                    {calculator.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-primary font-medium group-hover:translate-x-1 transition-transform">
                    Try it now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
