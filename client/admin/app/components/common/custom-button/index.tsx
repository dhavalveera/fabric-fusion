import { forwardRef, type ComponentProps } from "react";

// Helpers => clsx to Join multiple ClassNames
import { clsx } from "~/helpers/clsx";

type ButtonSize = "sm" | "md" | "lg";
type ButtonType = "primary" | "secondary" | "ghost";

interface ButtonProps extends ComponentProps<"button"> {
  buttonLabel: string;
  size?: ButtonSize;
  buttonType?: ButtonType;
}

export const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { buttonLabel, className = "", size = "md", buttonType = "primary", ...rest } = props;

  const typeClasses: string =
    buttonType === "primary" ? "bg-primaryColor text-white hover:opacity-70" : buttonType === "secondary" ? "bg-secondaryColor text-white hover:opacity-70" : "bg-transparent text-neutral-cool-gray ";

  const disabledClass: string = "disabled:cursor-no-drop disabled:border-none disabled:bg-[#cccccc] disabled:text-[#666666] disabled:hover:opacity-100";

  const sizeClasses: string = size === "sm" ? "text-sm p-1" : size === "lg" ? "text-lg px-5 py-2 font-medium" : "px-5 py-2 font-medium";

  return (
    <button className={clsx(["rounded", className, typeClasses, sizeClasses, disabledClass])} ref={ref} {...rest}>
      {buttonLabel}
    </button>
  );
});

CustomButton.displayName = "Button";
