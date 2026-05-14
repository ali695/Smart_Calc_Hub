import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Eye, ArrowLeft, Upload } from "lucide-react";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  cover_image: string | null;
  tags: string[] | null;
  category: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: string;
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error } = await supabase
        .from("blog_posts").select("*").eq("id", id).maybeSingle();
      if (error || !data) {
        toast({ title: "Not found", variant: "destructive" });
        navigate("/admin/cms/blogs");
        return;
      }
      setPost(data as Post);
      setLoading(false);
    })();
  }, [id]);

  const set = <K extends keyof Post>(k: K, v: Post[K]) =>
    setPost((p) => (p ? { ...p, [k]: v } : p));

  const save = async (publish = false) => {
    if (!post) return;
    setSaving(true);
    const payload: any = {
      slug: post.slug || slugify(post.title) || `post-${Date.now()}`,
      title: post.title || "Untitled",
      excerpt: post.excerpt,
      content_html: post.content_html,
      cover_image: post.cover_image,
      tags: post.tags,
      category: post.category,
      seo_title: post.seo_title,
      seo_description: post.seo_description,
      status: publish ? "published" : post.status,
    };
    if (publish && !post.status?.includes("published")) payload.published_at = new Date().toISOString();
    const { error } = await supabase.from("blog_posts").update(payload).eq("id", post.id);
    setSaving(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else toast({ title: publish ? "Published!" : "Saved" });
    if (publish) set("status", "published");
  };

  const uploadImage = async (): Promise<string | null> => {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) { resolve(null); return; }
        const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const { data, error } = await supabase.storage.from("blog-images").upload(path, file);
        if (error || !data) {
          toast({ title: "Upload failed", description: error?.message, variant: "destructive" });
          resolve(null); return;
        }
        const { data: pub } = supabase.storage.from("blog-images").getPublicUrl(data.path);
        resolve(pub.publicUrl);
      };
      input.click();
    });
  };

  const uploadCover = async () => {
    const url = await uploadImage();
    if (url) set("cover_image", url);
  };

  if (loading || !post) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Loading...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/cms/blogs")}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div className="flex items-center gap-2">
            {post.status === "published" && (
              <Button variant="outline" size="sm" onClick={() => window.open(`/blog/${post.slug}`, "_blank")}>
                <Eye className="h-4 w-4" /> View
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving}>
              <Save className="h-4 w-4" /> Save draft
            </Button>
            <Button size="sm" onClick={() => save(true)} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Publish
            </Button>
          </div>
        </div>

        <Card className="p-4 space-y-4">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input value={post.title} onChange={(e) => set("title", e.target.value)} placeholder="Post title" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Slug</Label>
              <Input value={post.slug} onChange={(e) => set("slug", slugify(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <Input value={post.category ?? ""} onChange={(e) => set("category", e.target.value)} />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Excerpt</Label>
            <Textarea value={post.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} rows={2} />
          </div>
          <div className="space-y-1">
            <Label>Cover image URL</Label>
            <div className="flex gap-2">
              <Input value={post.cover_image ?? ""} onChange={(e) => set("cover_image", e.target.value)} placeholder="https://..." />
              <Button type="button" variant="outline" onClick={uploadCover}><Upload className="h-4 w-4" /> Upload</Button>
            </div>
            {post.cover_image && (
              <img src={post.cover_image} alt="cover" className="mt-2 h-32 rounded border object-cover" />
            )}
          </div>
          <div className="space-y-1">
            <Label>Tags (comma separated)</Label>
            <Input
              value={(post.tags ?? []).join(", ")}
              onChange={(e) => set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
            />
          </div>
        </Card>

        <Card className="p-4 space-y-2">
          <Label>Content</Label>
          <RichTextEditor
            value={post.content_html}
            onChange={(html) => set("content_html", html)}
            placeholder="Write your post..."
            onImageUpload={uploadImage}
          />
        </Card>

        <Card className="p-4 space-y-4">
          <h2 className="text-sm font-semibold">SEO</h2>
          <div className="space-y-1">
            <Label>SEO title</Label>
            <Input value={post.seo_title ?? ""} onChange={(e) => set("seo_title", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>SEO description</Label>
            <Textarea value={post.seo_description ?? ""} onChange={(e) => set("seo_description", e.target.value)} rows={2} />
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default BlogEditor;
