import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBlogPost, blogPosts } from "@/data/blogPosts";
import { SEOHead } from "@/components/SEOHead";
import { getBlogOGImage, getCategoryOGImage } from "@/utils/ogImageMapping";
import { RelatedBlogPosts } from "@/components/RelatedBlogPosts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Generate Article structured data for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.seoDescription,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://www.linkedin.com/in/ali-haider-seo-consultant/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SmartCalc Hub",
      "url": "https://smartcalchub.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://smartcalchub.com/logo.png"
      }
    },
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "image": getBlogOGImage(),
    "articleSection": post.category,
    "keywords": post.keywords.join(", "),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://smartcalchub.com/blog/${slug}`
    }
  };

  return (
    <>
      <ReadingProgress />
      
      <SEOHead
        title={post.seoTitle}
        description={post.seoDescription}
        keywords={post.keywords.join(", ")}
        ogType="article"
        ogImage={getBlogOGImage()}
        author={post.author}
        publishedTime={new Date(post.date).toISOString()}
        canonicalUrl={`https://smartcalchub.com/blog/${slug}`}
      />
      
      {/* Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      
      <article className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Featured Image Hero Banner */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${getCategoryOGImage(post.category.toLowerCase())})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 mix-blend-overlay" />
          
          {/* Category Badge on Hero */}
          <div className="absolute top-6 left-6">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-primary font-semibold px-4 py-2">
              <Tag className="h-3 w-3 mr-2" />
              {post.category}
            </Badge>
          </div>
          
          {/* Author and Meta on Hero */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5">
                <User className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        <Breadcrumbs />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent leading-tight">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {post.seoDescription}
              </p>
            </div>

            <Card className="glass-card mb-12">
              <CardContent className="pt-6">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {post.content.introduction}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              {post.content.sections.map((section, index) => (
                <Card key={index} className="glass-card hover:shadow-glass-hover transition-all duration-300">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4 text-primary">
                      {section.heading}
                    </h2>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="glass-card mt-12 border-2 border-primary/20">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground/90 leading-relaxed">
                    {post.content.conclusion}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Share Buttons */}
            <div className="mt-8">
              <SocialShareButtons 
                url={`/blog/${slug}`}
                title={post.title}
                description={post.seoDescription}
              />
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <NewsletterSignup />
            </div>

            <div className="mt-12 text-center">
              <Card className="inline-block glass-card">
                <CardContent className="pt-6 px-8 pb-6">
                  <h3 className="text-xl font-semibold mb-2">Found this helpful?</h3>
                  <p className="text-muted-foreground mb-4">
                    Check out our calculators to put this knowledge into practice.
                  </p>
                  <Link 
                    to="/categories" 
                    className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-neon"
                  >
                    Explore Calculators
                  </Link>
                </CardContent>
              </Card>
            </div>

            <RelatedBlogPosts 
              currentPostId={post.id}
              currentCategory={post.category}
              allPosts={blogPosts}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
