import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { LinkErrorNotice } from "@/components/auth/link-error-notice";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "Request a FitPassport password reset link.",
  robots: { index: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      description="Enter your email and we’ll send you a link to choose a new password."
      footer={
        <>
          Remembered it?{" "}
          <Link
            href="/login"
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
          >
            Back to log in
          </Link>
        </>
      }
    >
      <Suspense fallback={null}>
        <LinkErrorNotice />
      </Suspense>
      <ForgotPasswordForm />
    </AuthShell>
  );
}
