import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "inverse" | "quiet";
export type ButtonSize = "md" | "lg";

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-45";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-ink/85",
  secondary:
    "border border-line-strong text-ink hover:border-ink hover:bg-ink/[0.03]",
  inverse: "bg-paper text-ink hover:bg-white",
  quiet: "text-ink-muted hover:text-ink",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-[0.9375rem]",
};

/**
 * Shared button styles, exported so plain anchors (for example in-page
 * `#anchor` links, which Next's router does not need to handle) can reuse them.
 */
export function buttonClassName({
  variant = "primary",
  size = "md",
  className = "",
}: ButtonStyleOptions = {}) {
  return [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonProps = ButtonBaseProps &
  (
    | ({
        href: string;
      } & Omit<
        ComponentPropsWithoutRef<typeof Link>,
        "href" | "className" | "children"
      >)
    | ({
        href?: undefined;
      } & Omit<
        ComponentPropsWithoutRef<"button">,
        "className" | "children"
      >)
  );

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, variant, size, className, children, ...linkProps } = props;

    return (
      <Link
        href={href}
        className={buttonClassName({ variant, size, className })}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const {
    variant,
    size,
    className,
    children,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
