import { Search, Calculator as CalcIcon, TrendingUp, Users, CheckCircle, DollarSign, Activity, Percent, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculators, categories } from "@/data/calculators";
import { useState, useEffect } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredCalculators = calculators.filter(calc =>
    calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToCalculators = () => {
    document.getElementById("calculators")?.scrollIntoView({ behavior: "smooth" });
  };

  const featuredCalculators = [
    { icon: DollarSign, title: "Loan Calculator", path: "/calculator/loan", color: "text-emerald-500" },
    { icon: Activity, title: "BMI Calculator", path: "/calculator/bmi", color: "text-rose-500" },
    { icon: Percent, title: "Percentage Calculator", path: "/calculator/percentage", color: "text-blue-500" },
    { icon: Clock, title: "Age Calculator", path: "/calculator/age", color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 md:py-32 overflow-hidden">
        {/* Geometric Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(214_32%_91%_/_0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(214_32%_91%_/_0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="container mx-auto px-4 relative">
          <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <CalcIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">All-in-One Calculator Hub</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Fast, Simple & Smart
              <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
                Calculators for Everyone
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Free online calculators for finance, health, math, and conversions. 
              Get instant, accurate results with our easy-to-use tools.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={scrollToCalculators}
                className="shadow-large hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Try a Calculator
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search calculators… e.g., Loan, BMI, Tax, Age"
                  className="pl-12 h-14 text-base shadow-large hover:shadow-xl focus:shadow-xl transition-all duration-300 rounded-xl border-2 focus:border-primary"
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
                    className="gap-2 hover:-translate-y-0.5 transition-all duration-300 shadow-soft hover:shadow-medium"
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

      {/* Featured Calculators */}
      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCalculators.map((calc, index) => {
                const Icon = calc.icon;
                return (
                  <Link 
                    key={calc.path} 
                    to={calc.path}
                    className={`transition-all duration-500 delay-${index * 100}`}
                  >
                    <Card className="h-full hover:shadow-large transition-all duration-300 hover:-translate-y-1 cursor-pointer group text-center">
                      <CardContent className="pt-6 pb-6">
                        <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 mb-3">
                          <Icon className={`h-8 w-8 ${calc.color}`} />
                        </div>
                        <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                          {calc.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 mb-2">
                  <CalcIcon className="h-10 w-10 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">40+</h3>
                <p className="text-muted-foreground font-medium">Calculators Available</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-500/5 mb-2">
                  <TrendingUp className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">10,000+</h3>
                <p className="text-muted-foreground font-medium">Calculations per Month</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500/10 to-purple-500/5 mb-2">
                  <CheckCircle className="h-10 w-10 text-purple-500" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">100%</h3>
                <p className="text-muted-foreground font-medium">Free & Instant Results</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section id="calculators" className="py-16 md:py-24 scroll-mt-20">
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
