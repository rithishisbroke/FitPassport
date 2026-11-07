import { PassportCard } from "@/components/marketing/passport-card";
import { Button, buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised/70 px-3 py-1.5 text-[0.68rem] font-medium tracking-[0.16em] text-ink-muted uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Early access · {siteConfig.category}
            </p>

            <h1 className="mt-7 font-serif text-[clamp(2.6rem,7.4vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-balance">
              Your size.
              <span className="mt-1 block text-ink-muted">
                Across every brand.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-ink-muted sm:text-lg">
              Stop guessing your clothing size. Build your personal Fit Passport
              and discover better-fitting clothes across brands.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/register" size="lg" className="w-full sm:w-auto">
                Create your Fit Passport
              </Button>
              <a
                href="#how-it-works"
                className={buttonClassName({
                  variant: "secondary",
                  size: "lg",
                  className: "w-full sm:w-auto",
                })}
              >
                How it works
              </a>
            </div>

            <p className="mt-8 text-sm text-ink-faint">
              Starting with men’s T-shirts.
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm sm:max-w-md lg:mx-0 lg:justify-self-end">
            <PassportCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
