/**
 * Server-side validation for the auth forms.
 *
 * Native HTML constraints give immediate feedback in the browser, but these
 * checks are the ones that decide whether a request reaches Supabase.
 */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordMaxLength = 72;

export function validateFullName(value: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Enter your full name.";
  }

  if (trimmed.length < 2) {
    return "Your name must be at least 2 characters.";
  }

  if (trimmed.length > 80) {
    return "Your name must be 80 characters or fewer.";
  }

  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Enter your email address.";
  }

  if (trimmed.length > 254 || !emailPattern.test(trimmed)) {
    return "Enter a valid email address.";
  }

  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) {
    return "Enter a password.";
  }

  if (value.length < 8) {
    return "Use at least 8 characters.";
  }

  if (value.length > passwordMaxLength) {
    return `Use ${passwordMaxLength} characters or fewer.`;
  }

  if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
    return "Include at least one letter and one number.";
  }

  return undefined;
}

export function validatePasswordConfirmation(
  password: string,
  confirmation: string,
): string | undefined {
  if (!confirmation) {
    return "Re-enter your password.";
  }

  if (password !== confirmation) {
    return "Passwords do not match.";
  }

  return undefined;
}

/** Keeps post-login redirects on this site. */
export function safeRedirectPath(
  value: string | null | undefined,
  fallback = "/dashboard",
): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}
