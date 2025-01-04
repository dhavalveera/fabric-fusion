import { forwardRef, type HTMLAttributes } from "react";

// Helpers
import { clsx } from "~/helpers/clsx";

// Utils
import { objectToString } from "~/utils/object-to-string";

// Values
import { timelineHeaderDefaultValue } from "./theme/header/theme";

const TimelineHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { children, className = "", ...rest } = props;

  const {
    styles: { base },
  } = timelineHeaderDefaultValue;

  return (
    <div {...rest} ref={ref} className={clsx([objectToString(base), className])}>
      {children}
    </div>
  );
});

export default TimelineHeader;
