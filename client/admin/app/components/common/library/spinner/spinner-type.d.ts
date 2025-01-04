import type { ComponentProps } from "react";
import type spinnerColor from "./spinner-color";

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

export type color = colors;

export interface SpinnerProps extends ComponentProps<"svg"> {
  color?: color;
}

export interface SpinnerStyleTypes {
  defaultProps: {
    color: color;
  };
  valid: {
    colors: Array<string>;
  };
  styles: {
    base: { color: string; animation: string };
    colors: typeof spinnerColor;
  };
}
