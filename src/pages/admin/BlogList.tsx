import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/hooks/useUserRole";

interface Post {
  id: string;
  slug: string;
  title: string;
  status: string;
  published_at: string | null;
  updated_at: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useUserRole();

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, status, published_at, updated_at")
      .order("updated_at", { ascending: false });
    if (error) toast({ title: "Load error", description: error.message, variant: "destructive" });
    setPosts((data as Post[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    const slug = `post-${Date.now()}`;
    const { data, error } = await supabase
      .from("blog_posts")
      .insert({ slug, title: "Untitled post", content_html: "" })
      .select("id")
      .single();
    if (error || !data) {
      toast({ title: "Create failed", description: error?.message, variant: "destructive" });
      return;
    }
    navigate(`/admin/cms/blogs/${data.id}`);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    else load();
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase()) || p.slug.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Blog Posts</h1>
            <p className="text-sm text-muted-foreground">{posts.length} total</p>
          </div>
          <Button onClick={create}><Plus className="h-4 w-4" /> New post</Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="pl-9" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Loading...
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((p) => (
              <Card key={p.id} className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/cms/blogs/${p.id}`} className="font-medium hover:underline truncate">
                      {p.title}
                    </Link>
                    <Badge variant={p.status === "published" ? "default" : "secondary"}>{p.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">/{p.slug} · updated {new Date(p.updated_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/cms/blogs/${p.id}`)}><Pencil className="h-4 w-4" /></Button>
                  {isAdmin && (
                    <Button variant="ghost" size="sm" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4" /></Button>
                  )}
                </div>
              </Card>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-10">No posts yet. Create your first post.</p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BlogList;
