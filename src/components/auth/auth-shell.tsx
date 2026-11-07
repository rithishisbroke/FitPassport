import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthShell({
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="flex flex-1 flex-col">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <Wordmark />
          <Link
            href="/"
            className="text-sm text-ink-muted transition-colors duration-150 hover:text-ink"
          >
            Back to home
          </Link>
        </div>
      </Container>

      <Container className="flex flex-1">
        <div className="my-auto grid w-full items-center gap-12 py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20 lg:py-16">
          <div className="hidden lg:block">
            <p className="text-[0.68rem] font-medium tracking-[0.18em] text-accent uppercase">
              Fit Passport
            </p>
            <p className="mt-6 max-w-sm font-serif text-[clamp(2rem,3.4vw,3rem)] leading-[1.04] tracking-[-0.015em] text-balance">
              One profile. Every brand’s fit.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              Keep the sizes that actually fit you in one place, so a new brand’s
              size chart stops being guesswork.
            </p>

            <div className="mt-10 max-w-xs border-t border-line pt-8">
              <div aria-hidden="true" className="flex items-center gap-1.5">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <span
                    key={size}
                    className={
                      size === "M"
                        ? "flex h-8 flex-1 items-center justify-center rounded-full bg-ink text-[0.65rem] font-medium text-paper"
                        : "flex h-8 flex-1 items-center justify-center rounded-full border border-line text-[0.65rem] text-ink-faint"
                    }
                  >
                    {size}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-faint">
                Starting with men’s T-shirts.
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <div className="rounded-card border border-line bg-paper-raised p-6 sm:p-8">
              <h1 className="font-serif text-3xl leading-tight tracking-[-0.01em]">
                {title}
              </h1>
              <p className="mt-2 text-sm text-ink-muted">{description}</p>

              {isSupabaseConfigured ? null : (
                <div
                  role="note"
                  className="mt-6 flex items-start gap-2.5 rounded-field border border-line bg-paper px-3.5 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <p className="text-xs leading-relaxed text-ink-muted">
                    Supabase isn’t configured yet. Add{" "}
                    <code className="font-mono text-[0.7rem] text-ink">
                      NEXT_PUBLIC_SUPABASE_URL
                    </code>{" "}
                    and{" "}
                    <code className="font-mono text-[0.7rem] text-ink">
                      NEXT_PUBLIC_SUPABASE_ANON_KEY
                    </code>{" "}
                    to <code className="font-mono text-[0.7rem] text-ink">.env.local</code>, then restart the dev server.
                  </p>
                </div>
              )}

              <div className="mt-6">{children}</div>
            </div>

            <p className="mt-6 text-center text-sm text-ink-muted">
              {footer}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
