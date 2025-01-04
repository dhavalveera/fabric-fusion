import { forwardRef, type ComponentProps } from "react";

// Helpers
import { clsx } from "~/helpers/clsx";

// Default Values + Types
import type { color as ColorType, size as SizeType, variant as VariantType } from "./types";
import { colorFindMatch, sizeFindMatch, variantFindMatch } from "./find-match";

export interface AvatarProps extends ComponentProps<"img"> {
  variant?: VariantType;
  size?: SizeType;
  withBorder?: boolean;
  color?: ColorType;
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>((props, ref) => {
  let { variant, size, className = "", color, withBorder, ...rest } = props;

  // Step 1. Set Default Props/Values
  variant = variant ?? "rounded";
  size = size ?? "md";
  withBorder = withBorder ?? false;
  color = color ?? "gray";

  // Step 2. Set Styles
  const avatarVariant = variantFindMatch(variant);
  const avatarSize = sizeFindMatch(size);
  const avatarBorderColor = colorFindMatch(color);
  const classes = clsx(["inline-block relative object-cover object-center", avatarVariant, avatarSize, withBorder ? "border-2" : "", withBorder ? avatarBorderColor : "", className]);

  return <img {...rest} ref={ref} className={classes} />;
});

export default Avatar;
