import type { avatarBorderColor } from "./default-values";

export type variant = "circular" | "rounded" | "square";
export type size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type color =
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

export interface AvatarStyleTypes {
  defaultProps?: {
    variant?: variant;
    size?: size;
    className?: className;
    withBorder?: withBorder;
    color?: color;
  };
  valid?: {
    variants: { [key: string]: string };
    sizes: { [key: string]: string };
    colors: { [key: string]: string };
  };
  styles: {
    base?: {
      initial?: object;
      withBorder?: object;
    };
    sizes: {
      xs: {
        width: string;
        height: string;
        borderRadius: string;
      };
      sm: {
        width: string;
        height: string;
        borderRadius: string;
      };
      md: {
        width: string;
        height: string;
        borderRadius: string;
      };
      lg: {
        width: string;
        height: string;
        borderRadius: string;
      };
      xl: {
        width: string;
        height: string;
        borderRadius: string;
      };
      xxl: {
        width: string;
        height: string;
        borderRadius: string;
      };
    };
    variants: {
      square: { borderRadius: string };
      rounded: { borderRadius: string };
      circular: { borderRadius: string };
    };
    borderColor?: typeof avatarBorderColor;
  };
}
