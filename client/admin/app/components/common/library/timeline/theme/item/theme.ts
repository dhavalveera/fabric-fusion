import type { TimelineItemStyleTypes } from ".";

export const timelineItemDefaultValue: TimelineItemStyleTypes = {
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
      display: "flex",
      position: "relative",
      flexDirection: "flex-col",
      gap: "gap-2",
    },
  },
};
