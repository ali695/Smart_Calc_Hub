import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DynamicCalculator, Definition } from "@/components/DynamicCalculator";
import { RichTextRender } from "@/components/admin/RichTextRender";
import { SEOHead } from "@/components/SEOHead";
import { Loader2 } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";



interface Row {
  slug: string;
  name: string;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_content_html: string | null;
  is_custom: boolean;
  definition: Definition | null;
  status: string;
}

const CustomCalculatorPage = () => {
  const { slug } = useParams();
  const [row, setRow] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase
        .from("calculators_cms")
        .select("slug, name, description, seo_title, seo_description, seo_content_html, is_custom, definition, status")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      setRow((data as any) ?? null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return <div className="container mx-auto py-20 flex justify-center"><Loader2 className="h-5 w-5 animate-spin" /></div>;
  }

  if (!row) return <Navigate to="/404" replace />;

  return (
    <>
      <SEOHead
        title={row.seo_title || `${row.name} | SmartCalc Hub`}
        description={row.seo_description || row.description || ""}
        canonicalUrl={`https://smartcalhub.online/calculator/${row.slug}`}
      />
      <div className="container mx-auto px-4 py-6 space-y-4">
        <Breadcrumbs />

        <h1 className="text-2xl md:text-3xl font-bold">{row.name}</h1>
        {row.description && <p className="text-muted-foreground">{row.description}</p>}

        {row.is_custom && row.definition ? (
          <DynamicCalculator definition={row.definition} name={row.name} />
        ) : (
          <p className="text-muted-foreground">This calculator's interactive UI is provided in code.</p>
        )}

        {row.seo_content_html && (
          <div className="mt-8">
            <RichTextRender html={row.seo_content_html} />
          </div>
        )}
      </div>
    </>
  );
};

export default CustomCalculatorPage;
