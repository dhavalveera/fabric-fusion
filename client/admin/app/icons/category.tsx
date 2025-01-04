import { forwardRef, type SVGProps } from "react";

// Helpers
import { clsx } from "~/helpers/clsx";

interface CategoryIconProps extends SVGProps<SVGSVGElement> {
  strokeClass?: string;
  title?: string;
  titleId?: string;
}

const CategoryIcon = forwardRef<SVGSVGElement, CategoryIconProps>(({ strokeClass = "", title, titleId, ...props }, ref) => {
  return (
    <svg focusable="false" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <g id="Layer_2" data-name="Layer 2">
        <g>
          <path
            d="M24,7.7,29.3,16H18.6L24,7.7M24,2a2.1,2.1,0,0,0-1.7,1L13.2,17a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H33a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-9-14A1.9,1.9,0,0,0,24,2Z"
            strokeWidth="2"
            className={clsx([strokeClass, "stroke-black dark:stroke-white"])}
          />
          <path d="M43,43H29a2,2,0,0,1-2-2V27a2,2,0,0,1,2-2H43a2,2,0,0,1,2,2V41A2,2,0,0,1,43,43ZM31,39H41V29H31Z" className={clsx([strokeClass, "stroke-black dark:stroke-white"])} strokeWidth="2" />
          <path d="M13,28a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-4A10,10,0,1,0,23,34,10,10,0,0,0,13,24Z" className={clsx([strokeClass, "stroke-black dark:stroke-white"])} strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
});

export default CategoryIcon;
