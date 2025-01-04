import chipFilled from "./chip-variants-values/chip-filled";
import chipGhost from "./chip-variants-values/chip-ghost";
import chipGradient from "./chip-variants-values/chip-gradient";
import chipOutlined from "./chip-variants-values/chip-outlined";
import type { ChipStylesType } from "./custom-chip";

export const chipDefaultValues: ChipStylesType = {
  defaultProps: {
    variant: "filled",
    size: "md",
    color: "gray",
    icon: undefined,
    open: true,
    onClose: undefined,
    action: undefined,
    animate: {
      unmount: {},
      mount: {},
    },
    className: "",
  },
  valid: {
    variants: ["filled", "gradient", "outlined", "ghost"],
    sizes: ["sm", "md", "lg"],
    colors: [
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
      chip: {
        position: "relative",
        display: "grid",
        placeItems: "items-center",
        fontFamily: "font-primaryFont",
        fontWeight: "font-bold",
        textTransform: "uppercase",
        lineHeight: "leading-none",
        whiteSpace: "whitespace-nowrap",
        userSelect: "select-none",
      },
      action: {
        position: "!absolute",
        top: "top-2/4",
        right: "right-1",
        translate: "-translate-y-2/4",
        mx: "mx-px",
        rounded: "rounded-md",
      },
      icon: {
        position: "absolute",
        top: "top-2/4",
        translate: "-translate-y-2/4",
      },
    },
    sizes: {
      sm: {
        chip: {
          py: "py-1",
          px: "px-2",
          fontSize: "text-xs",
          borderRadius: "rounded-md",
        },
        action: {
          width: "w-4",
          height: "h-4",
        },
        icon: {
          width: "w-4",
          height: "h-4",
          left: "left-1",
        },
      },
      md: {
        chip: {
          py: "py-1.5",
          px: "px-3",
          fontSize: "text-xs",
          borderRadius: "rounded-lg",
        },
        action: {
          width: "w-5",
          height: "h-5",
        },
        icon: {
          width: "w-5",
          height: "h-5",
          left: "left-1.5",
        },
      },
      lg: {
        chip: {
          py: "py-2",
          px: "px-4",
          fontSize: "text-xs",
          borderRadius: "rounded-lg",
        },
        action: {
          width: "w-6",
          height: "h-6",
        },
        icon: {
          width: "w-6",
          height: "h-6",
          left: "left-1.5",
        },
      },
    },
    variants: {
      filled: chipFilled,
      gradient: chipGradient,
      outlined: chipOutlined,
      ghost: chipGhost,
    },
  },
};
