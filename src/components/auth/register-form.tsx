"use client";

import { useActionState } from "react";

import { FormAlert } from "@/components/auth/form-alert";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TextField } from "@/components/ui/text-field";
import { signUpWithEmail } from "@/lib/auth/actions";
import { initialAuthFormState } from "@/lib/auth/types";

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    signUpWithEmail,
    initialAuthFormState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && state.message ? (
        <FormAlert>{state.message}</FormAlert>
      ) : null}

      <TextField
        id="fullName"
        name="fullName"
        label="Full name"
        type="text"
        autoComplete="name"
        placeholder="Your name"
        error={state.errors?.fullName}
        required
      />

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
        autoComplete="new-password"
        placeholder="At least 8 characters"
        hint="At least 8 characters, including a letter and a number."
        error={state.errors?.password}
        minLength={8}
        required
      />

      <PasswordField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        autoComplete="new-password"
        placeholder="Re-enter your password"
        error={state.errors?.confirmPassword}
        minLength={8}
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
            Creating account…
          </>
        ) : (
          "Create account"
        )}
      </Button>

      <p className="text-center text-xs leading-relaxed text-ink-faint">
        We’ll email you a link to confirm your address before you can log in.
      </p>
    </form>
  );
}
