import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Returns DB-backed text for a page block, falling back to the provided
 * default if no override exists. Safe to use anywhere — empty DB = unchanged site.
 */
export const useEditableText = (pageKey: string, blockKey: string, fallback: string) => {
  const [text, setText] = useState(fallback);
  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase
        .from("page_content")
        .select("value_text, value_html")
        .eq("page_key", pageKey)
        .eq("block_key", blockKey)
        .maybeSingle();
      if (!alive) return;
      const v = (data?.value_text ?? data?.value_html ?? "").trim();
      if (v) setText(v);
    })();
    return () => { alive = false; };
  }, [pageKey, blockKey]);
  return text;
};
