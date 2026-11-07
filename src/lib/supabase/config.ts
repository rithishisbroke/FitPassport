/**
 * Supabase configuration shared by the browser, server and proxy clients.
 *
 * Both values are public (they are exposed to the browser by design); the
 * service-role key must never appear in this project.
 */
export const supabaseUrl = normalizeSupabaseUrl(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
);
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function getSupabaseConfig(): { url: string; anonKey: string } {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env.local and set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return { url: supabaseUrl, anonKey: supabaseAnonKey };
}

/** Trims whitespace and trailing slashes copied along with the project URL. */
function normalizeSupabaseUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/\/+$/, "");

  return trimmed ? trimmed : undefined;
}
