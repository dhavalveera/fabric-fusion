import { forwardRef, type FC, type ReactElement } from "react";

// framer-motion
import { AnimatePresence, m, LazyMotion, domAnimation, type Variants } from "framer-motion";

// npm install deepmerge
import merge from "deepmerge";

// Helpers
import { clsx } from "~/helpers/clsx";

// Utils
import { objectToString } from "~/utils/object-to-string";

// Icon Button
import CustomIconButton from "../icon-button";

// Types
import type { ChipProps, NewAnimatePresenceProps } from "./custom-chip";

// default values
import { chipDefaultValues } from "./default-value";
import { chipActionSizeFinder, chipIconSizeFinder, chipSizeFinder, variantFindMatch } from "./find-match";

const CustomChip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  let { variant, size, color, icon, open, onClose, action, animate, className = "", value, ...rest } = props;

  //   Step 1. Init
  const { defaultProps, styles, valid } = chipDefaultValues;
  const { base, sizes, variants } = styles;

  // Step 2. Set Default Props
  variant = variant ?? defaultProps.variant;
  size = size ?? defaultProps.size;
  color = color ?? defaultProps.color;
  animate = animate ?? defaultProps.animate;
  open = open ?? defaultProps.open;
  action = action ?? defaultProps.action;
  onClose = onClose ?? defaultProps.onClose;
  className = clsx([defaultProps.className || "", className]);

  // Step 3. Set Styles
  const chipBase = objectToString(base.chip);
  const chipAction = objectToString(base.action);
  const chipIcon = objectToString(base.icon);
  const chipVariant = variantFindMatch(variant, color);
  const chipSize = chipSizeFinder(size);
  const actionSize = chipActionSizeFinder(size);
  const iconSize = chipIconSizeFinder(size);
  const classes = clsx([chipBase, chipVariant, chipSize, className]);
  const actionClasses = clsx([chipAction, actionSize]);
  const iconClasses = clsx([chipIcon, iconSize]);
  const contentClasses = clsx([icon && size === "sm" ? "ml-4" : "", icon && size === "md" ? "ml-[18px]" : "", icon && size === "lg" ? "ml-5" : "", onClose ? "mr-5" : ""]);

  // Step 4. Set Animation
  const mainAnimation: Variants = {
    unmount: {
      opacity: 0,
    },
    mount: {
      opacity: 1,
    },
  };

  const appliedAnimation = merge(mainAnimation, animate);

  // Step 5. Icon Template
  const iconTemplate: ReactElement = <div className={iconClasses}>{icon}</div>;

  // Step 6. Create an instance of AnimatePresence because of the types issue with the children
  const NewAnimatePresence: FC<NewAnimatePresenceProps> = AnimatePresence;

  return (
    <LazyMotion features={domAnimation}>
      <NewAnimatePresence>
        {open ? (
          <m.div {...rest} ref={ref} className={classes} initial="unmount" exit="unmount" animate={open ? "mount" : "unmount"} variants={appliedAnimation}>
            {icon ? iconTemplate : null}

            <span className={contentClasses}>{value}</span>

            {onClose && !action ? (
              <CustomIconButton onClick={onClose} size="sm" variant="text" color={variant === "outlined" || variant === "ghost" ? color : "white"} className={actionClasses}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={clsx([size === "sm" ? "h-3.5 w-3.5" : "", size === "md" ? "h-4 w-4" : "", size === "lg" ? "h-5 w-5" : ""])}
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </CustomIconButton>
            ) : null}

            {action || null}
          </m.div>
        ) : null}
      </NewAnimatePresence>
    </LazyMotion>
  );
});

CustomChip.displayName = "Chip";

export default CustomChip;
