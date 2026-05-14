import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { PAGES } from "./PagesList";

interface Block { id?: string; block_key: string; value_text: string; value_html: string; }
interface FaqItem { id?: string; question: string; answer_html: string; sort_order: number; is_active: boolean; }

const PageEditor = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const page = useMemo(() => PAGES.find((p) => p.key === key), [key]);
  const [blocks, setBlocks] = useState<Record<string, Block>>({});
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!page) return;
    (async () => {
      const { data } = await supabase
        .from("page_content").select("*").eq("page_key", page.key);
      const map: Record<string, Block> = {};
      page.blocks.forEach((b) => {
        const existing = data?.find((d) => d.block_key === b);
        map[b] = {
          id: existing?.id,
          block_key: b,
          value_text: existing?.value_text ?? "",
          value_html: existing?.value_html ?? "",
        };
      });
      setBlocks(map);

      if (page.key === "faq") {
        const { data: faqData } = await supabase
          .from("faq_items").select("*").eq("page_key", "faq").order("sort_order");
        setFaqs((faqData as FaqItem[]) ?? []);
      }
      setLoading(false);
    })();
  }, [page]);

  if (!page) return <AdminLayout><p>Unknown page</p></AdminLayout>;

  const updateBlock = (k: string, patch: Partial<Block>) =>
    setBlocks((s) => ({ ...s, [k]: { ...s[k], ...patch } }));

  const isHtml = (b: string) => b.endsWith("_html");

  const save = async () => {
    setSaving(true);
    const rows = Object.values(blocks).map((b) => ({
      page_key: page.key,
      block_key: b.block_key,
      value_text: isHtml(b.block_key) ? null : b.value_text,
      value_html: isHtml(b.block_key) ? b.value_html : null,
    }));
    const { error } = await supabase
      .from("page_content")
      .upsert(rows, { onConflict: "page_key,block_key" });

    if (page.key === "faq") {
      const toUpsert = faqs.map((f, idx) => ({ ...f, page_key: "faq", sort_order: idx }));
      await supabase.from("faq_items").upsert(toUpsert as any);
    }
    setSaving(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else toast({ title: "Saved" });
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/cms/pages")}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </Button>
        </div>

        <h1 className="text-2xl font-bold">{page.label} page</h1>

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : (
          <>
            {page.blocks.map((b) => (
              <Card key={b} className="p-4 space-y-2">
                <Label className="capitalize">{b.replace(/_/g, " ")}</Label>
                {isHtml(b) ? (
                  <RichTextEditor
                    value={blocks[b]?.value_html ?? ""}
                    onChange={(html) => updateBlock(b, { value_html: html })}
                  />
                ) : (
                  <Input
                    value={blocks[b]?.value_text ?? ""}
                    onChange={(e) => updateBlock(b, { value_text: e.target.value })}
                  />
                )}
              </Card>
            ))}

            {page.key === "faq" && (
              <Card className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">FAQ items</h2>
                  <Button size="sm" variant="outline" onClick={() => setFaqs((f) => [...f, { question: "New question", answer_html: "", sort_order: f.length, is_active: true }])}>
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
                {faqs.map((f, idx) => (
                  <div key={idx} className="border rounded-md p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Input value={f.question} onChange={(e) => setFaqs((arr) => arr.map((x, i) => i === idx ? { ...x, question: e.target.value } : x))} />
                      <Button variant="ghost" size="sm" onClick={() => setFaqs((arr) => arr.filter((_, i) => i !== idx))}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                    <RichTextEditor value={f.answer_html} onChange={(html) => setFaqs((arr) => arr.map((x, i) => i === idx ? { ...x, answer_html: html } : x))} />
                  </div>
                ))}
              </Card>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default PageEditor;
