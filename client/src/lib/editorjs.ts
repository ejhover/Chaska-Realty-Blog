import type { OutputData } from "@editorjs/editorjs";

export type EditorJsOutput = OutputData;

export function isEditorJsOutput(value: unknown): value is OutputData {
  if (!value || typeof value !== "object") return false;
  const asAny = value as any;
  return Array.isArray(asAny.blocks);
}

function sanitizeEditorJsOutput(data: OutputData): OutputData {
  const blocks = Array.isArray((data as any).blocks) ? (data as any).blocks : [];

  const sanitizedBlocks = blocks
    .map((block: any) => {
      if (!block || typeof block !== "object") return null;
      if (typeof block.type !== "string") return null;

      if (block.type === "paragraph" || block.type === "header") {
        const text = typeof block?.data?.text === "string" ? block.data.text : "";
        const level = block.type === "header" ? Number(block?.data?.level || 2) : undefined;
        return block.type === "header"
          ? { ...block, data: { ...block.data, text, level } }
          : { ...block, data: { ...block.data, text } };
      }

      if (block.type === "image") {
        const url = block?.data?.file?.url;
        if (typeof url !== "string" || !url.trim()) return null;
        const caption = typeof block?.data?.caption === "string" ? block.data.caption : "";
        return { ...block, data: { ...block.data, file: { url }, caption } };
      }

      // Keep unknown blocks as-is (future extensibility)
      return block;
    })
    .filter(Boolean);

  return {
    ...(data as any),
    time: typeof (data as any).time === "number" ? (data as any).time : Date.now(),
    version: typeof (data as any).version === "string" ? (data as any).version : "2.0.0",
    blocks: sanitizedBlocks.length ? (sanitizedBlocks as any) : [{ type: "paragraph", data: { text: "" } }],
  } as OutputData;
}

function tryParseEditorJsJsonString(raw: string): OutputData | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const parseOnce = (value: string): unknown => {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  // Common cases:
  // 1) JSON object string: {"time":...,"blocks":...}
  // 2) Double-encoded JSON string: "{\"time\":...}"
  // 3) Non-JSON text: skip
  const first = trimmed.startsWith("{") || trimmed.startsWith("[") || trimmed.startsWith('"') ? parseOnce(trimmed) : null;
  if (!first) return null;

  const candidate = typeof first === "string" ? parseOnce(first) : first;
  if (candidate && isEditorJsOutput(candidate)) return sanitizeEditorJsOutput(candidate);

  return null;
}

export function coerceToEditorJsOutput(content: unknown): OutputData {
  if (isEditorJsOutput(content)) return sanitizeEditorJsOutput(content);

  if (typeof content === "string") {
    const parsed = tryParseEditorJsJsonString(content);
    if (parsed) return parsed;

    const lines = content
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    return sanitizeEditorJsOutput({
      time: Date.now(),
      version: "2.0.0",
      blocks: lines.length
        ? lines.map((text) => ({ type: "paragraph", data: { text } }))
        : [{ type: "paragraph", data: { text: "" } }],
    } as OutputData);
  }

  return sanitizeEditorJsOutput({
    time: Date.now(),
    version: "2.0.0",
    blocks: [{ type: "paragraph", data: { text: "" } }],
  } as OutputData);
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
