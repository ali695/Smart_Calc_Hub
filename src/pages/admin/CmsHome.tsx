import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileEdit, Calculator } from "lucide-react";

interface Counts {
  blogs: number;
  calculators: number;
  pages: number;
}

const CmsHome = () => {
  const [counts, setCounts] = useState<Counts>({ blogs: 0, calculators: 0, pages: 0 });

  useEffect(() => {
    (async () => {
      const [b, c, p] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("calculators_cms").select("id", { count: "exact", head: true }),
        supabase.from("page_content").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        blogs: b.count ?? 0,
        calculators: c.count ?? 0,
        pages: p.count ?? 0,
      });
    })();
  }, []);

  const items = [
    { to: "/admin/cms/blogs", label: "Blog Posts", count: counts.blogs, icon: FileText, desc: "Create and edit blog articles with a rich-text editor." },
    { to: "/admin/cms/pages", label: "Page Content", count: counts.pages, icon: FileEdit, desc: "Edit headings and copy on Home, About, Contact, FAQ, Privacy, Terms." },
    { to: "/admin/cms/calculators", label: "Calculators", count: counts.calculators, icon: Calculator, desc: "Override SEO content or build new custom calculators." },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">CMS Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Manage your site content. Changes go live instantly.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <Link key={it.to} to={it.to}>
                <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-medium">{it.label}</CardTitle>
                    <Icon className="h-5 w-5 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{it.count}</div>
                    <p className="text-xs text-muted-foreground mt-2">{it.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CmsHome;
