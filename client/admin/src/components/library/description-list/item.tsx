import { forwardRef } from "react";

// utils
import { cn } from "@/utils/cn";

// types
import type { DescriptionListItemProps } from "@/types";

const DescriptionListItem = forwardRef<HTMLDivElement, DescriptionListItemProps>((props, ref) => {
  const { className = "", children, title, ...rest } = props;

  return (
    <div className={cn("px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0", className)} ref={ref} {...rest}>
      <dt className="font-della-respira text-sm/6 font-medium text-gray-900 underline">{title}</dt>
      <dd className="font-della-respira mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{children}</dd>
    </div>
  );
});

export default DescriptionListItem;
