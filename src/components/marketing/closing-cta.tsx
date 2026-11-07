import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function ClosingCta() {
  return (
    <section className="border-t border-line">
      <Container>
        <div className="py-20 sm:py-24 lg:py-28">
          <div className="rounded-card bg-ink px-6 py-14 text-center text-paper sm:px-12 sm:py-20">
            <p className="text-[0.68rem] font-medium tracking-[0.18em] text-paper/60 uppercase">
              Your next purchase
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.015em] text-balance">
              Know your size before the fitting room.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-pretty text-paper/70 sm:text-base">
              Build your Fit Passport once, then carry your fit across the brands
              you shop.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href="/register"
                size="lg"
                variant="inverse"
                className="w-full sm:w-auto"
              >
                Create your Fit Passport
              </Button>
              <Button
                href="/login"
                size="lg"
                variant="quiet"
                className="w-full text-paper/70 hover:text-paper sm:w-auto"
              >
                I already have an account
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
