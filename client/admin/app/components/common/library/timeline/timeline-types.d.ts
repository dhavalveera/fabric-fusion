import type { HTMLAttributes } from "react";

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

export type color = "white" | colors;
export type variant = "filled" | "outlined" | "ghost" | "gradient";

export interface TimelineIconProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: variant;
  color?: color;
}
