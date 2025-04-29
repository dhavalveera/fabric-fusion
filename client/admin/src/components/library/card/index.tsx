import { forwardRef } from "react";

// Utils
import { cn } from "@/utils/cn";

// types
import type { CardProps } from "@/types";

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { cardBody, cardTitle, className = "", ...rest } = props;

  return (
    <div className={cn("border border-[#F1F1F4] bg-white py-2 shadow-2xl", className)} ref={ref} {...rest}>
      {/* Card Header */}
      <div className="flex min-h-16 flex-wrap items-stretch justify-between bg-transparent px-9 py-2">
        {/* Card Title */}
        <div className="font-della-respira m-2 flex items-center text-2xl font-medium text-[#071437]">
          <h2>{cardTitle}</h2>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-9 py-4">{cardBody}</div>
    </div>
  );
});

export default Card;
