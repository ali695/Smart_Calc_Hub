import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Plan Your Finances Using Online Calculators",
      excerpt: "Discover the essential financial calculators every adult should use to plan their budget, track loans, and build wealth for the future.",
      author: "Ali Haider",
      date: "January 15, 2025",
      category: "Finance",
      readTime: "8 min read",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Why BMI and BMR Matter for Your Health Goals",
      excerpt: "Understanding the difference between BMI and BMR can transform your approach to weight management and fitness. Learn how to use both effectively.",
      author: "Ali Haider",
      date: "January 10, 2025",
      category: "Health",
      readTime: "6 min read",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Top 10 Conversions You Use Daily Without Noticing",
      excerpt: "From cooking measurements to temperature checks, we rely on unit conversions more than we think. Here are the most common ones explained.",
      author: "Ali Haider",
      date: "January 5, 2025",
      category: "Conversion",
      readTime: "5 min read",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "How Accurate Are Online Calculators?",
      excerpt: "A deep dive into the science and formulas behind online calculators, exploring their accuracy and when to trust them for important decisions.",
      author: "Ali Haider",
      date: "December 28, 2024",
      category: "General",
      readTime: "10 min read",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Using Math Tools to Improve Daily Productivity",
      excerpt: "Percentage calculations, ratio comparisons, and average tracking can dramatically improve your decision-making speed in work and life.",
      author: "Ali Haider",
      date: "December 20, 2024",
      category: "Math",
      readTime: "7 min read",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "The Ultimate Guide to Compound Interest",
      excerpt: "Learn how compound interest works, why Einstein called it the eighth wonder of the world, and how to use it to grow your wealth exponentially.",
      author: "Ali Haider",
      date: "December 15, 2024",
      category: "Finance",
      readTime: "12 min read",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, tips, and guides to help you get the most out of our calculator tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <span className="text-sm font-medium">{post.category}</span>
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