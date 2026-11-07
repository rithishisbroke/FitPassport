import { ClosingCta } from "@/components/marketing/closing-cta";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ProblemSection } from "@/components/marketing/problem-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <ClosingCta />
    </>
  );
}
