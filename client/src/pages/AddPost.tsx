import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCategoriesWithIds } from "@/lib/categoriesApi";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useParams } from "wouter";
import { createPost, updatePost } from "@/lib/postsApi";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { EditorJsEditor } from "@/components/EditorJsEditor";
import type { EditorJsOutput } from "@/lib/editorjs";
import { coerceToEditorJsOutput, extractPlainTextFromEditorJs } from "@/lib/editorjs";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [editorData, setEditorData] = useState<EditorJsOutput | null>(null);
  const { data: categoriesWithIds = [] } = useCategoriesWithIds();
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("article");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams<{ id?: string }>();
  const postId = params?.id;
  const isEditing = !!postId;

  // Check if user is logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setLoggedIn(true);
      } else {
        setLocation("/admin");
      }
    });
  }, []);

  // Load post data when editing
  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      if (!postId) {
        setEditorData(coerceToEditorJsOutput(""));
        return;
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, excerpt, content, category_id, type, image")
          .eq("id", postId)
          .single();
        if (error) throw new Error(error.message);
        if (cancelled) return;

        setTitle(data.title || "");
        setExcerpt(data.excerpt || "");
        setCategoryId(data.category_id || "");
        setType(data.type || "article");
        setImageUrl(data.image || "");
        setEditorData(coerceToEditorJsOutput(data.content));
      } catch (e: any) {
        if (!cancelled) toast({ title: "Failed to load post", description: e.message });
      }
    }

    loadPost();
    return () => {
      cancelled = true;
    };
  }, [postId, toast]);

  // Set default category
  useEffect(() => {
    if (categoriesWithIds.length && !categoryId && !isEditing) {
      setCategoryId(categoriesWithIds[0].id);
    }
  }, [categoriesWithIds, categoryId, isEditing]);

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFileName(file.name);
    try {
      const data = await readFileAsDataURL(file);
      setImageData(data);
    } catch (err) {
      // ignore
    }
  }

  function computeReadTime(text: string) {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !excerpt.trim()) {
      toast({ title: "Missing fields", description: "Please provide a title and excerpt." });
      return;
    }

    if (!categoryId) {
      toast({ title: "Select a category" });
      return;
    }

    if (!editorData) {
      toast({ title: "Editor is still loading" });
      return;
    }

    const image = imageData || imageUrl || `${import.meta.env.BASE_URL}remax_logo.png`;
    const bodyText = extractPlainTextFromEditorJs(editorData);
    const readTime = type === "video" ? "5 min watch" : computeReadTime(bodyText || excerpt);

    setLoading(true);
    try {
      if (isEditing && postId) {
        await updatePost(postId, {
          title: title.trim(),
          excerpt: excerpt.trim(),
          content: editorData,
          category_id: categoryId,
          type,
          image,
          readTime,
        });
      } else {
        await createPost({
          title: title.trim(),
          excerpt: excerpt.trim(),
          content: editorData,
          category_id: categoryId,
          type,
          image,
          readTime,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({ title: isEditing ? "Post updated" : "Post created", description: `"${title}" has been saved.` });
      setLocation("/blog");
    } catch (err: any) {
      toast({ title: isEditing ? "Failed to update post" : "Failed to create post", description: err.message });
    } finally {
      setLoading(false);
    }
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-muted-foreground">Please log in from the Admin page.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold mb-2">{isEditing ? "Edit Blog Post" : "Add New Blog Post"}</h1>
          <p className="text-muted-foreground mb-6">
            Fill out the fields below and click <span className="font-medium">{isEditing ? "Save" : "Publish"}</span>. Changes appear instantly.
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-input" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Excerpt</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border bg-input" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              {editorData ? (
                <EditorJsEditor initialData={editorData} onChange={setEditorData} />
              ) : (
                <div className="rounded-lg border bg-input px-3 py-6 text-sm text-muted-foreground">
                  Loading editor...
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Tip: Use the “+” menu to insert headings and images.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-input">
                  <option value="">-- Select Category --</option>
                  {categoriesWithIds.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-input">
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                  <option value="gallery">Gallery</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image (file)</label>
              <input type="file" accept="image/*" onChange={onFileChange} className="w-full" />
              {imageFileName && <div className="text-sm text-muted-foreground mt-1">Using file: {imageFileName}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Or Image URL</label>
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-input" />
            </div>

            <div className="flex items-center gap-4 justify-end">
              <button type="submit" disabled={loading} className="px-5 py-2 rounded-lg bg-primary text-white font-medium disabled:opacity-50">
                {loading ? (isEditing ? "Saving..." : "Publishing...") : isEditing ? "Save" : "Publish"}
              </button>
              <button type="button" onClick={() => setLocation("/blog")} className="px-5 py-2 rounded-lg border">Cancel</button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
