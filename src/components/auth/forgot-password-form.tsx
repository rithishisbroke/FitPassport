"use client";

import { useActionState } from "react";

import { FormAlert } from "@/components/auth/form-alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TextField } from "@/components/ui/text-field";
import { requestPasswordReset } from "@/lib/auth/actions";
import { initialAuthFormState } from "@/lib/auth/types";

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    requestPasswordReset,
    initialAuthFormState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && state.message ? (
        <FormAlert>{state.message}</FormAlert>
      ) : null}

      {state.status === "success" && state.message ? (
        <FormAlert tone="notice">{state.message}</FormAlert>
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
            Sending link…
          </>
        ) : (
          "Send reset link"
        )}
      </Button>
    </form>
  );
}
