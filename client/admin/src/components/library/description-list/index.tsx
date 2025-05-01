import { forwardRef, type ComponentProps } from "react";

// utils
import { cn } from "@/utils/cn";

const DescriptionList = forwardRef<HTMLDivElement, ComponentProps<"div">>(({ className = "", children, ...rest }, ref) => {
  return (
    <div className={cn("mt-6 border-t border-gray-100", className)} ref={ref} {...rest}>
      <dl className="divide-y divide-gray-100">{children}</dl>
    </div>
  );
});

export default DescriptionList;
