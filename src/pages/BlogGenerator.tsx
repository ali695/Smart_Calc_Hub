import { BlogPostGenerator } from "@/components/BlogPostGenerator";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Sparkles, TrendingUp, Target } from "lucide-react";
import { Link } from "react-router-dom";

const BlogGenerator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              AI Blog Post Generator
            </h1>
            <p className="text-lg text-muted-foreground">
              Create high-quality, SEO-optimized blog content in minutes using AI. Perfect for building your calculator content library.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4 glass-card">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground">
                    Uses advanced AI to create engaging, informative content
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 glass-card">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">SEO-Optimized</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically includes meta tags, keywords, and structured data
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 glass-card">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">1500+ Words</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive articles that provide real value to readers
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <BlogPostGenerator />

          <Card className="mt-8 p-6 glass-card border-primary/20">
            <div className="flex items-start gap-3">
              <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">How to Use Generated Content</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Enter your blog topic and target keywords</li>
                  <li>2. Select the appropriate category for your content</li>
                  <li>3. Click "Generate Blog Post" and wait for AI to create your content</li>
                  <li>4. Review the generated content and SEO metadata</li>
                  <li>5. Copy the content and add it to your blog data file</li>
                  <li>6. Publish and watch your organic traffic grow!</li>
                </ol>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogGenerator;
