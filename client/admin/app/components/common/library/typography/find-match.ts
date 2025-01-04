// Utils
import { objectToString } from "~/utils/object-to-string";

// types
import type { color as ColorType, variant as VariantType } from "./typography-types";
import type { TypographyStylesType } from "./theme";

// Values
import { typographyDefaultValues } from "./theme/theme";

const findMatch = (data: Array<string> | undefined, find: string, defaultValue: string): string => {
  // Check if `data` includes the value
  return data?.includes(find) ? find : defaultValue;
};

const colorFinder = (colors: Array<string>, find: string, defaultValue: string): string => {
  return colors.includes(find) ? find : defaultValue;
};

export const variantFindMatch = (variant: VariantType): string => {
  const { variants } = typographyDefaultValues.styles as Required<TypographyStylesType>["styles"];

  const validVariants: VariantType[] = Object.keys(variants || {}) as VariantType[];

  const matchedVariant: VariantType = findMatch(validVariants, variant, "paragraph") as VariantType;

  return objectToString(variants[matchedVariant] ?? variants.paragraph);
};

export const colorFindMatch = (colorVariant: ColorType) => {
  const { colors } = typographyDefaultValues.styles as Required<TypographyStylesType>["styles"];

  const validColors: ColorType[] = Object.keys(colors || {}) as ColorType[];

  const founded = validColors.findIndex(el => el === colorVariant);

  return colors[founded >= 0 ? colorVariant : "inherit"];
};
