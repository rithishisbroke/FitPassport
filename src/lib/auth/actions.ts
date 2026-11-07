"use server";

import { redirect } from "next/navigation";

import type { AuthFormField, AuthFormState } from "@/lib/auth/types";
import { getAppUrl } from "@/lib/auth/url";
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validatePasswordConfirmation,
} from "@/lib/auth/validation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const notConfiguredMessage =
  "Authentication isn't configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart the dev server.";

const unreachableMessage =
  "We couldn't reach the authentication service. Check your connection and try again.";

export async function signInWithEmail(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = readText(formData, "email").toLowerCase();
  const password = readText(formData, "password", { trim: false });

  const errors: Partial<Record<AuthFormField, string>> = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  if (!password) errors.password = "Enter your password.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      errors,
      message: "Please fix the highlighted fields.",
    };
  }

  if (!isSupabaseConfigured) {
    return { status: "error", message: notConfiguredMessage };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { status: "error", message: describeAuthError(error.message) };
    }
  } catch {
    return { status: "error", message: unreachableMessage };
  }

  redirect("/dashboard");
}

export async function signUpWithEmail(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const fullName = readText(formData, "fullName");
  const email = readText(formData, "email").toLowerCase();
  const password = readText(formData, "password", { trim: false });
  const confirmPassword = readText(formData, "confirmPassword", {
    trim: false,
  });

  const errors: Partial<Record<AuthFormField, string>> = {};
  const fullNameError = validateFullName(fullName);
  if (fullNameError) errors.fullName = fullNameError;
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  const confirmationError = validatePasswordConfirmation(
    password,
    confirmPassword,
  );
  if (confirmationError) errors.confirmPassword = confirmationError;

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      errors,
      message: "Please fix the highlighted fields.",
    };
  }

  if (!isSupabaseConfigured) {
    return { status: "error", message: notConfiguredMessage };
  }

  const appUrl = await getAppUrl();
  let hasSession = false;

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName.trim() },
        emailRedirectTo: `${appUrl}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      return { status: "error", message: describeAuthError(error.message) };
    }

    // With email confirmations enabled, Supabase returns a placeholder user
    // with no identities when the address is already registered.
    if (data.user && data.user.identities?.length === 0) {
      return {
        status: "error",
        errors: {
          email: "An account with this email already exists. Log in instead.",
        },
        message: "That email is already registered.",
      };
    }

    hasSession = Boolean(data.session);
  } catch {
    return { status: "error", message: unreachableMessage };
  }

  // Email confirmations disabled: the user is signed in straight away.
  if (hasSession) {
    redirect("/dashboard");
  }

  redirect("/check-email");
}

export async function requestPasswordReset(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = readText(formData, "email").toLowerCase();
  const emailError = validateEmail(email);

  if (emailError) {
    return {
      status: "error",
      errors: { email: emailError },
      message: "Please fix the highlighted fields.",
    };
  }

  if (!isSupabaseConfigured) {
    return { status: "error", message: notConfiguredMessage };
  }

  const appUrl = await getAppUrl();

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${appUrl}/auth/callback?next=/update-password`,
    });

    if (error) {
      return { status: "error", message: describeAuthError(error.message) };
    }
  } catch {
    return { status: "error", message: unreachableMessage };
  }

  // Deliberately identical whether or not the address has an account.
  return {
    status: "success",
    message: `If an account exists for ${email}, we've sent a password reset link. Check your inbox.`,
  };
}

export async function updatePassword(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const password = readText(formData, "password", { trim: false });
  const confirmPassword = readText(formData, "confirmPassword", {
    trim: false,
  });

  const errors: Partial<Record<AuthFormField, string>> = {};
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  const confirmationError = validatePasswordConfirmation(
    password,
    confirmPassword,
  );
  if (confirmationError) errors.confirmPassword = confirmationError;

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      errors,
      message: "Please fix the highlighted fields.",
    };
  }

  if (!isSupabaseConfigured) {
    return { status: "error", message: notConfiguredMessage };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data: claimsData } = await supabase.auth.getClaims();

    if (!claimsData?.claims) {
      return {
        status: "error",
        message:
          "Your reset link has expired or was already used. Request a new one.",
      };
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return { status: "error", message: describeAuthError(error.message) };
    }
  } catch {
    return { status: "error", message: unreachableMessage };
  }

  redirect("/dashboard");
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      const supabase = await createServerSupabaseClient();
      await supabase.auth.signOut();
    } catch {
      // Clearing the local session is best effort; the redirect still runs.
    }
  }

  redirect("/");
}

function readText(
  formData: FormData,
  name: string,
  { trim = true }: { trim?: boolean } = {},
): string {
  const value = formData.get(name);

  if (typeof value !== "string") {
    return "";
  }

  return trim ? value.trim() : value;
}

function describeAuthError(message: string): string {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("fetch failed") ||
    normalized.includes("failed to fetch") ||
    normalized.includes("network") ||
    normalized.includes("timeout") ||
    normalized.includes("econnrefused")
  ) {
    return unreachableMessage;
  }

  if (normalized.includes("invalid login credentials")) {
    return "Email or password is incorrect. Try again.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Confirm your email address before logging in — check your inbox for the link.";
  }

  if (
    normalized.includes("already registered") ||
    normalized.includes("already been registered")
  ) {
    return "An account with this email already exists. Log in instead.";
  }

  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "Too many attempts. Wait a minute before trying again.";
  }

  if (
    normalized.includes("weak password") ||
    normalized.includes("password should")
  ) {
    return "Choose a stronger password — at least 8 characters with a letter and a number.";
  }

  if (
    normalized.includes("invalid email") ||
    normalized.includes("unable to validate email")
  ) {
    return "Enter a valid email address.";
  }

  if (normalized.includes("not allowed for this instance")) {
    return "New sign-ups are disabled for this project. Contact the project owner.";
  }

  if (normalized.includes("invalid path specified in request url")) {
    return "Supabase rejected the project URL. Use the project URL from Project Settings → API, which ends in .supabase.co with no extra path.";
  }

  if (normalized.includes("invalid api key")) {
    return "Supabase rejected the anon key. Re-copy the anon public key into NEXT_PUBLIC_SUPABASE_ANON_KEY and restart the dev server.";
  }

  return "Something went wrong. Please try again.";
}
