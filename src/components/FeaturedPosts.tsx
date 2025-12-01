import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export const FeaturedPosts = () => {
  // Get the 3 most recent posts
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="container mx-auto px-4 py-16 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold">Featured Articles</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="block"
            >
              <Card 
                className="group h-full hover:shadow-medium transition-all duration-300 cursor-pointer flex flex-col border hover:border-primary/50 overflow-hidden bg-card"
              >
                <div className="aspect-video overflow-hidden relative">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary-glow/20 to-accent/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader className="flex-grow p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-sm mt-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary group-hover:gap-1.5 transition-all duration-300">
                      Read more
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Articles
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};