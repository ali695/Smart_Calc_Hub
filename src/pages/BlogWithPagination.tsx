import { Calendar, User, ArrowRight, Sparkles, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { blogPosts } from "@/data/blogPosts";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";

const POSTS_PER_PAGE = 12;

const BlogWithPagination = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const cats = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];
    return cats;
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Generate BlogPosting schema for the blog listing page
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SmartCalc Hub Blog",
    "description": "Insights, tips, and comprehensive guides about calculators, finance, health, mathematics, and productivity tools",
    "url": "https://smartcalhub.online/blog",
    "publisher": {
      "@type": "Organization",
      "name": "SmartCalc Hub",
      "url": "https://smartcalhub.online",
      "logo": {
        "@type": "ImageObject",
        "url": "https://smartcalhub.online/logo.png"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Blog & Calculator Guides | SmartCalc Hub - Expert Tips & Insights"
        description="Comprehensive guides and insights about calculators, finance planning, health metrics, mathematical concepts, unit conversions, and productivity tools. Expert tips from professionals."
        keywords="calculator blog, finance guides, health calculators guide, math tutorials, conversion tips, productivity tools"
        ogType="website"
        ogImage="https://smartcalhub.online/og-blog.png"
        canonicalUrl="https://smartcalhub.online/blog"
      />

      <script type="application/ld+json">
        {JSON.stringify(blogSchema)}
      </script>

      <div className="min-h-screen">
        <PageHeader 
          title="Blog & Insights"
          description="Insights, tips, and guides to help you get the most out of our calculator tools"
        />
        
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center mb-8">
            <Link to="/blog-generator">
              <Button variant="secondary" size="lg" className="gap-2 shadow-lg hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
                Generate Blog Post with AI
              </Button>
            </Link>
          </div>
        </div>

        <Breadcrumbs />

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Search and Filter Section */}
            <div className="mb-12 animate-fade-in">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search articles by title, keywords, or content..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 h-12 glass-card border-2 border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground shadow-neon"
                        : "bg-muted hover:bg-muted-foreground/20 text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Results count */}
              <p className="mt-4 text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* Blog Posts Grid */}
            {currentPosts.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <p className="text-xl text-muted-foreground mb-4">No articles found</p>
                <p className="text-sm text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="block">
                      <Card className="group card-shine card-flip card-glow-hover hover:shadow-large transition-all duration-500 cursor-pointer flex flex-col border-2 border-border hover:border-primary overflow-hidden h-full">
                        <div className="aspect-video overflow-hidden relative">
                          {post.image ? (
                            <img 
                              src={post.image} 
                              alt={`${post.title} - ${post.category} article thumbnail`}
                              title={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary-glow/20 to-accent/20" aria-label={`Decorative background for ${post.title}`} />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold shadow-lg">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <CardHeader className="flex-grow">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Calendar className="h-3 w-3" />
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <User className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                            <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                              Read more
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="transition-all duration-300"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className="min-w-10 transition-all duration-300"
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="transition-all duration-300"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}

            <div className="mt-12 text-center">
              <Card className="inline-block bg-primary/5 border-primary/20">
                <CardContent className="pt-6 px-8 pb-6">
                  <h3 className="text-xl font-semibold mb-2">Want to contribute?</h3>
                  <p className="text-muted-foreground mb-4">
                    We're always looking for quality content about calculators, finance, health, and productivity.
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Get in Touch
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogWithPagination;