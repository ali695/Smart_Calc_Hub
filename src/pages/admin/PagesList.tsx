import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export const PAGES = [
  { key: "home", label: "Home", blocks: ["hero_title", "hero_subtitle", "hero_cta"] },
  { key: "about", label: "About", blocks: ["heading", "intro_html", "mission_html"] },
  { key: "contact", label: "Contact", blocks: ["heading", "intro_html"] },
  { key: "faq", label: "FAQ", blocks: ["heading", "intro_html"] },
  { key: "privacy", label: "Privacy", blocks: ["heading", "body_html"] },
  { key: "terms", label: "Terms", blocks: ["heading", "body_html"] },
];

const PagesList = () => (
  <AdminLayout>
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Page Content</h1>
        <p className="text-sm text-muted-foreground">
          Edit text on your static pages. Empty fields fall back to the original site copy.
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {PAGES.map((p) => (
          <Link key={p.key} to={`/admin/cms/pages/${p.key}`}>
            <Card className="p-4 flex items-center justify-between hover:shadow-md transition-all hover:-translate-y-1">
              <div>
                <div className="font-medium">{p.label}</div>
                <div className="text-xs text-muted-foreground">{p.blocks.length} editable blocks</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </AdminLayout>
);

export default PagesList;
