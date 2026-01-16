import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import { useEffect, useMemo, useRef } from "react";
import type { EditorJsOutput } from "@/lib/editorjs";
import { coerceToEditorJsOutput } from "@/lib/editorjs";
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
  onUploadStateChange,
}: {
  initialData: EditorJsOutput;
  onChange: (data: EditorJsOutput) => void;
  onUploadStateChange?: (uploading: boolean) => void;
}) {
  const holderId = useMemo(() => `editorjs-${safeUuid()}`, []);
  const editorRef = useRef<EditorJS | null>(null);
  const changeTimerRef = useRef<number | null>(null);
  const uploadsInFlightRef = useRef(0);
  const uploadStateRef = useRef(false);
  const mountedRef = useRef(true);

  const sanitizedInitialData = useMemo(() => coerceToEditorJsOutput(initialData), [initialData]);

  const scheduleSave = (delayMs: number) => {
    if (!mountedRef.current) return;
    if (changeTimerRef.current) window.clearTimeout(changeTimerRef.current);
    changeTimerRef.current = window.setTimeout(async () => {
      if (!mountedRef.current) return;
      if (uploadsInFlightRef.current > 0) return;

      const editor = editorRef.current;
      if (!editor) return;

      try {
        const data = await editor.save();
        onChange(coerceToEditorJsOutput(data as EditorJsOutput));
      } catch {
        // ignore: transient editor states can throw during rapid changes
      }
    }, delayMs);
  };

  const setUploading = (uploading: boolean) => {
    if (!mountedRef.current) return;
    if (uploadStateRef.current === uploading) return;
    uploadStateRef.current = uploading;
    onUploadStateChange?.(uploading);

    // If an upload starts, cancel any pending save.
    // If an upload finishes, immediately save once to capture the final url.
    if (uploading) {
      if (changeTimerRef.current) window.clearTimeout(changeTimerRef.current);
      changeTimerRef.current = null;
    } else {
      scheduleSave(0);
    }
  };

  useEffect(() => {
    if (editorRef.current) return;
    mountedRef.current = true;

    const editor = new EditorJS({
      holder: holderId,
      autofocus: true,
      data: sanitizedInitialData,
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
                uploadsInFlightRef.current += 1;
                setUploading(true);
                try {
                  const url = await uploadImageToSupabase(file);
                  return { success: 1, file: { url } };
                } catch (e: any) {
                  const message = e?.message || "Supabase upload failed";
                  console.error("Editor.js image upload failed:", e);
                  return { success: 0, message };
                } finally {
                  uploadsInFlightRef.current = Math.max(0, uploadsInFlightRef.current - 1);
                  setUploading(uploadsInFlightRef.current > 0);
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
        scheduleSave(350);
      },
    });

    editorRef.current = editor;

    return () => {
      mountedRef.current = false;
      if (changeTimerRef.current) window.clearTimeout(changeTimerRef.current);
      changeTimerRef.current = null;
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [holderId, sanitizedInitialData, onChange, onUploadStateChange]);

  return <div id={holderId} className="min-h-[260px] rounded-lg border bg-input px-3 py-2" />;
}
