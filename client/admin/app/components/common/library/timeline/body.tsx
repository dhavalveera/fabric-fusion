import { forwardRef, type HTMLAttributes } from "react";

// Helpers
import { clsx } from "~/helpers/clsx";

// Utils
import { objectToString } from "~/utils/object-to-string";

// default value
import { timelineBodyDefaultValue } from "./theme/body/theme";

// Timeline Item
import { useTimelineItem } from "./item";

const TimelineBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { children, className = "", ...rest } = props;

  const {
    styles: { base },
  } = timelineBodyDefaultValue;

  const [width] = useTimelineItem();

  return (
    <div {...rest} ref={ref} className={clsx([objectToString(base), className])}>
      <span
        className="invisible pointer-events-none h-full flex-shrink-0"
        style={{
          width: `${width}px`,
        }}
      />
      <div>{children}</div>
    </div>
  );
});

export default TimelineBody;
