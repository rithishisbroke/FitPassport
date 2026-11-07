import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseConfig } from "@/lib/supabase/config";

export { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Browser-side Supabase client.
 *
 * Authentication currently runs through Server Actions, so nothing imports
 * this yet. It is here for future client-side features (for example realtime
 * updates) that need the same cookie-based session.
 */
export function createBrowserSupabaseClient() {
  const { url, anonKey } = getSupabaseConfig();

  return createBrowserClient(url, anonKey);
}
