import { Search, Calculator as CalcIcon, TrendingUp, CheckCircle, DollarSign, Activity, Percent, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculators, categories } from "@/data/calculators";
import { useState, useEffect, useRef } from "react";
import { RecentlyUsedCalculators } from "@/components/RecentlyUsedCalculators";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { Testimonials } from "@/components/Testimonials";
import { SEOHead } from "@/components/SEOHead";
import { getFullUrl } from "@/config/siteConfig";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search suggestions - show top 5 matches
  const searchSuggestions = searchQuery.length > 0 
    ? calculators.filter(calc => 
        calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

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
      <SEOHead
        title="SmartCalc Hub – Free Online Calculators"
        description="Free online calculators for finance, health, math, and conversions. Get instant, accurate results with 90+ easy-to-use calculator tools."
        keywords="online calculator, free calculator, finance calculator, health calculator, math calculator, unit converter, SmartCalc Hub"
        canonicalUrl={getFullUrl("/")}
        ogImage={getFullUrl("/og-image.png")}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 md:py-32 overflow-hidden">
        {/* Animated Geometric Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(214_32%_91%_/_0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(214_32%_91%_/_0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,hsl(217_33%_17%_/_0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(217_33%_17%_/_0.3)_1px,transparent_1px)] animate-grid-flow" />
        
        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Tagline - Staggered Animation */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CalcIcon className="h-4 w-4 text-primary animate-pulse-glow" />
              <span className="text-sm font-medium text-primary">All-in-One Calculator Hub</span>
            </div>

            {/* Main Headline - Staggered Animation */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="block animate-fade-in-up">Fast, Smart & Accurate</span>
              <span className="block bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent mt-2 bg-[length:200%_auto] animate-gradient-flow">
                Calculators for Everyone
              </span>
            </h1>
            
            {/* Description - Staggered Animation */}
            <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Free online calculators for finance, health, math, and conversions. 
              Get instant, accurate results with our easy-to-use tools.
            </p>

            {/* CTA Buttons - Clean Professional Style */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                size="lg" 
                onClick={() => scrollToCalculators()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-lg px-8"
              >
                Explore All Calculators
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToCalculators()}
                className="border-2 border-primary/50 text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300 text-lg px-8"
              >
                See Popular Tools
              </Button>
            </div>

            {/* Search Bar with Suggestions */}
            <div className={`max-w-2xl mx-auto transition-all duration-700 delay-500 relative z-40 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative" ref={searchRef}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <Input
                  type="text"
                  placeholder="Search calculators… e.g., Loan, BMI, Tax, Age"
                  className="pl-12 h-14 text-base shadow-medium rounded-xl border-2 focus:border-primary transition-all duration-300 bg-background"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
                
                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-40">
                    {searchSuggestions.map((calc) => {
                      const Icon = calc.icon;
                      return (
                        <Link
                          key={calc.id}
                          to={calc.path}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors duration-200 border-b border-border/50 last:border-b-0"
                          onClick={() => setShowSuggestions(false)}
                        >
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{calc.title}</p>
                            <p className="text-xs text-muted-foreground">{calc.category}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Category Pills - Navigate to categories page */}
            <div className={`flex flex-wrap justify-center gap-3 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant="secondary"
                    className="gap-2 transition-all duration-300"
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

      {/* Recently Used Calculators */}
      <RecentlyUsedCalculators />

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
                    className="group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="h-full hover:shadow-medium transition-all duration-300 cursor-pointer text-center relative overflow-hidden border hover:border-primary/50">
                      <CardContent className="pt-6 pb-6 relative">
                        <div className="inline-flex p-4 rounded-full bg-primary/10 group-hover:bg-primary/15 transition-colors duration-300 mb-3">
                          <Icon className={`h-8 w-8 ${calc.color} group-hover:scale-105 transition-transform duration-300`} />
                        </div>
                        <h3 className="font-semibold text-base group-hover:text-primary transition-colors duration-300">
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
                <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">90+</h3>
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
              {calculators.slice(0, 6).map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link key={calc.id} to={calc.path}>
                    <Card className="h-full hover:shadow-medium transition-all duration-300 cursor-pointer group border hover:border-primary/30 hover:-translate-y-1">
                      <CardHeader className="relative">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors duration-300">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {calc.category}
                          </span>
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors duration-300">
                          {calc.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <CardDescription className="text-base">
                          {calc.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
                <Link to="/categories" className="inline-flex items-center gap-2">
                  View All Calculators
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <FeaturedPosts />

      {/* Testimonials */}
      <Testimonials />

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

      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SmartCalc Hub",
          "url": "https://smartcalhub.online",
          "description": "Free online calculators for finance, health, math, and conversions. Get instant, accurate results with our easy-to-use tools.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://smartcalhub.online/categories?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </div>
  );
};

export default Index;
