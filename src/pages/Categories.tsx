import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { calculators, categories } from "@/data/calculators";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Search, Linkedin, Instagram, Facebook, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const categoryTaglines = {
    finance: "Plan your finances smarter with instant online tools",
    health: "Track your wellness with science-backed health calculators",
    math: "Solve complex calculations in seconds with powerful tools",
    conversion: "Convert any unit instantly with precision and ease"
  };

  return (
    <div className="min-h-screen">
      {/* Gradient Header Banner */}
      <div className="bg-gradient-to-r from-primary via-accent to-primary-glow text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              All Calculators
            </h1>
            <p className="text-lg opacity-95">
              Explore our full suite of free, accurate online calculators
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search calculators... (e.g., Loan, BMI, Tax, Age)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-xl shadow-lg border-2 focus:border-primary transition-all"
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
                  className="group flex items-center gap-2 px-6 py-3 rounded-full bg-card border-2 border-border hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className={`h-5 w-5 ${category.color}`} />
                  <span className="font-semibold">{category.name}</span>
                </a>
              );
            })}
          </div>

          {/* Popular Calculators Section */}
          {!searchQuery && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">⭐ Popular Calculators</h2>
                <p className="text-muted-foreground">Most-used calculators by our community</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularCalculators.map((calc) => {
                  const CalcIcon = calc.icon;
                  return (
                    <Link key={calc.id} to={calc.path}>
                      <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border-2 hover:border-primary">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
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
                        <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border hover:border-primary">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-3 rounded-lg bg-gradient-to-br ${
                                category.id === 'finance' ? 'from-green-500/10 to-green-600/10 group-hover:from-green-500/20 group-hover:to-green-600/20' :
                                category.id === 'health' ? 'from-red-500/10 to-red-600/10 group-hover:from-red-500/20 group-hover:to-red-600/20' :
                                category.id === 'math' ? 'from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20' :
                                'from-purple-500/10 to-purple-600/10 group-hover:from-purple-500/20 group-hover:to-purple-600/20'
                              } transition-all`}>
                                <CalcIcon className={`h-6 w-6 ${category.color} group-hover:scale-110 transition-transform`} />
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
    </div>
  );
};

export default Categories;
