import { forwardRef, ImgHTMLAttributes } from "react";

// utils
import { cn } from "@/utils/cn";

const Image = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>((props, ref) => {
  const { className = "", src, ...rest } = props;

  return <img src={src} srcSet={src} className={cn("object-cover", className)} ref={ref} {...rest} />;
});

export default Image;
