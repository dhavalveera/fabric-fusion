import { forwardRef } from "react";

// @ts-ignore
import Ripple from "material-ripple-effects";

// Helpers + Utils
import { clsx } from "~/helpers/clsx";
import { objectToString } from "~/utils/object-to-string";

// Types
import type { IconButtonProps, IconButtonStyleTypes, variant as VariantType } from "./icon-button-type";

// Default Values
import { iconButtonDefaultValue } from "./default-value";

// Icon Button Util Functions
import { sizeFindMatch, variantFindMatch } from "./find-match";

const CustomIconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  let { className = "", children, color, fullWidth, ripple, size, variant, ...rest } = props;

  // Step 1. Init
  const { defaultProps, styles, valid } = iconButtonDefaultValue;
  const { base, sizes, variants } = styles;

  // Step 2. Set Default
  variant = variant ?? defaultProps.variant;
  size = size ?? defaultProps.size;
  color = color ?? defaultProps.color;
  ripple = ripple ?? defaultProps.ripple;

  // Stpe 3. Set Ripple Effect instance
  const rippleEffect = ripple !== undefined && new Ripple();

  // Step 4. Set Styles
  const buttonBase = objectToString(base);
  const buttonVariant = variantFindMatch(variant, color);
  const buttonSize = sizeFindMatch(size);
  const classes = clsx([buttonBase, buttonSize, buttonVariant, className]);

  //   Step 5. Return
  return (
    <button
      {...rest}
      ref={ref}
      className={classes}
      type={rest.type || "button"}
      onMouseDown={e => {
        const onMouseDown = rest?.onMouseDown;

        if (ripple) {
          rippleEffect.create(e, (variant === "filled" || variant === "gradient") && color !== "white" ? "light" : "dark");
        }

        return typeof onMouseDown === "function" && onMouseDown(e);
      }}
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">{children}</span>
    </button>
  );
});

CustomIconButton.displayName = "IconButton";

export default CustomIconButton;
