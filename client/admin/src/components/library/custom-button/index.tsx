import { forwardRef } from "react";

// utils
import { cn } from "@/utils/cn";

// UI
import { btnSizeVariant } from "@/ui";

// types
import type { CustomButtonProps } from "@/types";

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>((props, ref) => {
  const { className = "", btnLabel, btnSize = "md", icon: Icon, iconPlacement = "start", ...rest } = props;

  return (
    <button
      ref={ref}
      {...rest}
      className={cn(
        "from-primary-color to-secondary-color inline-flex cursor-pointer items-center justify-center rounded-md bg-gradient-to-r font-medium text-white capitalize transition-all hover:from-[#027a88] hover:to-[#e26f15] focus:outline-none disabled:cursor-not-allowed disabled:border-none disabled:bg-[#cccccc] disabled:text-[#666666] disabled:opacity-50",
        btnSizeVariant[btnSize],
        className,
      )}
    >
      {Icon && iconPlacement === "start" ? <Icon fill="currentColor" stroke="currentColor" aria-hidden="true" focusable="false" /> : null}

      <span>{btnLabel}</span>

      {Icon && iconPlacement === "end" ? <Icon fill="currentColor" stroke="currentColor" aria-hidden="true" focusable="false" /> : null}
    </button>
  );
});

CustomButton.displayName = "Button";

export default CustomButton;
