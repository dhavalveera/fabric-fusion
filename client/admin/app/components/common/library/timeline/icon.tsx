import { forwardRef, useEffect, useRef } from "react";

// Helpers
import { clsx } from "~/helpers/clsx";

// Utils
import { objectToString } from "~/utils/object-to-string";
import { useMergeRefs } from "./utils/use-merge-ref";

// Types
import type { TimelineIconProps } from "./timeline-types";

// Values
import { timelineIconDefaultValue } from "./theme/icon/icon";

// Timeline Item
import { useTimelineItem } from "./item";

// Find Item
import { variantFindMatch } from "./find-match";

const TimelineIcon = forwardRef<HTMLSpanElement, TimelineIconProps>((props, ref) => {
  const { children, className = "", color = "gray", variant = "filled", ...rest } = props;

  const {
    styles: { base },
  } = timelineIconDefaultValue;

  const [, setWidth] = useTimelineItem();

  const innerRef = useRef<HTMLSpanElement | null>(null);
  const mergedRef = useMergeRefs([ref, innerRef]);

  useEffect(() => {
    const iconElement = innerRef.current;

    if (iconElement) {
      const { width } = iconElement.getBoundingClientRect();

      setWidth(width);

      return () => {
        setWidth(0);
      };
    }
  }, [setWidth, className, children]);

  const variantClasses = variantFindMatch(variant, color);

  return (
    <span ref={mergedRef} {...rest} className={clsx([objectToString(base), variantClasses, className])}>
      {children}
    </span>
  );
});

export default TimelineIcon;
