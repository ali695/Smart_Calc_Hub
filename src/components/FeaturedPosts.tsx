import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export const FeaturedPosts = () => {
  // Get the 3 most recent posts
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold">Featured Articles</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className={`group card-shine card-flip card-glow-hover hover:shadow-large transition-all duration-500 cursor-pointer flex flex-col border-2 border-border hover:border-primary overflow-hidden ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`${index === 0 ? 'aspect-[16/9]' : 'aspect-video'} overflow-hidden relative`}>
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary-glow/20 to-accent/20" />
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
                <CardTitle className={`group-hover:text-primary transition-colors ${index === 0 ? 'text-2xl' : 'line-clamp-2'}`}>
                  {post.title}
                </CardTitle>
                <CardDescription className={index === 0 ? 'line-clamp-3' : 'line-clamp-2'}>
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
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all duration-300"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
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