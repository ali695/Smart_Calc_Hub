import { Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { blogPosts } from "@/data/blogPosts";

const Blog = () => {

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary via-accent to-primary-glow text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Blog & Insights</h1>
            <p className="text-xl opacity-95 max-w-2xl mx-auto mb-6">
              Insights, tips, and guides to help you get the most out of our calculator tools
            </p>
            <Link to="/blog-generator">
              <Button variant="secondary" size="lg" className="gap-2 shadow-lg">
                <Sparkles className="h-5 w-5" />
                AI Blog Generator
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col border-2 border-border hover:border-primary overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary-glow/20 to-accent/20 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="relative w-full h-full flex items-center justify-center">
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
            ))}
          </div>

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