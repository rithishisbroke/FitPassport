import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Create a FitPassport account and start with the sizes you already wear.",
  robots: { index: false },
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Start your Fit Passport with the sizes you already wear."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
          >
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
