import type { ReactNode } from "react";

type FormAlertProps = {
  tone?: "error" | "notice";
  children: ReactNode;
};

export function FormAlert({ tone = "error", children }: FormAlertProps) {
  const isError = tone === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      className={
        isError
          ? "rounded-field border border-danger/30 bg-danger/[0.05] px-3.5 py-3 text-xs leading-relaxed text-danger"
          : "rounded-field border border-line bg-paper px-3.5 py-3 text-xs leading-relaxed text-ink-muted"
      }
    >
      {children}
    </div>
  );
}
