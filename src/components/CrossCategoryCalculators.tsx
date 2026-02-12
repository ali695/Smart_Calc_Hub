import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { calculators } from "@/data/calculators";
import { ArrowRight } from "lucide-react";

interface CrossCategoryCalculatorsProps {
  currentCategory: string;
  currentCalculatorId?: string;
  maxItems?: number;
}

/**
 * Shows calculators from OTHER categories to create cross-category internal links.
 * This improves crawlability by ensuring every page links to multiple categories.
 */
export const CrossCategoryCalculators = ({
  currentCategory,
  currentCalculatorId,
  maxItems = 6,
}: CrossCategoryCalculatorsProps) => {
  // Pick top calculators from each other category (1 per category, round-robin)
  const otherCategories = [...new Set(
    calculators
      .filter(c => c.category !== currentCategory && c.id !== currentCalculatorId)
      .map(c => c.category)
  )];

  const picks = otherCategories
    .map(cat => calculators.find(c => c.category === cat && c.id !== currentCalculatorId)!)
    .filter(Boolean)
    .slice(0, maxItems);

  if (picks.length === 0) return null;

  return (
    <div className="mt-8 pt-8 border-t border-border/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Explore Other Categories</h2>
        <p className="text-muted-foreground">
          Discover calculators across different topics
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {picks.map((calculator) => {
          const Icon = calculator.icon;
          return (
            <Link key={calculator.id} to={calculator.path} className="group">
              <Card className="p-4 h-full hover:shadow-md transition-all duration-300 border hover:border-primary/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {calculator.title}
                    </h3>
                    <p className="text-xs text-muted-foreground capitalize">{calculator.category}</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <Link
          to="/categories"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all calculators
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};
