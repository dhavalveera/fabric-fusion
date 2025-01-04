import type { HTMLProps, ReactNode } from "react";

// framer-motion
import type { AnimatePresenceProps, MotionProps } from "framer-motion";

// Chip Variants
import type chipFilled from "./chip-variants-values/chip-filled";
import type chipGradient from "./chip-variants-values/chip-gradient";
import type chipOutlined from "./chip-variants-values/chip-outlined";
import type chipGhost from "./chip-variants-values/chip-ghost";

export type colors =
  | "blue-gray"
  | "gray"
  | "brown"
  | "deep-orange"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "light-green"
  | "green"
  | "teal"
  | "cyan"
  | "light-blue"
  | "blue"
  | "indigo"
  | "deep-purple"
  | "purple"
  | "pink"
  | "red";

export interface NewAnimatePresenceProps extends Omit<AnimatePresenceProps, "children"> {
  children: React.ReactNode;
}

export type animation = {
  initial?: object;
  mount?: object;
  unmount?: object;
};

export type variant = "filled" | "gradient" | "outlined" | "ghost";
export type size = "sm" | "md" | "lg";
export type color = colors;
export type icon = ReactNode;
export type open = boolean;
export type onClose = () => void;
export type action = ReactNode;
export type dismissible = {
  action?: ReactNode;
  onClose: () => void;
};
export type animate = animation;
export type value = ReactNode;

export type ChipSizes = {
  chip: {
    py: string;
    px: string;
    fontSize: string;
    borderRadius: string;
  };
  action: {
    width: string;
    height: string;
  };
  icon: {
    width: string;
    height: string;
    left: string;
  };
};

export interface ChipStylesType {
  defaultProps: {
    variant: variant;
    size: size;
    color: color;
    icon: icon;
    open: open;
    onClose?: onClose;
    action: action;
    animate: animate;
    className: string;
  };
  valid: {
    variants: ["filled", "gradient", "outlined", "ghost"];
    sizes: ["sm", "md", "lg"];
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
    ];
  };
  styles: {
    base: {
      chip: {
        position: string;
        display: string;
        placeItems: string;
        fontFamily: string;
        fontWeight: string;
        textTransform: string;
        lineHeight: string;
        whiteSpace: string;
        userSelect: string;
      };
      action: {
        position: string;
        top: string;
        right: string;
        translate: string;
        mx: string;
        rounded: string;
      };
      icon: { position: string; top: string; translate: string };
    };
    sizes: {
      sm: ChipSizes;
      md: ChipSizes;
      lg: ChipSizes;
    };
    variants: {
      filled: typeof chipFilled;
      gradient: typeof chipGradient;
      outlined: typeof chipOutlined;
      ghost: typeof chipGhost;
    };
  };
}

export type ChipVariantInnerProps = {
  backgroud: string;
  color: string;
};

export type ChipVariantsProps = {
  "blue-gray": ChipVariantInnerProps;
  gray: ChipVariantInnerProps;
  brown: ChipVariantInnerProps;
  "deep-orange": ChipVariantInnerProps;
  orange: ChipVariantInnerProps;
  amber: ChipVariantInnerProps;
  yellow: ChipVariantInnerProps;
  lime: ChipVariantInnerProps;
  "light-green": ChipVariantInnerProps;
  green: ChipVariantInnerProps;
  teal: ChipVariantInnerProps;
  cyan: ChipVariantInnerProps;
  "light-blue": ChipVariantInnerProps;
  blue: ChipVariantInnerProps;
  indigo: ChipVariantInnerProps;
  "deep-purple": ChipVariantInnerProps;
  purple: ChipVariantInnerProps;
  pink: ChipVariantInnerProps;
  red: ChipVariantInnerProps;
};

export interface ChipProps extends Omit<MotionProps, "animate"> {
  variant?: variant;
  size?: size;
  color?: color;
  icon?: icon;
  open?: open;
  onClose?: onClose;
  action?: action;
  animate?: animate;
  value: value;
  className?: string;
}
