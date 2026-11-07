const sizes = ["XS", "S", "M", "L", "XL"] as const;

/**
 * A purely illustrative Fit Passport card. It intentionally contains no real
 * brand data or recommendations — the dashboard starts empty for every user.
 */
export function PassportCard() {
  return (
    <figure className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-6 -bottom-3 h-24 rounded-b-card border border-line/70 bg-paper-raised/50"
      />

      <div className="relative rounded-card border border-line bg-paper-raised p-6 shadow-[0_1px_2px_rgba(20,20,15,0.04),0_28px_56px_-40px_rgba(20,20,15,0.28)] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
              Fit Passport
            </p>
            <p className="mt-1.5 text-sm text-ink-faint">Men’s T-shirt</p>
          </div>
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong font-serif text-sm"
          >
            FP
          </span>
        </div>

        <div className="mt-10 flex items-end justify-between gap-4 border-b border-line pb-6">
          <p className="font-serif text-[5rem] leading-[0.78] tracking-[-0.03em] sm:text-[5.5rem]">
            M
          </p>
          <p className="pb-1 text-right text-[0.65rem] uppercase tracking-[0.14em] text-ink-faint">
            Your usual size
          </p>
        </div>

        <div className="mt-6 flex items-center gap-1.5">
          {sizes.map((size) => {
            const isSelected = size === "M";

            return (
              <span
                key={size}
                className={
                  isSelected
                    ? "flex h-9 flex-1 items-center justify-center rounded-full bg-ink text-xs font-medium text-paper"
                    : "flex h-9 flex-1 items-center justify-center rounded-full border border-line text-xs text-ink-faint"
                }
              >
                {size}
              </span>
            );
          })}
        </div>
      </div>

      <figcaption className="mt-6 text-center text-xs text-ink-faint">
        An illustration of a Fit Passport. Yours starts empty.
      </figcaption>
    </figure>
  );
}
