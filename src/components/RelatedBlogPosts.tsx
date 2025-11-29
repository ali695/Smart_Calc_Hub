import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";

interface RelatedBlogPostsProps {
  currentPostId: string;
  currentCategory: string;
  allPosts: BlogPost[];
}

export const RelatedBlogPosts = ({ currentPostId, currentCategory, allPosts }: RelatedBlogPostsProps) => {
  // Get related posts from same category, excluding current post
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPostId && post.category === currentCategory)
    .slice(0, 3);

  // If not enough posts in same category, fill with other posts
  if (relatedPosts.length < 3) {
    const additionalPosts = allPosts
      .filter(post => post.id !== currentPostId && post.category !== currentCategory)
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...additionalPosts);
  }

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-16 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`}>
            <Card className="group card-shine card-glow-hover hover:shadow-large transition-all duration-300 h-full border-2 border-border hover:border-primary overflow-hidden">
              <div className="aspect-video overflow-hidden relative">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary-glow/20 to-accent/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 text-lg">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
