import type { FC, PropsWithChildren } from "react";

// Framer Motion
import { motion } from "framer-motion";

const Tooltip: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute bottom-full left-[85%] mb-2 w-64 -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-800 shadow-lg"
      >
        {children}
      </motion.div>
    </>
  );
};

export default Tooltip;
