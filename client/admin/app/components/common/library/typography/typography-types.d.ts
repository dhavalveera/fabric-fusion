import type { ComponentProps, JSX } from "react";

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

export type variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "lead" | "paragraph" | "small";
export type color = "inherit" | "current" | "black" | "white" | colors;
export type asType = ElementType;
export type textGradient = boolean;

type Props<T extends keyof JSX.IntrinsicElements> = ComponentProps<T>;

export type BaseTypographyProps = Props<"p"> & Props<"h1"> & Props<"h2"> & Props<"h3"> & Props<"h4"> & Props<"h5"> & Props<"h6"> & Props<"a">;

export interface TypographyProps extends BaseTypographyProps {
  variant?: variant;
  color?: color;
  textGradient?: textGradient;
  as?: asType;
}
