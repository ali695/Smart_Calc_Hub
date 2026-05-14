import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search, Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/hooks/useUserRole";
import { calculatorsList as codeCalcs } from "@/data/calculators";

interface Row {
  id: string;
  slug: string;
  name: string;
  status: string;
  is_custom: boolean;
  category: string | null;
  updated_at: string;
}

const CalculatorList = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useUserRole();

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("calculators_cms")
      .select("id, slug, name, status, is_custom, category, updated_at")
      .order("updated_at", { ascending: false });
    if (error) toast({ title: "Load error", description: error.message, variant: "destructive" });
    setRows((data as Row[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createCustom = async () => {
    const slug = `custom-${Date.now()}`;
    const { data, error } = await supabase
      .from("calculators_cms")
      .insert({
        slug,
        name: "New Custom Calculator",
        is_custom: true,
        category: "math",
        definition: { inputs: [{ key: "a", label: "A", type: "number", default: 0 }], outputs: [{ key: "result", label: "Result", formula: "a", format: "number" }] },
      })
      .select("id")
      .single();
    if (error || !data) {
      toast({ title: "Create failed", description: error?.message, variant: "destructive" });
      return;
    }
    navigate(`/admin/cms/calculators/${data.id}`);
  };

  const seedExisting = async (slug: string) => {
    const calc = codeCalcs?.find?.((c: any) => c.slug === slug);
    if (!calc) return;
    const { data, error } = await supabase
      .from("calculators_cms")
      .insert({
        slug: calc.slug,
        name: calc.title,
        description: calc.description,
        category: calc.category,
        icon: (calc as any).icon ?? null,
        keywords: (calc as any).keywords ?? [],
        is_custom: false,
        status: "published",
      })
      .select("id")
      .single();
    if (error || !data) {
      toast({ title: "Add failed", description: error?.message, variant: "destructive" });
      return;
    }
    navigate(`/admin/cms/calculators/${data.id}`);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this calculator?")) return;
    const { error } = await supabase.from("calculators_cms").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    else load();
  };

  const filtered = rows.filter((r) =>
    r.name.toLowerCase().includes(q.toLowerCase()) || r.slug.toLowerCase().includes(q.toLowerCase())
  );

  // Code calculators not yet imported
  const importedSlugs = new Set(rows.map((r) => r.slug));
  const importable = (codeCalcs ?? []).filter((c: any) => !importedSlugs.has(c.slug)).slice(0, 50);

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Calculators</h1>
            <p className="text-sm text-muted-foreground">{rows.length} managed in CMS</p>
          </div>
          <Button onClick={createCustom}><Plus className="h-4 w-4" /> New custom calculator</Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="pl-9" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : (
          <div className="space-y-2">
            {filtered.map((r) => (
              <Card key={r.id} className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link to={`/admin/cms/calculators/${r.id}`} className="font-medium hover:underline truncate">
                      {r.name}
                    </Link>
                    <Badge variant={r.status === "published" ? "default" : "secondary"}>{r.status}</Badge>
                    {r.is_custom && <Badge variant="outline">custom</Badge>}
                    {r.category && <Badge variant="outline">{r.category}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">/calculator/{r.slug}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => window.open(`/calculator/${r.slug}`, "_blank")}><ExternalLink className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/cms/calculators/${r.id}`)}><Pencil className="h-4 w-4" /></Button>
                  {isAdmin && <Button variant="ghost" size="sm" onClick={() => remove(r.id)}><Trash2 className="h-4 w-4" /></Button>}
                </div>
              </Card>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-6">No CMS calculators yet.</p>
            )}
          </div>
        )}

        {importable.length > 0 && (
          <Card className="p-4 mt-6">
            <h2 className="font-semibold mb-2">Import existing code calculators</h2>
            <p className="text-xs text-muted-foreground mb-3">Add an existing calculator to the CMS so you can override its SEO and content.</p>
            <div className="flex flex-wrap gap-2">
              {importable.map((c: any) => (
                <Button key={c.slug} variant="outline" size="sm" onClick={() => seedExisting(c.slug)}>
                  + {c.title || c.slug}
                </Button>
              ))}
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default CalculatorList;
