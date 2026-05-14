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
import { Loader2, Save, ArrowLeft, Plus, Trash2, Eye } from "lucide-react";
import { DynamicCalculator } from "@/components/DynamicCalculator";

interface InputDef {
  key: string;
  label: string;
  type: "number" | "select";
  default?: number | string;
  unit?: string;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
}
interface OutputDef {
  key: string;
  label: string;
  formula: string;
  format?: "number" | "currency" | "percent" | "integer";
}
interface Definition { inputs: InputDef[]; outputs: OutputDef[]; }

interface CalcRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string | null;
  icon: string | null;
  keywords: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_content_html: string | null;
  is_custom: boolean;
  definition: Definition | null;
  status: string;
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

const CalculatorEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [row, setRow] = useState<CalcRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error } = await supabase
        .from("calculators_cms").select("*").eq("id", id).maybeSingle();
      if (error || !data) {
        toast({ title: "Not found", variant: "destructive" });
        navigate("/admin/cms/calculators");
        return;
      }
      setRow(data as any);
      setLoading(false);
    })();
  }, [id]);

  const set = <K extends keyof CalcRow>(k: K, v: CalcRow[K]) =>
    setRow((r) => (r ? { ...r, [k]: v } : r));

  const setDef = (d: Definition) => set("definition", d);

  const save = async (publish = false) => {
    if (!row) return;
    setSaving(true);
    const payload: any = {
      slug: row.slug,
      name: row.name,
      description: row.description,
      category: row.category,
      keywords: row.keywords,
      seo_title: row.seo_title,
      seo_description: row.seo_description,
      seo_content_html: row.seo_content_html,
      is_custom: row.is_custom,
      definition: row.is_custom ? row.definition : null,
      status: publish ? "published" : row.status,
    };
    const { error } = await supabase.from("calculators_cms").update(payload).eq("id", row.id);
    setSaving(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else toast({ title: publish ? "Published!" : "Saved" });
    if (publish) set("status", "published");
  };

  if (loading || !row) {
    return <AdminLayout><div className="flex items-center justify-center py-20"><Loader2 className="h-5 w-5 animate-spin" /></div></AdminLayout>;
  }

  const def: Definition = row.definition ?? { inputs: [], outputs: [] };

  const addInput = () => setDef({ ...def, inputs: [...def.inputs, { key: `input${def.inputs.length + 1}`, label: "Input", type: "number", default: 0 }] });
  const updInput = (i: number, patch: Partial<InputDef>) => setDef({ ...def, inputs: def.inputs.map((x, idx) => idx === i ? { ...x, ...patch } : x) });
  const delInput = (i: number) => setDef({ ...def, inputs: def.inputs.filter((_, idx) => idx !== i) });

  const addOutput = () => setDef({ ...def, outputs: [...def.outputs, { key: `out${def.outputs.length + 1}`, label: "Output", formula: "0", format: "number" }] });
  const updOutput = (i: number, patch: Partial<OutputDef>) => setDef({ ...def, outputs: def.outputs.map((x, idx) => idx === i ? { ...x, ...patch } : x) });
  const delOutput = (i: number) => setDef({ ...def, outputs: def.outputs.filter((_, idx) => idx !== i) });

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/cms/calculators")}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div className="flex gap-2">
            {row.status === "published" && (
              <Button variant="outline" size="sm" onClick={() => window.open(`/calculator/${row.slug}`, "_blank")}>
                <Eye className="h-4 w-4" /> View
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving}>Save draft</Button>
            <Button size="sm" onClick={() => save(true)} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Publish
            </Button>
          </div>
        </div>

        <Card className="p-4 space-y-4">
          <h2 className="font-semibold">Basic info</h2>
          <div className="space-y-1">
            <Label>Name</Label>
            <Input value={row.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Slug (URL)</Label>
              <Input value={row.slug} onChange={(e) => set("slug", slugify(e.target.value))} />
              <p className="text-xs text-muted-foreground">/calculator/{row.slug}</p>
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <Input value={row.category ?? ""} onChange={(e) => set("category", e.target.value)} placeholder="e.g. finance" />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Short description</Label>
            <Textarea value={row.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={2} />
          </div>
          <div className="space-y-1">
            <Label>Keywords (comma separated)</Label>
            <Input
              value={(row.keywords ?? []).join(", ")}
              onChange={(e) => set("keywords", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
            />
          </div>
        </Card>

        {row.is_custom && (
          <>
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Inputs</h2>
                <Button size="sm" variant="outline" onClick={addInput}><Plus className="h-4 w-4" /> Add input</Button>
              </div>
              {def.inputs.map((inp, i) => (
                <div key={i} className="border rounded-md p-3 grid sm:grid-cols-6 gap-2 items-end">
                  <div className="space-y-1">
                    <Label className="text-xs">Key</Label>
                    <Input value={inp.key} onChange={(e) => updInput(i, { key: e.target.value.replace(/[^a-zA-Z0-9_]/g, "") })} />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label className="text-xs">Label</Label>
                    <Input value={inp.label} onChange={(e) => updInput(i, { label: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Type</Label>
                    <select value={inp.type} onChange={(e) => updInput(i, { type: e.target.value as any })} className="w-full h-10 rounded-md border bg-background px-2 text-sm">
                      <option value="number">number</option>
                      <option value="select">select</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Default</Label>
                    <Input value={String(inp.default ?? "")} onChange={(e) => updInput(i, { default: inp.type === "number" ? Number(e.target.value) : e.target.value })} />
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => delInput(i)}><Trash2 className="h-4 w-4" /></Button>
                  {inp.type === "select" && (
                    <div className="sm:col-span-6 space-y-1">
                      <Label className="text-xs">Options (value:label, comma separated)</Label>
                      <Input
                        value={(inp.options ?? []).map((o) => `${o.value}:${o.label}`).join(", ")}
                        onChange={(e) => updInput(i, {
                          options: e.target.value.split(",").map((s) => s.trim()).filter(Boolean).map((s) => {
                            const [v, l] = s.split(":");
                            return { value: v, label: l ?? v };
                          })
                        })}
                      />
                    </div>
                  )}
                </div>
              ))}
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Outputs (formulas)</h2>
                <Button size="sm" variant="outline" onClick={addOutput}><Plus className="h-4 w-4" /> Add output</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use input keys directly. Functions: + - * / ^ sqrt() log() sin() cos() abs() min() max(). Example: <code>principal * (rate/1200) / (1 - (1 + rate/1200)^(-years*12))</code>
              </p>
              {def.outputs.map((out, i) => (
                <div key={i} className="border rounded-md p-3 grid sm:grid-cols-6 gap-2 items-end">
                  <div className="space-y-1">
                    <Label className="text-xs">Key</Label>
                    <Input value={out.key} onChange={(e) => updOutput(i, { key: e.target.value })} />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label className="text-xs">Label</Label>
                    <Input value={out.label} onChange={(e) => updOutput(i, { label: e.target.value })} />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label className="text-xs">Formula</Label>
                    <Input value={out.formula} onChange={(e) => updOutput(i, { formula: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Format</Label>
                    <select value={out.format ?? "number"} onChange={(e) => updOutput(i, { format: e.target.value as any })} className="w-full h-10 rounded-md border bg-background px-2 text-sm">
                      <option value="number">number</option>
                      <option value="currency">currency</option>
                      <option value="percent">percent</option>
                      <option value="integer">integer</option>
                    </select>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => delOutput(i)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </Card>

            <Card className="p-4">
              <h2 className="font-semibold mb-2">Live preview</h2>
              <DynamicCalculator definition={def} name={row.name} />
            </Card>
          </>
        )}

        <Card className="p-4 space-y-4">
          <h2 className="font-semibold">SEO content</h2>
          <div className="space-y-1">
            <Label>SEO title</Label>
            <Input value={row.seo_title ?? ""} onChange={(e) => set("seo_title", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>SEO description</Label>
            <Textarea value={row.seo_description ?? ""} onChange={(e) => set("seo_description", e.target.value)} rows={2} />
          </div>
          <div className="space-y-1">
            <Label>SEO content (rendered below the calculator)</Label>
            <RichTextEditor value={row.seo_content_html ?? ""} onChange={(html) => set("seo_content_html", html)} />
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CalculatorEditor;
