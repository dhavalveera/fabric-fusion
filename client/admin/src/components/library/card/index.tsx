import { forwardRef } from "react";

// Utils
import { cn } from "@/utils/cn";

// types
import type { CardProps } from "@/types";

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { cardBody, cardTitle, cardTitleWithUnderline, className = "", ...rest } = props;

  return (
    <div className={cn("rounded-md border border-[#F1F1F4] bg-white py-2 shadow-xl", className)} ref={ref} {...rest}>
      {/* Card Header */}
      <div className="flex min-h-16 flex-wrap items-stretch justify-between bg-transparent px-9 py-2">
        {/* Card Title */}
        <div className={cn("font-della-respira m-2 flex items-center text-2xl font-medium text-[#071437]", cardTitleWithUnderline ? "underline" : "")}>
          <h2>{cardTitle}</h2>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-9 py-4">{cardBody}</div>
    </div>
  );
});

export default Card;
