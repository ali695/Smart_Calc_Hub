import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * DB-backed HTML for a page block, with sane fallback. Empty DB = unchanged site.
 * Returns the HTML string ready for RichTextRender.
 */
export const useEditableHtml = (pageKey: string, blockKey: string, fallback: string) => {
  const [html, setHtml] = useState(fallback);
  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase
        .from("page_content")
        .select("value_html, value_text")
        .eq("page_key", pageKey)
        .eq("block_key", blockKey)
        .maybeSingle();
      if (!alive) return;
      const v = (data?.value_html ?? data?.value_text ?? "").trim();
      if (v) setHtml(v);
    })();
    return () => { alive = false; };
  }, [pageKey, blockKey]);
  return html;
};
