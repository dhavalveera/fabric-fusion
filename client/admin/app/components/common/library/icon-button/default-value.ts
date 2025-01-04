import buttonFilled from "./button-default-values/button-filled";
import buttonGradient from "./button-default-values/button-gradient";
import buttonOutlined from "./button-default-values/button-outlined";
import buttonText from "./button-default-values/button-text";

// Type
import type { IconButtonStyleTypes } from "./icon-button-type";

export const iconButtonDefaultValue: IconButtonStyleTypes = {
  defaultProps: {
    variant: "filled",
    size: "md",
    color: "gray",
    fullWidth: false,
    ripple: true,
  },
  valid: {
    variants: ["filled", "outlined", "gradient"],
    sizes: ["sm", "md", "lg"],
    colors: [
      "white",
      "black",
      "blue-gray",
      "gray",
      "brown",
      "deep-orange",
      "orange",
      "amber",
      "yellow",
      "lime",
      "light-green",
      "green",
      "teal",
      "cyan",
      "light-blue",
      "blue",
      "indigo",
      "deep-purple",
      "purple",
      "pink",
      "red",
    ],
  },
  styles: {
    base: {
      position: "relative",
      verticalAlign: "align-middle",
      userSelect: "select-none",
      fontFamily: "font-primaryFont",
      fontWeight: "font-medium",
      textAlign: "text-center",
      textTransform: "uppercase",
      transition: "transition-all",
      disabled: "disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none",
    },
    sizes: {
      sm: {
        width: "w-8",
        maxWidth: "max-w-[32px]",
        height: "h-8",
        maxHeight: "max-h-[32px]",
        borderRadius: "rounded-lg",
        fontSize: "text-xs",
      },
      md: {
        width: "w-10",
        maxWidth: "max-w-[40px]",
        height: "h-10",
        maxHeight: "max-h-[40px]",
        borderRadius: "rounded-lg",
        fontSize: "text-xs",
      },
      lg: {
        width: "w-12",
        maxWidth: "max-w-[48px]",
        height: "h-12",
        maxHeight: "max-h-[48px]",
        borderRadius: "rounded-lg",
        fontSize: "text-sm",
      },
    },
    variants: {
      filled: buttonFilled,
      gradient: buttonGradient,
      outlined: buttonOutlined,
      text: buttonText,
    },
  },
};
