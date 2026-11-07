"use client";

import { useSearchParams } from "next/navigation";

import { FormAlert } from "@/components/auth/form-alert";

const messages: Record<string, string> = {
  invalid_link:
    "That link is invalid or has expired. Request a new email and try again.",
};

/**
 * Reads `?error=` after a failed email-link exchange. Kept small and wrapped in
 * Suspense by the pages so they can stay statically prerendered.
 */
export function LinkErrorNotice() {
  const searchParams = useSearchParams();
  const message = messages[searchParams.get("error") ?? ""];

  if (!message) {
    return null;
  }

  return (
    <div className="mb-5">
      <FormAlert>{message}</FormAlert>
    </div>
  );
}
