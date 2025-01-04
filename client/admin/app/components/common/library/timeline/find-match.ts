// Utils
import { objectToString } from "~/utils/object-to-string";

// types
import type { variant as VariantType, color as ColorType } from "./timeline-types";
import type { TimelineIconStyleTypes } from "./theme/icon";

// Default Value
import { timelineIconDefaultValue } from "./theme/icon/icon";
import type { CommonIconColorInnerProps, CommonIconColorProps, OutlinedIconColorInnerProps, OutlinedIconColorProps } from "./theme/icon/colors/common";

const findMatch = (data: Array<string> | undefined, find: string, defaultValue: string): string => {
  // Check if `data` includes the value
  return data?.includes(find) ? find : defaultValue;
};

const colorFinder = (colors: Array<string>, find: string, defaultValue: string): string => {
  return colors.includes(find) ? find : defaultValue;
};

export const variantFindMatch = (variant: VariantType, color: ColorType): string => {
  const { colors } = timelineIconDefaultValue.valid as Required<TimelineIconStyleTypes>["valid"];
  const { variants } = timelineIconDefaultValue.styles as Required<TimelineIconStyleTypes>["styles"];

  const validVariants: VariantType[] = Object.keys(variants || {}) as VariantType[];

  const matchedVariant: keyof typeof variants = findMatch(validVariants, variant, "filled") as keyof typeof variants;
  const matchedColor: keyof CommonIconColorProps | keyof OutlinedIconColorProps = colorFinder(colors, color, "gray") as keyof CommonIconColorProps | keyof OutlinedIconColorProps;

  const variantObject = (variants[matchedVariant] as Record<string, CommonIconColorInnerProps | OutlinedIconColorInnerProps>) ?? {};
  const colorObject = variantObject[matchedColor] ?? {};

  return objectToString(colorObject);
};
