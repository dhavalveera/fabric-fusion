import type { color, variant } from "../../timeline-types";

export interface TimelineItemStyleTypes {
  defaultProps: {
    color: color;
    variant: variant;
  };
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
    ];
    variants: ["filled", "outlined", "ghost", "gradient"];
  };
  styles: {
    base: {
      display: string;
      position: string;
      flexDirection: string;
      gap: string;
    };
  };
}
