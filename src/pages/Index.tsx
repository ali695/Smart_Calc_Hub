import { Search, Calculator as CalcIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculators, categories } from "@/data/calculators";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCalculators = calculators.filter(calc =>
    calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
              Fast, Simple & Smart
              <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
                Calculators for Everyone
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Free online calculators for finance, health, math, and conversions. 
              Get instant, accurate results with our easy-to-use tools.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search calculators..."
                  className="pl-12 h-14 text-base shadow-large"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant="secondary"
                    className="gap-2"
                    asChild
                  >
                    <Link to={`/categories#${category.id}`}>
                      <Icon className={`h-4 w-4 ${category.color}`} />
                      {category.name}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Popular Calculators
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCalculators.slice(0, 6).map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link key={calc.id} to={calc.path}>
                    <Card className="h-full hover:shadow-large transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {calc.category}
                          </span>
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

            {filteredCalculators.length === 0 && (
              <div className="text-center py-12">
                <CalcIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  No calculators found. Try a different search term.
                </p>
              </div>
            )}

            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link to="/categories">View All Calculators</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="inline-flex p-4 rounded-full bg-primary/10 mb-2">
                  <CalcIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Instant Results</h3>
                <p className="text-muted-foreground">
                  Get accurate calculations in real-time as you type
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="inline-flex p-4 rounded-full bg-primary/10 mb-2">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Easy to Use</h3>
                <p className="text-muted-foreground">
                  Simple, intuitive interface designed for everyone
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="inline-flex p-4 rounded-full bg-primary/10 mb-2">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold">100% Free</h3>
                <p className="text-muted-foreground">
                  No sign-up required, completely free to use
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
