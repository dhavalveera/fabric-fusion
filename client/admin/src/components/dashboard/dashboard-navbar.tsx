import type { FC } from "react";

// Framer Motion
import { motion } from "framer-motion";

// react icons
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

// types
import { DashboardNavbarProps } from "@/types";

// Components
import AccountPopover from "./account-popover";

const DashboardNavbar: FC<DashboardNavbarProps> = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div className="sticky top-0 z-[60] flex h-14 items-center justify-between border-b border-slate-300 bg-white px-4 shadow">
      <motion.button className="md:hidden" onClick={() => setOpenSidebar(prev => !prev)} aria-label="Open Sidebar on Mobile">
        {openSidebar ? <IoCloseOutline focusable="false" aria-hidden="true" /> : <FiMenu focusable="false" aria-hidden="true" />}
      </motion.button>
      <div className="flex w-full grow-1 items-center justify-end gap-4">
        {/* Add buttons, user profile, notifications etc. here */}
        <AccountPopover />
      </div>
    </div>
  );
};

export default DashboardNavbar;
