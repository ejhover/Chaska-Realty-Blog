import type { JSONContent } from "@tiptap/react";
import { isEditorJsOutput, coerceToEditorJsOutput, stripHtmlToText } from "@/lib/editorjs";

export type TiptapDoc = JSONContent;

export type RichContent =
  | { kind: "tiptap"; version: 1; doc: TiptapDoc }
  | { kind: "editorjs"; version: 1; doc: any };

export function isTiptapWrapper(value: unknown): value is { kind: "tiptap"; version: 1; doc: TiptapDoc } {
  if (!value || typeof value !== "object") return false;
  const asAny = value as any;
  return asAny.kind === "tiptap" && asAny.version === 1 && asAny.doc && typeof asAny.doc === "object";
}

export function isEditorJsWrapper(value: unknown): value is { kind: "editorjs"; version: 1; doc: any } {
  if (!value || typeof value !== "object") return false;
  const asAny = value as any;
  return asAny.kind === "editorjs" && asAny.version === 1 && asAny.doc && typeof asAny.doc === "object";
}

function tryParseJsonString(raw: string): unknown {
  const trimmed = raw.trim();
  if (!trimmed) return raw;

  const parseOnce = (s: string): unknown => {
    try {
      return JSON.parse(s);
    } catch {
      return null;
    }
  };

  const first = trimmed.startsWith("{") || trimmed.startsWith("[") || trimmed.startsWith('"') ? parseOnce(trimmed) : null;
  if (!first) return raw;

  return typeof first === "string" ? parseOnce(first) ?? raw : first;
}

export function coerceToRichContent(content: unknown): RichContent {
  if (typeof content === "string") {
    const parsed = tryParseJsonString(content);
    return coerceToRichContent(parsed);
  }

  if (isTiptapWrapper(content)) return content;

  // If it's raw tiptap doc, wrap it.
  if (content && typeof content === "object" && (content as any).type === "doc") {
    return { kind: "tiptap", version: 1, doc: content as TiptapDoc };
  }

  // Back-compat: existing editorjs output or wrapper
  if (isEditorJsWrapper(content)) return content;
  if (isEditorJsOutput(content)) return { kind: "editorjs", version: 1, doc: content };

  // Back-compat: legacy plain string
  const text = typeof content === "string" ? content : "";
  return {
    kind: "tiptap",
    version: 1,
    doc: {
      type: "doc",
      content: [{ type: "paragraph", content: text ? [{ type: "text", text }] : [] }],
    },
  };
}

export function extractPlainTextFromRichContent(content: unknown): string {
  const rich = coerceToRichContent(content);

  if (rich.kind === "tiptap") {
    const walk = (node: any, out: string[]) => {
      if (!node) return;
      if (node.type === "text") {
        const t = typeof node.text === "string" ? node.text : "";
        if (t) out.push(t);
        return;
      }
      if (Array.isArray(node.content)) {
        for (const child of node.content) walk(child, out);
      }
    };
    const parts: string[] = [];
    walk(rich.doc, parts);
    return parts.join(" ").replace(/\s+/g, " ").trim();
  }

  // Editor.js: reuse existing helper by coercing/sanitizing
  const data = coerceToEditorJsOutput(rich.doc);
  const pieces: string[] = [];
  for (const block of data.blocks || []) {
    if (block?.type === "paragraph" || block?.type === "header") {
      const text = typeof (block as any)?.data?.text === "string" ? (block as any).data.text : "";
      if (text) pieces.push(stripHtmlToText(text));
    }
  }
  return pieces.join(" ").trim();
}
