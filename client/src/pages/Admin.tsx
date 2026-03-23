import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { usePostPreviews, deletePost } from "@/lib/postsApi";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useCategories, createCategory, renameCategory, deleteCategory } from "@/lib/categoriesApi";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight } from "lucide-react";

const POSTS_PER_PAGE = 10;

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  const {
    data: postsData,
    isLoading,
    isError: postsError,
    error: postsErrorDetails,
    refetch: refetchPosts,
  } = usePostPreviews(POSTS_PER_PAGE, offset, { enabled: loggedIn });

  const posts = postsData?.posts ?? [];
  const totalCount = postsData?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorDetails,
    refetch: refetchCategories,
  } = useCategories({ enabled: loggedIn });

  // Check if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setLoggedIn(true);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setLoggedIn(!!session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  async function handleLogin() {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setLoggedIn(true);
      setCurrentPage(1);
      setEmail("");
      setPassword("");
      toast({ title: "Signed in", description: "Welcome to the admin panel" });
    } catch (e: any) {
      toast({ title: "Login failed", description: e.message });
    }
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      setLoggedIn(false);
      setCurrentPage(1);
      toast({ title: "Logged out" });
    } catch (e: any) {
      toast({ title: "Logout failed", description: e.message });
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePost(id);
      if (posts.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
      queryClient.invalidateQueries({ queryKey: ["post-previews"] });
      toast({ title: "Post deleted" });
    } catch (e: any) {
      toast({ title: "Delete failed", description: e.message });
    }
  }

  async function onAddCategory() {
    if (!newCategory.trim()) return toast({ title: "Enter a category name" });
    try {
      await createCategory(newCategory.trim());
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setNewCategory("");
      toast({ title: "Category added" });
    } catch (e: any) {
      toast({ title: "Failed to add category", description: e.message });
    }
  }

  async function onRenameCategory(name: string) {
    const newName = prompt("New name for category", name);
    if (!newName) return;
    try {
      await renameCategory(name, newName);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Category renamed" });
    } catch (e: any) {
      toast({ title: "Failed to rename", description: e.message });
    }
  }

  async function onDeleteCategory(name: string) {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      await deleteCategory(name);
      queryClient.invalidateQueries({ queryKey: ["categories", "posts"] });
      toast({ title: "Category deleted" });
    } catch (e: any) {
      toast({ title: "Failed to delete", description: e.message });
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <Helmet>
          <title>Admin | Greg Anderson</title>
        </Helmet>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-semibold">Admin</h1>
              <p className="text-muted-foreground">Manage blog posts and categories. All changes update instantly.</p>
            </div>
            <div className="flex items-center gap-3">
              {loggedIn && <Link href="/admin/add" className="px-4 py-2 rounded-lg bg-primary text-white font-medium cursor-pointer">Add Post</Link>}
              <Link href="/blog" className="px-4 py-2 rounded-lg border cursor-pointer">View Blog</Link>
            </div>
          </div>

          <div className="mb-6">
            {!loggedIn ? (
              <div className="space-y-4 max-w-sm">
                <h2 className="font-medium">Sign in</h2>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 rounded-lg border bg-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 rounded-lg border bg-input"
                  />
                </div>
                <button onClick={handleLogin} className="px-4 py-2 rounded-lg bg-primary text-white font-medium w-full cursor-pointer">
                  Sign In
                </button>
                <p className="text-xs text-muted-foreground">
                  Use the email and password from your Supabase Auth settings.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-medium">Logged in</h2>
                    <p className="text-sm text-muted-foreground">Ready to manage content</p>
                  </div>
                  <button onClick={handleLogout} className="px-4 py-2 rounded-lg border cursor-pointer">Log out</button>
                </div>

                <div className="mt-6 space-y-2">
                  <label className="block text-sm font-medium">Add Category</label>
                  <div className="flex gap-2">
                    <input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Category name"
                      className="w-full px-3 py-2 rounded-lg border bg-input"
                    />
                    <button onClick={onAddCategory} className="px-3 py-2 rounded-lg bg-primary text-white cursor-pointer">Add</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {!loggedIn ? (
              <div className="text-center text-sm text-muted-foreground">Sign in to manage posts and categories.</div>
            ) : postsError || categoriesError ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-3">
                <div className="font-medium">Failed to load admin data</div>
                <div className="text-sm text-muted-foreground">
                  {postsError
                    ? (postsErrorDetails as Error)?.message || "Could not load posts."
                    : (categoriesErrorDetails as Error)?.message || "Could not load categories."}
                </div>
                <button
                  onClick={() => {
                    refetchPosts();
                    refetchCategories();
                  }}
                  className="px-3 py-2 rounded-lg border cursor-pointer"
                >
                  Retry
                </button>
              </div>
            ) : isLoading ? (
              <div>Loading posts...</div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="font-display text-xl font-semibold mb-3">Categories</h3>
                  {categoriesLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="space-y-2">
                      {categories.map((c) => (
                        <div key={c} className="flex items-center gap-3 bg-card p-3 rounded">
                          <div className="flex-1">{c}</div>
                          <div className="flex gap-2">
                            <button onClick={() => onRenameCategory(c)} className="px-2 py-1 rounded bg-secondary text-sm cursor-pointer">Rename</button>
                            <button onClick={() => onDeleteCategory(c)} className="px-2 py-1 rounded bg-destructive text-destructive-foreground text-sm cursor-pointer">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xl font-semibold">Posts</h3>
                    <div className="text-xs text-muted-foreground">
                      Showing {posts.length === 0 ? 0 : offset + 1}-{Math.min(offset + posts.length, totalCount)} of {totalCount}
                    </div>
                  </div>
                  {posts.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No posts.</div>
                  ) : (
                    <>
                      {posts.map((post) => (
                        <div key={post.id} className="flex items-center gap-4 p-4 border rounded-lg bg-card mb-2">
                          {post.image ? (
                            <img src={post.image} alt={post.title} className="w-24 h-16 object-cover rounded" />
                          ) : (
                            <div className="w-24 h-16 rounded bg-secondary/30" aria-hidden="true" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-medium">{post.title}</h3>
                              <Badge className="bg-primary text-primary-foreground">{post.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                          </div>
                          <div className="text-xs text-muted-foreground text-right">
                            <div>{post.date}</div>
                            <div className="mt-3">
                              <Link href={`/admin/edit/${post.id}`} className="px-3 py-1 rounded-lg border text-xs mr-2 cursor-pointer">Edit</Link>
                              <button onClick={() => onDelete(post.id)} className="px-3 py-1 rounded-lg bg-destructive text-destructive-foreground text-xs cursor-pointer">Delete</button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {(hasNextPage || hasPrevPage) && (
                        <div className="flex items-center justify-center gap-4 mt-6">
                          <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={!hasPrevPage}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                          </button>

                          <span className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                          </span>

                          <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            disabled={!hasNextPage}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                          >
                            Next
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
