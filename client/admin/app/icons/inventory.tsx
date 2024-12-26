import { forwardRef, type Ref, type SVGProps } from "react";

interface InventoryIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
  titleId?: string;
}

const InventoryIcon = forwardRef<SVGSVGElement, InventoryIconProps>(({ title, titleId, ...props }, ref) => {
  return (
    <svg focusable="false" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M21 7v11.6c0 1.33-1.07 2.4-2.4 2.4H5.4C4.07 21 3 19.93 3 18.6V7" fill="#ffffff" fillOpacity={0.16} />
      <path d="M21 7v11.6c0 1.33-1.07 2.4-2.4 2.4H5.4C4.07 21 3 19.93 3 18.6V7" stroke="#000000" strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" />
      <path d="M21.4 3H2.6A1.6 1.6 0 0 0 1 4.6v.8A1.6 1.6 0 0 0 2.6 7h18.8A1.6 1.6 0 0 0 23 5.4v-.8A1.6 1.6 0 0 0 21.4 3Z" stroke="#000000" strokeWidth={1.5} strokeMiterlimit={10} />
      <path d="M8 11h8" stroke="#000000" strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" />
    </svg>
  );
});

export default InventoryIcon;
