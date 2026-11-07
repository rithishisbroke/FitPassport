import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";

/** Routes that require a signed-in user. */
const protectedPaths = ["/dashboard", "/update-password"];

/** Routes that a signed-in user should not see. */
const guestOnlyPaths = ["/login", "/register", "/forgot-password"];

function matchesPath(pathname: string, paths: string[]) {
  return paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

/**
 * Refreshes the Supabase session on every request and performs optimistic
 * redirects. This is the only place auth cookies are written on page
 * requests; real authorization still happens next to the data.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // The app stays usable (with setup instructions) before credentials exist.
  if (!isSupabaseConfigured) {
    return response;
  }

  const { url, anonKey } = getSupabaseConfig();

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headersToSet) {
        // Make refreshed cookies visible to the Server Components rendered
        // for this request...
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        // ...and send them, plus the required cache headers, to the browser.
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
        Object.entries(headersToSet).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
      },
    },
  });

  let isAuthenticated = false;

  try {
    const { data } = await supabase.auth.getClaims();
    isAuthenticated = Boolean(data?.claims?.sub);
  } catch {
    // Never let an auth outage break static routes; protected pages still
    // verify the session themselves before rendering any data.
    isAuthenticated = false;
  }

  const { pathname } = request.nextUrl;

  if (!isAuthenticated && matchesPath(pathname, protectedPaths)) {
    return redirectTo(request, response, "/login");
  }

  if (isAuthenticated && guestOnlyPaths.includes(pathname)) {
    return redirectTo(request, response, "/dashboard");
  }

  return response;
}

function redirectTo(
  request: NextRequest,
  response: NextResponse,
  pathname: string,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";

  const redirectResponse = NextResponse.redirect(url);

  // Carry refreshed auth cookies over to the redirect response.
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });

  return redirectResponse;
}
