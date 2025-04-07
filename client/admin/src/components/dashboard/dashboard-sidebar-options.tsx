import type { FC } from "react";

// react router
import { useLocation, useNavigate } from "react-router";

// Framer Motion
import { motion } from "framer-motion";

// Utils
import { cn } from "@/utils/cn";

// types
import type { DashboardSidebarOptionProps } from "@/types";

const DashboardSidebarOptions: FC<DashboardSidebarOptionProps> = props => {
  const { icon: Icon, linkHref, notifs, open, title, ...rest } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <motion.button
      layout
      onClick={() => {
        navigate(linkHref, { preventScrollReset: false, viewTransition: true });
      }}
      className={cn(
        "relative flex h-10 w-full cursor-pointer items-center rounded-md transition-colors",
        pathname === linkHref ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100",
      )}
      {...rest}
    >
      <motion.div layout className="grid h-full w-10 place-content-center text-lg">
        <Icon className="size-5" />
      </motion.div>

      {open ? (
        <motion.span layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.125 }} className="font-della-respira text-xs font-medium">
          {title}
        </motion.span>
      ) : null}

      {notifs && open ? (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 right-2 size-4 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      ) : null}
    </motion.button>
  );
};

export default DashboardSidebarOptions;
