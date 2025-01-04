import type { asType, color, textGradient, variant } from "../typography-types";

// Theme
import type { typographyDefaultValues } from "./theme";
import type typographyColors from "./typography-colors";

export interface TypographyStylesType {
  defaultProps: {
    variant: variant;
    color: color;
    as: asType;
    textGradient: textGradient;
  };
  valid: {
    variants: typeof typographyDefaultValues.valid.variants;
    colors: typeof typographyDefaultValues.valid.colors;
  };
  styles: {
    variants: {
      h1: typeof typographyDefaultValues.styles.variants.h1;
      h2: typeof typographyDefaultValues.styles.variants.h2;
      h3: typeof typographyDefaultValues.styles.variants.h3;
      h4: typeof typographyDefaultValues.styles.variants.h4;
      h5: typeof typographyDefaultValues.styles.variants.h5;
      h6: typeof typographyDefaultValues.styles.variants.h6;
      lead: typeof typographyDefaultValues.styles.variants.lead;
      paragraph: typeof typographyDefaultValues.styles.variants.paragraph;
      small: typeof typographyDefaultValues.styles.variants.small;
    };
    textGradient: typeof typographyDefaultValues.styles.textGradient;
    colors: typeof typographyColors;
  };
}

export type TypographyColorsInnerProps = {
  color: string;
  gradient?: string;
};

export type TypographyColorsProps = {
  inherit: TypographyColorsInnerProps;
  current: TypographyColorsInnerProps;
  black: TypographyColorsInnerProps;
  white: TypographyColorsInnerProps;
  "blue-gray": TypographyColorsInnerProps;
  gray: TypographyColorsInnerProps;
  brown: TypographyColorsInnerProps;
  "deep-orange": TypographyColorsInnerProps;
  orange: TypographyColorsInnerProps;
  amber: TypographyColorsInnerProps;
  yellow: TypographyColorsInnerProps;
  lime: TypographyColorsInnerProps;
  "light-green": TypographyColorsInnerProps;
  green: TypographyColorsInnerProps;
  teal: TypographyColorsInnerProps;
  cyan: TypographyColorsInnerProps;
  "light-blue": TypographyColorsInnerProps;
  blue: TypographyColorsInnerProps;
  indigo: TypographyColorsInnerProps;
  "deep-purple": TypographyColorsInnerProps;
  purple: TypographyColorsInnerProps;
  pink: TypographyColorsInnerProps;
  red: TypographyColorsInnerProps;
};
