"use client";

import { useActionState } from "react";

import { FormAlert } from "@/components/auth/form-alert";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { updatePassword } from "@/lib/auth/actions";
import { initialAuthFormState } from "@/lib/auth/types";

export function UpdatePasswordForm() {
  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialAuthFormState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && state.message ? (
        <FormAlert>{state.message}</FormAlert>
      ) : null}

      <PasswordField
        id="password"
        name="password"
        label="New password"
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
        label="Confirm new password"
        autoComplete="new-password"
        placeholder="Re-enter your new password"
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
            Updating password…
          </>
        ) : (
          "Update password"
        )}
      </Button>
    </form>
  );
}
