import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { calculators, categories } from "@/data/calculators";

const Categories = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All Calculators
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse our complete collection of free online calculators
            </p>
          </div>

          {categories.map((category) => {
            const Icon = category.icon;
            const categoryCalcs = calculators.filter(calc => calc.category === category.id);

            return (
              <section key={category.id} id={category.id} className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <Icon className={`h-8 w-8 ${category.color}`} />
                  <h2 className="text-3xl font-bold">{category.name}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryCalcs.map((calc) => {
                    const CalcIcon = calc.icon;
                    return (
                      <Link key={calc.id} to={calc.path}>
                        <Card className="h-full hover:shadow-large transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <CalcIcon className="h-6 w-6 text-primary" />
                              </div>
                            </div>
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {calc.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-base">
                              {calc.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
