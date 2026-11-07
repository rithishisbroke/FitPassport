import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({ className = "", children, ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
