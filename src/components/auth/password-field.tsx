"use client";

import { useState } from "react";

import { TextField } from "@/components/ui/text-field";

type PasswordFieldProps = {
  id: string;
  name: string;
  label: string;
  autoComplete: "current-password" | "new-password";
  placeholder?: string;
  hint?: string;
  error?: string;
  minLength?: number;
  required?: boolean;
};

export function PasswordField({
  id,
  name,
  label,
  autoComplete,
  placeholder,
  hint,
  error,
  minLength,
  required,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField
      id={id}
      name={name}
      label={label}
      type={isVisible ? "text" : "password"}
      autoComplete={autoComplete}
      placeholder={placeholder}
      hint={hint}
      error={error}
      minLength={minLength}
      required={required}
      trailing={
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-pressed={isVisible}
          aria-controls={id}
          className="rounded-full px-3 py-2 text-xs font-medium text-ink-muted transition-colors duration-150 hover:text-ink"
        >
          {isVisible ? "Hide" : "Show"}
          <span className="sr-only"> password</span>
        </button>
      }
    />
  );
}
