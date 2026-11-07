import { NextResponse, type NextRequest } from "next/server";

import { safeRedirectPath } from "@/lib/auth/validation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Handles the `?code=` redirect from Supabase email links (confirmation and
 * password recovery) and turns it into a cookie-based session.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeRedirectPath(searchParams.get("next"));

  if (code && isSupabaseConfigured) {
    try {
      const supabase = await createServerSupabaseClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return NextResponse.redirect(new URL(next, origin));
      }
    } catch {
      // Fall through to the failure redirect below.
    }
  }

  return NextResponse.redirect(new URL(fallbackFor(next), origin));
}

function fallbackFor(next: string): string {
  return next === "/update-password"
    ? "/forgot-password?error=invalid_link"
    : "/login?error=invalid_link";
}
