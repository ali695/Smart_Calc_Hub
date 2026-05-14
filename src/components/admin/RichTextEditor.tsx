import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, List, ListOrdered, Quote, Heading2, Heading3,
  Link as LinkIcon, Image as ImageIcon, Undo, Redo, Code,
} from "lucide-react";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  onImageUpload?: () => Promise<string | null>;
}

export const RichTextEditor = ({ value, onChange, placeholder, onImageUpload }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: placeholder ?? "Start writing..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none min-h-[280px] focus:outline-none px-4 py-3",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("URL");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  const insertImage = async () => {
    let url: string | null = null;
    if (onImageUpload) url = await onImageUpload();
    else url = window.prompt("Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const btn = (active: boolean) =>
    `h-8 px-2 ${active ? "bg-accent text-accent-foreground" : ""}`;

  return (
    <div className="border rounded-md bg-background">
      <div className="flex flex-wrap gap-1 border-b p-2">
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("codeBlock"))} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("link"))} onClick={setLink}><LinkIcon className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" className="h-8 px-2" onClick={insertImage}><ImageIcon className="h-4 w-4" /></Button>
        <div className="ml-auto flex gap-1">
          <Button type="button" variant="ghost" size="sm" className="h-8 px-2" onClick={() => editor.chain().focus().undo().run()}><Undo className="h-4 w-4" /></Button>
          <Button type="button" variant="ghost" size="sm" className="h-8 px-2" onClick={() => editor.chain().focus().redo().run()}><Redo className="h-4 w-4" /></Button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
