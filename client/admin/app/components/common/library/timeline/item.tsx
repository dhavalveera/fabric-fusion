import { createContext, forwardRef, useContext, useMemo, useState, type Dispatch, type HTMLAttributes, type SetStateAction } from "react";

// Helpers
import { clsx } from "~/helpers/clsx";

// Utils
import { objectToString } from "~/utils/object-to-string";

// Value
import { timelineItemDefaultValue } from "./theme/item/theme";

const TimelineItemContext = createContext<[number, Dispatch<SetStateAction<number>>] | undefined>(undefined);

export function useTimelineItem() {
  const context = useContext(TimelineItemContext);
  if (!context) {
    throw new Error(
      "useTimelineItemContext() must be used within a TimelineItem. It happens when you use TimelineIcon, TimelineConnector or TimelineBody components outside the TimelineItem component.",
    );
  }

  return context;
}

const TimelineItem = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>((props, ref) => {
  const { children, className = "", ...rest } = props;

  const {
    styles: { base },
  } = timelineItemDefaultValue;

  const [width, setWidth] = useState<number>(0);

  const contextValue = useMemo(() => {
    return [width, setWidth] as [number, Dispatch<SetStateAction<number>>]; // assert type here
  }, [width, setWidth]);

  return (
    <TimelineItemContext.Provider value={contextValue}>
      <li ref={ref} {...rest} className={clsx([objectToString(base), className])}>
        {children}
      </li>
    </TimelineItemContext.Provider>
  );
});

export default TimelineItem;
