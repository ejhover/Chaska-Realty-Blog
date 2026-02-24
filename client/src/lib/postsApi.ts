import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@/components/BlogCard";
import { supabase } from "./supabase";
import { isEditorJsOutput } from "@/lib/editorjs";
import { isTiptapWrapper } from "@/lib/tiptap";

function parseMaybeEditorJs(content: unknown): unknown {
  if (typeof content !== "string") return content;
  const trimmed = content.trim();
  if (!trimmed.startsWith("{")) return content;
  try {
    const parsed = JSON.parse(trimmed);
    if (isTiptapWrapper(parsed)) return parsed;
    return isEditorJsOutput(parsed) ? parsed : content;
  } catch {
    return content;
  }
}

// Fetch posts for preview (home page, blog list) - NO content field
export async function fetchPostPreviews(
  limit?: number,
  offset: number = 0
): Promise<{ posts: BlogPost[]; count: number }> {
  let query = supabase
    .from("posts")
    .select("id, title, slug, excerpt, type, image, read_time, category_id, created_at, categories(name)", { count: "exact" })
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + (limit || 1000) - 1);

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  const posts = (data || []).map((row: any) => ({
    id: row.id,
    title: row.title,
    excerpt: row.excerpt || row.title,
    content: "",
    category: row.categories?.name || "Uncategorized",
    type: row.type || "article",
    image: row.image ?? "/remax_logo.png",
    date: new Date(row.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    readTime: row.read_time || "5 min read",
  }));

  return { posts, count: count || 0 };
}

// Get total count of published posts (for pagination)
export async function getPostCount(): Promise<number> {
  const { count, error } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  if (error) throw new Error(error.message);
  return count || 0;
}

// Fetch a single post by ID (includes full content)
export async function fetchPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(name)")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    throw new Error(error.message);
  }

  return {
    id: data.id,
    title: data.title,
    excerpt: data.excerpt || data.title,
    content: parseMaybeEditorJs(data.content),
    category: data.categories?.name || "Uncategorized",
    type: data.type || "article",
    image: data.image ?? "/remax_logo.png",
    date: new Date(data.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    readTime: data.read_time || "5 min read",
  };
}

// Create a new post (admin only)
export async function createPost(post: any) {
  const { error } = await supabase.from("posts").insert({
    title: post.title,
    slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    excerpt: post.excerpt,
    content: post.content ?? "",
    category_id: post.category_id,
    type: post.type || "article",
    image: post.image ?? null,
    read_time: post.readTime || "5 min read",
    published: true,
  });

  if (error) throw new Error(error.message);
  return { success: true };
}

// Update an existing post (admin only)
export async function updatePost(id: string, post: any) {
  const { error } = await supabase
    .from("posts")
    .update({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category_id: post.category_id,
      image: post.image ?? null,
      read_time: post.readTime,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true };
}

// Delete a post (admin only)
export async function deletePost(id: string) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true };
}

export function usePostPreviews(limit?: number, offset: number = 0) {
  return useQuery({
    queryKey: ["post-previews", limit, offset],
    queryFn: () => fetchPostPreviews(limit, offset),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30
  });
}

// React Query hook for total post count
export function usePostCount() {
  return useQuery({ 
    queryKey: ["post-count"], 
    queryFn: getPostCount, 
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30
  });
}

// React Query hook for single post (with full content)
export function usePost(id: string) {
  return useQuery({ 
    queryKey: ["post", id], 
    queryFn: () => fetchPostById(id), 
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
    gcTime: 1000 * 60 * 30
  });
}

// Legacy hook for backwards compatibility (uses previews)
export function usePosts() {
  return usePostPreviews();
}