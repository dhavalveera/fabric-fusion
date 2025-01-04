import type { ComponentProps } from "react";

// Button Default Values
import type buttonFilled from "./button-default-values/button-filled";
import type buttonGradient from "./button-default-values/button-gradient";
import type buttonOutlined from "./button-default-values/button-outlined";
import type buttonText from "./button-default-values/button-text";

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

export type variant = "filled" | "outlined" | "gradient" | "text";
export type size = "sm" | "md" | "lg";
export type color = "white" | "black" | colors;
export type ripple = boolean;

type ButtonDefaultItemProps = {
  background: string;
  color: string;
  shadow: string;
  hover: string;
  focus: string;
  active: string;
};

export type ButtonDefaultProps = {
  white: ButtonDefaultItemProps;
  black: ButtonDefaultItemProps;
  "blue-gray": ButtonDefaultItemProps;
  gray: ButtonDefaultItemProps;
  brown: ButtonDefaultItemProps;
  "deep-orange": ButtonDefaultItemProps;
  orange: ButtonDefaultItemProps;
  amber: ButtonDefaultItemProps;
  yellow: ButtonDefaultItemProps;
  lime: ButtonDefaultItemProps;
  "light-green": ButtonDefaultItemProps;
  green: ButtonDefaultItemProps;
  teal: ButtonDefaultItemProps;
  cyan: ButtonDefaultItemProps;
  "light-blue": ButtonDefaultItemProps;
  blue: ButtonDefaultItemProps;
  indigo: ButtonDefaultItemProps;
  "deep-purple": ButtonDefaultItemProps;
  purple: ButtonDefaultItemProps;
  pink: ButtonDefaultItemProps;
  red: ButtonDefaultItemProps;
};

type IconButtonSizeProps = {
  width: string;
  maxWidth: string;
  height: string;
  maxHeight: string;
  borderRadius: string;
  fontSize: string;
};

export interface IconButtonStyleTypes {
  defaultProps: {
    variant: variant;
    size: size;
    color: color;
    fullWidth: fullWidth;
    ripple: ripple;
  };
  valid: {
    variants: variant[];
    sizes: size[];
    colors: color[];
  };
  styles: {
    base: {
      position: string;
      verticalAlign: string;
      userSelect: string;
      fontFamily: string;
      fontWeight: string;
      textAlign: string;
      textTransform: string;
      transition: string;
      disabled: string;
    };
    sizes: {
      sm: IconButtonSizeProps;
      md: IconButtonSizeProps;
      lg: IconButtonSizeProps;
    };
    variants: {
      filled: typeof buttonFilled;
      gradient: typeof buttonGradient;
      outlined: typeof buttonOutlined;
      text: typeof buttonText;
    };
  };
}

export interface IconButtonProps extends ComponentProps<"button"> {
  variant?: variant;
  size?: size;
  color?: color;
  ripple?: boolean;
  fullWidth?: boolean;
}
