import { headers } from "next/headers";

/**
 * Absolute origin used for Supabase email redirects.
 *
 * `NEXT_PUBLIC_SITE_URL` should be set in production so confirmation links
 * always point at the canonical domain; otherwise the request host is used.
 */
export async function getAppUrl(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configured && /^https?:\/\//.test(configured)) {
    return configured.replace(/\/+$/, "");
  }

  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    "localhost:3000";
  const protocol =
    headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}
