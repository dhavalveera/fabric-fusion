import { type FC, type PropsWithChildren } from "react";

// framer motion
import { motion } from "framer-motion";

// utils
import { cn } from "@/utils/cn";

// types
import type { BentoGridBlockProps } from "@/types";

const BentoGridComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={cn("min-h-screen p-2 dark:bg-zinc-900 dark:text-zinc-50")}>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid grid-flow-dense grid-cols-12 gap-4"
      >
        {children}
      </motion.div>
    </div>
  );
};

const BentoGridBlock: FC<BentoGridBlockProps> = ({ className = "", ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={cn("col-span-4 rounded-lg dark:bg-zinc-800", className)}
      {...rest}
    />
  );
};

BentoGridComponent.displayName = "BentoGrid";

export const BentoGrid = Object.assign(BentoGridComponent, {
  Block: BentoGridBlock,
});
