import type { ElementType, ReactNode } from "react";
import type { EditorJsOutput } from "@/lib/editorjs";

function safeInlineNodes(html: string): ReactNode {
  if (typeof window === "undefined") return html;

  const doc = new DOMParser().parseFromString(html || "", "text/html");
  const allowedTags = new Set(["B", "STRONG", "I", "EM", "U", "S", "BR", "A", "CODE", "MARK"]);

  const toNode = (node: ChildNode, key: string): ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;

    if (node.nodeType !== Node.ELEMENT_NODE) return null;
    const el = node as HTMLElement;

    if (!allowedTags.has(el.tagName)) {
      return Array.from(el.childNodes).map((child, idx) => toNode(child, `${key}-${idx}`));
    }

    if (el.tagName === "BR") return <br key={key} />;

    const children = Array.from(el.childNodes).map((child, idx) => toNode(child, `${key}-${idx}`));

    if (el.tagName === "A") {
      const href = el.getAttribute("href") || "";
      const safeHref = href.startsWith("http://") || href.startsWith("https://") ? href : "";
      return (
        <a
          key={key}
          href={safeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2"
        >
          {children}
        </a>
      );
    }

    const Tag = el.tagName.toLowerCase() as ElementType;
    return <Tag key={key}>{children}</Tag>;
  };

  return Array.from(doc.body.childNodes).map((child, idx) => toNode(child, `n-${idx}`));
}

export function EditorJsRenderer({ data }: { data: EditorJsOutput }) {
  return (
    <div className="space-y-5">
      {(data.blocks || []).map((block, idx) => {
        if (!block) return null;

        if (block.type === "paragraph") {
          const text = typeof (block as any).data?.text === "string" ? (block as any).data.text : "";
          return (
            <p key={idx} className="leading-relaxed text-foreground/90">
              {safeInlineNodes(text)}
            </p>
          );
        }

        if (block.type === "header") {
          const text = typeof (block as any).data?.text === "string" ? (block as any).data.text : "";
          const level = Number((block as any).data?.level || 2);

          const className =
            level === 2
              ? "font-display text-2xl font-semibold mt-8"
              : level === 3
                ? "font-display text-xl font-semibold mt-7"
                : "font-display text-lg font-semibold mt-6";

          if (level === 3) return <h3 key={idx} className={className}>{safeInlineNodes(text)}</h3>;
          if (level === 4) return <h4 key={idx} className={className}>{safeInlineNodes(text)}</h4>;
          return <h2 key={idx} className={className}>{safeInlineNodes(text)}</h2>;
        }

        if (block.type === "image") {
          const url = (block as any).data?.file?.url as string | undefined;
          const caption = (block as any).data?.caption as string | undefined;
          if (!url) return null;
          return (
            <figure key={idx} className="my-6">
              <img src={url} alt={caption || ""} className="w-full rounded-xl border" loading="lazy" />
              {caption ? <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption> : null}
            </figure>
          );
        }

        // Unknown / future block types
        return null;
      })}
    </div>
  );
}
