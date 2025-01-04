import type { color, variant } from "../../timeline-types";

// Colors
import type filled from "./colors/filled";
import type ghost from "./colors/ghost";
import type gradient from "./colors/gradient";
import type outlined from "./colors/outlined";

export interface TimelineIconStyleTypes {
  defaultProps: {
    color: color;
    variant: variant;
  };
  valid: {
    colors: string[];
    variants: string[];
  };
  styles: {
    base: {
      width: string;
      height: string;
      padding: string;
      position: string;
      zIndex: string;
      flexShrink: string;
      borderRadius: string;
      overflow: string;
    };
    variants: {
      ghost: typeof ghost;
      filled: typeof filled;
      outlined: typeof outlined;
      gradient: typeof gradient;
    };
  };
}
