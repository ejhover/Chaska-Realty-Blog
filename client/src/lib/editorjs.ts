import type { OutputData } from "@editorjs/editorjs";

export type EditorJsOutput = OutputData;

export function isEditorJsOutput(value: unknown): value is OutputData {
  if (!value || typeof value !== "object") return false;
  const asAny = value as any;
  return Array.isArray(asAny.blocks);
}

export function coerceToEditorJsOutput(content: unknown): OutputData {
  if (isEditorJsOutput(content)) return content;

  if (typeof content === "string") {
    const lines = content
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    return {
      time: Date.now(),
      version: "2.0.0",
      blocks: lines.length
        ? lines.map((text) => ({ type: "paragraph", data: { text } }))
        : [{ type: "paragraph", data: { text: "" } }],
    } as OutputData;
  }

  return {
    time: Date.now(),
    version: "2.0.0",
    blocks: [{ type: "paragraph", data: { text: "" } }],
  } as OutputData;
}

export function stripHtmlToText(html: string): string {
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, "");
  }
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").trim();
}

export function extractPlainTextFromEditorJs(data: OutputData): string {
  const pieces: string[] = [];
  for (const block of data.blocks || []) {
    if (block?.type === "paragraph" || block?.type === "header") {
      const text = typeof (block as any)?.data?.text === "string" ? (block as any).data.text : "";
      if (text) pieces.push(stripHtmlToText(text));
    }
  }
  return pieces.join(" ");
}
