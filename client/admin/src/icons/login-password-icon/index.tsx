import { forwardRef, type SVGProps } from "react";

// Utils
import { cn } from "@/utils/cn";

export const LoginPasswordIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(({ className = "", ...rest }, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("size-4 shrink-0 text-gray-500 dark:text-neutral-500", className)}
      fill="none"
      stroke="currentColor"
      ref={ref}
      {...rest}
    >
      <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
      <circle cx="16.5" cy="7.5" r=".5" />
    </svg>
  );
});
