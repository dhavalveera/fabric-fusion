import { cloneElement, forwardRef, isValidElement, type HTMLAttributes, type ReactElement } from "react";

// Helpers
import { clsx } from "~/helpers/clsx";

// Utils
import { objectToString } from "~/utils/object-to-string";

// default value
import { timelineConnectorDefaultValue } from "./theme/connectors/theme";

// Timeline Item
import { useTimelineItem } from "./item";

// Define the interface for props, ensuring children is a ReactElement with className support.
interface TimelineConnectorsProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactElement<{ className: string }>; // children should be a ReactElement with optional className
}

const TimelineConnector = forwardRef<HTMLSpanElement, TimelineConnectorsProps>((props, ref) => {
  const { children, className = "", ...rest } = props;

  const {
    styles: { base },
  } = timelineConnectorDefaultValue;

  const [width] = useTimelineItem();

  const lineClasses = objectToString(base.line);
  const containerClasses = clsx([objectToString(base.container), className]);

  return (
    <span
      {...rest}
      ref={ref}
      className={containerClasses}
      style={{
        top: `${width}px`,
        width: `${width}px`,
        opacity: width ? 1 : 0,
        height: `calc(100% - ${width}px)`,
      }}
    >
      {children && isValidElement(children) ? (
        cloneElement(children, {
          className: clsx([lineClasses, children.props?.className]),
        })
      ) : (
        <span className={lineClasses} />
      )}
    </span>
  );
});

export default TimelineConnector;
