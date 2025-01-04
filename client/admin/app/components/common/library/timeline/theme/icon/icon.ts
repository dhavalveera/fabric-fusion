import ghost from "./colors/ghost";
import filled from "./colors/filled";
import outlined from "./colors/outlined";
import gradient from "./colors/gradient";

import type { TimelineIconStyleTypes } from ".";

export const timelineIconDefaultValue: TimelineIconStyleTypes = {
  defaultProps: {
    color: "gray",
    variant: "filled",
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
    variants: ["filled", "outlined", "ghost", "gradient"],
  },
  styles: {
    base: {
      width: "w-max",
      height: "w-max",
      padding: "p-1.5",
      position: "relative",
      zIndex: "z-[2]",
      flexShrink: "flex-shrink-0",
      borderRadius: "rounded-full",
      overflow: "overflow-hidden",
    },
    variants: {
      ghost,
      filled,
      outlined,
      gradient,
    },
  },
};
