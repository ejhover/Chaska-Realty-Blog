import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const missingSupabaseEnv = !supabaseUrl || !supabaseKey;

if (import.meta.env.DEV) {
  console.log("Supabase URL:", supabaseUrl);
  console.log("Supabase Key exists:", !!supabaseKey);
}

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. The app will run, but data/auth/image uploads will fail.",
  );
}

function missingEnvError() {
  return new Error(
    "Supabase is not configured (missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).",
  );
}

// A tiny runtime-safe stub so forks without secrets don't crash at import-time.
// Most app flows will surface errors via React Query/toasts instead of a blank page.
function createSupabaseStub(): any {
  return {
    auth: {
      async getSession() {
        return { data: { session: null }, error: missingEnvError() };
      },
      onAuthStateChange() {
        return {
          data: {
            subscription: {
              unsubscribe() {},
            },
          },
        };
      },
      async signInWithPassword() {
        return { data: { session: null, user: null }, error: missingEnvError() };
      },
      async signOut() {
        return { error: null };
      },
    },
    storage: {
      from() {
        return {
          async upload() {
            return { data: null, error: missingEnvError() };
          },
          getPublicUrl() {
            return { data: { publicUrl: "" } };
          },
        };
      },
    },
    from() {
      return {
        select() {
          return {
            eq() {
              return {
                async order() {
                  return { data: [], error: missingEnvError() };
                },
                async single() {
                  return { data: null, error: missingEnvError() };
                },
              };
            },
            async order() {
              return { data: [], error: missingEnvError() };
            },
            async single() {
              return { data: null, error: missingEnvError() };
            },
          };
        },
        async insert() {
          return { data: null, error: missingEnvError() };
        },
        update() {
          return {
            async eq() {
              return { data: null, error: missingEnvError() };
            },
          };
        },
        delete() {
          return {
            async eq() {
              return { data: null, error: missingEnvError() };
            },
          };
        },
      };
    },
  };
}

export const supabase = missingSupabaseEnv
  ? (createSupabaseStub() as ReturnType<typeof createClient>)
  : createClient(supabaseUrl, supabaseKey);
