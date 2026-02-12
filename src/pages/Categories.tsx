import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { calculators, categories } from "@/data/calculators";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Search, Linkedin, Instagram, Facebook, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { SEOHead } from "@/components/SEOHead";
import { getFullUrl } from "@/config/siteConfig";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-category-section]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const popularCalculators = calculators.filter(calc => 
    ["loan", "bmi", "compound-interest", "percentage", "currency", "age"].includes(calc.id)
  );

  const filteredCalculators = calculators.filter(calc =>
    calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryTaglines: { [key: string]: string } = {
    finance: "Plan your finances smarter with instant online tools",
    health: "Track your wellness with science-backed health calculators",
    math: "Solve complex calculations in seconds with powerful tools",
    conversion: "Convert any unit instantly with precision and ease",
    tech: "Developer tools for encoding, hashing, and formatting",
    engineering: "Professional engineering calculation tools",
    business: "Business metrics and performance calculators",
    science: "Scientific calculations for chemistry and physics",
    "real-estate": "Property investment and home buying calculators",
    crypto: "Cryptocurrency investment and trading tools"
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="All Calculators – Browse by Category | SmartCalc Hub"
        description="Browse 90+ free online calculators organized by category: finance, health, math, conversions, tech, engineering, business, and science."
        keywords="all calculators, calculator categories, finance calculators, health calculators, math calculators, unit converters"
        canonicalUrl={getFullUrl("/categories")}
      />
      <PageHeader 
        title="All Calculators"
        description="Explore our full suite of free, accurate online calculators"
        category="home"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Search Bar with Glass Effect */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-glow dark:text-primary" />
              <Input
                type="text"
                placeholder="Search calculators... (e.g., Loan, BMI, Tax, Age)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-card pl-12 h-14 text-lg rounded-2xl shadow-lg border-2 dark:border-border border-border focus:border-primary-glow dark:focus:ring-2 dark:focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-colors duration-200"
                >
                  <Icon className={`h-4 w-4 ${category.color}`} />
                  <span className="font-medium text-sm">{category.name}</span>
                </a>
              );
            })}
          </div>

          {/* Popular Calculators Section */}
          {!searchQuery && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Popular Calculators</h2>
                <p className="text-muted-foreground">Most-used calculators by our community</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularCalculators.map((calc) => {
                  const CalcIcon = calc.icon;
                  return (
                    <Link key={calc.id} to={calc.path}>
                      <Card className="h-full hover:shadow-medium transition-all duration-300 cursor-pointer group border hover:border-primary/30 hover:-translate-y-1">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                              <CalcIcon className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors duration-300">
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
          )}

          {/* Category Sections */}
          {categories.map((category) => {
            const Icon = category.icon;
            const categoryCalcs = searchQuery 
              ? filteredCalculators.filter(calc => calc.category === category.id)
              : calculators.filter(calc => calc.category === category.id);

            if (categoryCalcs.length === 0) return null;

            const isVisible = visibleSections.has(category.id);

            return (
              <section
                key={category.id}
                id={category.id}
                data-category-section
                className={`mb-16 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {/* Category Header with Shaded Panel */}
                <div className="bg-gradient-to-r from-muted/50 to-transparent rounded-2xl p-6 mb-6 border-l-4 border-primary">
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`p-3 rounded-xl bg-card shadow-md`}>
                      <Icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{category.name}</h2>
                      <p className="text-muted-foreground mt-1">
                        {categoryTaglines[category.id as keyof typeof categoryTaglines]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calculator Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryCalcs.map((calc) => {
                    const CalcIcon = calc.icon;
                    return (
                      <Link key={calc.id} to={calc.path}>
                        <Card className="h-full hover:shadow-medium transition-all duration-300 cursor-pointer group border hover:border-primary/30 hover:-translate-y-1">
                          <CardHeader className="relative">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-3 rounded-lg bg-gradient-to-br ${
                                category.id === 'finance' ? 'from-green-500/10 to-green-600/10' :
                                category.id === 'health' ? 'from-red-500/10 to-red-600/10' :
                                category.id === 'math' ? 'from-blue-500/10 to-blue-600/10' :
                                category.id === 'real-estate' ? 'from-amber-500/10 to-amber-600/10' :
                                category.id === 'crypto' ? 'from-yellow-500/10 to-yellow-600/10' :
                                'from-purple-500/10 to-purple-600/10'
                              } transition-all`}>
                                <CalcIcon className={`h-6 w-6 ${category.color}`} />
                              </div>
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
              </section>
            );
          })}

          {/* No Results Message */}
          {searchQuery && filteredCalculators.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No calculators found for "{searchQuery}"</p>
            </div>
          )}

          {/* Creator Section */}
          <section className="mt-20 pt-12 border-t-2 border-border">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-2">
                  Connect with the Creator <Heart className="h-7 w-7 text-red-500 fill-red-500" />
                </h2>
                <p className="text-muted-foreground text-lg">
                  Created with passion by Ali Haider – SEO & Digital Product Designer
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary-glow/5 rounded-2xl p-8 border-2 border-primary/20">
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <a
                    href="https://www.linkedin.com/in/ali-haider-seo-consultant/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <Linkedin className="h-5 w-5" />
                      LinkedIn
                    </Button>
                  </a>

                  <a
                    href="https://www.instagram.com/ali_haiderseo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white hover:border-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <Instagram className="h-5 w-5" />
                      Instagram
                    </Button>
                  </a>

                  <a
                    href="https://www.facebook.com/AliHadi768"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <Facebook className="h-5 w-5" />
                      Facebook
                    </Button>
                  </a>

                  <a
                    href="mailto:ma7122671@gmail.com"
                    className="group"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <Mail className="h-5 w-5" />
                      Contact Me
                    </Button>
                  </a>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Have questions or feedback? Feel free to reach out!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "All Calculators - SmartCalc Hub",
          "description": "Browse 40+ free online calculators for finance, health, math, and conversions",
          "itemListElement": calculators.slice(0, 20).map((calc, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": calc.title,
            "url": `https://smartcalhub.online${calc.path}`
          }))
        })}
      </script>
    </div>
  );
};

export default Categories;
