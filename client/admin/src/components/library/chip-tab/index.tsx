import { forwardRef } from "react";

// Framer Motion
import { motion } from "framer-motion";

// Utils
import { cn } from "@/utils/cn";

// types
import type { ChipTabsProps } from "@/types";

const ChpTabs = forwardRef<HTMLButtonElement, ChipTabsProps>((props, ref) => {
  const { className = "", chipTabValue, label, selected, setSelected, ...rest } = props;

  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      onClick={() => setSelected(chipTabValue)}
      className={cn(
        selected ? "text-white" : "hover:from-primary-color hover:to-secondary-color hover:bg-gradient-to-r hover:text-white",
        "relative cursor-pointer rounded-md px-2.5 py-0.5 text-sm transition-colors",
        className,
      )}
    >
      <span className="relative z-10">{label}</span>

      {selected ? (
        <motion.span layoutId="pill-tab" transition={{ type: "spring", duration: 0.5 }} className="from-primary-color to-secondary-color absolute inset-0 z-0 rounded-md bg-gradient-to-r" />
      ) : null}
    </button>
  );
});

export default ChpTabs;
