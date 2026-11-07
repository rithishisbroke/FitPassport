import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Check your email",
  description: "Confirm your email address to activate your FitPassport account.",
  robots: { index: false },
};

export default function CheckEmailPage() {
  return (
    <AuthShell
      title="Check your email"
      description="One last step to activate your account."
      footer={
        <>
          Used the wrong address?{" "}
          <Link
            href="/register"
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
          >
            Start again
          </Link>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-ink-muted">
          We’ve sent a confirmation link to the email address you signed up
          with. Open it on this device to finish setting up your Fit Passport.
        </p>
        <p className="text-xs leading-relaxed text-ink-faint">
          Nothing yet? Check your spam folder. Confirmation links expire after a
          while — if yours has, sign up again to get a fresh one.
        </p>
        <Button href="/login" variant="secondary" className="w-full">
          Back to log in
        </Button>
      </div>
    </AuthShell>
  );
}
