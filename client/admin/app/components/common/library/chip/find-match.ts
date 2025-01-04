// Utils
import { objectToString } from "~/utils/object-to-string";

// default values
import { chipDefaultValues } from "./default-value";

// types
import type { ChipStylesType, ChipVariantInnerProps, ChipVariantsProps, color as ColorType, size as SizeType, variant as VariantType } from "./custom-chip";
import type { ChipOutlinedInnerProps, ChipOutlinedProps } from "./chip-variants-values/chip-outlined";

const findMatch = (data: Array<string> | undefined, find: string, defaultValue: string): string => {
  // Check if `data` includes the value
  return data?.includes(find) ? find : defaultValue;
};

const colorFinder = (colors: Array<string>, find: string, defaultValue: string): string => {
  return colors.includes(find) ? find : defaultValue;
};

export const variantFindMatch = (variant: VariantType, color: ColorType): string => {
  const { colors } = chipDefaultValues.valid as Required<ChipStylesType>["valid"];
  const { variants } = chipDefaultValues.styles as Required<ChipStylesType>["styles"];

  const validVariants: VariantType[] = Object.keys(variants || {}) as VariantType[];

  const matchedVariant: keyof typeof variants = findMatch(validVariants, variant, "filled") as keyof typeof variants;
  const matchedColor: keyof ChipVariantsProps | keyof ChipOutlinedProps = colorFinder(colors, color, "gray") as keyof ChipVariantsProps | keyof ChipOutlinedProps;

  const variantObject = (variants[matchedVariant] as Record<string, ChipVariantInnerProps | ChipOutlinedInnerProps>) ?? {};
  const colorObject = variantObject[matchedColor] ?? {};

  return objectToString(colorObject);
};

export const chipSizeFinder = (size: SizeType): string => {
  const { sizes } = chipDefaultValues.styles as Required<ChipStylesType>["styles"];

  const validSizes: SizeType[] = Object.keys(sizes || {}) as SizeType[];

  const matchedSize: keyof typeof sizes = findMatch(validSizes, size, "md") as keyof typeof sizes;

  const chipSizeObject = sizes[matchedSize]["chip"] ?? {};

  return objectToString(chipSizeObject);
};

export const chipActionSizeFinder = (actionSize: SizeType): string => {
  const { sizes } = chipDefaultValues.styles as Required<ChipStylesType>["styles"];

  const validSizes: SizeType[] = Object.keys(sizes || {}) as SizeType[];

  const matchedSize: keyof typeof sizes = findMatch(validSizes, actionSize, "md") as keyof typeof sizes;

  const actionSizeObject = sizes[matchedSize]["action"] ?? {};

  return objectToString(actionSizeObject);
};

export const chipIconSizeFinder = (iconSize: SizeType): string => {
  const { sizes } = chipDefaultValues.styles as Required<ChipStylesType>["styles"];

  const validSizes: SizeType[] = Object.keys(sizes || {}) as SizeType[];

  const matchedSize: keyof typeof sizes = findMatch(validSizes, iconSize, "md") as keyof typeof sizes;

  const iconSizeObject = sizes[matchedSize]["icon"] ?? {};

  return objectToString(iconSizeObject);
};
