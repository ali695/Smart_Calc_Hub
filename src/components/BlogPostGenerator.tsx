import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface GeneratedBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  content: {
    introduction: string;
    sections: Array<{
      heading: string;
      content: string;
    }>;
    conclusion: string;
  };
  date: string;
  author: string;
  readTime: string;
}

export const BlogPostGenerator = () => {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("Finance");
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<GeneratedBlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const generateBlogPost = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a blog topic");
      return;
    }

    setIsGenerating(true);
    setGeneratedPost(null);

    try {
      const keywordsArray = keywords.split(',').map(k => k.trim()).filter(k => k);
      
      const { data, error } = await supabase.functions.invoke('generate-blog-post', {
        body: {
          topic: topic.trim(),
          category,
          keywords: keywordsArray.length > 0 ? keywordsArray : [topic.trim().toLowerCase()]
        }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedPost(data.blogPost);
      toast.success("Blog post generated successfully!");
    } catch (error: any) {
      console.error('Error generating blog post:', error);
      
      if (error.message?.includes('429')) {
        toast.error("Rate limit reached. Please try again in a moment.");
      } else if (error.message?.includes('402')) {
        toast.error("AI credits required. Please add credits in Settings.");
      } else {
        toast.error(error.message || "Failed to generate blog post");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedPost) return;

    const formattedPost = `
# ${generatedPost.title}

**Category:** ${category}
**Keywords:** ${generatedPost.keywords.join(', ')}
**Read Time:** ${generatedPost.readTime}

---

## Introduction
${generatedPost.content.introduction}

${generatedPost.content.sections.map(section => `
## ${section.heading}
${section.content}
`).join('\n')}

## Conclusion
${generatedPost.content.conclusion}

---

**SEO Title:** ${generatedPost.seoTitle}
**Meta Description:** ${generatedPost.seoDescription}
**Slug:** ${generatedPost.slug}
`;

    navigator.clipboard.writeText(formattedPost);
    setCopied(true);
    toast.success("Blog post copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Blog Post Generator
          </CardTitle>
          <CardDescription>
            Generate SEO-optimized blog posts about calculators using AI. Perfect for content marketing and organic traffic growth.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="topic">Blog Topic *</Label>
            <Input
              id="topic"
              placeholder="e.g., Complete Guide to BMI Calculator and Health Metrics"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} disabled={isGenerating}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Health">Health & Fitness</SelectItem>
                <SelectItem value="Math">Math & Science</SelectItem>
                <SelectItem value="Conversion">Conversions</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="keywords">Target Keywords (comma-separated)</Label>
            <Textarea
              id="keywords"
              placeholder="e.g., BMI calculator, body mass index, health metrics, fitness tracking"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              disabled={isGenerating}
              rows={3}
            />
          </div>

          <Button 
            onClick={generateBlogPost} 
            disabled={isGenerating || !topic.trim()}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Blog Post...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Blog Post
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedPost && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{generatedPost.title}</CardTitle>
                <CardDescription className="mt-2">
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-sm mr-2">
                    {category}
                  </span>
                  <span className="text-sm text-muted-foreground">{generatedPost.readTime}</span>
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">SEO Details</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Slug:</span> {generatedPost.slug}</p>
                <p><span className="font-medium">SEO Title:</span> {generatedPost.seoTitle}</p>
                <p><span className="font-medium">Meta Description:</span> {generatedPost.seoDescription}</p>
                <p><span className="font-medium">Keywords:</span> {generatedPost.keywords.join(', ')}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Content Preview</h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-muted-foreground">{generatedPost.content.introduction}</p>
                
                <div className="mt-4 space-y-3">
                  {generatedPost.content.sections.slice(0, 2).map((section, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-primary">{section.heading}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-3">{section.content}</p>
                    </div>
                  ))}
                  {generatedPost.content.sections.length > 2 && (
                    <p className="text-sm text-muted-foreground italic">
                      + {generatedPost.content.sections.length - 2} more sections...
                    </p>
                  )}
                </div>

                <p className="mt-4 text-muted-foreground">{generatedPost.content.conclusion}</p>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Copy the generated content and add it to your blog data file (src/data/blogPosts.ts) to publish it on your site.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
