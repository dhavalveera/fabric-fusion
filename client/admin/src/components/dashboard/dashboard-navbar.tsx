import type { FC } from "react";

// Framer Motion
import { motion } from "framer-motion";

// react icons
import { FiMenu } from "react-icons/fi";

// types
import { DashboardNavbarProps } from "@/types";

// Components
import AccountPopover from "./account-popover";

const DashboardNavbar: FC<DashboardNavbarProps> = ({ setOpenSidebar }) => {
  return (
    <div className="flex h-14 items-center justify-between bg-white px-4 shadow border-b border-slate-300">
      <motion.button
        className="md:hidden"
        onClick={() => setOpenSidebar((prev) => !prev)}
        aria-label="Open Sidebar on Mobile"
      >
        <FiMenu />
      </motion.button>
      <div className="flex justify-end w-full items-center grow-1 gap-4">
        {/* Add buttons, user profile, notifications etc. here */}
        <AccountPopover />
      </div>
    </div>
  );
};

export default DashboardNavbar;
