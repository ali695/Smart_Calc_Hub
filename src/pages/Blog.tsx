import { Calendar, User, ArrowRight, Search, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { getBlogHeroImage } from "@/utils/ogImageMapping";

import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <PageHeader 
        title="Blog & Insights"
        description="Insights, tips, and guides to help you get the most out of our calculator tools"
        icon={<BookOpen className="h-10 w-10" />}
        category="blog"
      />

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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 glass-card border-2 border-border focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
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
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-xl text-muted-foreground mb-4">No articles found</p>
              <p className="text-sm text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                // Use dynamic hero image based on category
                const heroImage = post.image || getBlogHeroImage(post.category);
                
                return (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col border border-border hover:border-primary/50 overflow-hidden rounded-xl">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={heroImage} 
                    alt={`${post.title} - ${post.category} article thumbnail`}
                    title={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-primary-foreground rounded-full text-xs sm:text-sm font-semibold shadow-lg">
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
                    <Link 
                      to={`/blog/${post.id}`}
                      className="flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                    >
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
                );
              })}
            </div>
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
  );
};

export default Blog;