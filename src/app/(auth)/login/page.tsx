import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { LinkErrorNotice } from "@/components/auth/link-error-notice";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your FitPassport account.",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Log in"
      description="Welcome back. Pick up where you left off."
      footer={
        <>
          New to FitPassport?{" "}
          <Link
            href="/register"
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
          >
            Create an account
          </Link>
        </>
      }
    >
      <Suspense fallback={null}>
        <LinkErrorNotice />
      </Suspense>
      <LoginForm />
    </AuthShell>
  );
}
