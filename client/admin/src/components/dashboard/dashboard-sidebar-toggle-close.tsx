import type { FC } from "react";

// Framer Motion
import { motion } from "framer-motion";

// react-icons
import { FiChevronsRight } from "react-icons/fi";

// types
import type { DashboardSidebarToggleCloseProps } from "@/types";

const DashboardSidebarToggleClose: FC<DashboardSidebarToggleCloseProps> = ({
  open,
  setOpen,
}) => {
  return (
    <motion.div
      layout
      onClick={() => setOpen((prev) => !prev)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open ? (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium font-della-respira"
          >
            Hide
          </motion.span>
        ) : null}
      </div>
    </motion.div>
  );
};

export default DashboardSidebarToggleClose;
