import type { ReactNode } from "react";
import type { JSONContent } from "@tiptap/react";

function renderMarks(text: string, marks: any[] | undefined): ReactNode {
  let node: ReactNode = text;
  for (const mark of marks || []) {
    if (!mark || typeof mark.type !== "string") continue;

    if (mark.type === "bold") node = <strong>{node}</strong>;
    else if (mark.type === "italic") node = <em>{node}</em>;
    else if (mark.type === "underline") node = <u>{node}</u>;
    else if (mark.type === "code") node = <code className="rounded bg-secondary px-1 py-0.5">{node}</code>;
    else if (mark.type === "link") {
      const href = typeof mark?.attrs?.href === "string" ? mark.attrs.href : "";
      const safeHref = href.startsWith("http://") || href.startsWith("https://") ? href : "";
      node = (
        <a
          href={safeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2"
        >
          {node}
        </a>
      );
    }
  }
  return node;
}

function renderNode(node: any, key: string): ReactNode {
  if (!node || typeof node !== "object") return null;

  if (node.type === "text") {
    const text = typeof node.text === "string" ? node.text : "";
    return <span key={key}>{renderMarks(text, node.marks)}</span>;
  }

  const children = Array.isArray(node.content)
    ? node.content.map((child: any, idx: number) => renderNode(child, `${key}-${idx}`))
    : null;

  switch (node.type) {
    case "doc":
      return <>{children}</>;

    case "paragraph":
      return (
        <p key={key} className="leading-relaxed text-foreground/90">
          {children}
        </p>
      );

    case "heading": {
      const level = Number(node?.attrs?.level || 2);
      if (level === 1) return <h1 key={key} className="font-display text-3xl font-semibold mt-6">{children}</h1>;
      if (level === 3) return <h3 key={key} className="font-display text-xl font-semibold mt-6">{children}</h3>;
      return <h2 key={key} className="font-display text-2xl font-semibold mt-6">{children}</h2>;
    }

    case "bulletList":
      return <ul key={key} className="list-disc pl-6 space-y-2">{children}</ul>;

    case "orderedList":
      return <ol key={key} className="list-decimal pl-6 space-y-2">{children}</ol>;

    case "listItem":
      return <li key={key}>{children}</li>;

    case "blockquote":
      return (
        <blockquote key={key} className="border-l-4 border-border pl-4 text-foreground/80">
          {children}
        </blockquote>
      );

    case "hardBreak":
      return <br key={key} />;

    case "image": {
      const src = typeof node?.attrs?.src === "string" ? node.attrs.src : "";
      const alt = typeof node?.attrs?.alt === "string" ? node.attrs.alt : "";
      const title = typeof node?.attrs?.title === "string" ? node.attrs.title : "";
      if (!src) return null;
      return (
        <figure key={key} className="my-6">
          <img src={src} alt={alt || title || ""} className="w-full rounded-xl border" loading="lazy" />
          {title ? <figcaption className="mt-2 text-sm text-muted-foreground">{title}</figcaption> : null}
        </figure>
      );
    }

    default:
      return <>{children}</>;
  }
}

export function TiptapRenderer({ doc }: { doc: JSONContent }) {
  return <div className="space-y-4">{renderNode(doc, "root")}</div>;
}
