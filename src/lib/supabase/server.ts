import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabaseConfig } from "@/lib/supabase/config";

/**
 * Supabase client for Server Components, Server Actions and Route Handlers.
 *
 * Sessions live in httpOnly cookies managed by @supabase/ssr, so the server and
 * the browser always read the same session. Create a new client per request.
 */
export async function createServerSupabaseClient() {
  const { url, anonKey } = getSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot write cookies. Refresh happens in
          // src/proxy.ts, which runs before the page renders.
        }
      },
    },
  });
}
