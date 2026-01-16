import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const DEFAULT_BUCKET = import.meta.env.VITE_SUPABASE_BLOG_IMAGES_BUCKET || "blog-images";

function safeUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function uploadImageToSupabase(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const filename = `${Date.now()}-${safeUuid()}.${ext}`;
  const path = `tiptap/${filename}`;

  const { error } = await supabase.storage.from(DEFAULT_BUCKET).upload(path, file, {
    contentType: file.type || "application/octet-stream",
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(DEFAULT_BUCKET).getPublicUrl(path);
  const publicUrl = data?.publicUrl;
  if (!publicUrl) throw new Error("Failed to generate a public URL for uploaded image");
  return publicUrl;
}

function ToolbarButton({
  active,
  disabled,
  label,
  onClick,
}: {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={
        "rounded-md border px-2 py-1 text-sm transition-colors " +
        (active
          ? "bg-primary text-primary-foreground"
          : "bg-background hover:bg-secondary") +
        (disabled ? " opacity-50" : "")
      }
    >
      {label}
    </button>
  );
}

export function TiptapEditor({
  initialDoc,
  onChange,
  onUploadStateChange,
}: {
  initialDoc: JSONContent;
  onChange: (doc: JSONContent) => void;
  onUploadStateChange?: (uploading: boolean) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const setUploadingSafe = (value: boolean) => {
    setUploading(value);
    onUploadStateChange?.(value);
  };

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
          class: "text-primary underline underline-offset-2",
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      Placeholder.configure({
        placeholder: "Write your post…",
      }),
    ],
    [],
  );

  const editor = useEditor({
    extensions,
    content: initialDoc,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[320px] px-3 py-2",
      },
      handlePaste: (view, event) => {
        const dt = event.clipboardData;
        if (!dt) return false;
        const files = Array.from(dt.files || []);
        const image = files.find((f) => f.type.startsWith("image/"));
        if (!image) return false;

        event.preventDefault();
        (async () => {
          try {
            setUploadingSafe(true);
            const url = await uploadImageToSupabase(image);
            editor?.chain().focus().setImage({ src: url }).run();
          } catch (e) {
            console.error("Image paste upload failed", e);
          } finally {
            setUploadingSafe(false);
          }
        })();

        return true;
      },
      handleDrop: (view, event) => {
        const dt = event.dataTransfer;
        if (!dt) return false;
        const files = Array.from(dt.files || []);
        const image = files.find((f) => f.type.startsWith("image/"));
        if (!image) return false;

        event.preventDefault();
        (async () => {
          try {
            setUploadingSafe(true);
            const url = await uploadImageToSupabase(image);
            editor?.chain().focus().setImage({ src: url }).run();
          } catch (e) {
            console.error("Image drop upload failed", e);
          } finally {
            setUploadingSafe(false);
          }
        })();

        return true;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  // If initial doc changes (edit mode load), update the editor content once.
  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(initialDoc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const canUse = !!editor && !uploading;

  const insertImage = async (file: File) => {
    try {
      setUploadingSafe(true);
      const url = await uploadImageToSupabase(file);
      editor?.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (e) {
      console.error("Image upload failed", e);
    } finally {
      setUploadingSafe(false);
    }
  };

  return (
    <div className="rounded-xl border bg-background">
      <div className="flex flex-wrap items-center gap-2 border-b bg-secondary/20 px-3 py-2">
        <ToolbarButton
          label="B"
          active={editor?.isActive("bold")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="I"
          active={editor?.isActive("italic")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="U"
          active={editor?.isActive("underline")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          label="H2"
          active={editor?.isActive("heading", { level: 2 })}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="H3"
          active={editor?.isActive("heading", { level: 3 })}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <ToolbarButton
          label="• List"
          active={editor?.isActive("bulletList")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="1. List"
          active={editor?.isActive("orderedList")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Quote"
          active={editor?.isActive("blockquote")}
          disabled={!canUse}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          label="Link"
          disabled={!canUse}
          onClick={() => {
            const prev = editor?.getAttributes("link").href as string | undefined;
            const url = window.prompt("Link URL", prev || "https://");
            if (!url) return;
            editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
        />
        <ToolbarButton
          label="Unlink"
          disabled={!canUse}
          onClick={() => editor?.chain().focus().unsetLink().run()}
        />

        <div className="ml-auto flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              insertImage(file);
              e.currentTarget.value = "";
            }}
          />
          <button
            type="button"
            disabled={!editor || uploading}
            onClick={() => fileInputRef.current?.click()}
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "Insert image"}
          </button>
        </div>
      </div>

      <div className="bg-background">
        <EditorContent editor={editor} />
      </div>

      <div className="border-t px-3 py-2 text-xs text-muted-foreground">
        Tip: paste or drag & drop images directly into the editor.
      </div>
    </div>
  );
}
