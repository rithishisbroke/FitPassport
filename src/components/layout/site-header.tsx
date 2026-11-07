import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { primaryNav } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3 sm:h-20">
          <Wordmark />

          <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
            {primaryNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hidden rounded-full px-3 py-2 text-sm text-ink-muted transition-colors duration-150 hover:text-ink sm:inline-flex"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/login"
              className="rounded-full px-2.5 py-2 text-sm text-ink-muted transition-colors duration-150 hover:text-ink sm:px-3"
            >
              Log in
            </Link>
            <Button href="/register" className="ml-1 px-4 sm:px-5">
              Get started
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
