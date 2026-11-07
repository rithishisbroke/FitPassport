import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type CurrentUser = {
  id: string;
  email: string;
  fullName: string;
};

/**
 * Reads and verifies the signed-in user from the session cookie.
 *
 * Uses getClaims() so the JWT is verified rather than trusted, and returns a
 * narrow object instead of the whole Supabase user.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims?.sub) {
      return null;
    }

    const { claims } = data;
    const fullName =
      typeof claims.user_metadata?.full_name === "string"
        ? claims.user_metadata.full_name
        : "";

    return {
      id: claims.sub,
      email: claims.email ?? "",
      fullName,
    };
  } catch {
    return null;
  }
}
