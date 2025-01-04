import spinnerColor from "./spinner-color";
import type { SpinnerStyleTypes } from "./spinner-type";

export const spinnerDefaultValue: SpinnerStyleTypes = {
  defaultProps: {
    color: "gray",
  },
  valid: {
    colors: [
      "white",
      "blue-gray",
      "gray",
      "brown",
      "deep-orange",
      "orange",
      "amber",
      "yellow",
      "lime",
      "light-green",
      "green",
      "teal",
      "cyan",
      "light-blue",
      "blue",
      "indigo",
      "deep-purple",
      "purple",
      "pink",
      "red",
    ],
  },
  styles: {
    base: {
      color: "text-gray-300",
      animation: "animate-spin",
    },
    colors: spinnerColor,
  },
};
