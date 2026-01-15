import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";

// Type for category (includes ID for admin operations)
export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Fetch all categories from Supabase
export async function fetchCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("name")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return (data || []).map((row: any) => row.name);
}

// Fetch categories with IDs (for admin form)
export async function fetchCategoriesWithIds(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

// Create a new category (admin only)
export async function createCategory(name: string) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const { error } = await supabase.from("categories").insert({
    name,
    slug,
  });

  if (error) throw new Error(error.message);
  return { success: true };
}

// Rename a category (admin only)
export async function renameCategory(oldName: string, newName: string) {
  // Find the category by name
  const { data: cat, error: findErr } = await supabase
    .from("categories")
    .select("id")
    .eq("name", oldName)
    .single();

  if (findErr) throw new Error(findErr.message);

  const newSlug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const { error } = await supabase
    .from("categories")
    .update({ name: newName, slug: newSlug })
    .eq("id", cat.id);

  if (error) throw new Error(error.message);
  return { success: true };
}

// Delete a category (admin only)
export async function deleteCategory(name: string) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("name", name);

  if (error) throw new Error(error.message);
  return { success: true };
}

// React Query hook
export function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: fetchCategories, staleTime: 1000 * 60 * 5 });
}

// Hook for admin form (includes IDs)
export function useCategoriesWithIds() {
  return useQuery({ queryKey: ["categories-with-ids"], queryFn: fetchCategoriesWithIds, staleTime: 1000 * 60 * 5 });
}
