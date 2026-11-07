"use client";

import Link from "next/link";
import { useActionState } from "react";

import { FormAlert } from "@/components/auth/form-alert";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TextField } from "@/components/ui/text-field";
import { signInWithEmail } from "@/lib/auth/actions";
import { initialAuthFormState } from "@/lib/auth/types";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithEmail,
    initialAuthFormState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && state.message ? (
        <FormAlert>{state.message}</FormAlert>
      ) : null}

      <TextField
        id="email"
        name="email"
        label="Email address"
        type="email"
        autoComplete="email"
        autoCapitalize="none"
        inputMode="email"
        placeholder="you@example.com"
        error={state.errors?.email}
        required
      />

      <PasswordField
        id="password"
        name="password"
        label="Password"
        autoComplete="current-password"
        placeholder="Your password"
        error={state.errors?.password}
        required
      />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isPending}
        aria-busy={isPending}
      >
        {isPending ? (
          <>
            <Spinner />
            Signing in…
          </>
        ) : (
          "Log in"
        )}
      </Button>

      <p className="text-center text-sm">
        <Link
          href="/forgot-password"
          className="text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-ink"
        >
          Forgot your password?
        </Link>
      </p>
    </form>
  );
}
