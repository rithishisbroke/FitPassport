import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { footerNav } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-8">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Your size, across every brand. Built for Indian sizing standards,
              starting with men’s T-shirts.
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-labelledby={`footer-${group.heading}`}>
              <h2
                id={`footer-${group.heading}`}
                className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-faint"
              >
                {group.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("/#") ? (
                      <a
                        href={link.href}
                        className="text-sm text-ink-muted transition-colors duration-150 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-ink-muted transition-colors duration-150 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 FitPassport</p>
          <p>FitPassport is an early-stage project.</p>
        </div>
      </Container>
    </footer>
  );
}
