import { createElement, type ReactNode, type Ref } from "react";

// Helpers
import { clsx } from "~/helpers/clsx";

// Utils
import { objectToString } from "~/utils/object-to-string";
import { colorFindMatch, variantFindMatch } from "./find-match";

// Types
import type { TypographyProps } from "./typography-types";

// Default Values
import { typographyDefaultValues } from "./theme/theme";

export const getTypographyElement = (
  variant: TypographyProps["variant"],
  color: TypographyProps["color"],
  textGradient: TypographyProps["textGradient"],
  as: TypographyProps["as"],
  rest: TypographyProps,
  ref: Ref<HTMLElement>,
  children: ReactNode,
) => {
  const { className = "", ...otherRest } = rest;

  const {
    defaultProps,
    styles: { textGradient: gradient },
  } = typographyDefaultValues;

  // Default Props
  variant = variant ?? defaultProps.variant;
  color = color ?? defaultProps.color;
  textGradient = textGradient ?? defaultProps.textGradient;
  as = as ?? defaultProps.as;

  // Set Styles
  const typographyVariant = variantFindMatch(variant);
  const typographyColor = colorFindMatch(color);
  const gradientTextClasses = objectToString(gradient);
  const classes = clsx([typographyVariant, !textGradient ? typographyColor.color : "", textGradient ? gradientTextClasses : "", textGradient ? String(typographyColor.gradient) : "", className]);

  switch (variant) {
    case "h1":
      return createElement(as || "h1", { ...otherRest, ref, className: classes }, children);
    case "h2":
      return createElement(as || "h2", { ...otherRest, ref, className: classes }, children);
    case "h3":
      return createElement(as || "h3", { ...otherRest, ref, className: classes }, children);
    case "h4":
      return createElement(as || "h4", { ...otherRest, ref, className: classes }, children);
    case "h5":
      return createElement(as || "h5", { ...otherRest, ref, className: classes }, children);
    case "h6":
      return createElement(as || "h6", { ...otherRest, ref, className: classes }, children);
    case "lead":
      return createElement(as || "p", { ...otherRest, ref, className: classes }, children);
    case "paragraph":
      return createElement(as || "p", { ...otherRest, ref, className: classes }, children);
    case "small":
      return createElement(as || "p", { ...otherRest, ref, className: classes }, children);
  }
};
