import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RichTextRender } from "@/components/admin/RichTextRender";
import { Loader2 } from "lucide-react";
import BlogPost from "./BlogPost";

interface DbPost {
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  cover_image: string | null;
  tags: string[] | null;
  category: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
}

const BlogPostRouter = () => {
  const { slug } = useParams<{ slug: string }>();
  const [state, setState] = useState<{ loading: boolean; post: DbPost | null }>({ loading: true, post: null });

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("slug, title, excerpt, content_html, cover_image, tags, category, seo_title, seo_description, published_at")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      setState({ loading: false, post: (data as any) ?? null });
    })();
  }, [slug]);

  if (state.loading) {
    return (
      <div className="container mx-auto py-20 flex justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Fall back to legacy static post if no DB match
  if (!state.post) return <BlogPost />;

  const p = state.post;
  return (
    <>
      <SEOHead
        title={p.seo_title || `${p.title} | SmartCalc Hub`}
        description={p.seo_description || p.excerpt || ""}
        canonicalUrl={`https://smartcalhub.online/blog/${p.slug}`}
        ogImage={p.cover_image ?? undefined}
      />
      <article className="container mx-auto px-4 py-6 max-w-3xl space-y-6">
        <Breadcrumbs />
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{p.title}</h1>
          {p.excerpt && <p className="text-muted-foreground text-lg">{p.excerpt}</p>}
          {p.published_at && (
            <p className="text-xs text-muted-foreground">
              Published {new Date(p.published_at).toLocaleDateString()}
            </p>
          )}
        </header>
        {p.cover_image && (
          <img src={p.cover_image} alt={p.title} className="w-full rounded-lg border" />
        )}
        <RichTextRender html={p.content_html} className="prose prose-sm md:prose-base dark:prose-invert max-w-none" />
        <div className="pt-6 border-t">
          <Link to="/blog" className="text-primary hover:underline text-sm">← All posts</Link>
        </div>
      </article>
    </>
  );
};

export default BlogPostRouter;
