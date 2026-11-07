import type { ComponentPropsWithoutRef, ReactNode } from "react";

type TextFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  trailing?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"input">, "id" | "className">;

export function TextField({
  id,
  label,
  hint,
  error,
  trailing,
  "aria-describedby": ariaDescribedBy,
  ...inputProps
}: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy =
    [errorId, hintId, ariaDescribedBy].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>

      <div className="relative mt-2">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={[
            "h-12 w-full rounded-field border bg-paper-raised px-4 text-[0.9375rem] text-ink transition-colors duration-150 placeholder:text-ink-faint focus:ring-1 focus:outline-none",
            trailing ? "pr-16" : "",
            error
              ? "border-danger focus:border-danger focus:ring-danger"
              : "border-line-strong hover:border-ink-muted focus:border-ink focus:ring-ink",
          ]
            .filter(Boolean)
            .join(" ")}
          {...inputProps}
        />

        {trailing ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
            {trailing}
          </div>
        ) : null}
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-xs leading-relaxed text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-xs leading-relaxed text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
