import DOMPurify from "dompurify";

interface Props {
  html: string;
  className?: string;
}

export const RichTextRender = ({ html, className }: Props) => {
  const clean = typeof window !== "undefined" ? DOMPurify.sanitize(html || "") : (html || "");
  return (
    <div
      className={className ?? "prose prose-sm md:prose-base dark:prose-invert max-w-none"}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
};
