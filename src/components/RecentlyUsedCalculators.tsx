import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";
import { Calculator, TrendingUp, Heart, Scale, ArrowRightLeft } from "lucide-react";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "finance":
      return TrendingUp;
    case "health":
      return Heart;
    case "math":
      return Scale;
    case "conversion":
      return ArrowRightLeft;
    default:
      return Calculator;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "finance":
      return "text-green-600 dark:text-green-400";
    case "health":
      return "text-red-600 dark:text-red-400";
    case "math":
      return "text-blue-600 dark:text-blue-400";
    case "conversion":
      return "text-purple-600 dark:text-purple-400";
    default:
      return "text-primary";
  }
};

export const RecentlyUsedCalculators = () => {
  const { recentCalculators } = useRecentCalculators();

  if (recentCalculators.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Recently Used Calculators</h2>
          <Card className="p-8 text-center bg-gradient-to-br from-muted/50 to-muted/20 border-dashed animate-fade-in">
            <Calculator className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              Your recently used calculators will appear here
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Recently Used Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {recentCalculators.map((calc, index) => {
            const Icon = getCategoryIcon(calc.category);
            const colorClass = getCategoryColor(calc.category);
            
            return (
              <Link
                key={calc.url}
                to={calc.url}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="p-4 h-full hover:scale-105 hover:shadow-glow transition-all duration-300 animate-fade-in group-hover:border-primary">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`p-3 rounded-full bg-muted/50 ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-2">{calc.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{calc.category}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
