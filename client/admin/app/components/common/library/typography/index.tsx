import { forwardRef } from "react";

// Types
import type { TypographyProps } from "./typography-types";

// FInd Match
import { getTypographyElement } from "./template";

const Typography = forwardRef<HTMLElement, TypographyProps>((props, ref) => {
  let { variant = "paragraph", color = "inherit", textGradient, as, className = "", children, ...rest } = props;

  const element = getTypographyElement(variant, color, textGradient, as, { ...rest, className }, ref, children);

  return element;
});

export default Typography;
