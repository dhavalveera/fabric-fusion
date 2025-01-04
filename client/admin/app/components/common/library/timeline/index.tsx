import { forwardRef, type HTMLAttributes } from "react";

// Helpers
import { clsx } from "~/helpers/clsx";

// Utils
import { objectToString } from "~/utils/object-to-string";

// Value
import { timelineDefaultValue } from "./theme/timeline/theme";

const Timeline = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>((props, ref) => {
  const { className = "", children, ...rest } = props;

  const {
    styles: { base },
  } = timelineDefaultValue;

  return (
    <ul ref={ref} {...rest} className={clsx([objectToString(base), className])}>
      {children}
    </ul>
  );
});

export default Timeline;
