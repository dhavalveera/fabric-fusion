import type { FC } from "react";

// React Router
import { useNavigate } from "react-router";

// Framer Motion
import { motion } from "framer-motion";

// SVG Logo
import { FabricFusionIcon } from "@/icons";

// types
import type { DashboardSidebarTitleProps } from "@/types";

const DashboardSidebarTitle: FC<DashboardSidebarTitleProps> = ({ open }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-3 border-b w-full border-slate-300 pb-3">
      <div className="flex w-full cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <motion.button
          layout
          onClick={() =>
            navigate("/dashboard", {
              preventScrollReset: false,
              viewTransition: true,
            })
          }
          className="flex justify-center w-full cursor-pointer items-center flex-col gap-1 "
        >
          <FabricFusionIcon className="size-10" />

          {open ? (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="text-xs flex font-semibold font-della-respira">
                Fabric Fusion
              </span>
            </motion.div>
          ) : null}
        </motion.button>
      </div>
    </div>
  );
};

export default DashboardSidebarTitle;
