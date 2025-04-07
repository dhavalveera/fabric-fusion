import { forwardRef } from "react";

// utils
import { cn } from "@/utils/cn";

// types
import { BadgeProps } from "@/types";

// data
import { colorMaps } from "./color-map";

const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { className = "", icon: Icon, label, variant, type, withIcon, ...rest } = props;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm whitespace-nowrap",
        variant === "filled" ? colorMaps[type][variant].bg : colorMaps[type][variant].border,
        colorMaps[type][variant].text,
        className,
      )}
      ref={ref}
      {...rest}
    >
      {withIcon && Icon ? <Icon className={cn(colorMaps.iconSize)} focusable="false" aria-hidden="true" /> : null}
      <p className="font-della-respira text-sm whitespace-nowrap capitalize">{label}</p>
    </span>
  );
});

export default Badge;
