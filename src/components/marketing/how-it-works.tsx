import { Container } from "@/components/ui/container";
import { howItWorksSteps } from "@/config/site";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-line bg-paper-raised/40"
    >
      <Container>
        <div className="py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-[0.68rem] font-medium tracking-[0.18em] text-accent uppercase">
              How it works
            </p>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.03] tracking-[-0.015em] text-balance">
              Three steps to a better fit.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-pretty text-ink-muted">
              FitPassport begins with what you already know: the sizes that fit
              you today.
            </p>
          </div>

          <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
            {howItWorksSteps.map((step, index) => (
              <li
                key={step.title}
                className="md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <p className="font-serif text-2xl leading-none text-ink-faint">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-lg font-medium tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
