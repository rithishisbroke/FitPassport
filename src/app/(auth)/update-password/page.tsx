import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";

export const metadata: Metadata = {
  title: "Choose a new password",
  description: "Set a new password for your FitPassport account.",
  robots: { index: false },
};

export default function UpdatePasswordPage() {
  return (
    <AuthShell
      title="Choose a new password"
      description="You’re signed in from your reset link. Set a new password to finish."
      footer={
        <>
          Need a new link?{" "}
          <Link
            href="/forgot-password"
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
          >
            Request another email
          </Link>
        </>
      }
    >
      <UpdatePasswordForm />
    </AuthShell>
  );
}
