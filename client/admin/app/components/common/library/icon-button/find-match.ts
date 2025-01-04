// Utils
import { objectToString } from "~/utils/object-to-string";

// Types
import type { ButtonDefaultItemProps, ButtonDefaultProps, color as ColorType, IconButtonStyleTypes, size as SizeType, variant as VariantType } from "./icon-button-type";
import type { ButtonTextItemProps, ButtonTextProps } from "./button-default-values/button-text";

// Default Values
import { iconButtonDefaultValue } from "./default-value";

const findMatch = (data: Array<string> | undefined, find: string, defaultValue: string): string => {
  // Check if `data` includes the value
  return data?.includes(find) ? find : defaultValue;
};

const colorFinder = (colors: Array<string>, find: string, defaultValue: string): string => {
  return colors.includes(find) ? find : defaultValue;
};

export const sizeFindMatch = (variant: SizeType): string => {
  const { sizes } = iconButtonDefaultValue.styles as Required<IconButtonStyleTypes>["styles"];

  const validSizes: SizeType[] = Object.keys(sizes || {}) as SizeType[];

  const matchedSize: SizeType = findMatch(validSizes, variant, "md") as SizeType;

  return objectToString(sizes[matchedSize] ?? sizes.sm);
};

export const variantFindMatch = (variant: VariantType, color: ColorType): string => {
  const { colors } = iconButtonDefaultValue.valid as Required<IconButtonStyleTypes>["valid"];
  const { variants } = iconButtonDefaultValue.styles as Required<IconButtonStyleTypes>["styles"];

  const validVariants: VariantType[] = Object.keys(variants || {}) as VariantType[];

  const matchedVariant: keyof typeof variants = findMatch(validVariants, variant, "filled") as keyof typeof variants;
  const matchedColor: keyof ButtonDefaultProps | keyof ButtonTextProps = colorFinder(colors, color, "gray") as keyof ButtonDefaultProps | keyof ButtonTextProps;

  const variantObject = (variants[matchedVariant] as Record<string, ButtonDefaultItemProps | ButtonTextItemProps>) ?? {};
  const colorObject = variantObject[matchedColor] ?? {};

  return objectToString(colorObject);
};
