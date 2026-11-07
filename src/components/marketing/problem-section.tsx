import { Container } from "@/components/ui/container";

export function ProblemSection() {
  return (
    <section className="border-t border-line">
      <Container>
        <div className="grid gap-8 py-20 sm:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:py-28">
          <div>
            <p className="text-[0.68rem] font-medium tracking-[0.18em] text-accent uppercase">
              The problem
            </p>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.03] tracking-[-0.015em] text-balance">
              One size label. Many different fits.
            </h2>
          </div>

          <div className="max-w-xl space-y-5 text-base leading-relaxed text-pretty text-ink-muted sm:text-[1.0625rem]">
            <p>
              Every brand cuts to its own measurements. A medium from one label
              can sit like a small from another, so the same size on the tag
              means something different in every shop.
            </p>
            <p>
              FitPassport starts with the clothes you already own and wear well —
              beginning with men’s T-shirts — and turns those sizes into a single
              profile you can carry from brand to brand.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
