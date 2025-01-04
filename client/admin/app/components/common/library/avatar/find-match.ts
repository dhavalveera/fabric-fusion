import { objectToString } from "~/utils/object-to-string";

import { avatarValues } from "./default-values";
import type { AvatarStyleTypes, color as ColorType, size as SizeType, variant as VariantType } from "./types";

export const findMatch = (data: Array<string> | undefined, find: string, defaultValue: string): string => {
  // Check if `data` includes the value
  return data?.includes(find) ? find : defaultValue;
};

export const colorFindMatch = (variant: ColorType): string => {
  const { borderColor } = avatarValues.styles as Required<AvatarStyleTypes>["styles"];

  const validColors: ColorType[] = Object.keys(borderColor || {}) as ColorType[];

  const matchedColor = findMatch(validColors, variant, "gray");

  return objectToString(borderColor[matchedColor] ?? { borderColor: "border-gray-900" });
};

export const sizeFindMatch = (variant: SizeType): string => {
  const { sizes } = avatarValues.styles as Required<AvatarStyleTypes>["styles"];

  const validSizes: SizeType[] = Object.keys(sizes || {}) as SizeType[];

  const matchedSize: SizeType = findMatch(validSizes, variant, "md") as SizeType;

  return objectToString(sizes[matchedSize] ?? { width: "w-12", height: "h-12", borderRadius: "rounded-lg" });
};

export const variantFindMatch = (variant: VariantType): string => {
  const { variants } = avatarValues.styles as Required<AvatarStyleTypes>["styles"];

  const validVariants: VariantType[] = Object.keys(variants || {}) as VariantType[];

  const matchedVariant: VariantType = findMatch(validVariants, variant, "rounded") as VariantType;

  return objectToString(variants[matchedVariant] ?? { borderRadius: "rounded-lg" });
};
