import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import { useEffect, useMemo, useRef } from "react";
import type { EditorJsOutput } from "@/lib/editorjs";
import { supabase } from "@/lib/supabase";

const DEFAULT_BUCKET = import.meta.env.VITE_SUPABASE_BLOG_IMAGES_BUCKET || "blog-images";

function safeUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function uploadImageToSupabase(file: File): Promise<string> {
  if (!DEFAULT_BUCKET) {
    throw new Error(
      "Missing storage bucket name. Set VITE_SUPABASE_BLOG_IMAGES_BUCKET (or keep default 'blog-images').",
    );
  }

  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const filename = `${Date.now()}-${safeUuid()}.${ext}`;
  const path = `editor/${filename}`;

  const { error } = await supabase.storage
    .from(DEFAULT_BUCKET)
    .upload(path, file, {
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

export function EditorJsEditor({
  initialData,
  onChange,
}: {
  initialData: EditorJsOutput;
  onChange: (data: EditorJsOutput) => void;
}) {
  const holderId = useMemo(() => `editorjs-${safeUuid()}`, []);
  const editorRef = useRef<EditorJS | null>(null);
  const changeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (editorRef.current) return;

    const editor = new EditorJS({
      holder: holderId,
      autofocus: true,
      data: initialData,
      tools: {
        paragraph: {
          class: Paragraph as any,
          inlineToolbar: true,
        },
        header: {
          class: Header as any,
          inlineToolbar: true,
          config: {
            levels: [2, 3, 4],
            defaultLevel: 2,
          },
        },
        image: {
          class: ImageTool as any,
          config: {
            uploader: {
              uploadByFile: async (file: File) => {
                try {
                  const url = await uploadImageToSupabase(file);
                  return { success: 1, file: { url } };
                } catch (e: any) {
                  const message = e?.message || "Supabase upload failed";
                  console.error("Editor.js image upload failed:", e);
                  return { success: 0, message };
                }
              },
              uploadByUrl: async (url: string) => {
                return { success: 1, file: { url } };
              },
            },
          },
        },
      },
      onChange: async () => {
        if (changeTimerRef.current) window.clearTimeout(changeTimerRef.current);
        changeTimerRef.current = window.setTimeout(async () => {
          try {
            const data = await editor.save();
            onChange(data as EditorJsOutput);
          } catch {
            // ignore: transient editor states can throw during rapid changes
          }
        }, 350);
      },
    });

    editorRef.current = editor;

    return () => {
      if (changeTimerRef.current) window.clearTimeout(changeTimerRef.current);
      changeTimerRef.current = null;
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [holderId, initialData, onChange]);

  return <div id={holderId} className="min-h-[260px] rounded-lg border bg-input px-3 py-2" />;
}
