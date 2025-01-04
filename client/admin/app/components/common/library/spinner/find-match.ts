// Utils
import { objectToString } from "~/utils/object-to-string";

// Default Value
import { spinnerDefaultValue } from "./default-value";

// types
import type { color as ColorType, SpinnerStyleTypes } from "./spinner-type";

const findMatch = (data: Array<string> | undefined, find: string, defaultValue: string): string => {
  // Check if `data` includes the value
  return data?.includes(find) ? find : defaultValue;
};

export const spinnerColorFindMatch = (color: ColorType): string => {
  const { colors } = spinnerDefaultValue.styles as Required<SpinnerStyleTypes>["styles"];

  const validSizes: ColorType[] = Object.keys(colors || {}) as ColorType[];

  const matchedColor: ColorType = findMatch(validSizes, color, "gray") as ColorType;

  return objectToString(colors[matchedColor] ?? {});
};
