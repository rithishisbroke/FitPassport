import Link from "next/link";

type WordmarkProps = {
  href?: string;
  tone?: "ink" | "paper";
  className?: string;
};

export function Wordmark({
  href = "/",
  tone = "ink",
  className = "",
}: WordmarkProps) {
  const monogramStyles =
    tone === "ink" ? "bg-ink text-paper" : "bg-paper text-ink";
  const textStyles = tone === "ink" ? "text-ink" : "text-paper";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 rounded-sm ${textStyles} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex size-8 shrink-0 items-center justify-center rounded-[0.55rem] font-serif text-[0.95rem] leading-none ${monogramStyles}`}
      >
        F
      </span>
      <span className="text-[1.0625rem] font-semibold tracking-[-0.015em]">
        FitPassport
      </span>
    </Link>
  );
}
